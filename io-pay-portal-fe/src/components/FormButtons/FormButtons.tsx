/* eslint-disable functional/immutable-data */
import { default as React } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export function FormButtons(props: {
  handleSubmit: () => void;
  handleCancel: () => void;
  style?: React.CSSProperties;
  disabled: boolean;
  submitTitle: string;
  cancelTitle: string;
}) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div style={props.style}>
        <Button
          className="cancelButton"
          variant="outlined"
          onClick={props.handleCancel}
          style={{ marginRight: 10, minWidth: 119 }}
        >
          {t(props.cancelTitle)}
        </Button>
        <Button
          className="submitButton"
          variant="contained"
          onClick={props.handleSubmit}
          disabled={props.disabled}
          style={{ minWidth: 247 }}
        >
          {t(props.submitTitle)}
        </Button>
      </div>
    </React.Fragment>
  );
}

FormButtons.defaultProps = {
  style: {
    display: "flex",
    justifyContent: "center",
    padding: "16px 0 10px 0",
  },
};
