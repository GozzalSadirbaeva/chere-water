import { createContext, useContext, useEffect, useState } from "react";
import { useGetTranslations } from "../api";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { data, error, isLoading } = useGetTranslations();
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );

  useEffect(() => {
    if (data?.items) {
      const mappedTranslations = {};
      data.items.forEach((item) => {
        mappedTranslations[item.key] = item;
      });
      setTranslations(mappedTranslations);
    }
  }, [data]);

  const t = (key, isHTML = false) => {
    const translation = translations[key]?.[language] || key;
    return isHTML ? parseHTMLString(translation) : translation;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <TranslationContext.Provider
      value={{ t, language, changeLanguage, isLoading, error }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};
