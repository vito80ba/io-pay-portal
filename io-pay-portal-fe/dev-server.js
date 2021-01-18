/**
 * Development server built as an express application,
 * able to run frontend (thanks to parcel-bundler) and an API server with json response example.
 *
 * Note: to run the development server must be set IO_PAY_PORTAL_API_HOST=http://localhost:1234
 */

const Bundler = require("parcel-bundler");
const express = require("express");

const app = express();

app.get("/api/payportal/v1/payment-requests/:rptId", (_, res) => {
  res.send({
    importoSingoloVersamento: 1100,
    codiceContestoPagamento: "6f69d150541e11ebb70c7b05c53756dd",
    ibanAccredito: "IT21Q0760101600000000546200",
    causaleVersamento: "Retta asilo [demo]",
    enteBeneficiario: {
      identificativoUnivocoBeneficiario: "01199250158",
      denominazioneBeneficiario: "Comune di Milano",
    },
  });
});

app.post("/api/payportal/v1/payment-activations", (_, res) => {
  res.send({
    codiceContestoPagamento: "6f69d150541e11ebb70c7b05c53756dd",
    ibanAccredito: "IT21Q0760101600000000546200",
    causaleVersamento: "Retta asilo [demo]",
    enteBeneficiario: {
      identificativoUnivocoBeneficiario: "01199250158",
      denominazioneBeneficiario: "Comune di Milano",
    },
    importoSingoloVersamento: 1100,
  });
});

app.get(
  "/api/payportal/v1/payment-activations/:codiceContestoPagamento",
  (_, res) => {
    res.send({
      idPagamento: "123455",
    });
  }
);

const bundler = new Bundler("src/index.html");
app.use(bundler.middleware());

app.listen(Number(1234));
