import { Grid, Box, Typography, List } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { RootState } from "../../app/store";
import pagopaLogo from "../../assets/images/pagopa-logo.svg";
import { loadState, SessionItems } from "../../utils/storage/sessionStorage";
import { PaymentInfo } from "../../features/payment/models/paymentModel";
import { moneyFormat } from "../../utils/form/formatters";

export default function Header() {
  const [drawstate, setDrawstate] = React.useState(false);

  const paymentInfo = useSelector((state: RootState) => {
    if (!state.payment.codiceContestoPagamento) {
      return loadState(SessionItems.paymentInfo) as PaymentInfo;
    }
    return state.payment;
  });
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawstate(open);
  };

  return (
    <Box p={3} bgcolor={"white"}>
      <Grid container spacing={0}>
        <Grid item xs={2} display="flex" alignItems="center">
          <img
            src={pagopaLogo}
            alt="pagoPA"
            style={{ width: "56px", height: "36px" }}
          />
        </Grid>
        <Grid item xs={8} sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography
            variant="body2"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {paymentInfo
              ? paymentInfo.enteBeneficiario.denominazioneBeneficiario
              : ""}
          </Typography>
          <Typography
            fontWeight={600}
            variant="body2"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {paymentInfo ? paymentInfo.causaleVersamento : ""}
          </Typography>
          <Typography
            color="primary.main"
            variant="body2"
            component="div"
            fontWeight={600}
            sx={{ textAlign: "center" }}
          >
            {paymentInfo
              ? `€ ${moneyFormat(paymentInfo.importoSingoloVersamento)}`
              : ""}
          </Typography>
        </Grid>
        <Grid
          item
          xs={10}
          sx={{ display: { sm: "none" } }}
          display="flex"
          alignItems="center"
        >
          <Typography
            color="primary.main"
            variant="body2"
            component="div"
            fontWeight={600}
            display="flex"
            alignItems="center"
            justifyContent="end"
          >
            {paymentInfo
              ? `€ ${moneyFormat(paymentInfo.importoSingoloVersamento)}`
              : ""}
            <InfoOutlinedIcon
              color="primary"
              sx={{ ml: 1 }}
              onClick={toggleDrawer(true)}
            />
          </Typography>
        </Grid>
      </Grid>
      <Drawer anchor="bottom" open={drawstate} onClose={toggleDrawer(false)}>
        <Typography
          variant="body2"
          component="div"
          sx={{ textAlign: "center" }}
        >
          <Box
            sx={{ width: "auto" }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List></List>
          </Box>
        </Typography>
      </Drawer>
    </Box>
  );
}
