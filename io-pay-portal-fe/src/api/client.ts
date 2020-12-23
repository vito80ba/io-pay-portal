import { agent } from "italia-ts-commons";
import {
  AbortableFetch,
  setFetchTimeout,
  toFetch,
} from "italia-ts-commons/lib/fetch";
import { Millisecond } from "italia-ts-commons/lib/units";
import nodeFetch from "node-fetch";
import { createClient } from "../../generated/client";

import { getConfig } from "../util/config";

// 5 seconds timeout by default
const DEFAULT_REQUEST_TIMEOUT_MS = 10000;

// Must be an https endpoint so we use an https agent
const abortableFetch = AbortableFetch(agent.getHttpFetch(process.env));
const fetchWithTimeout = toFetch(
  setFetchTimeout(DEFAULT_REQUEST_TIMEOUT_MS as Millisecond, abortableFetch)
);
// tslint:disable-next-line: no-any
const fetchApi: typeof fetchWithTimeout = (nodeFetch as any) as typeof fetchWithTimeout;

export const apiClient = createClient({
  baseUrl: getConfig("IO_PAY_PORTAL_FUNCTION"),
  basePath: "/payportal",
  fetchApi,
});

export type APIClient = typeof apiClient;
