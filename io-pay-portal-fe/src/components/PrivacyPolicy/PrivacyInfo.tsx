import React from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import InformationModal from "../InformationModal/InformationModal";
import PrivacyPolicy from "./PrivacyPolicy";

export default function PrivacyInfo() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <Box mt={4}>
        <p>
          {t("paymentPage.privacyDesc")}
          <a
            href="#"
            style={{ fontWeight: 600, textDecoration: "none" }}
            onClick={() => setModalOpen(true)}
          >
            {t("paymentPage.privacy")}
          </a>
          <br />
          {`${t("paymentPage.googleDesc")} (`}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 600, textDecoration: "none" }}
          >
            {t("paymentPage.privacyPolicy")}
          </a>
          {` ${t("general.and")} `}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 600, textDecoration: "none" }}
          >
            {t("paymentPage.serviceTerms")}
          </a>
          {")."}
        </p>
      </Box>
      <InformationModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <PrivacyPolicy />
      </InformationModal>
    </>
  );
}
