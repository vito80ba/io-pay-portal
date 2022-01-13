import { Container, ContainerProps } from "@mui/material";
import { Box } from "@mui/system";
import React, { FunctionComponent } from "react";
import { useSmallDevice } from "../../hooks/useSmallDevice";
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
        sx={sx}
        maxWidth={"sm"}
        style={useSmallDevice() ? { paddingTop: "48px" } : {}}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  </>
);
