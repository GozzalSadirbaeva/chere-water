import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {}, // Boshlanishida bo‘sh holda
  lng: "uz", // Default til
  fallbackLng: "uz",
  interpolation: { escapeValue: false },
});

export default i18n;
