import * as t from "io-ts";
import { NonEmptyString } from "italia-ts-commons/lib/strings";

const AuthTokenR = t.partial({});

const AuthTokenO = t.interface({
  access_token: NonEmptyString,

  expires_in: t.number,

  refresh_token: t.string
});

export const AuthTokenMailup = t.intersection(
  [AuthTokenR, AuthTokenO],
  "AuthTokenMailup"
);

export type AuthTokenMailup = t.TypeOf<typeof AuthTokenMailup>;
