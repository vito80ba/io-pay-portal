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
    <main style={{ padding: "1rem 0" }}>
      <h1 style={{ marginBottom: 0 }}>{t("paymentPage.title")}</h1>
      <p style={{ marginTop: 8, marginBottom: 8 }}>
        {t("paymentPage.description")}
      </p>
      <a
        href="#"
        style={{ fontWeight: 600, textDecoration: "none" }}
        onClick={() => setModalOpen(true)}
      >
        {t("paymentPage.helpLink")}
      </a>
      <div style={{ marginTop: 48 }}>
        <PaymentForm />
      </div>

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
