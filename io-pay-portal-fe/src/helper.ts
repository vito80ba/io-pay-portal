import {
  fromLeft,
  taskEither,
  TaskEither,
  tryCatch,
} from "fp-ts/lib/TaskEither";
import { fromNullable } from "fp-ts/lib/Option";
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
import {
  mixpanel,
  PAYMENT_ACTIVATE_INIT,
  PAYMENT_ACTIVATE_NET_ERR,
  PAYMENT_ACTIVATE_RESP_ERR,
  PAYMENT_ACTIVATE_SUCCESS,
  PAYMENT_ACTIVATE_SVR_ERR,
  PAYMENT_ACTIVATION_STATUS_INIT,
  PAYMENT_ACTIVATION_STATUS_NET_ERR,
  PAYMENT_ACTIVATION_STATUS_RESP_ERR,
  PAYMENT_ACTIVATION_STATUS_SUCCESS,
  PAYMENT_ACTIVATION_STATUS_SVR_ERR,
  PAYMENT_VERIFY_INIT,
  PAYMENT_VERIFY_NET_ERR,
  PAYMENT_VERIFY_RESP_ERR,
  PAYMENT_VERIFY_SUCCESS,
  PAYMENT_VERIFY_SVR_ERR,
} from "./util/mixpanelHelperInit";

export enum PaymentFaultEnum {
  "PAYMENT_DUPLICATED" = "PAGAMENTO DUPLICATO",
  "INVALID_AMOUNT" = "IMPORTO INVALIDO",
  "PAYMENT_ONGOING" = "PAGAMENTO GIA' CORSO",
  "PAYMENT_EXPIRED" = "SESSIONE PAGAMENTO SCADUTA",
  "PAYMENT_UNAVAILABLE" = "PAGAMENTO NON DISPONIBILE",
  "PAYMENT_UNKNOWN" = "PAGAMENTO SCONOSCIUTO",
}

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
    () => {
      mixpanel.track(PAYMENT_VERIFY_INIT.value, {
        EVENT_ID: PAYMENT_VERIFY_INIT.value,
      });
      return apiClient.getPaymentInfo({
        rptId,
      });
    },
    () => {
      mixpanel.track(PAYMENT_VERIFY_NET_ERR.value, {
        EVENT_ID: PAYMENT_VERIFY_NET_ERR.value,
      });
      return "Errore recupero pagamento";
    }
  ).foldTaskEither(
    (err) => {
      mixpanel.track(PAYMENT_VERIFY_SVR_ERR.value, {
        EVENT_ID: PAYMENT_VERIFY_SVR_ERR.value,
      });
      return fromLeft(err);
    },
    (errorOrResponse) =>
      errorOrResponse.fold(
        () => fromLeft("Errore recupero pagamento"),
        (responseType) => {
          if (responseType.status === 200) {
            mixpanel.track(PAYMENT_VERIFY_SUCCESS.value, {
              EVENT_ID: PAYMENT_VERIFY_SUCCESS.value,
            });
          } else {
            mixpanel.track(PAYMENT_VERIFY_RESP_ERR.value, {
              EVENT_ID: PAYMENT_VERIFY_RESP_ERR.value,
            });
          }
          return responseType.status !== 200
            ? fromLeft(
                fromNullable(responseType.value?.detail).getOrElse(
                  "Errore recupero pagamento"
                )
              )
            : taskEither.of(responseType.value);
        }
      )
  );

export const activePaymentTask = (
  amountSinglePayment: ImportoEuroCents,
  paymentContextCode: CodiceContestoPagamento,
  rptId: RptId
): TaskEither<string, PaymentActivationsPostResponse> =>
  tryCatch(
    () => {
      mixpanel.track(PAYMENT_ACTIVATE_INIT.value, {
        EVENT_ID: PAYMENT_ACTIVATE_INIT.value,
      });
      return apiClient.activatePayment({
        body: {
          rptId,
          importoSingoloVersamento: amountSinglePayment,
          codiceContestoPagamento: paymentContextCode,
        },
      });
    },
    () => {
      mixpanel.track(PAYMENT_ACTIVATE_NET_ERR.value, {
        EVENT_ID: PAYMENT_ACTIVATE_NET_ERR.value,
      });
      return "Errore attivazione pagamento";
    }
  ).foldTaskEither(
    (err) => {
      mixpanel.track(PAYMENT_ACTIVATE_SVR_ERR.value, {
        EVENT_ID: PAYMENT_ACTIVATE_SVR_ERR.value,
      });
      return fromLeft(err);
    },
    (errorOrResponse) =>
      errorOrResponse.fold(
        () => fromLeft("Errore attivazione pagamento"),
        (responseType) => {
          if (responseType.status === 200) {
            mixpanel.track(PAYMENT_ACTIVATE_SUCCESS.value, {
              EVENT_ID: PAYMENT_ACTIVATE_SUCCESS.value,
            });
          } else {
            mixpanel.track(PAYMENT_ACTIVATE_RESP_ERR.value, {
              EVENT_ID: PAYMENT_ACTIVATE_RESP_ERR.value,
            });
          }
          return responseType.status !== 200
            ? fromLeft(`Errore attivazione pagamento : ${responseType.status}`)
            : taskEither.of(responseType.value);
        }
      )
  );

export const getActivationStatusTask = (
  paymentContextCode: CodiceContestoPagamento
): TaskEither<string, PaymentActivationsGetResponse> =>
  tryCatch(
    () => {
      mixpanel.track(PAYMENT_ACTIVATION_STATUS_INIT.value, {
        EVENT_ID: PAYMENT_ACTIVATION_STATUS_INIT.value,
      });
      return apiClient.getActivationStatus({
        codiceContestoPagamento: paymentContextCode,
      });
    },
    () => {
      mixpanel.track(PAYMENT_ACTIVATION_STATUS_NET_ERR.value, {
        EVENT_ID: PAYMENT_ACTIVATION_STATUS_NET_ERR.value,
      });
      return "Errore stato pagamento";
    }
  ).foldTaskEither(
    (err) => {
      mixpanel.track(PAYMENT_ACTIVATION_STATUS_SVR_ERR.value, {
        EVENT_ID: PAYMENT_ACTIVATION_STATUS_SVR_ERR.value,
      });
      return fromLeft(err);
    },
    (errorOrResponse) =>
      errorOrResponse.fold(
        () => fromLeft("Errore stato pagamento"),
        (responseType) => {
          if (responseType.status === 200) {
            mixpanel.track(PAYMENT_ACTIVATION_STATUS_SUCCESS.value, {
              EVENT_ID: PAYMENT_ACTIVATION_STATUS_SUCCESS.value,
            });
          } else {
            mixpanel.track(PAYMENT_ACTIVATION_STATUS_RESP_ERR.value, {
              EVENT_ID: PAYMENT_ACTIVATION_STATUS_RESP_ERR.value,
            });
          }
          return responseType.status !== 200
            ? fromLeft(`Errore stato pagamento : ${responseType.status}`)
            : taskEither.of(responseType.value);
        }
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
        }/index.html?p=${acivationResponse.idPagamento}&origin=${
          window.location.origin
        }`)
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
  document.body.classList.remove("loading");
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

export function getErrorMessageConv(faultCode: string): PaymentFaultEnum {
  switch (faultCode) {
    case "INVALID_AMOUNT":
      return PaymentFaultEnum.INVALID_AMOUNT;
    case "PAYMENT_DUPLICATED":
      return PaymentFaultEnum.PAYMENT_DUPLICATED;
    case "PAYMENT_ONGOING":
      return PaymentFaultEnum.PAYMENT_ONGOING;
    case "PAYMENT_EXPIRED":
      return PaymentFaultEnum.PAYMENT_EXPIRED;
    case "PAYMENT_UNKNOWN":
      return PaymentFaultEnum.PAYMENT_UNKNOWN;
    default:
      return PaymentFaultEnum.PAYMENT_UNAVAILABLE;
  }
}
