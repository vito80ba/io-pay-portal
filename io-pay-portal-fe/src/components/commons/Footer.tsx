import React, { FunctionComponent } from "react";
import { Box, BoxProps } from "@mui/material";
import Typography from "@mui/material/Typography";

export const Footer: FunctionComponent<BoxProps> = () => (
  <Box
    p={3}
    sx={{
      bgcolor: "primary.light",
    }}
  >
    <Typography variant="h3" gutterBottom component="div">
      Footer stuffs
    </Typography>
  </Box>
);
