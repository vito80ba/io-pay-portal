/* tslint:disable: no-any */
import { Context } from "@azure/functions";

import { GetPaymentInfoHandler } from "../handler";

import { paymentInfo } from "../../__mocks__/mock";

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

import { fromEither, fromLeft } from "fp-ts/lib/TaskEither";
import {
  ResponseErrorNotFound,
  ResponseSuccessJson
} from "italia-ts-commons/lib/responses";
import { left, right } from "fp-ts/lib/Either";

import * as logger from "../../utils/logging";

import { PaymentRequestsGetResponse } from "../../generated/definitions/PaymentRequestsGetResponse";

const context = ({
  bindings: {},
  log: {
    // tslint:disable-next-line: no-console
    error: jest.fn().mockImplementation(console.log),
    // tslint:disable-next-line: no-console
    info: jest.fn().mockImplementation(console.log),
    // tslint:disable-next-line: no-console
    verbose: jest.fn().mockImplementation(console.log),
    // tslint:disable-next-line: no-console
    warn: jest.fn().mockImplementation(console.log)
  }
} as any) as Context;

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
            type: paymentInfo.messageReceivedNOK
          }
        })
      );
    })
  };

  const handler = GetPaymentInfoHandler(apiClientMock as any);

  const response = await handler(context, {
    organizationFiscalCode: paymentInfo.organizationFiscalCode,
    paymentNoticeNumber: {
      applicationCode: paymentInfo.applicationCode,
      auxDigit: paymentInfo.auxDigit,
      checkDigit: paymentInfo.checkDigit,
      iuv13: paymentInfo.iuv13
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
            importoSingoloVersamento: paymentInfo.importoSingoloVersamento,
            codiceContestoPagamento: paymentInfo.codiceContestoPagamento,
            ibanAccredito: paymentInfo.ibanAccredito,
            causaleVersamento: paymentInfo.causaleVersamento
          } as PaymentRequestsGetResponse
        })
      );
    })
  };

  const handler = GetPaymentInfoHandler(apiClientMock as any);

  const response = await handler(context, {
    organizationFiscalCode: paymentInfo.organizationFiscalCode,
    paymentNoticeNumber: {
      applicationCode: paymentInfo.applicationCode,
      auxDigit: paymentInfo.auxDigit,
      checkDigit: paymentInfo.checkDigit,
      iuv13: paymentInfo.iuv13
    }
  } as RptIdFromString);

  expect(response.kind).toBe("IResponseSuccessJson");
});
