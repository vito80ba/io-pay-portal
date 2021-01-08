/* tslint:disable: no-any */

import { GetPaymentInfoHandler } from "../handler";

import {
  ApplicationCode,
  AuxDigit,
  CheckDigit,
  IUV13,
  PaymentNoticeNumber,
  RptId,
  RptIdFromString
} from "italia-pagopa-commons/lib/pagopa";
import { OrganizationFiscalCode } from "italia-ts-commons/lib/strings";

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

import { PaymentRequestsGetResponse } from "../../generated/definitions/PaymentRequestsGetResponse";

// import fetch from 'node-fetch'
// import { Response } from 'node-fetch'
// jest.mock('node-fetch');

const iuv13 = "1234567890123";
const iuv15 = "123456789012345";
const iuv17 = "12345678901234567";
const checkDigit = "12";
const segregationCode = "12";
const applicationCode = "12";

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
    getPaymentInfo: jest.fn(_ => {
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

  const handler = GetPaymentInfoHandler(apiClientMock as any);

  const response = await handler(context, {
    organizationFiscalCode: "12345678901",
    paymentNoticeNumber: {
      applicationCode: "12",
      auxDigit: "0",
      checkDigit: "99",
      iuv13: "1234567890123"
    }
  } as RptIdFromString);

  expect(response.kind).toBe("IResponseErrorInternal");
});

it("should return a payment info OK response PaymentRequestsGetResponse", async () => {
  const apiClientMock = {
    getPaymentInfo: jest.fn(_ => {
      return Promise.resolve(
        right({
          status: 200,
          value: {
            importoSingoloVersamento: 100,
            codiceContestoPagamento: "5ae4e3a051c111ebb015abe7e7394a7d",
            ibanAccredito: "IT47L0300203280645139156879",
            causaleVersamento: "Causale versamento mock"
          }
        })
      );
    })
  };

  const handler = GetPaymentInfoHandler(apiClientMock as any);

  const response = await handler(context, {
    organizationFiscalCode: "12345678901",
    paymentNoticeNumber: {
      applicationCode: "12",
      auxDigit: "0",
      checkDigit: "99",
      iuv13: "1234567890123"
    }
  } as RptIdFromString);

  expect(response.kind).toBe("IResponseSuccessJson");
});
