import React from "react";
import { useTranslation } from "react-i18next";

export default function FirstChoose() {
  const { t } = useTranslation();

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>{t("title")}</h2>
    </main>
  );
}
