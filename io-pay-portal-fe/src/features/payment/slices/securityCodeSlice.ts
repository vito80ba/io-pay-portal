/* eslint-disable functional/immutable-data */
import { createSlice } from "@reduxjs/toolkit";

export const securityCodeSlice = createSlice({
  name: "securityCode",
  initialState: {
    securityCode: "",
  },
  reducers: {
    setSecurityCode(state, action) {
      state.securityCode = action.payload.securityCode;
    },
    resetSecurityCode(state) {
      state.securityCode = "";
    },
  },
});

export const { setSecurityCode, resetSecurityCode } = securityCodeSlice.actions;
export default securityCodeSlice.reducer;
