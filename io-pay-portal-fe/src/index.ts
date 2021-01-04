import { default as $ } from "jquery";
import { fromNullable } from "fp-ts/lib/Option";
import { getPaymentInfoTask } from "./api/services";
import "bootstrap/dist/css/bootstrap.css";
import { showPaymentInfo, showPaymentInfoError } from "./helper";

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
        () => showPaymentInfoError(),
        (paymentInfo) => showPaymentInfo(rtdId, paymentInfo)
      )
      .run();
    $("#loading").hide();
  }
);
