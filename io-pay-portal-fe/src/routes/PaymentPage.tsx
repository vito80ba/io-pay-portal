import { Typography, Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import notification from "../../src-pug/assets/img/payment-notice-pagopa.png";
import InformationModal from "../components/InformationModal/InformationModal";
import { PaymentForm } from "../features/payment/components/PaymentForm/PaymentForm";
import { useSmallDevice } from "../hooks/useSmallDevice";

export default function PaymentPage() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <main style={{ padding: "3rem 0" }}>
      <Typography variant="h2" sx={{ fontSize: "2em" }}>
        {t("paymentPage.title")}
      </Typography>
      <Typography paragraph={true} sx={{ mt: 1, mb: 1 }}>
        {t("paymentPage.description")}
      </Typography>
      <a
        href="#"
        style={{ fontWeight: 600, textDecoration: "none" }}
        onClick={() => setModalOpen(true)}
      >
        {t("paymentPage.helpLink")}
      </a>
      <Box sx={{ mt: 6 }}>
        <PaymentForm />
      </Box>

      <InformationModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <img
          src={notification}
          alt="facsimile"
          style={useSmallDevice() ? { width: "100%" } : { height: "80vh" }}
        />
      </InformationModal>
    </main>
  );
}
