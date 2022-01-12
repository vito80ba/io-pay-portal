/* eslint-disable @typescript-eslint/ban-types */
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function InformationModal(props: {
  open: boolean;
  onClose: () => void;
  content?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Dialog
      maxWidth="lg"
      PaperProps={{
        style: {
          borderRadius: 4,
          width: "auto",
          ...props.style,
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
