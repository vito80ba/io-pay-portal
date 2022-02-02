import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { PaymentEmailForm } from "../features/payment/components/PaymentEmailForm/PaymentEmailForm";

export default function PaymentEmailPage() {
  const { t } = useTranslation();

  return (
    <Box p={"3rem 0"}>
      <Typography variant="h2" component={"div"} sx={{ fontSize: "2em" }}>
        {t("paymentEmailPage.title")}
      </Typography>
      <Typography paragraph={true} sx={{ mt: 1, mb: 1 }}>
        {t("paymentEmailPage.description")}
      </Typography>
      <Box sx={{ mt: 6 }}>
        <PaymentEmailForm />
      </Box>
    </Box>
  );
}
