import {
  fromLeft,
  TaskEither,
  taskEither,
  tryCatch,
} from "fp-ts/lib/TaskEither";
import * as t from "io-ts";
import { IResponseType } from "italia-ts-commons/lib/requests";
import { PaymentRequestsGetResponse } from "../../generated/PaymentRequestsGetResponse";
import { apiClient } from "./client";
import {
  ErrorResponses,
  toDefaultResponseErrorInternal,
  toErrorServerResponse,
} from "./responses";

export const withApiRequestWrapper = <T>(
  apiCallWithParams: () => Promise<
    t.Validation<IResponseType<number, T, never>>
  >,
  successStatusCode: 200 | 201 | 202 = 200
): TaskEither<ErrorResponses, T> =>
  tryCatch(
    () => apiCallWithParams(),
    (errs) => toDefaultResponseErrorInternal(errs)
  ).foldTaskEither(
    (err) => fromLeft(err),
    (errorOrResponse) =>
      errorOrResponse.fold(
        (errs) => fromLeft(toDefaultResponseErrorInternal(errs)),
        (responseType) =>
          responseType.status !== successStatusCode
            ? fromLeft(toErrorServerResponse(responseType))
            : taskEither.of(responseType.value)
      )
  );

export const getPaymentInfoTask = (
  rptIdInput: string
): TaskEither<ErrorResponses, PaymentRequestsGetResponse> =>
  withApiRequestWrapper<PaymentRequestsGetResponse>(
    (): any =>
      apiClient.getPaymentInfo({
        rptId: rptIdInput,
      }),
    200
  );
