import { useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetTranslations } from "../../api";
import useParseHTML from "../../hooks/useParseHTML";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { lang = "uz" } = useParams();
  const { pathname } = useLocation();
  const { parseHTMLString } = useParseHTML();

  const changeLanguage = (lng) => {
    const newPath = pathname.replace(/^\/(uz|ru)/, `/${lng}`);
    navigate(newPath);
  };

  const { data } = useGetTranslations();
  const translations = data?.items || [];
  const t = (key) => {
    const translation = translations?.find((item) => item.key === key);
    return translation ? translation[lang] : key;
  };

  return (
    <div className="container flex pt-[37px] pb-[18px] items-center justify-between px-6 md:px-12 relative">
      <button
        className="md:hidden text-white text-3xl z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <img
            src="/close-icon.svg"
            alt="Close"
            className="w-[25px] absolute right-[20px] top-[30px]"
          />
        ) : (
          <img
            src="/burger-menu.svg"
            className="w-[25px] absolute left-[20px] top-[40px]"
            alt="Menu"
          />
        )}
      </button>

      <NavLink to={`/${lang}`}>
        <img src="/logo.svg" alt="Logo" className="w-[99px] md:w-[158px]" />
      </NavLink>

      <div className="hidden md:flex nav-container rounded-[100px] items-center gap-[25px] px-[25px] py-1 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300">
        {[
          { href: `/${lang}/`, label: t("nav-main") },
          { href: `/${lang}/products`, label: t("nav-product") },
          { href: `/${lang}/about`, label: t("nav-about") },
          { href: `/${lang}/contact`, label: t("nav-contact") },
        ].map(({ href, label }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              `nav-text px-4 py-2 rounded-full transition ${
                pathname === href
                  ? "bg-white text-blue-800 shadow-md"
                  : "text-gray-600"
              }`
            }
            dangerouslySetInnerHTML={{ __html: label }}
          />
        ))}
      </div>
      <button className="hidden btn-bg md:flex gap-[10px] rounded-3xl text-white border-2 border-white pl-8 pr-2 py-2">
        <span
          onClick={() => {
            window.open("https://t.me/cheredevbot", "_blank");
          }}
          dangerouslySetInnerHTML={{
            __html: parseHTMLString(t("btn-order")),
          }}
        />
        <img src="/arrow-left-line.svg" alt="" />
      </button>

      <div className="flex gap-4">
        <button
          className={`text-3xl w-[50px] h-full flex items-center justify-center cursor-pointer font-semibold ${
            lang === "uz" ? "text-[#DDAE57]" : "text-[#8996A6]"
          }`}
          onClick={() => changeLanguage("uz")}
        >
          Uzb
        </button>

        <button
          className={`text-3xl w-[50px] cursor-pointer h-full flex items-center justify-center font-semibold ${
            lang === "ru" ? "text-[#DDAE57]" : "text-[#8996A6]"
          }`}
          onClick={() => changeLanguage("ru")}
        >
          Rus
        </button>
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-[700px] bg-[#1a367c] text-white transition-transform duration-300 z-40 flex flex-col items-center justify-center ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          className="absolute top-6 right-6"
          onClick={() => setIsOpen(false)}
        ></button>

        <nav className="flex flex-col gap-[74px] text-2xl text-center">
          {[
            { href: `/${lang}/`, label: t("nav-main") },
            { href: `/${lang}/products`, label: t("nav-product") },
            { href: `/${lang}/about`, label: t("nav-about") },
            { href: `/${lang}/contact`, label: t("nav-contact") },
          ].map(({ href, label }) => (
            <NavLink
              key={href}
              to={href}
              className="hover:text-blue-500"
              onClick={() => setIsOpen(false)}
              dangerouslySetInnerHTML={{ __html: label }}
            />
          ))}

          <button className=" btn-bg flex gap-[10px] rounded-3xl text-white border-2 border-white px-8 py-2 items-center mx-auto">
            <span
              onClick={() => {
                window.open("https://t.me/cheredevbot", "_blank");
              }}
              dangerouslySetInnerHTML={{
                __html: parseHTMLString(t("btn-order")),
              }}
            />
            <img src="/arrow-left-line.svg" alt="" />
          </button>
        </nav>
      </div>
    </div>
  );
}
