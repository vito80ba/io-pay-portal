/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Skeleton, SxProps, Typography } from "@mui/material";
import React from "react";

function SkeletonFieldContainer(props: { sx?: SxProps }) {
  const defaultStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid",
    borderBottomColor: "divider",
    pt: 2,
    pb: 2,
    width: "327px",
    height: "88px",
  };

  return (
    <Box sx={{ ...defaultStyle, ...props.sx }} maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: 3,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography variant="sidenav" component={"div"}>
            <Skeleton variant="text" width="144px" height="40px" />
          </Typography>
          <Typography variant="body2" component={"div"}>
            <Skeleton variant="text" width="188px" height="20px" />
          </Typography>
        </Box>
      </Box>
      <Skeleton variant="text" width="46px" height="20px" />
    </Box>
  );
}

export default SkeletonFieldContainer;
