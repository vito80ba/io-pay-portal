import { Container, ContainerProps } from "@mui/material";
import { Box } from "@mui/system";
import React, { FunctionComponent } from "react";
import Footer from "./Footer";
import { Header } from "./Header";

export const Layout: FunctionComponent<ContainerProps> = ({ sx, children }) => (
  <>
    <Box
      sx={{
        display: { sm: "flex" },
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Container
        sx={{ ...sx, p: { xs: 6, sm: 0 }, height: { xs: "100%" } }}
        maxWidth={"sm"}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  </>
);
