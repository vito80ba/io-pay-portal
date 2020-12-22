import { default as $ } from "jquery";
import { fromNullable } from "fp-ts/lib/Option";
import { getPaymentInfoTask } from "./api/services";
import "bootstrap/dist/css/bootstrap.css";

export const PayDetail: ReadonlyArray<string> = [
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
  /*eslint-disable */
  getPaymentInfoTask(rtdId)
    .fold(
      () => null,
      (paymentInfo) => {
        $("#stateCard").show();
        $("#initCard").hide();
        $("#payStateHeader").text("Informazioni pagamento " + rtdId);
        $("#payState")
          .text("")
          .append(
            PayDetail.reduce(
              (stateKeys, key) =>
                (stateKeys += `<li class="list-group-item">
                  ${key} : <strong>${Object(paymentInfo)[key]}</strong></li>`),
              ""
            )
          );
      }
    )
    .run();
});
