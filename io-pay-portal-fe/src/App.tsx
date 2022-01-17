import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@pagopa/mui-italia/theme";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/commons/Layout";
import { useSmallDevice } from "./hooks/useSmallDevice";
import PaymentPage from "./routes/PaymentPage";
import PaymentSummaryPage from "./routes/PaymentSummaryPage";
import "./translations/i18n";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout sx={useSmallDevice() ? {} : { height: "100%" }}>
          <Routes>
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/summary" element={<PaymentSummaryPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
