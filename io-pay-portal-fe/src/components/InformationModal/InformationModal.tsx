/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/ban-types */
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";

function InformationModal(props: {
  open: boolean;
  onClose: () => void;
  content?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  maxWidth?: "xs" | "sm" | "lg";
}) {
  return (
    <Dialog
      maxWidth={props.maxWidth}
      PaperProps={{
        style: {
          ...props.style,
        },
        sx: {
          width: "auto",
          borderRadius: 1,
        },
      }}
      fullWidth
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={() => props.onClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}

InformationModal.defaultProps = {
  maxWidth: "lg",
};

export default InformationModal;
