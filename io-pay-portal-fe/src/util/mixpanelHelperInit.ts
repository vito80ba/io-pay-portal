import * as t from "io-ts";
import { init, track } from "mixpanel-browser";
export const PAYMENT_VERIFY_INIT = t.literal("PAYMENT_VERIFY_INIT");
export type PAYMENT_VERIFY_INIT = t.TypeOf<typeof PAYMENT_VERIFY_INIT>;
export const PAYMENT_VERIFY_NET_ERR = t.literal("PAYMENT_VERIFY_NET_ERR");
export type PAYMENT_VERIFY_NET_ERR = t.TypeOf<typeof PAYMENT_VERIFY_NET_ERR>;
export const PAYMENT_VERIFY_SVR_ERR = t.literal("PAYMENT_VERIFY_SVR_ERR");
export type PAYMENT_VERIFY_SVR_ERR = t.TypeOf<typeof PAYMENT_VERIFY_SVR_ERR>;
export const PAYMENT_VERIFY_RESP_ERR = t.literal("PAYMENT_VERIFY_RESP_ERR");
export type PAYMENT_VERIFY_RESP_ERR = t.TypeOf<typeof PAYMENT_VERIFY_RESP_ERR>;
export const PAYMENT_VERIFY_SUCCESS = t.literal("PAYMENT_VERIFY_SUCCESS");
export type PAYMENT_VERIFY_SUCCESS = t.TypeOf<typeof PAYMENT_VERIFY_SUCCESS>;

export const PAYMENT_ACTIVATE_INIT = t.literal("PAYMENT_ACTIVATE_INIT");
export type PAYMENT_ACTIVATE_INIT = t.TypeOf<typeof PAYMENT_ACTIVATE_INIT>;
export const PAYMENT_ACTIVATE_NET_ERR = t.literal("PAYMENT_ACTIVATE_NET_ERR");
export type PAYMENT_ACTIVATE_NET_ERR = t.TypeOf<
  typeof PAYMENT_ACTIVATE_NET_ERR
>;
export const PAYMENT_ACTIVATE_SVR_ERR = t.literal("PAYMENT_ACTIVATE_SVR_ERR");
export type PAYMENT_ACTIVATE_SVR_ERR = t.TypeOf<
  typeof PAYMENT_ACTIVATE_SVR_ERR
>;
export const PAYMENT_ACTIVATE_RESP_ERR = t.literal("PAYMENT_ACTIVATE_RESP_ERR");
export type PAYMENT_ACTIVATE_RESP_ERR = t.TypeOf<
  typeof PAYMENT_ACTIVATE_RESP_ERR
>;
export const PAYMENT_ACTIVATE_SUCCESS = t.literal("PAYMENT_ACTIVATE_SUCCESS");
export type PAYMENT_ACTIVATE_SUCCESS = t.TypeOf<
  typeof PAYMENT_ACTIVATE_SUCCESS
>;

export const PAYMENT_ACTIVATION_STATUS_INIT = t.literal(
  "PAYMENT_ACTIVATION_STATUS_INIT"
);
export type PAYMENT_ACTIVATION_STATUS_INIT = t.TypeOf<
  typeof PAYMENT_ACTIVATION_STATUS_INIT
>;
export const PAYMENT_ACTIVATION_STATUS_NET_ERR = t.literal(
  "PAYMENT_ACTIVATION_STATUS_NET_ERR"
);
export type PAYMENT_ACTIVATION_STATUS_NET_ERR = t.TypeOf<
  typeof PAYMENT_ACTIVATION_STATUS_NET_ERR
>;
export const PAYMENT_ACTIVATION_STATUS_SVR_ERR = t.literal(
  "PAYMENT_ACTIVATION_STATUS_SVR_ERR"
);
export type PAYMENT_ACTIVATION_STATUS_SVR_ERR = t.TypeOf<
  typeof PAYMENT_ACTIVATION_STATUS_SVR_ERR
>;
export const PAYMENT_ACTIVATION_STATUS_RESP_ERR = t.literal(
  "PAYMENT_ACTIVATION_STATUS_RESP_ERR"
);
export type PAYMENT_ACTIVATION_STATUS_RESP_ERR = t.TypeOf<
  typeof PAYMENT_ACTIVATION_STATUS_RESP_ERR
>;
export const PAYMENT_ACTIVATION_STATUS_SUCCESS = t.literal(
  "PAYMENT_ACTIVATION_STATUS_SUCCESS"
);
export type PAYMENT_ACTIVATION_STATUS_SUCCESS = t.TypeOf<
  typeof PAYMENT_ACTIVATION_STATUS_SUCCESS
>;

// ini MIX TODO: enable on deploy
if (process.env.IO_PAY_PORTAL_ENV === "develop") {
  // eslint-disable-next-line no-console
  console.log(
    `Mixpanel events mock on console log. See IO_PAY_PORTAL_ENV=${process.env.IO_PAY_PORTAL_ENV}`
  );
} else {
  init("c3db8f517102d7a7ebd670c9da3e05c4", {
    api_host: "https://api-eu.mixpanel.com",
    cross_site_cookie: true,
    persistence: "localStorage",
  });
}

export const mixpanel = {
  track(event_name: string, properties?: any): void {
    if (process.env.IO_PAY_PORTAL_ENV === "develop") {
      // eslint-disable-next-line no-console
      console.log(event_name, properties);
    } else {
      track(event_name, properties);
    }
  },
};
