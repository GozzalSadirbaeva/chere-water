import React from "react";
import { Spinner } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useGetTranslations } from "../api";
import useParseHTML from "../hooks/useParseHTML";

const NotFoundPage = () => {
  const { data, error, isLoading } = useGetTranslations();
  const { parseHTMLString } = useParseHTML();
  const location = useLocation();

  const lang =
    location.pathname.split("/")[1] == "uz" ||
    location.pathname.split("/")[1] == "ru"
      ? location.pathname.split("/")[1]
      : "uz";

  const translations = data?.items;
  const t = (key, isHTML = false) => {
    const translation = translations?.find((item) => item.key === key);
    const text = translation ? translation[lang] : key;

    return isHTML ? parseHTMLString(text) : text;
  };
  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div>
          <img src="/404.svg" alt="" className="place-self-center" />
          <p
            className="font-semibold text-2xl leading-[32px] pt-16 pb-6 text-center"
            dangerouslySetInnerHTML={{
              __html: parseHTMLString(t("not-found")),
            }}
          ></p>
          <NavLink
            to={`/${lang}`}
            className="hidden btn-bg md:flex gap-[10px] rounded-3xl text-white border-2 border-white px-5 py-2 mb-44 place-self-center"
            dangerouslySetInnerHTML={{
              __html: parseHTMLString(t("not-found-btn")),
            }}
          ></NavLink>
        </div>
      )}
    </div>
  );
};

export default NotFoundPage;
