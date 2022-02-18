/* eslint-disable sonarjs/cognitive-complexity */
import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import PageContainer from "../components/PageContent/PageContainer";
import { PaymentChoice } from "../features/payment/components/PaymentChoice/PaymentChoice";
import {
  PaymentCheckData,
  PaymentId,
} from "../features/payment/models/paymentModel";
import { getPaymentCheckData } from "../utils/api/helper";
import { loadState, SessionItems } from "../utils/storage/sessionStorage";

export default function PaymentChoicePage() {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const paymentId = useSelector((state: RootState) => {
    if (!state.paymentId.paymentId) {
      const id = loadState(SessionItems.paymentId) as PaymentId;
      return {
        paymentId: id?.idPagamento || "",
      };
    }
    return state.paymentId;
  });
  const checkData = useSelector((state: RootState) => {
    if (!state.checkData.idPayment) {
      const data = loadState(SessionItems.checkData) as PaymentCheckData;
      return {
        amount: {
          currency: data?.amount?.currency || "",
          amount: data?.amount?.amount || 0,
          decimalDigits: data?.amount?.decimalDigits || 0,
        },
        bolloDigitale: data?.bolloDigitale || false,
        fiscalCode: data?.fiscalCode || "",
        iban: data?.iban || "",
        id: data?.id || 0,
        idPayment: data?.idPayment || "",
        isCancelled: data?.isCancelled || false,
        origin: data?.origin || "",
        receiver: data?.receiver || "",
        subject: data?.subject || "",
        urlRedirectEc: data?.urlRedirectEc || "",
        detailsList: data?.detailsList || [],
      };
    }
    return state.checkData;
  });

  if (!checkData.idPayment) {
    void getPaymentCheckData(paymentId.paymentId);
    // va passato callback su errore e su response
    // adatta la funzione in helper
  }

  return (
    <PageContainer
      title="paymentChoicePage.title"
      description="paymentChoicePage.description"
      link={
        <a
          href="https://www.pagopa.gov.it/it/cittadini/trasparenza-costi/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 600, textDecoration: "none" }}
        >
          {t("paymentChoicePage.costs")}
        </a>
      }
    >
      <Box sx={{ mt: 6 }}>
        <PaymentChoice />
      </Box>
    </PageContainer>
  );
}
