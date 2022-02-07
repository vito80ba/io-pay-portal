import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { InputCardForm } from "../features/payment/components/InputCardForm/InputCardForm";

export default function InputCardPage() {
  const { t } = useTranslation();

  return (
    <Box p={"3rem 0"}>
      <Typography variant="h2" component={"div"} sx={{ fontSize: "2em" }}>
        {t("inputcardPage.title")}
      </Typography>
      <Box sx={{ mt: 6 }}>
        <InputCardForm />
      </Box>
    </Box>
  );
}
