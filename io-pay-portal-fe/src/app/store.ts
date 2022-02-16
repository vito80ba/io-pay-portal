import { configureStore, combineReducers } from "@reduxjs/toolkit";
import paymentReducer from "../features/payment/slices/paymentSlice";
import noticeReducer from "../features/payment/slices/noticeSlice";
import emailReducer from "../features/payment/slices/emailSlice";

const reducer = combineReducers({
  payment: paymentReducer,
  notice: noticeReducer,
  email: emailReducer,
});

const store = configureStore({
  reducer,
});

export default store;
export type RootState = ReturnType<typeof reducer>;
