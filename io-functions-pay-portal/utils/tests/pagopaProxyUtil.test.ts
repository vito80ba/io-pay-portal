import { toErrorPagopaProxyResponse } from "../pagopaProxyUtil";
import { ErrorResponses } from "../responses";

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe("pagopaProxyUtil", () => {
  it("should return IResponseErrorValidation if detail exists in error response", async () => {
    const error: ErrorResponses = toErrorPagopaProxyResponse({
      headers: {},
      status: 500,
      value: { detail: "PAYMENT_DUPLICATED" }
    });

    expect(error.kind).toBe("IResponseErrorValidation");
  });

  it("should return IResponseErrorValidation if detail exists in error response", async () => {
    const error: ErrorResponses = toErrorPagopaProxyResponse({
      headers: {},
      status: 500,
      value: {}
    });

    expect(error.kind).toBe("IResponseErrorInternal");
  });
});
