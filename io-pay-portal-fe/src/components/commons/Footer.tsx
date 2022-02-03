import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import pagopaLogo from "../../assets/images/logo-pagopa-spa.svg";

export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      height={53}
      pt={0}
      pb={{ ...(location.pathname === "/payment" ? {} : { xs: 16 }), sm: 0 }}
      pl={6}
      pr={6}
      margin={{
        ...(location.pathname === "/payment" ? {} : { xs: "3rem 0 0" }),
        sm: 0,
      }}
      bgcolor={{
        ...(location.pathname === "/payment"
          ? { xs: "#F5F6F7" }
          : { xs: "background.default" }),
        sm: "#F5F6F7",
      }}
    >
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <a
          href="https://form.agid.gov.it/view/7628e161-33c0-420f-8c80-4fe362d2c7c5/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          {t("mainPage.footer.accessibility")}
        </a>
        <p>·</p>
        <a
          href="https://www.pagopa.gov.it/it/helpdesk/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          {t("mainPage.footer.help")}
        </a>
      </Box>
      <a
        href="https://www.pagopa.it/it/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex" }}
      >
        <img
          src={pagopaLogo}
          alt="pagoPA"
          style={{ width: "56px", height: "36px" }}
        />
      </a>
    </Box>
  );
}
