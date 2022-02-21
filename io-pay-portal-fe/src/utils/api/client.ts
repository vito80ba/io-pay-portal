import { agent } from "italia-ts-commons";
import {
  AbortableFetch,
  setFetchTimeout,
  toFetch,
} from "italia-ts-commons/lib/fetch";
import { Millisecond } from "italia-ts-commons/lib/units";
import { createClient } from "../../../generated/definitions/payment-transactions-api/client";
import { getConfig } from "../config/config";

// Must be an https endpoint so we use an https agent
const abortableFetch = AbortableFetch(agent.getHttpFetch(process.env));
const fetchWithTimeout = toFetch(
  setFetchTimeout(
    getConfig("IO_PAY_PORTAL_API_REQUEST_TIMEOUT") as Millisecond,
    abortableFetch
  )
);
// tslint:disable-next-line: no-any
const fetchApi: typeof fetchWithTimeout = (fetch as any) as typeof fetchWithTimeout;

export const apiClient = createClient({
  baseUrl: getConfig("IO_PAY_PORTAL_API_HOST") as string,
  basePath: "/checkout/payments/v1",
  fetchApi,
});

export type APIClient = typeof apiClient;
