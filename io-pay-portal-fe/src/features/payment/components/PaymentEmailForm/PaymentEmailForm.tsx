/* eslint-disable @typescript-eslint/no-empty-function */

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, InputAdornment } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FormButtons } from "../../../../components/FormButtons/FormButtons";
import TextFormField from "../../../../components/TextFormField/TextFormField";
import { getFormErrorIcon } from "../../../../utils/form/formValidation";
import { emailValidation } from "../../../../utils/regex/validators";
import {
  PaymentEmailFormErrors,
  PaymentEmailFormFields,
} from "../../models/paymentModel";

export function PaymentEmailForm() {
  const navigate = useNavigate();
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

  const currentPath = location.pathname.split("/")[1];
  const handleContinue = React.useCallback(() => {
    navigate(`/${currentPath}/inputcard`);
  }, []);

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{
          email: "",
          confirmEmail: "",
        }}
        validate={validate}
        onSubmit={handleContinue}
      >
        {({
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
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
                sx={{ mb: 4 }}
                endAdornment={
                  <InputAdornment position="end">
                    {getFormErrorIcon(!!values.email, !!errors.email)}
                  </InputAdornment>
                }
                startAdornment={
                  <MailOutlineIcon sx={{ mr: 2 }} color="action" />
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
                    {getFormErrorIcon(
                      !!values.confirmEmail,
                      !!errors.confirmEmail
                    )}
                  </InputAdornment>
                }
                startAdornment={
                  <MailOutlineIcon sx={{ mr: 2 }} color="action" />
                }
              />
            </Box>
            <FormButtons
              submitTitle="paymentEmailPage.formButtons.submit"
              cancelTitle="paymentEmailPage.formButtons.cancel"
              disabled={disabled}
              handleSubmit={() => handleSubmit()}
              handleCancel={() => navigate(-1)}
            />
          </form>
        )}
      </Formik>
    </>
  );
}
