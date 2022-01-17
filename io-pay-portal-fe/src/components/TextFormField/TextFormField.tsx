/* eslint-disable functional/immutable-data */
import { TextField } from "@mui/material";
import React, { FocusEventHandler, FormEventHandler } from "react";
import { useTranslation } from "react-i18next";

interface TextFormFieldProps {
  fullWidth: boolean;
  errorText: string | undefined;
  error: boolean;
  label: string;
  type: string;
  id: string;
  variant?: "outlined" | "standard" | "filled" | undefined;
  style?: React.CSSProperties;
  value?: string | number;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  handleChange: FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function TextFormField(props: TextFormFieldProps) {
  const { t } = useTranslation();

  return (
    <TextField
      fullWidth={props.fullWidth}
      margin="dense"
      disabled={props.disabled}
      helperText={props.errorText ? t(props.errorText) : ""}
      error={props.error}
      label={t(props.label)}
      id={props.id}
      name={props.id}
      variant={props.variant}
      style={props.style}
      InputProps={{
        name: props.id,
        type: props.type,
        onChange: props.handleChange,
        onBlur: props.handleBlur,
        endAdornment: props.endAdornment,
        value: props.value,
        readOnly: props.readOnly,
      }}
    />
  );
}

TextFormField.defaultProps = {
  variant: "outlined",
  style: undefined,
  endAdornment: undefined,
  disabled: false,
  readOnly: false,
};

export default TextFormField;
