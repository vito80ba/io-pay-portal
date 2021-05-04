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

  it("should return IResponseErrorUnauthorized if response status is 401", async () => {
    const error: ErrorResponses = toErrorPagopaProxyResponse({
      headers: {},
      status: 401,
      value: {}
    });

    expect(error.kind).toBe("IResponseErrorUnauthorized");
  });

  it("should return IResponseErrorUnauthorized if response status is 403", async () => {
    const error: ErrorResponses = toErrorPagopaProxyResponse({
      headers: {},
      status: 403,
      value: {}
    });

    expect(error.kind).toBe("IResponseErrorForbiddenNotAuthorized");
  });

  it("should return ResponseErrorNotFound if response status is 404", async () => {
    const error: ErrorResponses = toErrorPagopaProxyResponse({
      headers: {},
      status: 404,
      value: {}
    });

    expect(error.kind).toBe("IResponseErrorNotFound");
  });

  it("should return ResponseErrorNotFound if response status is 429", async () => {
    const error: ErrorResponses = toErrorPagopaProxyResponse({
      headers: {},
      status: 429,
      value: {}
    });

    expect(error.kind).toBe("IResponseErrorTooManyRequests");
  });
});
