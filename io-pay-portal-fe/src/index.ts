import { default as $ } from "jquery";
import { fromNullable } from "fp-ts/lib/Option";
import "bootstrap/dist/css/bootstrap.css";
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
$("#stateCard").hide();
$("#loading").hide();
$("#error").hide();
$("#activationLoading").hide();
$("#activationError").hide();

/**
 * Verify and show payment info
 * */
$("#verify").on(
  "click",
  async (evt): Promise<void> => {
    evt.preventDefault();

    $("#error").hide();
    $("#loading").show();

    const paymentNoticeCode: string = fromNullable(
      $("#paymentNoticeCode").val()?.toString()
    ).getOrElse("");
    const organizationId: string = fromNullable(
      $("#organizationId").val()?.toString()
    ).getOrElse("");

    const rptId: RptId = `${organizationId}${paymentNoticeCode}`;

    await getPaymentInfoTask(rptId)
      .fold(
        (errorMessage) => showPaymentInfoError(errorMessage),
        (paymentInfo) => {
          sessionStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
          sessionStorage.setItem("rptId", JSON.stringify(rptId));
          showPaymentInfo(paymentInfo);
        }
      )
      .run();

    $("#loading").hide();
  }
);

/**
 * Active Payment
 * */
$("#active").on(
  "click",
  async (evt): Promise<void> => {
    evt.preventDefault();
    $("#activationError").hide();
    $("#paymentInfo").hide();
    $("#active").hide();
    $("#back").hide();
    $("#activationLoading").show();

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
