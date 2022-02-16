/* eslint-disable functional/immutable-data */
import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
  name: "email",
  initialState: {
    email: "",
    confirmEmail: "",
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload.email;
      state.confirmEmail = action.payload.confirmEmail;
    },
    resetEmail(state) {
      state.email = "";
      state.confirmEmail = "";
    },
  },
});

export const { setEmail, resetEmail } = emailSlice.actions;
export default emailSlice.reducer;
