/* eslint-disable functional/immutable-data */
import { default as React } from "react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

export function FormButtons(props: {
  handleSubmit: () => void;
  handleCancel: () => void;
  disabled: boolean;
  submitTitle: string;
  cancelTitle: string;
}) {
  const { t } = useTranslation();
  const smallDevice = useMediaQuery("(max-width: 382px)");

  return (
    <React.Fragment>
      <Grid
        sx={{ flexGrow: 1, marginTop: "48px" }}
        justifyContent="center"
        flexDirection={smallDevice ? "column" : "row"}
        alignItems="center"
        container
        spacing={2}
      >
        <Grid
          xs={3}
          md={3}
          lg={3}
          xl={3}
          style={smallDevice ? { minWidth: 320 } : {}}
          item
        >
          <Button
            className="cancelButton"
            variant="outlined"
            onClick={props.handleCancel}
            style={{ width: "100%", height: "100%", minHeight: 45 }}
          >
            {t(props.cancelTitle)}
          </Button>
        </Grid>
        <Grid
          xs={6}
          md={6}
          lg={6}
          xl={6}
          style={smallDevice ? { minWidth: 320 } : {}}
          item
        >
          <Button
            className="submitButton"
            variant="contained"
            onClick={props.handleSubmit}
            disabled={props.disabled}
            style={{ width: "100%", height: "100%", minHeight: 45 }}
          >
            {t(props.submitTitle)}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
