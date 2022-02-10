import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RptId } from "../../generated/RptId";
import notification from "../../src-pug/assets/img/payment-notice-pagopa.png";
import { getPaymentInfoTask } from "../../src-pug/helper";
import InformationModal from "../components/modals/InformationModal";
import { PaymentNoticeForm } from "../features/payment/components/PaymentNoticeForm/PaymentNoticeForm";
import { PaymentFormFields } from "../features/payment/models/paymentModel";
import { setPayment } from "../features/payment/slices/paymentSlice";
import { useSmallDevice } from "../hooks/useSmallDevice";

export default function PaymentPage() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [errorModalOpen, setErrorModalOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = location.pathname.split("/")[1];

  const onError = (m: string) => {
    setError(m);
    setErrorModalOpen(true);
  };

  const onSubmit = React.useCallback((notice: PaymentFormFields) => {
    const rptId: RptId = `${notice.cf}${notice.billCode}`;

    void getPaymentInfoTask(rptId, "")
      .fold(onError, (paymentInfo) => {
        dispatch(
          setPayment({
            amount: paymentInfo.importoSingoloVersamento,
            creditor: paymentInfo.enteBeneficiario?.denominazioneBeneficiario,
            causal: paymentInfo.causaleVersamento,
            cf: paymentInfo.enteBeneficiario?.identificativoUnivocoBeneficiario,
          })
        );
        navigate(`/${currentPath}/summary`);
      })
      .run();
  }, []);

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <Box p={"3rem 0"}>
      <Typography variant="h2" component={"div"} sx={{ fontSize: "2em" }}>
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
        <PaymentNoticeForm onCancel={onCancel} onSubmit={onSubmit} />
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
    </Box>
  );
}
