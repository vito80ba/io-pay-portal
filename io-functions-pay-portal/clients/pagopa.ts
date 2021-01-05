import { agent } from "italia-ts-commons";
import {
  AbortableFetch,
  setFetchTimeout,
  toFetch
} from "italia-ts-commons/lib/fetch";
import { Millisecond } from "italia-ts-commons/lib/units";
import nodeFetch from "node-fetch";
import { createClient } from "../generated/pagopa-proxy/client";

import { getConfigOrThrow } from "../utils/config";

export const config = getConfigOrThrow();

export const prodBaseUrl = config.IO_PAGOPA_PROXY_PROD_BASE_URL;
export const testBaseUrl = config.IO_PAGOPA_PROXY_PROD_BASE_URL;
export const basePath = config.PAGOPA_BASE_PATH;
export const proxyToken = config.IO_PAGOPA_PROXY_API_TOKEN;


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
  baseUrl: prodBaseUrl,
  // basePath : basePath,
  basePath : "",
  fetchApi
});

export type IApiClient = typeof apiClient;

