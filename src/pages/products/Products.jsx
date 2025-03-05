import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetTranslations } from "../../api";
import Header from "../../components/Header/Header";
import Order from "../../components/Order/Order";
import ProductList from "../../components/productList/ProductList";
import useParseHTML from "../../hooks/useParseHTML";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data, error, isLoading } = useGetTranslations();
  const { parseHTMLString } = useParseHTML();

  const { lang } = useParams();
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
        <div className="bg-[#F9FBFF] pb-[150px]">
          <header className="container">
            <Header />
          </header>
          <section className="container pt-[154px] bg-circle">
            <h2
              
              className="font-bold md:text-[88px] md:leading-[100px] text-[48px] leading-[56px] text-color-second text-center"
              dangerouslySetInnerHTML={{
                __html: t("product-h1"),
              }}
            ></h2>
            <h3
              className="hidden md:block text-center inter text-[26px] leading-8 text-[#727886] pt-8"
              dangerouslySetInnerHTML={{
                __html: t("product-h2"),
              }}
            ></h3>
            <h3 className="block md:hidden inter text-[20px] leading-7 text-center px-12 pt-5 text-[#727886]">
              Har bir tomchi suvda yuksak go‘zallik aks etgan. uni ko‘rish uchun
              tashna qalblar darkor.
            </h3>
            <h2
              className="md:block hidden font-bold md:text-[60px]  md:leading-[71px]  text-color-fourth pt-[320px] pb-[173px] text-center"
              dangerouslySetInnerHTML={{
                __html: parseHTMLString(t("product-h3")),
              }}
            ></h2>
            <h2
              className="md:hidden block font-bold text-[32px] leading-8 text-color-fourth pt-[270px] pb-[173px] text-center"
              dangerouslySetInnerHTML={{
                __html: parseHTMLString(t("product-text3-m")),
              }}
            ></h2>
          </section>
          <ProductList />
          <Order />
        </div>
      )}
    </div>
  );
};

export default Products;
