import { default as $ } from "jquery";
import { fromNullable } from "fp-ts/lib/Option";
import { getPaymentInfoTask } from "./api/services";
import "bootstrap/dist/css/bootstrap.css";
import { showPaymentInfo } from "./helper";

/**
 * Init
 * */
$("#stateCard").hide();

/**
 * Verify and show payment info
 * */
$("#verify").on(
  "click",
  async (evt): Promise<void> => {
    evt.preventDefault();
    const rtdId: string = fromNullable($("#rtdId").val()?.toString()).getOrElse(
      ""
    );

    await getPaymentInfoTask(rtdId)
      .map((paymentInfo) => showPaymentInfo(rtdId, paymentInfo))
      .run();
  }
);
