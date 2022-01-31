/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Button } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import InformationModal from "../../../../components/InformationModal/InformationModal";
import PrivacyPolicy from "../../../../components/PrivacyPolicy/PrivacyPolicy";
import TextFormField from "../../../../components/TextFormField/TextFormField";
import {
  PaymentFormErrors,
  PaymentFormFields,
} from "../../models/paymentModel";

export function PaymentForm() {
  const { t } = useTranslation();
  const formRef = React.useRef<FormikProps<PaymentFormFields>>(null);
  const [disabled, setDisabled] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);

  const validate = (values: PaymentFormFields) => {
    const errors: PaymentFormErrors = {
      ...(values.billCode
        ? {
            ...(/\b\d{18}\b/.test(values.billCode)
              ? {}
              : { billCode: "paymentPage.formErrors.minCode" }),
          }
        : { billCode: "paymentPage.formErrors.required" }),
      ...(values.cf
        ? {
            ...(/\b\d{11}\b/.test(values.cf)
              ? {}
              : { cf: "paymentPage.formErrors.minCf" }),
          }
        : { cf: "paymentPage.formErrors.required" }),
    };

    setDisabled(!!(errors.billCode || errors.cf));

    return errors;
  };

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{
          billCode: "",
          cf: "",
        }}
        validate={validate}
        onSubmit={() => {}}
      >
        {(formikProps) => {
          const {
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
          } = formikProps;
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <TextFormField
                  fullWidth
                  variant="standard"
                  errorText={errors.billCode}
                  error={!!(errors.billCode && touched.billCode)}
                  label="paymentPage.formFields.billCode"
                  id="billCode"
                  type="billCode"
                  value={values.billCode}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  style={{ marginBottom: 16 }}
                />
                <TextFormField
                  fullWidth
                  variant="standard"
                  errorText={errors.cf}
                  error={Boolean(errors.cf && touched.cf)}
                  label="paymentPage.formFields.cf"
                  id="cf"
                  type="cf"
                  value={values.cf}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>
              <div style={{ marginTop: 32 }}>
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
                    href="#"
                    style={{ fontWeight: 600, textDecoration: "none" }}
                    onClick={() => setModalOpen(true)}
                  >
                    {t("paymentPage.privacyPolicy")}
                  </a>
                  {` ${t("general.and")} `}
                  <a
                    href="#"
                    style={{ fontWeight: 600, textDecoration: "none" }}
                    onClick={() => setModalOpen(true)}
                  >
                    {t("paymentPage.serviceTerms")}
                  </a>
                  {")."}
                </p>
              </div>
              <Box
                sx={{
                  position: { xs: "fixed", sm: "relative" },
                  zIndex: { xs: 1000, sm: 0 },
                  bottom: { xs: 0 },
                  left: { xs: 0 },
                  p: { xs: "1rem", sm: 0 },
                  boxShadow: { xs: "0 0.5rem 1rem rgb(0 0 0 / 15%)", sm: 0 },
                  bgcolor: { xs: "background.default" },
                  mt: { sm: 6 },
                  width: "100%",
                }}
              >
                <Button
                  className="submitButton"
                  variant="contained"
                  disabled={disabled}
                  onClick={() => handleSubmit()}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: 45,
                    padding: "10px 24px",
                  }}
                >
                  {t("paymentPage.formButtons.submit")}
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
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
