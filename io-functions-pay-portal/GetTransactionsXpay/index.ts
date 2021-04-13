import * as express from "express";
import * as winston from "winston";

import { Context } from "@azure/functions";

import { fromNullable } from "fp-ts/lib/Option";
import { secureExpressApp } from "io-functions-commons/dist/src/utils/express";
import { AzureContextTransport } from "io-functions-commons/dist/src/utils/logging";
import { setAppContext } from "io-functions-commons/dist/src/utils/middlewares/context_middleware";
import createAzureFunctionHandler from "io-functions-express/dist/src/createAzureFunctionsHandler";
import { getConfigOrThrow } from "../utils/config";

const config = getConfigOrThrow();

// tslint:disable-next-line: no-let
let logger: Context["log"] | undefined;
const contextTransport = new AzureContextTransport(() => logger, {
  level: "debug"
});
winston.add(contextTransport);

const xpayRedirectPage =
  '<head><meta http-equiv="refresh" content="0; URL=IO_PAY_XPAY_REDIRECT"></head>';

// Setup Express
const app = express();

secureExpressApp(app);

// Add express route
app.get("/api/v1/transactions/xpay/:id", (req, res) => {
  res.set("Content-Type", "text/html");
  return res.send(
    xpayRedirectPage
      .replace("IO_PAY_XPAY_REDIRECT", config.IO_PAY_XPAY_REDIRECT)
      .replace("_id_", req.params.id)
      .replace("_esito_", fromNullable(req.query.esito).getOrElse("") as string)
      .replace(
        "_idOperazione_",
        fromNullable(req.query.idOperazione).getOrElse("") as string
      )
      .replace(
        "_timeStamp_",
        fromNullable(req.query.timeStamp).getOrElse("") as string
      )
      .replace("_mac_", fromNullable(req.query.mac).getOrElse("") as string)
      .replace(
        "_xpayNonce_",
        fromNullable(req.query.xpayNonce).getOrElse("") as string
      )
      .replace(
        "_outcome_",
        fromNullable(req.query.outcome).getOrElse("") as string
      )
      .replace(
        "_codice_",
        fromNullable(req.query.codice).getOrElse("") as string
      )
      .replace(
        "_messaggio_",
        fromNullable(req.query.messaggio).getOrElse("") as string
      )
      .replace("_resumeType_", "xpay")
  );
});

const azureFunctionHandler = createAzureFunctionHandler(app);

// Binds the express app to an Azure Function handler
function httpStart(context: Context): void {
  logger = context.log;
  setAppContext(app, context);
  azureFunctionHandler(context);
}

export default httpStart;
