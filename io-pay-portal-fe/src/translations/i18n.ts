import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_IT } from "./it/translations";

const EN = "en";
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
    fallbackLng: EN,
    resources: {
      [EN]: {
        translation: TRANSLATIONS_EN,
      },
      [IT]: {
        translation: TRANSLATIONS_IT,
      },
    },
  });

export default i18n;
