import { default as $ } from "jquery";
import { PaymentRequestsGetResponse } from "../generated/PaymentRequestsGetResponse";

export const PayDetail: ReadonlyArray<string> = [
  "importoSingoloVersamento",
  "codiceContestoPagamento",
  "ibanAccredito",
  "causaleVersamento",
  "enteBeneficiario",
  "spezzoniCausaleVersamento",
];

export const showPaymentInfo = (
  rtdId: string,
  paymentInfo: PaymentRequestsGetResponse
) => {
  $("#stateCard").show();
  $("#initCard").hide();
  $("#payStateHeader").text("Informazioni pagamento " + rtdId);
  $("#payState")
    .text("")
    .append(
      PayDetail.reduce(
        (stateKeys, key) =>
          // eslint-disable-next-line no-param-reassign
          (stateKeys += `<li class="list-group-item">
          ${key} : <strong>${Object(paymentInfo)[key]}</strong></li>`),
        ""
      )
    );
};

export const showPaymentInfoError = () => {
  $("#error").text("Errore Validazione Pagamento");
};
