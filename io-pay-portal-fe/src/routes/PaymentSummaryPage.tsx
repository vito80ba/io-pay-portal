/* eslint-disable @typescript-eslint/no-empty-function */
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EuroIcon from "@mui/icons-material/Euro";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { RootState } from "../app/store";
import { FormButtons } from "../components/FormButtons/FormButtons";
import PageContainer from "../components/PageContent/PageContainer";
import FieldContainer from "../components/TextFormField/FieldContainer";
import { moneyFormat } from "../utils/form/formatters";
import { loadState } from "../utils/storage/sessionStorage";

const defaultStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid",
  borderBottomColor: "#EFEFEF",
  pt: 2,
  pb: 2,
};

export default function PaymentSummaryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  const paymentInfo = useSelector((state: RootState) => {
    if (!state.payment.amount) {
      const paymentInfo = loadState();
      return {
        amount: paymentInfo?.importoSingoloVersamento || 0,
        creditor:
          paymentInfo?.enteBeneficiario?.denominazioneBeneficiario || "",
        causal: paymentInfo?.causaleVersamento || "",
        cf:
          paymentInfo?.enteBeneficiario?.identificativoUnivocoBeneficiario ||
          "",
      };
    }
    return state.payment;
  });

  return (
    <PageContainer
      title="paymentSummaryPage.title"
      description="paymentSummaryPage.description"
    >
      <FieldContainer
        title="paymentSummaryPage.creditor"
        body={paymentInfo.creditor}
        icon={<AccountBalanceIcon color="primary" sx={{ ml: 3 }} />}
      />
      <FieldContainer
        title="paymentSummaryPage.causal"
        body={paymentInfo.causal}
        icon={<ReceiptLongIcon color="primary" sx={{ ml: 3 }} />}
      />
      <FieldContainer
        title="paymentSummaryPage.amount"
        body={moneyFormat(paymentInfo.amount)}
        icon={<EuroIcon color="primary" sx={{ ml: 3 }} />}
      />
      <Box sx={{ ...defaultStyle, pl: 2, pr: 2 }}>
        <Typography variant="body2" component={"div"} pr={2}>
          {t("paymentSummaryPage.cf")}
        </Typography>
        <Typography variant="sidenav" component={"div"}>
          {paymentInfo.cf}
        </Typography>
      </Box>

      <FormButtons
        submitTitle="paymentSummaryPage.buttons.submit"
        cancelTitle="paymentSummaryPage.buttons.cancel"
        disabled={false}
        handleSubmit={() => {
          navigate(`/${currentPath}/email`);
        }}
        handleCancel={() => {
          navigate(-1);
        }}
      />
    </PageContainer>
  );
}
