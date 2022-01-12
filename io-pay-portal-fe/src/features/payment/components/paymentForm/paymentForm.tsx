/* eslint-disable @typescript-eslint/no-empty-function */
import { Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormButtons } from "../../../../components/FormButtons/FormButtons";
import InformationModal from "../../../../components/InformationModal/InformationModal";
import TextFormField from "../../../../components/TextFormField/TextFormField";
import {
  PaymentFormErrors,
  PaymentFormFields,
} from "../../models/paymentModel";
import PrivacyPolicy from "../../../../components/PrivacyPolicy/PrivacyPolicy";

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
              : { billCode: t("checkoutForm.formErrors.minCode") }),
          }
        : { billCode: t("checkoutForm.formErrors.required") }),
      ...(values.cf
        ? {
            ...(/\b\d{11}\b/.test(values.cf)
              ? {}
              : { cf: t("checkoutForm.formErrors.minCf") }),
          }
        : { cf: t("checkoutForm.formErrors.required") }),
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
                  variant="standard"
                  errorText={errors.billCode}
                  error={!!(errors.billCode && touched.billCode)}
                  label="checkoutForm.formFields.billCode"
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
                  label="checkoutForm.formFields.cf"
                  id="cf"
                  type="cf"
                  value={values.cf}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>
              <div style={{ marginTop: 32 }}>
                <p>
                  {t("checkoutForm.privacyDesc")}
                  <a
                    href="#"
                    style={{ fontWeight: 600, textDecoration: "none" }}
                    onClick={() => setModalOpen(true)}
                  >
                    {t("checkoutForm.privacy")}
                  </a>
                </p>
              </div>
              <FormButtons
                submitTitle="checkoutForm.formButtons.submit"
                cancelTitle="checkoutForm.formButtons.cancel"
                disabled={disabled}
                handleSubmit={handleSubmit}
                handleCancel={() => {}}
              />
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
