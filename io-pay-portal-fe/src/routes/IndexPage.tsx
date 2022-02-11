import { Box } from "@mui/material";
import React from "react";
import PageContainer from "../components/PageContent/PageContainer";
import PrivacyInfo from "../components/PrivacyPolicy/PrivacyInfo";
import { PaymentChoice } from "../features/payment/components/PaymentChoice/PaymentChoice";

export default function IndexPage() {
  return (
    <PageContainer title="indexPage.title" description="indexPage.description">
      <Box sx={{ mt: 6 }}>
        <PaymentChoice />
      </Box>
      <PrivacyInfo />
    </PageContainer>
  );
}
