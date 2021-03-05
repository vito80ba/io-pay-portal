import { fromNullable } from "fp-ts/lib/Option";
import Tingle from "tingle.js";
import { PaymentRequestsGetResponse } from "../generated/PaymentRequestsGetResponse";
import { RptId } from "../generated/RptId";
import {
  activePaymentTask,
  getPaymentInfoTask,
  pollingActivationStatus,
  showActivationError,
  showPaymentInfo,
  showPaymentInfoError,
} from "./helper";
import { getConfig } from "./util/config";

/**
 * Init
 * */
sessionStorage.clear();

// eslint-disable-next-line sonarjs/cognitive-complexity
document.addEventListener("DOMContentLoaded", () => {
  const inputFields = document.getElementsByTagName("input") || null;
  const stateCard = document.getElementById("stateCard") || null;
  const initCard = document.getElementById("initCard") || null;
  const verify = document.getElementById("verify") || null;
  const active = document.getElementById("active") || null;
  const error = document.getElementById("error") || null;
  const activationError = document.getElementById("activationError") || null;
  const back = document.getElementById("back") || null;
  const activationLoading =
    document.getElementById("activationLoading") || null;
  const paymentNoticeCodeEl: HTMLInputElement | null =
    (document.getElementById("paymentNoticeCode") as HTMLInputElement) || null;
  const organizationIdEl: HTMLInputElement | null =
    (document.getElementById("organizationId") as HTMLInputElement) || null;
  const helpmodal: HTMLInputElement | null =
    (document.getElementById("helpmodal") as HTMLInputElement) || null;

  // check if all fields are OK
  function fieldsCheck() {
    const checkedFields = document.querySelectorAll("input[data-checked]");

    if (checkedFields?.length === inputFields?.length) {
      verify?.removeAttribute("disabled");
    } else {
      verify?.setAttribute("disabled", "disabled");
    }
  }

  // Add / remove validity to input elements
  function toggleValid(el: any, isItValid: any) {
    if (isItValid === true) {
      el.parentNode.classList.remove("is-invalid");
      el.parentNode.classList.add("is-valid");
      el.classList.remove("is-invalid");
      el.classList.add("is-valid");
      el.setAttribute("data-checked", 1);
    } else {
      el.parentNode.classList.remove("is-valid");
      el.parentNode.classList.add("is-invalid");
      el.classList.remove("is-valid");
      el.classList.add("is-invalid");
      el.removeAttribute("data-checked");
    }
  }

  if (inputFields) {
    for (const inputEl of Array.from(inputFields)) {
      (inputEl as HTMLInputElement).addEventListener("focus", (evt: Event) => {
        const el = evt?.target;
        (el as HTMLInputElement).nextElementSibling?.classList.add("active");
      });
    }
  }

  paymentNoticeCodeEl?.addEventListener(
    "keyup",
    async (evt): Promise<void> => {
      const inputel = evt?.target as HTMLInputElement;
      // only 18 numbers
      const regexTest = new RegExp(/^[0-9]{18}$/);
      // eslint-disable-next-line functional/immutable-data
      inputel.value = inputel.value.trim();
      if (regexTest.test(inputel.value) === true) {
        toggleValid(inputel, true);
      } else {
        toggleValid(inputel, false);
      }
      fieldsCheck();
    }
  );

  organizationIdEl?.addEventListener(
    "keyup",
    async (evt): Promise<void> => {
      const inputel = evt?.target as HTMLInputElement;
      // only chars& numbers, min 11 max 16
      const regexTest = new RegExp(/^[a-zA-Z0-9]{11,16}$/);
      // eslint-disable-next-line functional/immutable-data
      inputel.value = inputel.value.trim();
      if (regexTest.test(inputel.value) === true) {
        toggleValid(inputel, true);
      } else {
        toggleValid(inputel, false);
      }
      fieldsCheck();
    }
  );

  helpmodal?.addEventListener(
    "click",
    async (evt): Promise<void> => {
      evt.preventDefault();
      const modalTarget = document.getElementById("modal-wheredata") || null;
      const modalWindow = new Tingle.modal({
        footer: false,
        stickyFooter: false,
        cssClass: ["xl"],
        onOpen: () => {
          const modalClose = modalWindow
            .getContent()
            .querySelector(".modalwindow__close");
          modalClose?.addEventListener("click", () => {
            modalWindow.close();
          });
        },
      });
      modalWindow.setContent(modalTarget?.innerHTML || " ");
      modalWindow.open();
    }
  );

  /**
   * Verify and show payment info
   * */
  verify?.addEventListener(
    "click",
    async (evt): Promise<void> => {
      evt.preventDefault();

      error?.classList.add("d-none");
      document.body.classList.add("loading");

      const paymentNoticeCode: string = fromNullable(
        paymentNoticeCodeEl?.value
      ).getOrElse("");
      const organizationId: string = fromNullable(
        organizationIdEl?.value
      ).getOrElse("");

      const rptId: RptId = `${organizationId}${paymentNoticeCode}`;

      await getPaymentInfoTask(rptId)
        .fold(
          (errorMessage) => showPaymentInfoError(errorMessage),
          (paymentInfo) => {
            sessionStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
            sessionStorage.setItem("rptId", rptId);
            showPaymentInfo(paymentInfo);
          }
        )
        .run();

      document.body.classList.remove("loading");
    }
  );

  back?.addEventListener(
    "click",
    async (evt): Promise<void> => {
      evt.preventDefault();
      stateCard?.classList.add("d-none");
      initCard?.classList.remove("d-none");
    }
  );

  /**
   * Active Payment
   * */
  active?.addEventListener(
    "click",
    async (evt): Promise<void> => {
      evt.preventDefault();
      stateCard?.classList.add("d-none");
      activationError?.classList.add("d-none");
      active?.classList.add("d-none");
      back?.classList.add("d-none");
      activationLoading?.classList.remove("d-none");

      const paymentInfo: string = fromNullable(
        sessionStorage.getItem("paymentInfo")
      ).getOrElse("");

      const rptId: RptId = fromNullable(
        sessionStorage.getItem("rptId")
      ).getOrElse("");

      PaymentRequestsGetResponse.decode(JSON.parse(paymentInfo)).fold(
        () => showActivationError("Errore Attivazione Pagamento"),
        async (paymentInfo) =>
          await activePaymentTask(
            paymentInfo.importoSingoloVersamento,
            paymentInfo.codiceContestoPagamento,
            rptId
          )
            .fold(
              (errorMessage) => showActivationError(errorMessage),
              (_) =>
                pollingActivationStatus(
                  paymentInfo.codiceContestoPagamento,
                  getConfig("IO_PAY_PORTAL_PAY_WL_POLLING_ATTEMPTS") as number
                )
            )
            .run()
      );
    }
  );
});
