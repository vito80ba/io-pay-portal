import { Box } from "@mui/material";
import React from "react";
import PageContainer from "../components/PageContent/PageContainer";
import { PaymentEmailForm } from "../features/payment/components/PaymentEmailForm/PaymentEmailForm";

export default function PaymentEmailPage() {
  return (
    <PageContainer
      title="paymentEmailPage.title"
      description="paymentEmailPage.description"
    >
      <Box sx={{ mt: 6 }}>
        <PaymentEmailForm />
      </Box>
    </PageContainer>
  );
}
