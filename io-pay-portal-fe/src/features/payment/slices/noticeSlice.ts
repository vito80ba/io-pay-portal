/* eslint-disable functional/immutable-data */
import { createSlice } from "@reduxjs/toolkit";

export const noticeSlice = createSlice({
  name: "notice",
  initialState: {
    billCode: "",
    cf: "",
  },
  reducers: {
    setNotice(state, action) {
      state.billCode = action.payload.billCode;
      state.cf = action.payload.cf;
    },
    resetNotice(state) {
      state.billCode = "";
      state.cf = "";
    },
  },
});

export const { setNotice, resetNotice } = noticeSlice.actions;
export default noticeSlice.reducer;
