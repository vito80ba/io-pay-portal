/* eslint-disable functional/immutable-data */
import { createSlice } from "@reduxjs/toolkit";

export const paymentIdSlice = createSlice({
  name: "paymentId",
  initialState: {
    paymentId: "",
  },
  reducers: {
    setPaymentId(state, action) {
      state.paymentId = action.payload.paymentId;
    },
    resetPaymentId(state) {
      state.paymentId = "";
    },
  },
});

export const { setPaymentId, resetPaymentId } = paymentIdSlice.actions;
export default paymentIdSlice.reducer;
