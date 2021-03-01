import {
  fromEither,
  fromPredicate,
  TaskEither,
  tryCatch
} from "fp-ts/lib/TaskEither";

import { getConfigOrThrow } from "../config";

import { readableReport } from "italia-ts-commons/lib/reporters";
import { fetchApi } from "../../clients/fetchApi";
import { ResponseRecaptcha } from "../types/ResponseRecaptcha";

import { EmailString, NonEmptyString } from "italia-ts-commons/lib/strings";
import { AuthTokenMailup } from "../types/AuthTokenMailup";

import { fromNullable } from "fp-ts/lib/Option";

const config = getConfigOrThrow();

export const recaptchaCheckTask = (
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

export const getTokenMailupTask = (): TaskEither<Error, AuthTokenMailup> =>
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
        AuthTokenMailup.decode(json).mapLeft(
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

export const addRecipientToMailupListTask = (
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
