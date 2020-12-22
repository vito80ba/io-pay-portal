import { fromNullable } from "fp-ts/lib/Option";
import { getPaymentInfoTask } from "./api/services";
import "bootstrap/dist/css/bootstrap.css";
import { default as $ } from "jquery";

export const PayDetails: readonly string[] = [
  "importoSingoloVersamento",
  "codiceContestoPagamento",
  "ibanAccredito",
  "causaleVersamento",
  "enteBeneficiario",
  "spezzoniCausaleVersamento",
];

/**
 * Init
 * */
$("#stateCard").hide();

/** 
 * Verify payment 
 * */
$("#verify").on("click", (evt): void => {
  evt.preventDefault();
  const rtdId: string = fromNullable($("#rtdId").val()?.toString()).getOrElse(
    ""
  );
  getPaymentInfoTask(rtdId)
    .fold(
      () => null,
      (paymentState) => {
        $("#stateCard").show();
        sessionStorage.setItem("rtdId", rtdId);
        $("#payStateHeader").text("Informazioni pagamento " + rtdId);
        $("#payState")
          .text("")
          .append(
            PayDetails.reduce(
              (stateKeys, key) =>
                (stateKeys +=
                  "<li class=\"list-group-item\">" + key + ": " + Object(paymentState)[key] + "</li>"),
              ""
            )
          );
      }
    )
    .run();
});