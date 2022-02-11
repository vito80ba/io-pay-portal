import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function PageContainer(props: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <Box p={"3rem 0"}>
      <Typography variant="h4" component={"div"}>
        {t(props.title)}
      </Typography>
      {!!props.description && (
        <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
          {t(props.description)}
        </Typography>
      )}
      {props.children}
    </Box>
  );
}
