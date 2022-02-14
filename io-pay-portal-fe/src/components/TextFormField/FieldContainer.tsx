/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, SxProps, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

function FieldContainer(props: {
  title: string;
  body: string | number;
  icon: React.ReactNode;
  flexDirection?: "row" | "column";
  sx?: SxProps;
}) {
  const { t } = useTranslation();
  const defaultStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid",
    borderBottomColor: "#EFEFEF",
    pt: 2,
    pb: 2,
  };

  return (
    <Box
      sx={{
        ...defaultStyle,
        justifyContent: "start",
        gap: 3,
        ...props.sx,
      }}
    >
      {props.icon}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: props.flexDirection,
        }}
      >
        <Typography variant="body2" component={"div"}>
          {t(props.title)}
        </Typography>
        <Typography variant="sidenav" component={"div"}>
          {props.body}
        </Typography>
      </Box>
    </Box>
  );
}

FieldContainer.defaultProps = {
  flexDirection: "column",
};

export default FieldContainer;
