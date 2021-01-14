import { default as $ } from "jquery";
import { fromNullable } from "fp-ts/lib/Option";
import "bootstrap/dist/css/bootstrap.css";
import {
  activePaymentTask,
  getPaymentInfoTask,
  pollingActivationStatus,
  showActivationError,
  showPaymentInfo,
  showPaymentInfoError,
} from "./helper";
import { PaymentRequestsGetResponse } from "../generated/PaymentRequestsGetResponse";

/**
 * Init
 * */
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

    await getPaymentInfoTask(organizationId, paymentNoticeCode)
      .fold(
        (errorMessage) => showPaymentInfoError(errorMessage),
        (paymentInfo) => {
          sessionStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
          showPaymentInfo(paymentInfo);
        }
      )
      .run();

    $("#loading").hide();
  }
);

/**
 * Verify and show payment info
 * */
$("#active").on(
  "click",
  async (evt): Promise<void> => {
    evt.preventDefault();
    $("#activationError").hide();
    $("#activationLoading").show();

    const paymentInfo: string = fromNullable(
      sessionStorage.getItem("paymentInfo")
    ).getOrElse("");

    PaymentRequestsGetResponse.decode(JSON.parse(paymentInfo)).fold(
      (_) => showActivationError("Errore Attivazione Pagamento"),
      async (paymentInfo) =>
        await activePaymentTask(
          paymentInfo.enteBeneficiario?.identificativoUnivocoBeneficiario,
          paymentInfo.importoSingoloVersamento,
          paymentInfo.codiceContestoPagamento
        )
          .fold(
            (errorMessage) => showPaymentInfoError(errorMessage),
            (_) => pollingActivationStatus( paymentInfo.codiceContestoPagamento, 10)
          )
          .run()
    );

    $("#activationLoading").hide();
  }
);
