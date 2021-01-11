import { fromNullable } from "fp-ts/lib/Option";
import {
  fromLeft,
  taskEither,
  TaskEither,
  tryCatch,
} from "fp-ts/lib/TaskEither";
import { default as $ } from "jquery";
import { PaymentRequestsGetResponse } from "../generated/PaymentRequestsGetResponse";
import { apiClient } from "./api/client";

export const PayDetail: ReadonlyArray<string> = [
  "importoSingoloVersamento",
  "codiceContestoPagamento",
  "ibanAccredito",
  "causaleVersamento",
  "enteBeneficiario",
  "spezzoniCausaleVersamento",
];

export const getPaymentInfoTask = (
  organizationId: string,
  paymentNoticeCode: string
): TaskEither<string, PaymentRequestsGetResponse> =>
  tryCatch(
    () =>
      apiClient.getPaymentInfo({
        rptId: `${organizationId}${paymentNoticeCode}`,
      }),
    () => "Errore recupero pagamento"
  ).foldTaskEither(
    (err) => fromLeft(err),
    (errorOrResponse) =>
      errorOrResponse.fold(
        () => fromLeft("Errore recupero pagamento"),
        (responseType) =>
          responseType.status !== 200
            ? fromLeft(`Errore recupero pagamento : ${responseType.status}`)
            : taskEither.of(responseType.value)
      )
  );

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

export const showPaymentInfoError = (errorMessage: string) => {
  $("#error").text(
    fromNullable(errorMessage).getOrElse("Errore Validazione Pagamento")
  );
};
