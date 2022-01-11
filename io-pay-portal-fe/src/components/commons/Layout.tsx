import React, { FunctionComponent } from "react";
import { Container, ContainerProps } from "@mui/material";
import { Box } from "@mui/system";
import { Header } from "./Header";
import { Footer } from "./Footer";

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
      <Container sx={sx} maxWidth={"sm"}>
        {children}
      </Container>
      <Footer />
    </Box>
  </>
);
