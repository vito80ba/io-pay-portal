/* eslint-disable functional/immutable-data */
import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    causaleVersamento: "",
    codiceContestoPagamento: "",
    enteBeneficiario: {
      denominazioneBeneficiario: "",
      identificativoUnivocoBeneficiario: "",
    },
    ibanAccredito: "",
    importoSingoloVersamento: 0,
  },
  reducers: {
    setPayment(state, action) {
      state.causaleVersamento = action.payload.causaleVersamento;
      state.codiceContestoPagamento = action.payload.codiceContestoPagamento;
      state.enteBeneficiario.denominazioneBeneficiario =
        action.payload.enteBeneficiario.denominazioneBeneficiario;
      state.enteBeneficiario.identificativoUnivocoBeneficiario =
        action.payload.enteBeneficiario.identificativoUnivocoBeneficiario;
      state.ibanAccredito = action.payload.ibanAccredito;
      state.importoSingoloVersamento = action.payload.importoSingoloVersamento;
    },
    resetPayment(state) {
      state.causaleVersamento = "";
      state.codiceContestoPagamento = "";
      state.enteBeneficiario.denominazioneBeneficiario = "";
      state.enteBeneficiario.identificativoUnivocoBeneficiario = "";
      state.ibanAccredito = "";
      state.importoSingoloVersamento = 0;
    },
  },
});

export const { setPayment, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
