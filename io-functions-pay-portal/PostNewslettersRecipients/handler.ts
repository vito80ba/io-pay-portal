import * as express from "express";

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

import { NonEmptyString } from "italia-ts-commons/lib/strings";
import { RecipientRequest } from "../generated/definitions/RecipientRequest";
import {
  addRecipientToMailupListTask,
  getTokenMailupTask,
  recaptchaCheckTask
} from "../utils/middlewares/newsletters";
import { RecipientRequestMiddleware } from "../utils/middlewares/recipient";

type IPostNewslettersRecipientsHandler = (
  context: Context,
  id: NonEmptyString,
  recipientRequest: RecipientRequest
) => Promise<IResponseSuccessJson<string> | ErrorResponses>;

const logPrefix = "PostNewslettersRecipients";

export function PostNewslettersRecipientsHandler(): IPostNewslettersRecipientsHandler {
  return (context, id, recipientRequest) => {
    context.log.info(`${logPrefix}| Add new recipient to mailup group ${id}`);

    return recaptchaCheckTask(recipientRequest.recaptchaToken)
      .chain(_ => getTokenMailupTask())
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
