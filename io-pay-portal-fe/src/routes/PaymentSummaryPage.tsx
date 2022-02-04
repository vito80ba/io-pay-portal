/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { FormButtons } from "../components/FormButtons/FormButtons";

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

  return (
    <Box p={"3rem 0"}>
      <Typography variant="h2" component={"div"} sx={{ fontSize: "2em" }}>
        {t("paymentSummaryPage.title")}
      </Typography>
      <Typography paragraph={true} sx={{ mt: 1, mb: 4 }}>
        {t("paymentSummaryPage.description")}
      </Typography>

      <Box
        sx={{
          ...defaultStyle,
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component={"div"}>
          {t("paymentSummaryPage.creditor")}
        </Typography>
        <Typography variant="h5" component={"div"}>
          {"Comune di Milano"}
        </Typography>
      </Box>

      <Box
        sx={{
          ...defaultStyle,
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component={"div"}>
          {t("paymentSummaryPage.causal")}
        </Typography>
        <Typography variant="h5" component={"div"}>
          {"TARI 2020 Rata Unica"}
        </Typography>
      </Box>

      <Box
        sx={{
          ...defaultStyle,
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component={"div"}>
          {t("paymentSummaryPage.amount")}
        </Typography>
        <Typography variant="h5" component={"div"}>
          {"€ 100,00"}
        </Typography>
      </Box>

      <Box sx={{ ...defaultStyle, alignItems: "center" }}>
        <Typography variant="h6" component={"div"} pr={2}>
          {t("paymentSummaryPage.cf")}
        </Typography>
        <Typography variant="h5" component={"div"}>
          {"77777777777"}
        </Typography>
      </Box>

      <Box sx={{ ...defaultStyle, alignItems: "center" }}>
        <Typography variant="h6" component={"div"} pr={2}>
          {t("paymentSummaryPage.iuv")}
        </Typography>
        <Typography variant="h5" component={"div"}>
          {"777777777777777"}
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
    </Box>
  );
}
