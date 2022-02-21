/* eslint-disable @typescript-eslint/no-empty-function */
import { fromNullable } from "fp-ts/lib/Option";
import {
  fromLeft,
  taskEither,
  TaskEither,
  tryCatch,
} from "fp-ts/lib/TaskEither";
import { Millisecond } from "italia-ts-commons/lib/units";
import { CodiceContestoPagamento } from "../../../generated/CodiceContestoPagamento";
import { ImportoEuroCents } from "../../../generated/ImportoEuroCents";
import { PaymentActivationsGetResponse } from "../../../generated/PaymentActivationsGetResponse";
import { PaymentActivationsPostResponse } from "../../../generated/PaymentActivationsPostResponse";
import { PaymentRequestsGetResponse } from "../../../generated/PaymentRequestsGetResponse";
import { RptId } from "../../../generated/RptId";
import { getConfig } from "../config/config";
import {
  mixpanel,
  PAYMENT_ACTIVATE_INIT,
  PAYMENT_ACTIVATE_NET_ERR,
  PAYMENT_ACTIVATE_RESP_ERR,
  PAYMENT_ACTIVATE_SUCCESS,
  PAYMENT_ACTIVATE_SVR_ERR,
  PAYMENT_ACTIVATION_STATUS_INIT,
  PAYMENT_ACTIVATION_STATUS_NET_ERR,
  PAYMENT_ACTIVATION_STATUS_RESP_ERR,
  PAYMENT_ACTIVATION_STATUS_SUCCESS,
  PAYMENT_ACTIVATION_STATUS_SVR_ERR,
  PAYMENT_VERIFY_INIT,
  PAYMENT_VERIFY_NET_ERR,
  PAYMENT_VERIFY_RESP_ERR,
  PAYMENT_VERIFY_SUCCESS,
  PAYMENT_VERIFY_SVR_ERR,
} from "../config/mixpanelHelperInit";
import { apiClient } from "./client";

export const getPaymentInfoTask = (
  rptId: RptId,
  recaptchaResponse: string
): TaskEither<string, PaymentRequestsGetResponse> =>
  tryCatch(
    () => {
      mixpanel.track(PAYMENT_VERIFY_INIT.value, {
        EVENT_ID: PAYMENT_VERIFY_INIT.value,
      });
      return apiClient.getPaymentInfo({
        rptId,
        recaptchaResponse,
      });
    },
    () => {
      mixpanel.track(PAYMENT_VERIFY_NET_ERR.value, {
        EVENT_ID: PAYMENT_VERIFY_NET_ERR.value,
      });
      return "Errore recupero pagamento";
    }
  ).foldTaskEither(
    (err) => {
      mixpanel.track(PAYMENT_VERIFY_SVR_ERR.value, {
        EVENT_ID: PAYMENT_VERIFY_SVR_ERR.value,
      });
      return fromLeft(err);
    },
    (errorOrResponse) =>
      errorOrResponse.fold(
        () => fromLeft("Errore recupero pagamento"),
        (responseType) => {
          const reason =
            responseType.status === 200 ? "" : responseType.value?.detail;
          const EVENT_ID: string =
            responseType.status === 200
              ? PAYMENT_VERIFY_SUCCESS.value
              : PAYMENT_VERIFY_RESP_ERR.value;
          mixpanel.track(EVENT_ID, { EVENT_ID, reason });
          return responseType.status !== 200
            ? fromLeft(
                fromNullable(responseType.value?.detail).getOrElse(
                  "Errore recupero pagamento"
                )
              )
            : taskEither.of(responseType.value);
        }
      )
  );

export const activePaymentTask = (
  amountSinglePayment: ImportoEuroCents,
  paymentContextCode: CodiceContestoPagamento,
  rptId: RptId
): TaskEither<string, PaymentActivationsPostResponse> =>
  tryCatch(
    () => {
      mixpanel.track(PAYMENT_ACTIVATE_INIT.value, {
        EVENT_ID: PAYMENT_ACTIVATE_INIT.value,
      });
      return apiClient.activatePayment({
        body: {
          rptId,
          importoSingoloVersamento: amountSinglePayment,
          codiceContestoPagamento: paymentContextCode,
        },
      });
    },
    () => {
      mixpanel.track(PAYMENT_ACTIVATE_NET_ERR.value, {
        EVENT_ID: PAYMENT_ACTIVATE_NET_ERR.value,
      });
      return "Errore attivazione pagamento";
    }
  ).foldTaskEither(
    (err) => {
      mixpanel.track(PAYMENT_ACTIVATE_SVR_ERR.value, {
        EVENT_ID: PAYMENT_ACTIVATE_SVR_ERR.value,
      });
      return fromLeft(err);
    },
    (errorOrResponse) =>
      errorOrResponse.fold(
        () => fromLeft("Errore attivazione pagamento"),
        (responseType) => {
          const reason =
            responseType.status === 200 ? "" : responseType.value?.detail;
          const EVENT_ID: string =
            responseType.status === 200
              ? PAYMENT_ACTIVATE_SUCCESS.value
              : PAYMENT_ACTIVATE_RESP_ERR.value;
          mixpanel.track(EVENT_ID, { EVENT_ID, reason });

          return responseType.status !== 200
            ? fromLeft(
                fromNullable(responseType.value?.detail).getOrElse(
                  `Errore attivazione pagamento : ${responseType.status}`
                )
              )
            : taskEither.of(responseType.value);
        }
      )
  );

export const getActivationStatusTask = (
  paymentContextCode: CodiceContestoPagamento
): TaskEither<string, PaymentActivationsGetResponse> =>
  tryCatch(
    () => {
      mixpanel.track(PAYMENT_ACTIVATION_STATUS_INIT.value, {
        EVENT_ID: PAYMENT_ACTIVATION_STATUS_INIT.value,
      });
      return apiClient.getActivationStatus({
        codiceContestoPagamento: paymentContextCode,
      });
    },
    () => {
      mixpanel.track(PAYMENT_ACTIVATION_STATUS_NET_ERR.value, {
        EVENT_ID: PAYMENT_ACTIVATION_STATUS_NET_ERR.value,
      });
      return "Errore stato pagamento";
    }
  ).foldTaskEither(
    (err) => {
      mixpanel.track(PAYMENT_ACTIVATION_STATUS_SVR_ERR.value, {
        EVENT_ID: PAYMENT_ACTIVATION_STATUS_SVR_ERR.value,
      });
      return fromLeft(err);
    },
    (errorOrResponse) =>
      errorOrResponse.fold(
        () => fromLeft("Errore stato pagamento"),
        (responseType) => {
          const EVENT_ID: string =
            responseType.status === 200
              ? PAYMENT_ACTIVATION_STATUS_SUCCESS.value
              : PAYMENT_ACTIVATION_STATUS_RESP_ERR.value;
          mixpanel.track(EVENT_ID, { EVENT_ID });

          return responseType.status !== 200
            ? fromLeft(`Errore stato pagamento : ${responseType.status}`)
            : taskEither.of(responseType.value);
        }
      )
  );
export const pollingActivationStatus = async (
  paymentNoticeCode: CodiceContestoPagamento,
  attempts: number,
  onResponse: (activationResponse: { idPagamento: any }) => void
): Promise<void> => {
  await getActivationStatusTask(paymentNoticeCode)
    .fold(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      attempts > 0
        ? setTimeout(
            pollingActivationStatus,
            getConfig("IO_PAY_PORTAL_PAY_WL_POLLING_INTERVAL") as Millisecond,
            paymentNoticeCode,
            --attempts, // eslint-disable-line no-param-reassign,
            onResponse
          )
        : () => {}; // TODO Error Intereptor
    }, onResponse)
    .run();
};
