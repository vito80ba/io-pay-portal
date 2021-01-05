import * as express from "express";
import * as t from "io-ts";

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

import { PaymentRequestsGetResponse } from "../generated/definitions/PaymentRequestsGetResponse";
import { IApiClient} from "../clients/pagopa";
import { withApiRequestWrapper } from "../utils/api";
import { getLogger, ILogger } from "../utils/logging";
import { ErrorResponses } from "../utils/responses";
import { identity } from "fp-ts/lib/function";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { Context } from "@azure/functions";

type IGetPaymentInfoHandler = (
    context: Context,
    rptId : string
) => Promise<
  IResponseSuccessJson<PaymentRequestsGetResponse> | ErrorResponses
>;

const logPrefix = "GetPaymentInfoHandler";

const getPaymentInfoTask = (
  logger: ILogger,
  apiClient: IApiClient,
  rptId : string
): TaskEither<ErrorResponses, PaymentRequestsGetResponse> =>
  withApiRequestWrapper(
    logger,
    (): any =>
      apiClient.getPaymentInfo({ rpt_id_from_string : rptId }) 
      ,
    200
  );

export function GetPaymentInfoHandler(pagoPaClient : IApiClient): IGetPaymentInfoHandler {
  return (context, rptId) => 
    getPaymentInfoTask(
      getLogger(context, logPrefix, "GetPaymentInfo"),
      pagoPaClient, 
      rptId)
      .map(myPayment =>
        ResponseSuccessJson(myPayment)
      )
      .fold<IResponseSuccessJson<PaymentRequestsGetResponse> | ErrorResponses>(
      identity,
      identity
      )
      .run();
}

export function GetPaymentInfoCtrl(pagoPaClient : IApiClient): express.RequestHandler {
  const handler = GetPaymentInfoHandler(pagoPaClient);
  const middlewaresWrap = withRequestMiddlewares(
    ContextMiddleware(),
    RequiredParamMiddleware("rptId", t.string)
  );


  return wrapRequestHandler(middlewaresWrap(handler));
}
