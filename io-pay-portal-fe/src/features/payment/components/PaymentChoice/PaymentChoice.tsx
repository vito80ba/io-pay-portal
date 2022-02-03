import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardIcon from "@mui/icons-material/Keyboard";

export function PaymentChoice() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleClickOnQR = React.useCallback(() => {
    navigate(`${currentPath}/qr-reader`);
  }, []);
  const handleClickOnForm = React.useCallback(() => {
    navigate(`${currentPath}/notice`);
  }, []);

  const defaultStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    ml: 2,
    mr: 2,
  };

  return (
    <>
      <Grid container sx={defaultStyle} onClick={() => handleClickOnQR()}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <QrCodeScannerIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" component={"div"}>
              <Box
                sx={{
                  ...defaultStyle,
                  flexDirection: "column",
                  alignItems: "baseline",
                  gap: 1,
                }}
              >
                <Box sx={{ fontWeight: 600 }}>
                  {t("paymentChoice.qr.title")}
                </Box>
                <Box>{t("paymentChoice.qr.description")}</Box>
              </Box>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          <ArrowForwardIosIcon sx={{ color: "primary.main" }} />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ ...defaultStyle, mt: 6 }}
        onClick={() => handleClickOnForm()}
      >
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <KeyboardIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" component={"div"}>
              <Box
                sx={{
                  ...defaultStyle,
                  flexDirection: "column",
                  alignItems: "baseline",
                  gap: 1,
                }}
              >
                <Box sx={{ fontWeight: 600 }}>
                  {t("paymentChoice.form.title")}
                </Box>
                <Box>{t("paymentChoice.form.description")}</Box>
              </Box>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          <ArrowForwardIosIcon sx={{ color: "primary.main" }} />
        </Grid>
      </Grid>
    </>
  );
}
