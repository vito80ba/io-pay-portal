/* tslint:disable: no-any */

import { GetActivationStatusHandler } from "../handler";

// should be HERE !!!!
process.env = {
  IO_PAGOPA_PROXY_PROD_BASE_URL: "http://localhost:7071/api/v1",
  IO_PAGOPA_PROXY_TEST_BASE_URL: "http://localhost:7071/api/v1",
  PAGOPA_BASE_PATH: "NonEmptyString"
};
// debug("ENV", process.env);

import { apiClient } from "../../clients/pagopa";

import { context } from "../__mocks__/durable-functions";

import { fromEither, fromLeft } from "fp-ts/lib/TaskEither";
import {
  ResponseErrorNotFound,
  ResponseSuccessJson
} from "italia-ts-commons/lib/responses";
import { left, right } from "fp-ts/lib/Either";

import * as logger from "../../utils/logging";

import { PaymentActivationsGetResponse } from "../../generated/definitions/PaymentActivationsGetResponse";
import { CodiceContestoPagamento } from "../../generated/pagopa-proxy/CodiceContestoPagamento";

// import fetch from 'node-fetch'
// import { Response } from 'node-fetch'
// jest.mock('node-fetch');

const codiceContestoPagamento: string = "P8GWJBJ5JWR";

// use to mock getLogger
jest.spyOn(logger, "getLogger").mockReturnValueOnce({
  logErrors: jest.fn(),
  logUnknown: jest.fn()
});

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

it("should return a payment info KO response", async () => {
  const apiClientMock = {
    getActivationStatus: jest.fn(_ => {
      return Promise.resolve(
        left({
          status: 400,
          value: {
            type: "bahhh"
          }
        })
      );
    })
  };

  const handler = GetActivationStatusHandler(apiClientMock as any);

  const response = await handler(
    context,
    "12345678901234567890123456789012" as CodiceContestoPagamento
  );

  expect(response.kind).toBe("IResponseErrorInternal");
});

it("should return a payment info OK response PaymentRequestsGetResponse", async () => {
  const apiClientMock = {
    getActivationStatus: jest.fn(_ => {
      return Promise.resolve(
        right({
          status: 200,
          value: {
            idPagamento: codiceContestoPagamento
          } as PaymentActivationsGetResponse
        })
      );
    })
  };

  const handler = GetActivationStatusHandler(apiClientMock as any);

  const response = await handler(
    context,
    "12345678901234567890123456789012" as CodiceContestoPagamento
  );

  expect(response.kind).toBe("IResponseSuccessJson");
});
