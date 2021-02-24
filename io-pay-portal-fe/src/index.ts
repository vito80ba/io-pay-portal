import { fromNullable } from "fp-ts/lib/Option";
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

  if (inputFields) {
    for (const inputEl of Array.from(inputFields)) {
      (inputEl as HTMLInputElement).addEventListener("focus", (evt: Event) => {
        const el = evt?.target;
        (el as HTMLInputElement).nextElementSibling?.classList.add("active");
      });
    }
  }

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
