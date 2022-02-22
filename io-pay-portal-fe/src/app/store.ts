import { combineReducers, configureStore } from "@reduxjs/toolkit";
import checkDataReducer from "../features/payment/slices/checkDataSlice";
import emailReducer from "../features/payment/slices/emailSlice";
import noticeReducer from "../features/payment/slices/noticeSlice";
import paymentIdReducer from "../features/payment/slices/paymentIdSlice";
import paymentReducer from "../features/payment/slices/paymentSlice";
import securityCodeReducer from "../features/payment/slices/securityCodeSlice";
import walletReducer from "../features/payment/slices/walletSlice";

const reducer = combineReducers({
  payment: paymentReducer,
  notice: noticeReducer,
  email: emailReducer,
  paymentId: paymentIdReducer,
  checkData: checkDataReducer,
  securityCode: securityCodeReducer,
  wallet: walletReducer,
});

const store = configureStore({
  reducer,
});

export default store;
export type RootState = ReturnType<typeof reducer>;
