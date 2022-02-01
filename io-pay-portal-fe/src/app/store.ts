import { configureStore, combineReducers } from "@reduxjs/toolkit";
import paymentReducer from "../features/payment/slices/paymentSlice";

const reducer = combineReducers({
  payment: paymentReducer,
});

const store = configureStore({
  reducer,
});

export default store;
