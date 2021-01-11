import { default as $ } from "jquery";
import { fromNullable } from "fp-ts/lib/Option";
import "bootstrap/dist/css/bootstrap.css";
import {
  getPaymentInfoTask,
  showPaymentInfo,
  showPaymentInfoError,
} from "./helper";

/**
 * Init
 * */
$("#stateCard").hide();
$("#loading").hide();

/**
 * Verify and show payment info
 * */
$("#verify").on(
  "click",
  async (evt): Promise<void> => {
    evt.preventDefault();
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
        (paymentInfo) => showPaymentInfo(paymentNoticeCode, paymentInfo)
      )
      .run();
    $("#loading").hide();
  }
);
