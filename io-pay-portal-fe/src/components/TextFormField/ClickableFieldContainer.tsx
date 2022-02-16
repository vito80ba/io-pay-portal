/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

function ClickableFieldContainer(props: {
  title: string;
  icon: React.ReactNode;
  endAdornment: React.ReactNode;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const defaultStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    borderBottom: "1px solid",
    borderBottomColor: "#EFEFEF",
    pt: 3,
    pb: 3,
  };

  return (
    <Grid container sx={defaultStyle} onClick={props.onClick}>
      <Grid item xs={9}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            pl: 2,
            pr: 2,
          }}
        >
          {props.icon}
          <Typography variant="sidenav" component={"div"}>
            {t(props.title)}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={3} sx={{ display: "flex", justifyContent: "end", pr: 2 }}>
        {props.endAdornment}
      </Grid>
    </Grid>
  );
}

ClickableFieldContainer.defaultProps = {
  flexDirection: "column",
};

export default ClickableFieldContainer;
