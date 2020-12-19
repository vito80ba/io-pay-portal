const Bundler = require('parcel-bundler');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();

app.use(createProxyMiddleware('/api', {
  target: 'http://localhost:80'
}));

const bundler = new Bundler('index.html');
app.use(bundler.middleware());

app.listen(Number(1234));