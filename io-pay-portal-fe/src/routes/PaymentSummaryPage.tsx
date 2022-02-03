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
      <Typography paragraph={true} sx={{ mt: 1, mb: 1 }}>
        {t("paymentSummaryPage.description")}
      </Typography>
      <Typography variant="h5" component={"div"} mt={6}>
        <Box sx={defaultStyle}>
          <Box>{t("paymentSummaryPage.amount")}</Box>
          <Box>{"€ 100,00"}</Box>
        </Box>
      </Typography>
      <Typography variant="h6" component={"div"}>
        <Box
          sx={{
            ...defaultStyle,
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box>{t("paymentSummaryPage.creditor")}</Box>
          <Box sx={{ fontWeight: 600 }}>{"Comune di Milano"}</Box>
        </Box>
      </Typography>
      <Typography variant="h6" component={"div"}>
        <Box
          sx={{
            ...defaultStyle,
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box>{t("paymentSummaryPage.causal")}</Box>
          <Box sx={{ fontWeight: 600 }}>{"TARI 2020 Rata Unica"}</Box>
        </Box>
      </Typography>
      <Typography variant="h6" component={"div"}>
        <Box sx={defaultStyle}>
          <Box>{t("paymentSummaryPage.cf")}</Box>
          <Box sx={{ fontWeight: 600 }}>{"77777777777"}</Box>
        </Box>
      </Typography>
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
