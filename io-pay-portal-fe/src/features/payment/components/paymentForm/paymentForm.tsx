/* eslint-disable @typescript-eslint/no-empty-function */

import { Box, Button, InputAdornment } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import InformationModal from "../../../../components/InformationModal/InformationModal";
import PrivacyPolicy from "../../../../components/PrivacyPolicy/PrivacyPolicy";
import TextFormField from "../../../../components/TextFormField/TextFormField";
import { getFormValidationIcon } from "../../../../utils/form/formValidation";
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
              <Box>
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
                  sx={{ mb: 2 }}
                  endAdornment={
                    <InputAdornment position="end">
                      {getFormValidationIcon(
                        touched.billCode,
                        !!errors.billCode
                      )}
                    </InputAdornment>
                  }
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
                  endAdornment={
                    <InputAdornment position="end">
                      {getFormValidationIcon(touched.cf, !!errors.cf)}
                    </InputAdornment>
                  }
                />
              </Box>
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
