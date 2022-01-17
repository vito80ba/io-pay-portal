/* eslint-disable functional/immutable-data */
import { Button, Grid } from "@mui/material";
import { default as React } from "react";
import { useTranslation } from "react-i18next";
import { useSmallDevice } from "../../hooks/useSmallDevice";

export function FormButtons(props: {
  handleSubmit: () => void;
  handleCancel: () => void;
  disabled: boolean;
  submitTitle: string;
  cancelTitle: string;
}) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Grid
        sx={
          useSmallDevice()
            ? {
                flexGrow: 1,
                position: "fixed",
                zIndex: 1000,
                bottom: 0,
                left: 0,
                padding: "1rem",
                boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
                backgroundColor: "#fff",
              }
            : { flexGrow: 1, marginTop: "48px" }
        }
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        container
        spacing={2}
      >
        <Grid
          xs={4}
          md={4}
          lg={4}
          xl={4}
          style={useSmallDevice() ? { paddingTop: 0 } : {}}
          item
        >
          <Button
            className="cancelButton"
            variant="outlined"
            onClick={props.handleCancel}
            style={{
              width: "100%",
              height: "100%",
              minHeight: 45,
              padding: "10px 24px",
            }}
          >
            {t(props.cancelTitle)}
          </Button>
        </Grid>
        <Grid
          xs={8}
          md={8}
          lg={8}
          xl={8}
          style={useSmallDevice() ? { paddingTop: 0 } : {}}
          item
        >
          <Button
            className="submitButton"
            variant="contained"
            onClick={props.handleSubmit}
            disabled={props.disabled}
            style={{
              width: "100%",
              height: "100%",
              minHeight: 45,
              padding: "10px 24px",
            }}
          >
            {t(props.submitTitle)}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
