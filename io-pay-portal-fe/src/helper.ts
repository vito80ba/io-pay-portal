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

export const showPaymentInfo = (paymentInfo: PaymentRequestsGetResponse) => {
  $("#stateCard").show();
  $("#initCard").hide();

  $("#destinatario")
    .text("")
    .append(paymentInfo.enteBeneficiario?.denominazioneBeneficiario);
  $("#causale").text("").append(paymentInfo.causaleVersamento);
  $("#importo")
    .text("")
    .append(paymentInfo.importoSingoloVersamento.toString());
  $("#cf-pa")
    .text("")
    .append(paymentInfo.enteBeneficiario?.identificativoUnivocoBeneficiario);
};

export const showPaymentInfoError = (errorMessage: string) => {
  $("#error")
    .show()
    .text(fromNullable(errorMessage).getOrElse("Errore Validazione Pagamento"));
};
