import {
  fromLeft,
  taskEither,
  TaskEither,
  tryCatch,
} from "fp-ts/lib/TaskEither";
import Tingle from "tingle.js";
import { Millisecond } from "italia-ts-commons/lib/units";
import { CodiceContestoPagamento } from "../generated/CodiceContestoPagamento";
import { ImportoEuroCents } from "../generated/ImportoEuroCents";
import { PaymentActivationsGetResponse } from "../generated/PaymentActivationsGetResponse";
import { PaymentActivationsPostResponse } from "../generated/PaymentActivationsPostResponse";
import { PaymentRequestsGetResponse } from "../generated/PaymentRequestsGetResponse";
import { RptId } from "../generated/RptId";
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
  rptId: RptId
): TaskEither<string, PaymentRequestsGetResponse> =>
  tryCatch(
    () =>
      apiClient.getPaymentInfo({
        rptId,
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
  amountSinglePayment: ImportoEuroCents,
  paymentContextCode: CodiceContestoPagamento,
  rptId: RptId
): TaskEither<string, PaymentActivationsPostResponse> =>
  tryCatch(
    () =>
      apiClient.activatePayment({
        body: {
          rptId,
          importoSingoloVersamento: amountSinglePayment,
          codiceContestoPagamento: paymentContextCode,
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
  paymentContextCode: CodiceContestoPagamento
): TaskEither<string, PaymentActivationsGetResponse> =>
  tryCatch(
    () =>
      apiClient.getActivationStatus({
        codiceContestoPagamento: paymentContextCode,
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
              getConfig("IO_PAY_PORTAL_PAY_WL_POLLING_INTERVAL") as Millisecond,
              paymentNoticeCode,
              --attempts // eslint-disable-line no-param-reassign
            )
          : showActivationError();
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
  const stateCard = document.getElementById("stateCard") || null;
  const initCard = document.getElementById("initCard") || null;
  const ec = document.getElementById("ec") || null;
  const causale = document.getElementById("causale") || null;
  const importo = document.getElementById("importo") || null;
  const cfpa = document.getElementById("cf-pa") || null;

  stateCard?.classList.remove("d-none");
  initCard?.classList.add("d-none");

  if (ec) {
    // eslint-disable-next-line functional/immutable-data
    ec.innerText = paymentInfo.enteBeneficiario?.denominazioneBeneficiario;
  }
  if (causale) {
    // eslint-disable-next-line functional/immutable-data
    causale.innerText = paymentInfo.causaleVersamento;
  }
  if (importo) {
    const prettifiedImporto =
      parseInt(paymentInfo.importoSingoloVersamento.toString(), 10) / 100;
    // eslint-disable-next-line functional/immutable-data
    importo.innerText = `€ ${Intl.NumberFormat("it-IT").format(
      prettifiedImporto
    )}`;
  }
  if (cfpa) {
    // eslint-disable-next-line functional/immutable-data
    cfpa.innerText =
      paymentInfo.enteBeneficiario?.identificativoUnivocoBeneficiario;
  }
};

export const showPaymentInfoError = () => {
  modalWindowWithText("Attenzione, i dati immessi non sono validi");
};

export const showActivationError = () => {
  modalWindowWithText(
    "Non riesco ad attivare il pagamento, per favore riprova"
  );
};

export const modalWindowWithText = (text: string = "") => {
  const modalTarget = document.getElementById("modal-error") || null;
  const modalTargetParagraph = modalTarget && modalTarget.querySelector("p");
  if (modalTargetParagraph) {
    // eslint-disable-next-line functional/immutable-data
    modalTargetParagraph.innerText = text;
  }
  const modalWindow = new Tingle.modal({
    closeLabel: "Close",
    footer: true,
    stickyFooter: false,
    closeMethods: ["overlay", "button", "escape"],
    onOpen: () => {
      const modalClose = modalWindow
        .getContent()
        .querySelector(".modalwindow__close");
      modalClose?.addEventListener("click", () => {
        modalWindow.close();
      });
    },
  });
  modalWindow.addFooterBtn(
    "Chiudi",
    "btn btn-outline-primary w-100",
    function () {
      modalWindow.close();
    }
  );
  modalWindow.setContent(modalTarget?.innerHTML || "");
  modalWindow.open();
};
