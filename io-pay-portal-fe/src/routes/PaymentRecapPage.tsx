/* eslint-disable @typescript-eslint/no-empty-function */
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EuroIcon from "@mui/icons-material/Euro";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { RootState } from "../app/store";
import { FormButtons } from "../components/FormButtons/FormButtons";
import PageContainer from "../components/PageContent/PageContainer";
import ClickableFieldContainer from "../components/TextFormField/ClickableFieldContainer";
import FieldContainer from "../components/TextFormField/FieldContainer";
import {
  PaymentCheckData,
  Wallet,
} from "../features/payment/models/paymentModel";
import { moneyFormat } from "../utils/form/formatters";
import { loadState, SessionItems } from "../utils/storage/sessionStorage";

const defaultStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid",
  borderRadius: "8px",
  borderBottomColor: "divider",
  pt: 2,
  pb: 2,
};

export default function PaymentRecapPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = React.useState(false);
  const checkData = useSelector((state: RootState) => {
    if (!state.checkData.idPayment) {
      const data = loadState(SessionItems.checkData) as PaymentCheckData;
      return {
        amount: {
          currency: data?.amount?.currency || "EUR",
          amount: data?.amount?.amount || 17300,
          decimalDigits: data?.amount?.decimalDigits || 2,
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
  const wallet = useSelector((state: RootState) => {
    if (!state.wallet.idWallet) {
      const data = loadState(SessionItems.wallet) as Wallet;
      return {
        creditCard: {
          brand: data?.creditCard?.brand || "",
          pan: data?.creditCard?.pan || "",
          holder: data?.creditCard?.holder || "",
          expireMonth: data?.creditCard?.expireMonth || "",
          expireYear: data?.creditCard?.expireYear || "",
        },
        idWallet: data?.idWallet || 0,
        psp: {
          businessName: data?.psp?.businessName || "",
          directAcquire: data?.psp?.directAcquire || false,
          fixedCost: {
            currency: data?.psp?.fixedCost?.currency || "",
            amount: data?.psp?.fixedCost?.amount || 0,
            decimalDigits: data?.psp?.fixedCost?.decimalDigits || 0,
          },
          logoPSP: data?.psp?.logoPSP || "",
          serviceAvailability: data?.psp?.serviceAvailability || "",
        },
        pspEditable: data?.pspEditable || false,
        type: data?.type || "",
      };
    }
    return state.wallet;
  });

  const onSubmit = React.useCallback(() => {}, []);

  return (
    <PageContainer>
      <Box sx={{ ...defaultStyle }}>
        <Typography variant="h6" component={"div"} pr={2}>
          {t("paymentRecapPage.total")}
        </Typography>
        <Typography variant="h6" component={"div"}>
          {moneyFormat(checkData.amount.amount)}
        </Typography>
      </Box>
      <ClickableFieldContainer
        title="paymentRecapPage.creditor"
        body={paymentInfo.enteBeneficiario.denominazioneBeneficiario}
        icon={<AccountBalanceIcon color="primary" sx={{ ml: 3 }} />}
      />
      <FieldContainer
        title="paymentRecapPage.causal"
        body={paymentInfo.causaleVersamento}
        icon={<ReceiptLongIcon color="primary" sx={{ ml: 3 }} />}
      />
      <FieldContainer
        title="paymentRecapPage.amount"
        body={moneyFormat(paymentInfo.importoSingoloVersamento)}
        icon={<EuroIcon color="primary" sx={{ ml: 3 }} />}
      />

      <FormButtons
        submitTitle="paymentRecapPage.buttons.submit"
        cancelTitle="paymentRecapPage.buttons.cancel"
        disabled={false}
        loading={false}
        handleSubmit={onSubmit}
        handleCancel={() => {
          navigate(-1);
        }}
      />
    </PageContainer>
  );
}
