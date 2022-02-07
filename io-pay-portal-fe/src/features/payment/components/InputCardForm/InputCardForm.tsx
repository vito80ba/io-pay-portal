/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Visibility, VisibilityOff } from "@mui/icons-material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { Box, IconButton, InputAdornment, SvgIcon } from "@mui/material";
import cardValidator from "card-validator";
import { Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import sprite from "../../../../../src-pug/assets/icons/app.svg";
import { FormButtons } from "../../../../components/FormButtons/FormButtons";
import TextFormField from "../../../../components/TextFormField/TextFormField";
import { expireDateFormatter } from "../../../../utils/form/formatters";
import {
  expirationDateChangeValidation,
  getFormValidationIcon,
} from "../../../../utils/form/formValidation";
import { digitValidation } from "../../../../utils/regex/validators";
import {
  InputCardFormErrors,
  InputCardFormFields,
} from "../../models/paymentModel";

export function InputCardForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formRef = React.useRef<FormikProps<InputCardFormFields>>(null);
  const [disabled, setDisabled] = React.useState(true);
  const [showNumber, setShowNumber] = React.useState(false);
  const [showCvv, setShowCvv] = React.useState(false);
  const [cvvLength, setCvvLength] = React.useState(3);
  const [ccIcon, setCcIcon] = React.useState<string | undefined>(undefined);

  const validate = (values: InputCardFormFields) => {
    cardValidator.number(values.number).card?.type === "american-express"
      ? setCvvLength(4)
      : setCvvLength(3);
    values.number && setCcIcon(cardValidator.number(values.number).card?.type);
    const errors: InputCardFormErrors = {
      ...(values.name
        ? {
            ...(cardValidator.cardholderName(values.name).isValid
              ? {}
              : { name: "inputCardPage.formErrors.name" }),
          }
        : { name: "inputCardPage.formErrors.required" }),
      ...(values.number
        ? {
            ...(cardValidator.number(values.number).isValid
              ? {}
              : { number: "inputCardPage.formErrors.number" }),
          }
        : { number: "inputCardPage.formErrors.required" }),
      ...(values.expirationDate
        ? {
            ...(cardValidator.expirationDate(values.expirationDate).isValid
              ? {}
              : {
                  expirationDate: "inputCardPage.formErrors.expirationDate",
                }),
          }
        : { expirationDate: "inputCardPage.formErrors.required" }),
      ...(values.cvv
        ? {
            ...(cardValidator.cvv(values.cvv, cvvLength).isValid
              ? {}
              : {
                  cvv: "inputCardPage.formErrors.cvv",
                }),
          }
        : { cvv: "inputCardPage.formErrors.required" }),
    };

    setDisabled(!!Object.keys(errors).length);

    return errors;
  };

  const handleShowNumber = () => setShowNumber(!showNumber);
  const handleShowCvv = () => setShowCvv(!showCvv);
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{
          name: "",
          number: "",
          expirationDate: "",
          cvv: "",
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
                  errorText={errors.name}
                  error={!!(errors.name && touched.name)}
                  label="inputCardPage.formFields.name"
                  id="name"
                  type="text"
                  inputMode="numeric"
                  value={values.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  sx={{ mb: 2 }}
                  endAdornment={
                    <InputAdornment position="end">
                      {getFormValidationIcon(!!values.name, !!errors.name)}
                    </InputAdornment>
                  }
                  startAdornment={
                    <PersonIcon sx={{ mr: 2, color: "#5c6f82" }} />
                  }
                />
                <TextFormField
                  fullWidth
                  variant="outlined"
                  errorText={errors.number}
                  error={!!(errors.number && touched.number)}
                  label="inputCardPage.formFields.number"
                  id="number"
                  type={showNumber ? "text" : "password"}
                  inputMode="numeric"
                  value={values.number}
                  autoComplete="cc-number"
                  handleChange={(e) => {
                    e.currentTarget.value || handleChange(e);
                    digitValidation(e.currentTarget.value) &&
                      e.currentTarget.value.length <= 19 &&
                      handleChange(e);
                  }}
                  handleBlur={handleBlur}
                  sx={{ mb: 2 }}
                  endAdornment={
                    <InputAdornment position="end">
                      {getFormValidationIcon(!!values.number, !!errors.number)}
                      <IconButton
                        onClick={handleShowNumber}
                        onMouseDown={handleMouseDown}
                      >
                        {showNumber ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  startAdornment={
                    ccIcon ? (
                      <SvgIcon sx={{ mr: 2, color: "#5c6f82" }}>
                        <use href={sprite + `#icons-${ccIcon}-mini`} />
                      </SvgIcon>
                    ) : (
                      <CreditCardIcon sx={{ mr: 2, color: "#5c6f82" }} />
                    )
                  }
                />
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{ gap: 2 }}
                >
                  <TextFormField
                    fullWidth
                    variant="outlined"
                    errorText={errors.expirationDate}
                    error={!!(errors.expirationDate && touched.expirationDate)}
                    label="inputCardPage.formFields.expirationDate"
                    id="expirationDate"
                    type="text"
                    inputMode="numeric"
                    value={values.expirationDate}
                    handleChange={(e) => {
                      const value = e.currentTarget.value;
                      if (expirationDateChangeValidation(value)) {
                        e.currentTarget.value = expireDateFormatter(
                          values.expirationDate,
                          value
                        );
                        handleChange(e);
                      }
                    }}
                    handleBlur={handleBlur}
                    sx={{ mb: 2 }}
                    endAdornment={
                      <InputAdornment position="end">
                        {getFormValidationIcon(
                          !!values.expirationDate,
                          !!errors.expirationDate
                        )}
                      </InputAdornment>
                    }
                    startAdornment={
                      <DateRangeIcon sx={{ mr: 2, color: "#5c6f82" }} />
                    }
                  />
                  <TextFormField
                    fullWidth
                    variant="outlined"
                    errorText={errors.cvv}
                    error={!!(errors.cvv && touched.cvv)}
                    label="inputCardPage.formFields.cvv"
                    id="cvv"
                    type={showCvv ? "text" : "password"}
                    inputMode="numeric"
                    value={values.cvv}
                    handleChange={(e) => {
                      e.currentTarget.value || handleChange(e);
                      digitValidation(e.currentTarget.value) &&
                        e.currentTarget.value.length <= cvvLength &&
                        handleChange(e);
                    }}
                    handleBlur={handleBlur}
                    sx={{ mb: 2 }}
                    endAdornment={
                      <InputAdornment position="end">
                        {getFormValidationIcon(!!values.cvv, !!errors.cvv)}
                        <IconButton
                          onClick={handleShowCvv}
                          onMouseDown={handleMouseDown}
                        >
                          {showCvv ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    startAdornment={
                      <LockIcon sx={{ mr: 2, color: "#5c6f82" }} />
                    }
                  />
                </Box>
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
