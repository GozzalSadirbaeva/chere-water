import React from "react";
import { Spinner } from "react-bootstrap";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetTranslations } from "../../api";

const Footer = () => {
  const { lang = "uz" } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    const newPath = pathname.replace(/^\/(uz|ru)/, `/${lng}`);
    navigate(newPath);
  };

  const { data, error, isLoading } = useGetTranslations();
  const translations = data?.items || [];

  const t = (key) => {
    const translation = translations.find((item) => item.key === key);
    return translation ? translation[lang] : key;
  };

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div className="bg-[#E1E4E8]">
          <div className="container pb-20 md:px-8 px-4">
            <div className="md:flex  justify-between items-center pb-16 border-b-[1px] border-[#9B9B9B] pt-[139px]">
              <div>
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="w-[130px] md:w-[223px]"
                />
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 md:gap-20 gap-5 pt-8 md:pt-0 text-center">
                <NavLink
                  to={`/${lang}`}
                  className="footer-text"
                  dangerouslySetInnerHTML={{ __html: t("nav-main") }}
                ></NavLink>
                <NavLink
                  to={`/${lang}/products`}
                  className="footer-text"
                  dangerouslySetInnerHTML={{ __html: t("nav-product") }}
                ></NavLink>
                <NavLink
                  to={`/${lang}/about`}
                  className="footer-text"
                  dangerouslySetInnerHTML={{ __html: t("nav-about") }}
                ></NavLink>
                <NavLink
                  to={`/${lang}/contact`}
                  className="footer-text"
                  dangerouslySetInnerHTML={{ __html: t("nav-contact") }}
                ></NavLink>
              </div>
            </div>

            <div className="flex justify-between flex-col-reverse sm:flex-row items-center pt-[67px] md:gap-0 gap-3">
              <p className="font-semibold md:text-xl leading-5 md:leading-[32px] text-[#9B9B9B]">
                Featured by{" "}
                <span className="font-semibold md:text-2xl leading-5 md:leading-[32px] tracking-[2%] text-[#1A367C]">
                  Saidoff.group
                </span>
              </p>
              <p className="font-semibold md:text-2xl leading-5 md:leading-[32px]">
                © 2024 Chere Water
              </p>
              <div className="flex gap-10 self-center">
                <a href="#">
                  <img
                    src="/telegram-icon.svg"
                    alt="Telegram"
                    className="w-[30px] md:w-[36px]"
                  />
                </a>
                <a href="#">
                  <img
                    src="/insta-icon.svg"
                    alt="Instagram"
                    className="w-[30px] md:w-[36px]"
                  />
                </a>
                <a href="#">
                  <img
                    src="/facebook-icon.svg"
                    alt="Facebook"
                    className="w-[30px] md:w-[36px]"
                  />
                </a>
                <a href="#">
                  <img
                    src="/email.svg"
                    alt="Email"
                    className="w-[30px] md:w-[36px] pt-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
