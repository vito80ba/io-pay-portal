import {
  PaymentEmailFormFields,
  PaymentFormFields,
  PaymentId,
  PaymentInfo,
} from "../../features/payment/models/paymentModel";

export enum SessionItems {
  paymentInfo = "paymentInfo",
  noticeInfo = "rptId",
  email = "email",
  paymentId = "paymentId",
}
export const loadState = (item: string) => {
  try {
    const serializedState = sessionStorage.getItem(item);

    if (!serializedState) {
      return undefined;
    }

    return JSON.parse(serializedState) as
      | PaymentInfo
      | PaymentFormFields
      | PaymentEmailFormFields
      | PaymentId;
  } catch (e) {
    return undefined;
  }
};

export const isStateEmpty = (item: string) => !loadState(item);
