import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "@pagopa/mui-italia/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Layout } from "./components/commons/Layout";
import FirstChoose from "./routes/firstchoose";
import "./translations/i18n";
import { useSmallDevice } from "./hooks/useSmallDevice";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Layout sx={useSmallDevice() ? {} : { height: "100%" }}>
          <Routes>
            <Route path="/" element={<FirstChoose />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  );
}
