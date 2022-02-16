import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@pagopa/mui-italia/theme";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/commons/Layout";
import IndexPage from "./routes/IndexPage";
import InputCardPage from "./routes/InputCardPage";
import PaymentEmailPage from "./routes/PaymentEmailPage";
import PaymentOutlet from "./routes/PaymentOutlet";
import PaymentNoticePage from "./routes/PaymentNoticePage";
import PaymentSummaryPage from "./routes/PaymentSummaryPage";
import "./translations/i18n";
import { isStateEmpty } from "./utils/storage/sessionStorage";

const checkoutTheme = createTheme({
  ...theme,
  components: {
    ...theme.components,
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          height: 0,
        },
      },
    },
  },
});

export function App() {
  const fixedFooterPages = ["payment", "qrcode"];

  return (
    <ThemeProvider theme={checkoutTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout fixedFooterPages={fixedFooterPages}>
          <Routes>
            <Route path="/" element={<Navigate to="/payment" />} />
            <Route path="/payment" element={<PaymentOutlet />}>
              <Route path="" element={<IndexPage />} />
              <Route path="notice" element={<PaymentNoticePage />} />
              <Route
                path="summary"
                element={
                  isStateEmpty() ? (
                    <Navigate to="/payment" />
                  ) : (
                    <PaymentSummaryPage />
                  )
                }
              />
              <Route path="email" element={<PaymentEmailPage />} />
              <Route path="inputcard" element={<InputCardPage />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
