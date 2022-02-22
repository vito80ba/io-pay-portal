import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, Drawer, IconButton } from "@mui/material";
import React from "react";

export function CustomDrawer(props: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={props.onClose}
      sx={{ p: 3 }}
    >
      <Container sx={{ p: 3 }} maxWidth="xs">
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
      </Container>
    </Drawer>
  );
}
