import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import pagopaLogo from "../../assets/images/logo-pagopa-spa.svg";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      p={3}
      sx={{
        bgcolor: "#F5F6F7",
        height: 53,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 48px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <a
          href="https://form.agid.gov.it/view/7628e161-33c0-420f-8c80-4fe362d2c7c5/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          {t("mainPage.footer.accessibility")}
        </a>
        <p style={{ paddingLeft: 8, paddingRight: 8 }}>·</p>
        <a
          href="https://www.pagopa.gov.it/it/helpdesk/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          {t("mainPage.footer.help")}
        </a>
      </div>
      <img
        src={pagopaLogo}
        alt="pagoPA"
        style={{ width: "56px", height: "36px" }}
      />
    </Box>
  );
}
