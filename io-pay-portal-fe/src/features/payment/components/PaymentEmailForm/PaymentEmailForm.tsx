/* eslint-disable @typescript-eslint/no-empty-function */

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, Button, InputAdornment } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import TextFormField from "../../../../components/TextFormField/TextFormField";
import { getFormValidationIcon } from "../../../../utils/form/formValidation";
import { emailValidation } from "../../../../utils/regex/validators";
import {
  PaymentEmailFormErrors,
  PaymentEmailFormFields,
} from "../../models/paymentModel";

export function PaymentEmailForm() {
  const { t } = useTranslation();
  const formRef = React.useRef<FormikProps<PaymentEmailFormFields>>(null);
  const [disabled, setDisabled] = React.useState(true);

  const validate = (values: PaymentEmailFormFields) => {
    const errors: PaymentEmailFormErrors = {
      ...(values.email
        ? {
            ...(emailValidation(values.email)
              ? {}
              : { email: "paymentEmailPage.formErrors.invalid" }),
          }
        : { email: "paymentEmailPage.formErrors.required" }),
      ...(values.confirmEmail
        ? {
            ...(emailValidation(values.confirmEmail)
              ? {
                  ...(values.email === values.confirmEmail
                    ? {}
                    : { confirmEmail: "paymentEmailPage.formErrors.notEqual" }),
                }
              : { confirmEmail: "paymentEmailPage.formErrors.invalid" }),
          }
        : { confirmEmail: "paymentEmailPage.formErrors.required" }),
    };

    setDisabled(!!(errors.email || errors.confirmEmail));

    return errors;
  };

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{
          email: "",
          confirmEmail: "",
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
                  variant="outlined"
                  errorText={errors.email}
                  error={!!(errors.email && touched.email)}
                  label="paymentEmailPage.formFields.email"
                  id="email"
                  type="email"
                  value={values.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  sx={{ mb: 2 }}
                  endAdornment={
                    <InputAdornment position="end">
                      {getFormValidationIcon(!!values.email, !!errors.email)}
                    </InputAdornment>
                  }
                  startAdornment={
                    <MailOutlineIcon sx={{ mr: 2, color: "#5c6f82" }} />
                  }
                />
                <TextFormField
                  fullWidth
                  variant="outlined"
                  errorText={errors.confirmEmail}
                  error={Boolean(errors.confirmEmail && touched.confirmEmail)}
                  label="paymentEmailPage.formFields.confirmEmail"
                  id="confirmEmail"
                  type="email"
                  value={values.confirmEmail}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      {getFormValidationIcon(
                        !!values.confirmEmail,
                        !!errors.confirmEmail
                      )}
                    </InputAdornment>
                  }
                  startAdornment={
                    <MailOutlineIcon sx={{ mr: 2, color: "#5c6f82" }} />
                  }
                />
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
                  {t("paymentEmailPage.formButtons.submit")}
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </>
  );
}
