import {
  PaymentEmailFormFields,
  PaymentFormFields,
  PaymentInfo,
} from "../../features/payment/models/paymentModel";

export enum SessionItems {
  paymentInfo = "paymentInfo",
  noticeInfo = "rptId",
  email = "email",
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
      | PaymentEmailFormFields;
  } catch (e) {
    return undefined;
  }
};

export const isStateEmpty = (item: string) => !loadState(item);
