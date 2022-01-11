import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageToggleButton(props: {
  style?: React.CSSProperties;
}) {
  const { i18n } = useTranslation();
  const [lang, setLang] = React.useState<string>(i18n.language.split("-")[0]);

  const changeLanguageHandler = React.useCallback(async () => {
    const newLang = lang === "it" ? "en" : "it";
    setLang(newLang);
    await i18n.changeLanguage(newLang);
  }, [lang]);

  return (
    <Button
      variant="contained"
      style={props.style}
      onClick={changeLanguageHandler}
    >
      {lang.toUpperCase()}
    </Button>
  );
}
