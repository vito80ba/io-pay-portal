import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import PrivacyInfo from "../components/PrivacyPolicy/PrivacyInfo";
import { PaymentChoice } from "../features/payment/components/PaymentChoice/PaymentChoice";

export default function IndexPage() {
  const { t } = useTranslation();

  return (
    <Box p={"3rem 0"}>
      <Typography variant="h2" component={"div"} sx={{ fontSize: "2em" }}>
        {t("indexPage.title")}
      </Typography>
      <Typography paragraph={true} sx={{ mt: 1, mb: 1 }}>
        {t("indexPage.description")}
      </Typography>
      <Box sx={{ mt: 6 }}>
        <PaymentChoice />
      </Box>
      <PrivacyInfo />
    </Box>
  );
}
