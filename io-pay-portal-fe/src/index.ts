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
    const rtdId: string = fromNullable($("#rtdId").val()?.toString()).getOrElse(
      ""
    );
    await getPaymentInfoTask(rtdId)
      .fold(
        (errorMessage) => showPaymentInfoError(errorMessage),
        (paymentInfo) => showPaymentInfo(rtdId, paymentInfo)
      )
      .run();
    $("#loading").hide();
  }
);
