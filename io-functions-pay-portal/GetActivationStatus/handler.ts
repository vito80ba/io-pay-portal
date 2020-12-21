import * as express from "express";
import * as t from "io-ts";

import { ContextMiddleware } from "io-functions-commons/dist/src/utils/middlewares/context_middleware";
import { RequiredParamMiddleware } from "io-functions-commons/dist/src/utils/middlewares/required_param";
import {
  withRequestMiddlewares,
  wrapRequestHandler
} from "io-functions-commons/dist/src/utils/request_middleware";
import {
  IResponseErrorNotFound,
  IResponseSuccessJson,
  ResponseSuccessJson
} from "italia-ts-commons/lib/responses";

import { PaymentActivationsGetResponse } from "../generated/definitions/PaymentActivationsGetResponse";

type IHttpHandler = () => Promise<
  IResponseSuccessJson<PaymentActivationsGetResponse> | IResponseErrorNotFound
>;

export function HttpHandler(): IHttpHandler {
  return async () => {
    return ResponseSuccessJson({
      idPagamento: 123
    } as PaymentActivationsGetResponse);
  };
}

export function HttpCtrl(): express.RequestHandler {
  const handler = HttpHandler();

  const middlewaresWrap = withRequestMiddlewares(
    ContextMiddleware(),
    RequiredParamMiddleware("codiceContestoPagamento", t.string)
  );

  return wrapRequestHandler(middlewaresWrap(handler));
}
