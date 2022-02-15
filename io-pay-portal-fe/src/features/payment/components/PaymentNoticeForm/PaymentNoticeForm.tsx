/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Box, InputAdornment } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React from "react";
import { FormButtons } from "../../../../components/FormButtons/FormButtons";
import TextFormField from "../../../../components/TextFormField/TextFormField";
import { cleanSpaces } from "../../../../utils/form/formatters";
import { getFormValidationIcon } from "../../../../utils/form/formValidation";
import {
  PaymentFormErrors,
  PaymentFormFields,
} from "../../models/paymentModel";

export function PaymentNoticeForm(props: {
  onCancel: () => void;
  onSubmit: (notice: PaymentFormFields) => void;
}) {
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

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{
          billCode: "",
          cf: "",
        }}
        validate={validate}
        onSubmit={props.onSubmit}
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
                errorText={errors.billCode}
                error={!!(errors.billCode && touched.billCode)}
                label="paymentPage.formFields.billCode"
                id="billCode"
                type="text"
                inputMode="numeric"
                value={values.billCode}
                handleChange={(e) => {
                  e.currentTarget.value = cleanSpaces(e.currentTarget.value);
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
                variant="outlined"
                errorText={errors.cf}
                error={Boolean(errors.cf && touched.cf)}
                label="paymentPage.formFields.cf"
                id="cf"
                type="text"
                inputMode="numeric"
                value={values.cf}
                handleChange={(e) => {
                  e.currentTarget.value = cleanSpaces(e.currentTarget.value);
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
            <FormButtons
              submitTitle="paymentPage.formButtons.submit"
              cancelTitle="paymentPage.formButtons.cancel"
              disabled={disabled}
              handleSubmit={() => handleSubmit()}
              handleCancel={props.onCancel}
            />
          </form>
        )}
      </Formik>
    </>
  );
}
