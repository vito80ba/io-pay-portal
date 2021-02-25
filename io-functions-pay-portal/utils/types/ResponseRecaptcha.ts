import * as t from "io-ts";

const ResponseR = t.interface({
  success: t.boolean,

  challenge_ts: t.string,

  hostname: t.string
});

const ResponseO = t.partial({
  "error-codes": t.readonlyArray(t.string, "array of string")
});

export const ResponseRecaptcha = t.intersection(
  [ResponseR, ResponseO],
  "ResponseRecaptcha"
);

export type ResponseRecaptcha = t.TypeOf<typeof ResponseRecaptcha>;
