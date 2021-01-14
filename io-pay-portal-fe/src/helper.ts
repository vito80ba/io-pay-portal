import { fromNullable } from "fp-ts/lib/Option";
import {
  fromLeft,
  taskEither,
  TaskEither,
  tryCatch,
} from "fp-ts/lib/TaskEither";
import { default as $ } from "jquery";
import { CodiceContestoPagamento } from "../generated/CodiceContestoPagamento";
import { EnteBeneficiario } from "../generated/EnteBeneficiario";
import { ImportoEuroCents } from "../generated/ImportoEuroCents";
import { PaymentActivationsGetResponse } from "../generated/PaymentActivationsGetResponse";
import { PaymentActivationsPostResponse } from "../generated/PaymentActivationsPostResponse";
import { PaymentRequestsGetResponse } from "../generated/PaymentRequestsGetResponse";
import { apiClient } from "./api/client";
import { getConfig } from "./util/config";

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

export const activePaymentTask = (
  organizationId: EnteBeneficiario,
  amountSinglePayment: ImportoEuroCents,
  paymentNoticeCode: CodiceContestoPagamento
): TaskEither<string, PaymentActivationsPostResponse> =>
  tryCatch(
    () =>
      apiClient.activatePayment({
        body: {
          rptId: `${organizationId}${paymentNoticeCode}`,
          importoSingoloVersamento: amountSinglePayment,
          codiceContestoPagamento: paymentNoticeCode,
        },
      }),
    () => "Errore attivazione pagamento"
  ).foldTaskEither(
    (err) => fromLeft(err),
    (errorOrResponse) =>
      errorOrResponse.fold(
        () => fromLeft("Errore attivazione pagamento"),
        (responseType) =>
          responseType.status !== 200
            ? fromLeft(`Errore attivazione pagamento : ${responseType.status}`)
            : taskEither.of(responseType.value)
      )
  );

export const getActivationStatusTask = (
  paymentNoticeCode: CodiceContestoPagamento
): TaskEither<string, PaymentActivationsGetResponse> =>
  tryCatch(
    () =>
      apiClient.getActivationStatus({
        codiceContestoPagamento: paymentNoticeCode,
      }),
    () => "Errore stato pagamento"
  ).foldTaskEither(
    (err) => fromLeft(err),
    (errorOrResponse) =>
      errorOrResponse.fold(
        () => fromLeft("Errore stato pagamento"),
        (responseType) =>
          responseType.status !== 200
            ? fromLeft(`Errore stato pagamento : ${responseType.status}`)
            : taskEither.of(responseType.value)
      )
  );

export const pollingActivationStatus = async (
  paymentNoticeCode: CodiceContestoPagamento,
  attempts: number
): Promise<void> => {
  await getActivationStatusTask(paymentNoticeCode)
    .fold(
      () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        attempts > 0
          ? setTimeout(
              pollingActivationStatus,
              5000,
              paymentNoticeCode,
              --attempts // eslint-disable-line no-param-reassign
            )
          : showActivationError("Errore Attivazione Pagamento");
      },
      (acivationResponse) =>
        // eslint-disable-next-line functional/immutable-data
        (location.href = `${
          getConfig("IO_PAY_PORTAL_PAY_WL_HOST") as string
        }/index.html?p=${acivationResponse.idPagamento}`)
    )
    .run();
};

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

export const showActivationError = (errorMessage: string) => {
  $("#activationError")
    .show()
    .text(fromNullable(errorMessage).getOrElse("Errore Attivazione Pagamento"));
};
