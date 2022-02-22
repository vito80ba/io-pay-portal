import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RptId } from "../../generated/definitions/payment-activations-api/RptId";
import notification from "../../src-pug/assets/img/payment-notice-pagopa.png";
import { RootState } from "../app/store";
import ErrorModal from "../components/modals/ErrorModal";
import InformationModal from "../components/modals/InformationModal";
import PageContainer from "../components/PageContent/PageContainer";
import { PaymentNoticeForm } from "../features/payment/components/PaymentNoticeForm/PaymentNoticeForm";
import { PaymentFormFields } from "../features/payment/models/paymentModel";
import { setNotice } from "../features/payment/slices/noticeSlice";
import { setPayment } from "../features/payment/slices/paymentSlice";
import { useSmallDevice } from "../hooks/useSmallDevice";
import { getPaymentInfoTask } from "../utils/api/helper";
import { loadState, SessionItems } from "../utils/storage/sessionStorage";

export default function PaymentNoticePage() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [errorModalOpen, setErrorModalOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = location.pathname.split("/")[1];
  const noticeInfo = useSelector((state: RootState) => {
    if (!state.notice.cf) {
      const noticeInfo = loadState(
        SessionItems.noticeInfo
      ) as PaymentFormFields;
      return {
        billCode: noticeInfo?.billCode || "",
        cf: noticeInfo?.cf || "",
      };
    }
    return state.notice;
  });

  const onError = (m: string) => {
    setLoading(false);
    setError(m);
    setErrorModalOpen(true);
  };

  const onSubmit = React.useCallback((notice: PaymentFormFields) => {
    const rptId: RptId = `${notice.cf}${notice.billCode}`;
    setLoading(true);

    void getPaymentInfoTask(rptId, "")
      .fold(onError, (paymentInfo) => {
        dispatch(
          setPayment({
            importoSingoloVersamento:
              paymentInfo?.importoSingoloVersamento || 0,
            enteBeneficiario: {
              denominazioneBeneficiario:
                paymentInfo?.enteBeneficiario?.denominazioneBeneficiario || "",
              identificativoUnivocoBeneficiario:
                paymentInfo?.enteBeneficiario
                  ?.identificativoUnivocoBeneficiario || "",
            },
            causaleVersamento: paymentInfo?.causaleVersamento || "",
            codiceContestoPagamento: paymentInfo?.codiceContestoPagamento || "",
            ibanAccredito: paymentInfo?.ibanAccredito || "",
          })
        );
        dispatch(setNotice(notice));
        sessionStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
        sessionStorage.setItem("rptId", JSON.stringify(notice));
        setLoading(false);
        navigate(`/${currentPath}/summary`);
      })
      .run();
  }, []);

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <PageContainer
      title="paymentNoticePage.title"
      description="paymentNoticePage.description"
    >
      <a
        href="#"
        style={{ fontWeight: 600, textDecoration: "none" }}
        onClick={() => setModalOpen(true)}
      >
        {t("paymentNoticePage.helpLink")}
      </a>
      <Box sx={{ mt: 6 }}>
        <PaymentNoticeForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          defaultValues={noticeInfo}
          loading={loading}
        />
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
      {!!error && (
        <ErrorModal
          error={error}
          open={errorModalOpen}
          onClose={() => {
            setErrorModalOpen(false);
          }}
        />
      )}
    </PageContainer>
  );
}
