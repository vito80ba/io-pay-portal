/* eslint-disable functional/immutable-data */
import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    amount: 0,
    creditor: "",
    causal: "",
    cf: "",
  },
  reducers: {
    setPayment(state, action) {
      state.amount = action.payload.amount;
      state.creditor = action.payload.creditor;
      state.causal = action.payload.causal;
      state.cf = action.payload.cf;
    },
    resetPayment(state) {
      state.amount = 0;
      state.creditor = "";
      state.causal = "";
      state.cf = "";
    },
  },
});

export const { setPayment, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
