import { Box, BoxProps } from "@mui/material";
import React, { FunctionComponent } from "react";
import pagopaLogo from "../../assets/images/pagopa-logo.svg";

export const Header: FunctionComponent<BoxProps> = () => (
  <Box
    p={3}
    bgcolor={"white"}
    sx={{
      position: { xs: "fixed", sm: "relative" },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      zIndex: 1000,
    }}
  >
    <img
      src={pagopaLogo}
      alt="pagoPA"
      style={{ width: "56px", height: "36px" }}
    />
  </Box>
);
