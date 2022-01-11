import { Box, BoxProps } from "@mui/material";
import React, { FunctionComponent } from "react";
import pagopaLogo from "../../assets/images/pagopa-logo.svg";
import LanguageMenu from "../LanguageMenu/LanguageMenu";

export const Header: FunctionComponent<BoxProps> = () => (
  <Box
    p={3}
    bgcolor={"white"}
    sx={{
      position: { xs: "fixed", sm: "relative" },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <img
      src={pagopaLogo}
      alt="pagoPA"
      style={{ width: "56px", height: "36px" }}
    />
    <LanguageMenu />
  </Box>
);
