import React from "react";
import { Box, Drawer, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function CustomDrawer(props: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Grid
      sx={{
        p: 3,
      }}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      container
      spacing={2}
    >
      <Grid xs={12} md={6} lg={3} item>
        <Drawer anchor="right" open={props.open} onClose={props.onClose}>
          <Box display="flex" justifyContent="end" alignItems="center">
            <IconButton
              aria-label="close"
              onClick={() => props.onClose()}
              sx={{
                color: "action.active",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {props.children}
        </Drawer>
      </Grid>
    </Grid>
  );
}
