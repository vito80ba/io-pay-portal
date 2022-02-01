/* eslint-disable @typescript-eslint/no-empty-function */
import { Typography, Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormButtons } from "../components/FormButtons/FormButtons";

export default function PaymentSummaryPage() {
  const { t } = useTranslation();
  const defaultStyle = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid",
    borderBottomColor: "#EFEFEF",
    pt: 2,
    pb: 2,
  };

  return (
    <main style={{ padding: "3rem 0" }}>
      <Typography variant="h2" sx={{ fontSize: "2em" }}>
        {t("paymentSummaryPage.title")}
      </Typography>
      <Typography paragraph={true} sx={{ mt: 1, mb: 1 }}>
        {t("paymentSummaryPage.description")}
      </Typography>
      <Typography variant="h5" mt={6}>
        <Box sx={defaultStyle}>
          <Box>{t("paymentSummaryPage.amount")}</Box>
          <Box>{"€ 100,00"}</Box>
        </Box>
      </Typography>
      <Typography variant="h6">
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
      <Typography variant="h6">
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
      <Typography variant="h6">
        <Box sx={defaultStyle}>
          <Box>{t("paymentSummaryPage.cf")}</Box>
          <Box sx={{ fontWeight: 600 }}>{"77777777777"}</Box>
        </Box>
      </Typography>
      <FormButtons
        submitTitle="paymentSummaryPage.buttons.submit"
        cancelTitle="paymentSummaryPage.buttons.cancel"
        disabled={false}
        handleSubmit={() => {}}
        handleCancel={() => {}}
      />
    </main>
  );
}
