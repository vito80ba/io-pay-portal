/* eslint-disable @typescript-eslint/no-empty-function */
import { Formik, FormikProps } from "formik";
import React from "react";
import { FormButtons } from "../../../../components/FormButtons/FormButtons";
import TextFormField from "../../../../components/TextFormField/TextFormField";
import {
  PaymentFormErrors,
  PaymentFormFields,
} from "../../models/paymentModel";

export function PaymentForm() {
  const formRef = React.useRef<FormikProps<PaymentFormFields>>(null);
  const [disabled, setDisabled] = React.useState(true);
  const validate = (values: PaymentFormFields) => {
    const errors: PaymentFormErrors = {
      ...(values.billCode ? {} : { billCode: "checkout.formErrors.required" }),
      ...(values.cf ? {} : { cf: "checkout.formErrors.required" }),
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
              <div className="tenantsFormRow">
                <TextFormField
                  fullWidth
                  errorText={errors.billCode}
                  error={!!(errors.billCode && touched.billCode)}
                  label="checkout.formFields.billCode"
                  id="billCode"
                  type="billCode"
                  value={values.billCode}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <TextFormField
                  fullWidth
                  errorText={errors.cf}
                  error={Boolean(errors.cf && touched.cf)}
                  label="checkout.formFields.cf"
                  id="cf"
                  type="cf"
                  value={values.cf}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>
              <FormButtons
                submitTitle="checkout.formButtons.submit"
                cancelTitle="checkout.formButtons.cancel"
                disabled={disabled}
                handleSubmit={handleSubmit}
                handleCancel={() => {}}
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
}
