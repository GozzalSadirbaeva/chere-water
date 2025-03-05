// import { createContext, useContext, useEffect, useState } from "react";

// const TranslationContext = createContext();

// export const TranslationProvider = ({ children }) => {
//   const [translations, setTranslations] = useState([]);

//   const baseUrl = import.meta.env.VITE_POCKETBASE_URL;

//   useEffect(() => {

//       .then((data) => {
//         if (data?.items) {
//           setTranslations(data.items);

//           const uzTranslations = {};
//           const ruTranslations = {};

//           data.items.forEach((item) => {
//             uzTranslations[item.key] = item.uz;
//             ruTranslations[item.key] = item.ru;
//           });

//           i18n.addResources("uz", "translation", uzTranslations);
//           i18n.addResources("ru", "translation", ruTranslations);
//         }
//       })
//       .catch((error) => console.error("Xatolik:", error));
//   }, []);

//   return (
//     <TranslationContext.Provider value={{ translations }}>
//       {children}
//     </TranslationContext.Provider>
//   );
// };

// export const useTranslations = () => useContext(TranslationContext);
