/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { RootState } from "../app/store";
import { FormButtons } from "../components/FormButtons/FormButtons";
import PageContainer from "../components/PageContent/PageContainer";
import { moneyFormat } from "../utils/form/formatters";

export default function PaymentSummaryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultStyle = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid",
    borderBottomColor: "#EFEFEF",
    pt: 2,
    pb: 2,
  };
  const currentPath = location.pathname.split("/")[1];
  const paymentInfo = useSelector((state: RootState) => state.payment);

  return (
    <PageContainer
      title="paymentSummaryPage.title"
      description="paymentSummaryPage.description"
    >
      <Box
        sx={{
          ...defaultStyle,
          flexDirection: "column",
        }}
      >
        <Typography variant="body2" component={"div"}>
          {t("paymentSummaryPage.creditor")}
        </Typography>
        <Typography variant="sidenav" component={"div"}>
          {paymentInfo.creditor}
        </Typography>
      </Box>

      <Box
        sx={{
          ...defaultStyle,
          flexDirection: "column",
        }}
      >
        <Typography variant="body2" component={"div"}>
          {t("paymentSummaryPage.causal")}
        </Typography>
        <Typography variant="sidenav" component={"div"}>
          {paymentInfo.causal}
        </Typography>
      </Box>

      <Box
        sx={{
          ...defaultStyle,
          flexDirection: "column",
        }}
      >
        <Typography variant="body2" component={"div"}>
          {t("paymentSummaryPage.amount")}
        </Typography>
        <Typography variant="sidenav" component={"div"}>
          {`€ ${moneyFormat(paymentInfo.amount)}`}
        </Typography>
      </Box>

      <Box sx={{ ...defaultStyle, alignItems: "center" }}>
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
