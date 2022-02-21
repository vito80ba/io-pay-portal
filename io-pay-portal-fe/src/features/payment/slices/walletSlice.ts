/* eslint-disable functional/immutable-data */
import { createSlice } from "@reduxjs/toolkit";

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    creditCard: {
      brand: "",
      pan: "",
      holder: "",
      expireMonth: "",
      expireYear: "",
    },
    idWallet: 0,
    psp: {
      businessName: "",
      directAcquire: false,
      fixedCost: {
        currency: "",
        amount: 0,
        decimalDigits: 0,
      },
      logoPSP: "",
      serviceAvailability: "",
    },
    pspEditable: false,
    type: "",
  },
  reducers: {
    setWallet(state, action) {
      state.creditCard.brand = action.payload.creditCard.brand;
      state.creditCard.pan = action.payload.creditCard.pan;
      state.creditCard.holder = action.payload.creditCard.holder;
      state.creditCard.expireMonth = action.payload.creditCard.expireMonth;
      state.creditCard.expireYear = action.payload.creditCard.expireYear;

      state.psp.businessName = action.payload.psp.businessName;
      state.psp.directAcquire = action.payload.psp.directAcquire;
      state.psp.logoPSP = action.payload.psp.logoPSP;
      state.psp.serviceAvailability = action.payload.psp.serviceAvailability;

      state.psp.fixedCost.amount = action.payload.psp.fixedCost.amount;
      state.psp.fixedCost.currency = action.payload.psp.fixedCost.currency;
      state.psp.fixedCost.decimalDigits =
        action.payload.psp.fixedCost.decimalDigits;

      state.idWallet = action.payload.idWallet;
      state.pspEditable = action.payload.pspEditable;
      state.type = action.payload.type;
    },
    resetWallet(state) {
      state.creditCard.brand = "";
      state.creditCard.pan = "";
      state.creditCard.holder = "";
      state.creditCard.expireMonth = "";
      state.creditCard.expireYear = "";

      state.psp.businessName = "";
      state.psp.directAcquire = false;
      state.psp.logoPSP = "";
      state.psp.serviceAvailability = "";

      state.psp.fixedCost.amount = 0;
      state.psp.fixedCost.currency = "";
      state.psp.fixedCost.decimalDigits = 0;

      state.idWallet = 0;
      state.pspEditable = false;
      state.type = "";
    },
  },
});

export const { setWallet, resetWallet } = walletSlice.actions;
export default walletSlice.reducer;
