import { Context } from "@azure/functions";

// tslint:disable-next-line: no-object-mutation
process.env = {
  IO_PAGOPA_PROXY_PROD_BASE_URL: "http://localhost:7071/api/v1",
  IO_PAGOPA_PROXY_TEST_BASE_URL: "http://localhost:7071/api/v1",
  IO_PAY_CHALLENGE_RESUME_URL:
    "http://localhost:1234/response.html?id=idTransaction",

  PAGOPA_BASE_PATH: "NonEmptyString",

  MAILUP_ALLOWED_GROUPS: "6,123",
  MAILUP_CLIENT_ID: "26XXXXXXXXXXXXXXXXXXXXXXXe",
  MAILUP_PASSWORD: "XXXXXXX",
  MAILUP_SECRET: "f638dexxxxxxxxxxxx8812480",
  MAILUP_USERNAME: "mXXXXXX",

  RECAPTCHA_SECRET: "6dddddd0P7N0dddddTdd"
};

import * as handlers from "../handler";

import { RecipientRequest } from "../../generated/definitions/RecipientRequest";

import { NonEmptyString } from "italia-ts-commons/lib/strings";

import { fromLeft, taskEither } from "fp-ts/lib/TaskEither";

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

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

const email = "test.test@test.it";
const recaptchaToken = "03AGsdB8g-4s9SKbbg";
const idNewRecipient = 123;
const groupId = "6";

describe("PostNewslettersRecipientHandler", () => {
  it("should return IResponseSuccessJson if the mail and recaptcha token are valid", async () => {
    jest.spyOn(handlers, "recaptchaCheckTask").mockReturnValueOnce(
      taskEither.of({
        challenge_ts: "challenge_ts",
        hostname: "hostname",
        success: true
      } as any)
    );

    jest.spyOn(handlers, "getMailupAuthTokenTask").mockReturnValueOnce(
      taskEither.of({
        access_token: "036AGdBq77634556uB8g-4s9SKbbg",
        expires_in: 3600,
        refresh_token: "03AGdBsd6ZV2qIuB8g-4s9SKbbg"
      } as any)
    );

    jest
      .spyOn(handlers, "addRecipientToMailupListTask")
      .mockReturnValueOnce(taskEither.of(idNewRecipient));

    const handler = handlers.PostNewslettersRecipientsHandler();

    const response = await handler(
      context,
      groupId as NonEmptyString,
      {
        email,
        recaptchaToken
      } as RecipientRequest
    );

    expect(response.kind).toBe("IResponseSuccessJson");
  });

  it("should return IResponseErrorInternal if retrieval token mailup fails", async () => {
    jest.spyOn(handlers, "recaptchaCheckTask").mockReturnValueOnce(
      taskEither.of({
        challenge_ts: "challenge_ts",
        hostname: "hostname",
        success: true
      })
    );

    jest
      .spyOn(handlers, "getMailupAuthTokenTask")
      .mockReturnValueOnce(fromLeft(Error()));

    const handler = handlers.PostNewslettersRecipientsHandler();

    const response = await handler(
      context,
      groupId as NonEmptyString,
      {
        email,
        recaptchaToken
      } as RecipientRequest
    );

    expect(response.kind).toBe("IResponseErrorInternal");
  });

  it("should return IResponseErrorInternal if recaptchaCheck fails", async () => {
    jest.spyOn(handlers, "recaptchaCheckTask").mockReturnValueOnce(
      taskEither.of({
        challenge_ts: "challenge_ts",
        hostname: "hostname",
        success: true
      } as any)
    );

    jest
      .spyOn(handlers, "recaptchaCheckTask")
      .mockReturnValueOnce(fromLeft(Error()));

    const handler = handlers.PostNewslettersRecipientsHandler();

    const response = await handler(
      context,
      groupId as NonEmptyString,
      {
        email,
        recaptchaToken
      } as RecipientRequest
    );

    expect(response.kind).toBe("IResponseErrorInternal");
  });

  it("should return IResponseErrorInternal if adding receiver to mailup fails", async () => {
    jest.spyOn(handlers, "recaptchaCheckTask").mockReturnValueOnce(
      taskEither.of({
        challenge_ts: "challenge_ts",
        hostname: "hostname",
        success: true
      } as any)
    );

    jest.spyOn(handlers, "getMailupAuthTokenTask").mockReturnValueOnce(
      taskEither.of({
        access_token: "036AGdBq77634556uB8g-4s9SKbbg",
        expires_in: 3600,
        refresh_token: "03AGdBsd6ZV2qIuB8g-4s9SKbbg"
      } as any)
    );

    jest
      .spyOn(handlers, "addRecipientToMailupListTask")
      .mockReturnValueOnce(fromLeft(Error()));

    const handler = handlers.PostNewslettersRecipientsHandler();

    const response = await handler(
      context,
      groupId as NonEmptyString,
      {
        email,
        recaptchaToken
      } as RecipientRequest
    );

    expect(response.kind).toBe("IResponseErrorInternal");
  });

  it("should return IResponseErrorForbiddenNotAuthorized if groupId is unauthorized", async () => {

    const handler = handlers.PostNewslettersRecipientsHandler();

    const response = await handler(
      context,
      "23445" as NonEmptyString,
      {
        email,
        recaptchaToken
      } as RecipientRequest
    );

    expect(response.kind).toBe("IResponseErrorForbiddenNotAuthorized");
  });
});
