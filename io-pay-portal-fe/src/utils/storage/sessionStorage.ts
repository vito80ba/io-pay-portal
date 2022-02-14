import { PaymentInfo } from "../../features/payment/models/paymentModel";

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("paymentInfo");

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState) as PaymentInfo;
  } catch (e) {
    return undefined;
  }
};

export const isStateEmpty = () => !loadState();
