import * as express from "express";

import { Context } from "@azure/functions";
import { ContextMiddleware } from "io-functions-commons/dist/src/utils/middlewares/context_middleware";

import { identity } from "fp-ts/lib/function";
import { IApiClient } from "../clients/pagopa";

import { RequiredParamMiddleware } from "io-functions-commons/dist/src/utils/middlewares/required_param";
import {
  withRequestMiddlewares,
  wrapRequestHandler
} from "io-functions-commons/dist/src/utils/request_middleware";
import {
  IResponseSuccessJson,
  ResponseSuccessJson
} from "italia-ts-commons/lib/responses";

import { PaymentRequestsGetResponse } from "../generated/definitions/PaymentRequestsGetResponse";
import { withApiRequestWrapper } from "../utils/api";
import { getLogger, ILogger } from "../utils/logging";
import { ErrorResponses } from "../utils/responses";

import { TaskEither } from "fp-ts/lib/TaskEither";
import { RptIdFromString } from "italia-pagopa-commons/lib/pagopa";

type IGetPaymentInfoHandler = (
  context: Context,
  rptId: RptIdFromString
) => Promise<IResponseSuccessJson<PaymentRequestsGetResponse> | ErrorResponses>;

const logPrefix = "GetPaymentInfoHandler";

const getPaymentInfoTask = (
  logger: ILogger,
  apiClient: IApiClient,
  rptId: RptIdFromString
): TaskEither<ErrorResponses, PaymentRequestsGetResponse> =>
  withApiRequestWrapper<PaymentRequestsGetResponse>(
    logger,
    () =>
      apiClient.getPaymentInfo({
        rpt_id_from_string: RptIdFromString.encode(rptId)
      }),
    200
  );

export function GetPaymentInfoHandler(
  pagoPaClient: IApiClient
): IGetPaymentInfoHandler {
  return (context, rptId) => {
    return getPaymentInfoTask(
      getLogger(context, logPrefix, "GetPaymentInfo"),
      pagoPaClient,
      rptId
    )
      .map(myPayment => ResponseSuccessJson(myPayment))
      .fold<IResponseSuccessJson<PaymentRequestsGetResponse> | ErrorResponses>(
        identity,
        identity
      )
      .run();
  };
}

export function GetPaymentInfoCtrl(
  pagoPaClient: IApiClient
): express.RequestHandler {
  const handler = GetPaymentInfoHandler(pagoPaClient);
  const middlewaresWrap = withRequestMiddlewares(
    ContextMiddleware(),
    RequiredParamMiddleware("rptId", RptIdFromString)
  );

  return wrapRequestHandler(middlewaresWrap(handler));
}
