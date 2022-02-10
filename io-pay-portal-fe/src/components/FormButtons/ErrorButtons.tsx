import { Button, Grid } from "@mui/material";
import { default as React } from "react";
import { useTranslation } from "react-i18next";
import { useSmallDevice } from "../../hooks/useSmallDevice";
import { ErrorModalBtn } from "../../utils/errors/errorsModel";

export function ErrorButtons(props: {
  handleClose: () => void;
  buttonsDetail: Array<ErrorModalBtn>;
}) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Grid
        sx={{
          mt: 4,
        }}
        justifyContent="end"
        flexDirection="row"
        alignItems="center"
        container
        spacing={2}
      >
        {props.buttonsDetail.map((button, index) => (
          <Grid
            key={index}
            xs={4}
            style={useSmallDevice() ? { paddingTop: 0 } : {}}
            item
          >
            <Button
              variant={index ? "contained" : "text"}
              onClick={button.action ? button.action : props.handleClose}
              style={{
                width: "100%",
                height: "100%",
                minHeight: 45,
              }}
            >
              {t(button.title)}
            </Button>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
