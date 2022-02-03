/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Box, InputAdornment } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { FormButtons } from "../../../../components/FormButtons/FormButtons";
import PrivacyInfo from "../../../../components/PrivacyPolicy/PrivacyInfo";
import TextFormField from "../../../../components/TextFormField/TextFormField";
import { getFormValidationIcon } from "../../../../utils/form/formValidation";
import {
  PaymentFormErrors,
  PaymentFormFields,
} from "../../models/paymentModel";

export function PaymentNoticeForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = React.useRef<FormikProps<PaymentFormFields>>(null);
  const [disabled, setDisabled] = React.useState(true);

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

  const currentPath = location.pathname.split("/")[1];
  const handleContinue = React.useCallback(() => {
    navigate(`/${currentPath}/summary`);
  }, []);

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{
          billCode: "",
          cf: "",
        }}
        validate={validate}
        onSubmit={handleContinue}
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
                  type="text"
                  inputMode="numeric"
                  value={values.billCode}
                  handleChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\s/g,
                      ""
                    );
                    handleChange(e);
                  }}
                  handleBlur={handleBlur}
                  sx={{ mb: 2 }}
                  endAdornment={
                    <InputAdornment position="end">
                      {getFormValidationIcon(
                        !!values.billCode,
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
                  type="text"
                  inputMode="numeric"
                  value={values.cf}
                  handleChange={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\s/g,
                      ""
                    );
                    handleChange(e);
                  }}
                  handleBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      {getFormValidationIcon(!!values.cf, !!errors.cf)}
                    </InputAdornment>
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
                <FormButtons
                  submitTitle="paymentPage.formButtons.submit"
                  cancelTitle="paymentPage.formButtons.cancel"
                  disabled={disabled}
                  handleSubmit={() => handleSubmit()}
                  handleCancel={() => {
                    navigate(-1);
                  }}
                />
              </Box>
            </form>
          );
        }}
      </Formik>
    </>
  );
}
