/**
 * Development server built as an express application,
 * able to run frontend (thanks to parcel-bundler) and an API server proxy (thanks to http-proxy-middleware)
 * on localhost:1234, in order to you don't have to deal with CORS.
 *
 * Note: to run the development server must be set IO_PAY_PORTAL_API_HOST=http://localhost:1234
 * and apiHost with the host api (for example http://localhost:80).
 */

const Bundler = require("parcel-bundler");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const apiHost = "http://localhost:80";

app.use(
  createProxyMiddleware("/api/payportal/v1", {
    target: apiHost,
    pathRewrite: {
      "^/api/payportal/v1": "/api/v1",
    },
  })
);

const bundler = new Bundler("src/index.html");
app.use(bundler.middleware());

app.listen(Number(1234));
