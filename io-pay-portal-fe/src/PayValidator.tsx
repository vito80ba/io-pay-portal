import React from "react";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { PaymentRequestsGetResponse } from "../generated/PaymentRequestsGetResponse";
import { apiClient } from "./api/client";
import { withApiRequestWrapper } from "./api/util";
import { ErrorResponses } from "./api/responses";

const getPaymentInfoTask = (
  rptIdInput: string
): TaskEither<ErrorResponses, PaymentRequestsGetResponse> =>
  withApiRequestWrapper<PaymentRequestsGetResponse>(
    (): any =>
      apiClient.getPaymentInfo({
        rptId: rptIdInput,
      }),
    200
  );

const PayValidator: React.FC = () => {
  const [rptIdInput, setRptIdInput] = React.useState<string>("");
  const [paymentStatus, setPaymentStatus] = React.useState<boolean>();
  const [
    paymentRequestsGetResponse,
    setPaymentRequestsGetResponse,
  ] = React.useState<PaymentRequestsGetResponse>();

  const validatePayment = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    getPaymentInfoTask(rptIdInput)
      .fold(
        (_) => setPaymentStatus(false),
        (response) => {
          setPaymentStatus(true);
          setPaymentRequestsGetResponse(response);
        }
      )
      .run();
  };

  return (
    <div>
      <form onSubmit={validatePayment}>
        <div>
          <label>Codice Pagamento: </label>
          <input
            type="text"
            value={rptIdInput}
            required
            onChange={(e) => setRptIdInput(e.target.value)}
          />
          <button>Verifica</button>
        </div>
      </form>
      <div>
        <p className="validation">
          {paymentStatus === true && paymentRequestsGetResponse
            ? JSON.stringify(paymentRequestsGetResponse)
            : paymentStatus === false
            ? "Codice pagamento non valido!"
            : null}
        </p>
      </div>
    </div>
  );
};

export default PayValidator;
