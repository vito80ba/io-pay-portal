/* eslint-disable @typescript-eslint/no-empty-function */
import { Typography } from "@mui/material";
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
  };

  return (
    <main style={{ padding: "1rem 0" }}>
      <h1 style={{ marginBottom: 0 }}>{t("paymentSummaryPage.title")}</h1>
      <p style={{ marginTop: 8, marginBottom: 8 }}>
        {t("paymentSummaryPage.description")}
      </p>
      <Typography variant="h5" mt={6}>
        <div
          style={{
            ...defaultStyle,
            padding: "8px 0",
          }}
        >
          <div>{t("paymentSummaryPage.amount")}</div>
          <div>{"€ 100,00"}</div>
        </div>
      </Typography>
      <Typography variant="h6">
        <div
          style={{
            ...defaultStyle,
            flexDirection: "column",
            padding: "16px 0",
            gap: 4,
          }}
        >
          <div>{t("paymentSummaryPage.creditor")}</div>
          <div style={{ fontWeight: 600 }}>{"Comune di Milano"}</div>
        </div>
      </Typography>
      <Typography variant="h6">
        <div
          style={{
            ...defaultStyle,
            flexDirection: "column",
            padding: "16px 0",
            gap: 4,
          }}
        >
          <div>{t("paymentSummaryPage.causal")}</div>
          <div style={{ fontWeight: 600 }}>{"TARI 2020 Rata Unica"}</div>
        </div>
      </Typography>
      <Typography variant="h6">
        <div
          style={{
            ...defaultStyle,
            padding: "16px 0",
          }}
        >
          <div>{t("paymentSummaryPage.cf")}</div>
          <div style={{ fontWeight: 600 }}>{"77777777777"}</div>
        </div>
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
