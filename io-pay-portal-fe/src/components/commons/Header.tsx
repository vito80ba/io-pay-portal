import React, { FunctionComponent } from "react";
import { Box, BoxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import LanguageToggleButton from "../LanguageToggleButton/LanguageToggleButton";

export const Header: FunctionComponent<BoxProps> = () => (
  <Box
    p={3}
    bgcolor={"white"}
    sx={{ position: { xs: "fixed", sm: "relative" } }}
  >
    <Typography variant="h3" gutterBottom component="div">
      pagoPA
    </Typography>
    <LanguageToggleButton />
  </Box>
);
