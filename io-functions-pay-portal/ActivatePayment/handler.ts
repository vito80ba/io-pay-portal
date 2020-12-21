import * as express from "express";

import { ContextMiddleware } from "io-functions-commons/dist/src/utils/middlewares/context_middleware";
import { RequiredBodyPayloadMiddleware } from "io-functions-commons/dist/src/utils/middlewares/required_body_payload";
import {
  withRequestMiddlewares,
  wrapRequestHandler
} from "io-functions-commons/dist/src/utils/request_middleware";
import {
  IResponseErrorNotFound,
  IResponseSuccessJson,
  ResponseSuccessJson
} from "italia-ts-commons/lib/responses";
import { PaymentActivationsPostRequest } from "../generated/definitions/PaymentActivationsPostRequest";
import { PaymentActivationsPostResponse } from "../generated/definitions/PaymentActivationsPostResponse";

type IHttpHandler = () => Promise<
  IResponseSuccessJson<PaymentActivationsPostResponse> | IResponseErrorNotFound
>;

export function HttpHandler(): IHttpHandler {
  return async () => {
    return ResponseSuccessJson({
      importoSingoloVersamento: 10
    } as PaymentActivationsPostResponse);
  };
}

export function HttpCtrl(): express.RequestHandler {
  const handler = HttpHandler();

  const middlewaresWrap = withRequestMiddlewares(
    ContextMiddleware(),
    RequiredBodyPayloadMiddleware(PaymentActivationsPostRequest)
  );

  return wrapRequestHandler(middlewaresWrap(handler));
}
