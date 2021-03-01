import * as express from "express";
import * as t from "io-ts";

import { Context } from "@azure/functions";
import { ContextMiddleware } from "io-functions-commons/dist/src/utils/middlewares/context_middleware";

import { RequiredParamMiddleware } from "io-functions-commons/dist/src/utils/middlewares/required_param";
import {
  withRequestMiddlewares,
  wrapRequestHandler
} from "io-functions-commons/dist/src/utils/request_middleware";
import {
  IResponseSuccessJson,
  ResponseSuccessJson
} from "italia-ts-commons/lib/responses";

import {
  ErrorResponses,
  toDefaultResponseErrorInternal
} from "../utils/responses";

import { EmailString, NonEmptyString } from "italia-ts-commons/lib/strings";
import { RecipientRequest } from "../generated/definitions/RecipientRequest";

import { fromNullable } from "fp-ts/lib/Option";
import {
  fromEither,
  fromPredicate,
  TaskEither,
  tryCatch
} from "fp-ts/lib/TaskEither";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { fetchApi } from "../clients/fetchApi";
import { getConfigOrThrow } from "../utils/config";

import { IRequestMiddleware } from "io-functions-commons/dist/src/utils/request_middleware";
import { ResponseErrorFromValidationErrors } from "italia-ts-commons/lib/responses";

const logPrefix = "PostNewslettersRecipients";
const config = getConfigOrThrow();

type IPostNewslettersRecipientsHandler = (
  context: Context,
  id: NonEmptyString,
  recipientRequest: RecipientRequest
) => Promise<IResponseSuccessJson<string> | ErrorResponses>;

/**
 * Model for mailup OAuth token
 */
const AuthTokenR = t.partial({});

const AuthTokenO = t.interface({
  access_token: NonEmptyString,

  expires_in: t.number,

  refresh_token: t.string
});

const MailupAuthToken = t.intersection(
  [AuthTokenR, AuthTokenO],
  "MailupAuthToken"
);

type MailupAuthToken = t.TypeOf<typeof MailupAuthToken>;

/**
 * Model for Google reCaptcha response
 */
const ResponseR = t.interface({
  success: t.boolean,

  challenge_ts: t.string,

  hostname: t.string
});

const ResponseO = t.partial({
  "error-codes": t.readonlyArray(t.string, "array of string")
});

export const ResponseRecaptcha = t.intersection(
  [ResponseR, ResponseO],
  "ResponseRecaptcha"
);

export type ResponseRecaptcha = t.TypeOf<typeof ResponseRecaptcha>;

/**
 * A middleware that extracts a RecipientRequest payload from a request.
 */
const RecipientRequestMiddleware: IRequestMiddleware<
  "IResponseErrorValidation",
  RecipientRequest
> = request =>
  Promise.resolve(
    RecipientRequest.decode(request.body).mapLeft(
      ResponseErrorFromValidationErrors(RecipientRequest)
    )
  );

const recaptchaCheckTask = (
  recaptchaToken: string
): TaskEither<Error, ResponseRecaptcha> =>
  tryCatch(
    () =>
      fetchApi(`${config.RECAPTCHA_URL}/recaptcha/api/siteverify`, {
        body: `secret=${config.RECAPTCHA_SECRET}&response=${recaptchaToken}`,
        headers: {
          // tslint:disable-next-line: no-duplicate-string
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      }),
    err => new Error(`Error posting recaptcha API: ${err}`)
  )
    .chain(
      fromPredicate<Error, Response>(
        r => r.ok,
        r => new Error(`Error returned from recaptcha API: ${r.status}`)
      )
    )
    .chain(response =>
      tryCatch(
        () => response.json(),
        err => new Error(`Error getting recaptcha API payload: ${err}`)
      )
    )
    .chain(json =>
      fromEither(
        ResponseRecaptcha.decode(json).mapLeft(
          errors =>
            new Error(
              `Error while decoding response from recaptcha: ${readableReport(
                errors
              )})`
            )
        )
      )
    )
    .chain(
      fromPredicate(
        ar => ar.success,
        _ => new Error(`Error checking recaptcha`)
      )
    );

const getMailupAuthTokenTask = (): TaskEither<Error, MailupAuthToken> =>
  tryCatch(
    () =>
      fetchApi(`${config.MAILUP_URL}/Authorization/OAuth/Token`, {
        body: `grant_type=password&client_id=${config.MAILUP_CLIENT_ID}&client_secret=${config.MAILUP_SECRET}&username=${config.MAILUP_USERNAME}&password=${config.MAILUP_PASSWORD}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      }),
    err => new Error(`Error posting auth request mailup API: ${err}`)
  )
    .chain(
      fromPredicate<Error, Response>(
        r => r.ok,
        r =>
          new Error(`Error returned from auth request mailup API: ${r.status}`)
      )
    )
    .chain(response =>
      tryCatch(
        () => response.json(),
        err =>
          new Error(`Error getting auth request mailup API payload: ${err}`)
      )
    )
    .chain(json =>
      fromEither(
        MailupAuthToken.decode(json).mapLeft(
          errors =>
            new Error(
              `Error while decoding response from auth request mailup: ${readableReport(
                errors
              )})`
            )
        )
      )
    )
    .chain(
      fromPredicate(
        ar => fromNullable(ar.access_token).isSome(),
        _ => new Error(`Error auth request mailup`)
      )
    );

const addRecipientToMailupListTask = (
  id: NonEmptyString,
  email: EmailString,
  name: string | undefined,
  token: NonEmptyString
): TaskEither<Error, number> =>
  tryCatch(
    () =>
      fetchApi(
        `${config.MAILUP_URL}/API/v1.1/Rest/ConsoleService.svc/Console/List/${id}/Recipient`,
        {
          body: JSON.stringify({
            Email: email,
            Name: name
          }),
          headers: {
            // tslint:disable-next-line: prettier
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          method: "POST"
        }
      ),
    err => new Error(`Error posting new recipient mailup API: ${err}`)
  )
    .chain(
      fromPredicate<Error, Response>(
        r => r.ok,
        r =>
          new Error(`Error returned from new recipient mailup API: ${r.status}`)
      )
    )
    .chain(response =>
      tryCatch(
        () => response.json(),
        err =>
          new Error(`Error getting new recipient mailup API payload: ${err}`)
      )
    )
    .chain(
      fromPredicate(
        idRecipient => idRecipient > 0,
        _ => new Error(`Error new recipient  mailup`)
      )
    );

export function PostNewslettersRecipientsHandler(): IPostNewslettersRecipientsHandler {
  return (context, id, recipientRequest) => {
    context.log.info(`${logPrefix}| Add new recipient to mailup group ${id}`);

    return recaptchaCheckTask(recipientRequest.recaptchaToken)
      .chain(_ => getMailupAuthTokenTask())
      .chain(authMailupResponse =>
        addRecipientToMailupListTask(
          id,
          recipientRequest.email,
          recipientRequest.name,
          authMailupResponse.access_token
        )
      )
      .fold<IResponseSuccessJson<string> | ErrorResponses>(
        error => toDefaultResponseErrorInternal(error),
        _ => ResponseSuccessJson("")
      )
      .run();
  };
}

export function PostNewslettersRecipientsCtrl(): express.RequestHandler {
  const handler = PostNewslettersRecipientsHandler();
  const middlewaresWrap = withRequestMiddlewares(
    ContextMiddleware(),
    RequiredParamMiddleware("id", NonEmptyString),
    RecipientRequestMiddleware
  );

  return wrapRequestHandler(middlewaresWrap(handler));
}
