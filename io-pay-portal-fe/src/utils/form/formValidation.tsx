import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import React from "react";
export const getFormValidationIcon = (
  touched: boolean | undefined,
  error: boolean | undefined
) =>
  touched ? (
    error ? (
      <Close sx={{ mr: 1, color: "red" }} />
    ) : (
      <Check sx={{ mr: 1, color: "green" }} />
    )
  ) : undefined;
