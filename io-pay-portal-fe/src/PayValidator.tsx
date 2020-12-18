import React from "react";
import DisplayValidationResponse from "./DisplayValidation";
import { apiClient } from "./api/client";
import { withApiRequestWrapper } from "./api/util";
import { ErrorResponses } from "./api/responses";
import { PaymentRequestsGetResponse } from "../generated/PaymentRequestsGetResponse";

import { TaskEither } from "fp-ts/lib/TaskEither";

const getPaymentInfoTask = (
  payment: string
): TaskEither<ErrorResponses, PaymentRequestsGetResponse> =>
  withApiRequestWrapper<any>(
    (): any =>
      apiClient.getPaymentInfo({
        rptId: payment,
      }),
    200
  );

const PayValidator: React.FC = () => {
  const [payment, setPayment] = React.useState<string>("");
  const [paymentStatus, setPaymentStatus] = React.useState<string>("");

  const validatePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getPaymentInfoTask(payment)
      .fold(
        (_) => setPaymentStatus("Pagamento non valido"),
        (myPayment) =>
          setPaymentStatus(myPayment.importoSingoloVersamento.toString())
      )
      .run();
  };

  return (
    <div>
      <form onSubmit={validatePayment}>
        <legend></legend>
        <fieldset>
          <label>Codice Pagamento: </label>
          <input
            type="text"
            value={payment}
            required
            onChange={(e) => setPayment(e.target.value)}
          />
          <button>Verifica</button>
        </fieldset>
      </form>
      {paymentStatus && (
        <DisplayValidationResponse
          status={paymentStatus}
        />
      )}
    </div>
  );
};

export default PayValidator;
