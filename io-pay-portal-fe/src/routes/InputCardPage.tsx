import { Box } from "@mui/material";
import React from "react";
import PageContainer from "../components/PageContent/PageContainer";
import { InputCardForm } from "../features/payment/components/InputCardForm/InputCardForm";

export default function InputCardPage() {
  return (
    <PageContainer title="inputCardPage.title">
      <Box sx={{ mt: 6 }}>
        <InputCardForm />
      </Box>
    </PageContainer>
  );
}
