/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/ban-types */
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  PaymentCategoryResponses,
  PaymentFaultCategory,
  PaymentResponses,
} from "../../utils/errors/errorsModel";
import { ErrorButtons } from "../FormButtons/ErrorButtons";

function ErrorModal(props: {
  error: string;
  open: boolean;
  onClose: () => void;
  style?: React.CSSProperties;
}) {
  const { t } = useTranslation();
  const [copy, setCopy] = React.useState(t("clipboard.copy"));
  const isCustom = (error: string) =>
    PaymentResponses[error]?.category === PaymentFaultCategory.CUSTOM;
  const notListed = (error: string) => PaymentResponses[error] === undefined;

  const title = isCustom(props.error)
    ? PaymentResponses[props.error]?.title
    : notListed(props.error)
    ? PaymentCategoryResponses[PaymentFaultCategory.NOTLISTED]?.title
    : PaymentCategoryResponses[PaymentResponses[props.error]?.category]?.title;
  const body = isCustom(props.error)
    ? PaymentResponses[props.error]?.body
    : notListed(props.error)
    ? PaymentCategoryResponses[PaymentFaultCategory.NOTLISTED]?.body
    : PaymentCategoryResponses[PaymentResponses[props.error]?.category]?.detail
    ? "ErrorCodeDescription"
    : PaymentCategoryResponses[PaymentResponses[props.error]?.category]?.body;
  const buttonsDetail = notListed(props.error)
    ? PaymentCategoryResponses[PaymentFaultCategory.NOTLISTED]?.buttons
    : PaymentCategoryResponses[PaymentResponses[props.error]?.category]
        ?.buttons;

  return (
    <Dialog
      PaperProps={{
        style: {
          ...props.style,
        },
        sx: {
          width: "600px",
          borderRadius: 1,
          p: 4,
        },
      }}
      fullWidth
      open={props.open}
      onClose={props.onClose}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box>
          <Typography variant="h3" component={"div"} sx={{ mb: 2 }}>
            {t(title || "")}
          </Typography>
          <Typography paragraph={true}>{t(body || "")}</Typography>
          {body === "ErrorCodeDescription" && (
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                bgcolor: "#e0f2f9",
                p: 2,
                borderRadius: "4px",
              }}
            >
              <Typography
                variant="h5"
                component={"div"}
                sx={{
                  fontSize: "16px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {props.error}
              </Typography>
              <Tooltip title={copy} onMouseOver={(e) => e.stopPropagation()}>
                <Button
                  variant="text"
                  onClick={() => {
                    void navigator.clipboard.writeText(props.error);
                    setCopy(t("clipboard.copied"));
                  }}
                  onMouseLeave={() => setCopy(t("clipboard.copy"))}
                >
                  <ContentCopyIcon sx={{ mr: 1 }} /> {t("clipboard.copy")}
                </Button>
              </Tooltip>
            </Box>
          )}
          <ErrorButtons
            handleClose={props.onClose}
            buttonsDetail={buttonsDetail || []}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorModal;
