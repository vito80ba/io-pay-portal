const Bundler = require('parcel-bundler');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();

app.use(createProxyMiddleware('/api/payportal/v1', {
  target: 'http://localhost:80',
  pathRewrite: {
    '^/api/payportal/v1': '/api/v1',
  },
}));

const bundler = new Bundler('src/index.html');
app.use(bundler.middleware());

app.listen(Number(1234));