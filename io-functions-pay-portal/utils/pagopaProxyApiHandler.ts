import { toError } from "fp-ts/lib/Either";
import {
  fromLeft,
  TaskEither,
  taskEither,
  tryCatch
} from "fp-ts/lib/TaskEither";
import * as t from "io-ts";
import { Errors } from "io-ts";
import { IResponseType } from "italia-ts-commons/lib/requests";
import {
  HttpStatusCodeEnum,
  IResponse,
  IResponseErrorForbiddenNotAuthorized,
  IResponseErrorInternal,
  IResponseErrorNotFound,
  IResponseErrorTooManyRequests,
  IResponseErrorValidation,
  ResponseErrorForbiddenNotAuthorized,
  ResponseErrorGeneric,
  ResponseErrorInternal,
  ResponseErrorNotFound,
  ResponseErrorTooManyRequests,
  ResponseErrorValidation
} from "italia-ts-commons/lib/responses";
import { PaymentProblemJson } from "../generated/pagopa-proxy/PaymentProblemJson";
import { ProblemJson } from "../generated/pagopa-proxy/ProblemJson";
import { ILogger } from "./logging";

export const unhandledResponseStatus = (status: number) =>
  ResponseErrorInternal(`unhandled API response status [${status}]`);

export const toDefaultResponseErrorInternal = (errs: unknown | Errors) =>
  ResponseErrorInternal(toError(errs).message);

/**
 * Interface for unauthorized error response.
 */
export interface IResponseErrorUnauthorized
  extends IResponse<"IResponseErrorUnauthorized"> {
  readonly detail: string;
}
/**
 * Returns an unauthorized error response with status code 401.
 */
export function ResponseErrorUnauthorized(
  title: string,
  detail: string
): IResponseErrorUnauthorized {
  return {
    ...ResponseErrorGeneric(HttpStatusCodeEnum.HTTP_STATUS_401, title, detail),
    ...{
      detail: `${title}: ${detail}`,
      kind: "IResponseErrorUnauthorized"
    }
  };
}

export type ErrorResponses =
  | IResponseErrorNotFound
  | IResponseErrorUnauthorized
  | IResponseErrorForbiddenNotAuthorized
  | IResponseErrorInternal
  | IResponseErrorTooManyRequests
  | IResponseErrorValidation;

export const toErrorServerResponse = <S extends number, T>(
  response: IResponseType<S, T>
) => {
  switch (response.status) {
    case 401:
      return ResponseErrorUnauthorized("Unauthorized", "Unauthorized");
    case 403:
      return ResponseErrorForbiddenNotAuthorized;
    case 404:
      return ResponseErrorNotFound("Not found", "Resource not found");
    case 429:
      return ResponseErrorTooManyRequests("Too many requests");
    case 500:
      return PaymentProblemJson.decode(response.value).fold<ErrorResponses>(
        _ => ResponseErrorInternal("Generic Error"),
        result => ResponseErrorValidation("Validation Error", result.detail)
      );
    default:
      return unhandledResponseStatus(response.status);
  }
};

export const withApiRequestWrapper = <T>(
  logger: ILogger,
  apiCallWithParams: () => Promise<
    t.Validation<
      IResponseType<number, T | ProblemJson | PaymentProblemJson, never>
    >
  >,
  successStatusCode: 200 | 201 | 202 = 200
): TaskEither<ErrorResponses, T> =>
  tryCatch(
    () => apiCallWithParams(),
    errs => {
      logger.logUnknown(errs);
      return toDefaultResponseErrorInternal(errs);
    }
  ).foldTaskEither(
    err => fromLeft(err),
    errorOrResponse =>
      errorOrResponse.fold(
        errs => {
          logger.logErrors(errs);
          return fromLeft(toDefaultResponseErrorInternal(errs));
        },
        responseType =>
          responseType.status !== successStatusCode
            ? fromLeft(toErrorServerResponse(responseType))
            : taskEither.of(responseType.value as T)
      )
  );
