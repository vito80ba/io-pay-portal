/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable sonarjs/cognitive-complexity */
import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import PageContainer from "../components/PageContent/PageContainer";
import { PaymentChoice } from "../features/payment/components/PaymentChoice/PaymentChoice";
import {
  PaymentCheckData,
  PaymentId,
} from "../features/payment/models/paymentModel";
import { setCheckData } from "../features/payment/slices/checkDataSlice";
import { getPaymentCheckData } from "../utils/api/helper";
import { loadState, SessionItems } from "../utils/storage/sessionStorage";

export default function PaymentChoicePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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

  React.useEffect(() => {
    if (!checkData.idPayment) {
      setLoading(true);
      void getPaymentCheckData({
        idPayment: paymentId.paymentId,
        onError: () => setLoading(false), // handle error on response,
        onResponse: (r) => {
          dispatch(setCheckData(r));
          setLoading(false);
        },
        onNavigate: () => {}, // navigate to ko page,
      });
    }
  }, [checkData.idPayment]);

  return loading ? (
    <CircularProgress />
  ) : (
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
