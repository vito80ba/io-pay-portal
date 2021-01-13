/* tslint:disable: no-any */

import { Context } from "@azure/functions";
import { right } from "fp-ts/lib/Either";
import { PaymentActivationsPostRequest } from "../../generated/pagopa-proxy/PaymentActivationsPostRequest";
import { ActivatePaymentHandler } from "../handler";

export const context = ({
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

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

const validPaymentActivationsRequest = {
  codiceContestoPagamento: "6f69d150541e11ebb70c7b05c53756dd",
  importoSingoloVersamento: 1100,
  rptId: "01199250158002720356519484501"
} as PaymentActivationsPostRequest;

const invalidPaymentActivationsRequest = {
  importoSingoloVersamento: 1100
} as PaymentActivationsPostRequest;

it("should return a PaymentActivationsPostResponse if the activation is successful", async () => {
  const apiClientMock = {
    activatePayment: jest.fn(_ => {
      return Promise.resolve(
        right({
          status: 200,
          value: {
            causaleVersamento: "Retta asilo [demo]",
            codiceContestoPagamento: "6f69d150541e11ebb70c7b05c53756dd",
            enteBeneficiario: {
              denominazioneBeneficiario: "Comune di Milano",
              identificativoUnivocoBeneficiario: "01199250158"
            },
            ibanAccredito: "IT21Q0760101600000000546200",
            importoSingoloVersamento: 1100
          }
        })
      );
    })
  };

  const handler = ActivatePaymentHandler(apiClientMock as any);

  const response = await handler(context, validPaymentActivationsRequest);

  expect(response.kind).toBe("IResponseSuccessJson");
});

it("should return a PaymentActivationsPostResponse if the activation is successful", async () => {
  const apiClientMock = {
    activatePayment: jest.fn(_ => {
      return Promise.resolve(
        right({
          status: 500
        })
      );
    })
  };

  const handler = ActivatePaymentHandler(apiClientMock as any);

  const response = await handler(context, invalidPaymentActivationsRequest);

  expect(response.kind).toBe("IResponseErrorInternal");
});
