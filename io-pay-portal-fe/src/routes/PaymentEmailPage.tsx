import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import PageContainer from "../components/PageContent/PageContainer";
import { PaymentEmailForm } from "../features/payment/components/PaymentEmailForm/PaymentEmailForm";
import { PaymentEmailFormFields } from "../features/payment/models/paymentModel";
import { setEmail } from "../features/payment/slices/emailSlice";
import { loadState, SessionItems } from "../utils/storage/sessionStorage";

export default function PaymentEmailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailInfo = useSelector((state: RootState) => {
    if (!state.email.email) {
      const emailInfo = loadState(SessionItems.email) as PaymentEmailFormFields;
      return {
        email: emailInfo?.email || "",
        confirmEmail: emailInfo?.confirmEmail || "",
      };
    }
    return state.email;
  });
  const currentPath = location.pathname.split("/")[1];
  const onSubmit = React.useCallback((emailInfo: PaymentEmailFormFields) => {
    dispatch(setEmail(emailInfo));
    sessionStorage.setItem("email", JSON.stringify(emailInfo));
    navigate(`/${currentPath}/inputcard`);
  }, []);
  const onCancel = () => navigate(-1);

  return (
    <PageContainer
      title="paymentEmailPage.title"
      description="paymentEmailPage.description"
    >
      <Box sx={{ mt: 6 }}>
        <PaymentEmailForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          defaultValues={emailInfo}
        />
      </Box>
    </PageContainer>
  );
}
