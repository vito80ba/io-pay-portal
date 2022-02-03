import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import lang from "./lang";

const IT = "it";

const DETECTION_OPTIONS = {
  order: ["navigator"],
  caches: [],
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    fallbackLng: IT,
    resources: {
      ...lang,
    },
  });

export default i18n;
