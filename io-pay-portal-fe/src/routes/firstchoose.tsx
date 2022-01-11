import React from "react";
import { useTranslation } from "react-i18next";
import { PaymentForm } from "../features/payment/components/paymentForm/paymentForm";

export default function FirstChoose() {
  const { t } = useTranslation();

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>{t("checkoutForm.title")}</h2>
      <h4>{t("checkoutForm.description")}</h4>
      <h4>{t("checkoutForm.helpLink")}</h4>
      <PaymentForm />
      <h4>
        {t("checkoutForm.privacyDesc")}
        {t("checkoutForm.privacy")}
      </h4>
    </main>
  );
}
