import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTranslations } from "../../api";
import useParseHTML from "../../hooks/useParseHTML";

const ProductsHome = () => {
  const { data, error, isLoading } = useGetTranslations();
  const { lang } = useParams();
  const [products, setProducts] = useState([]);
  const { parseHTMLString } = useParseHTML();

  const translations = data?.items || [];

  const t = (key) => {
    const translation = translations.find((item) => item.key === key);
    return translation ? translation[lang] : key;
  };

  useEffect(() => {
    if (!isLoading && !error && translations.length > 0) {
      setProducts([
        {
          id: 1,
          image: "/bottle-20.png",
          title: t("home-card-title1"),
          description: t("home-card-text1"),
        },
        {
          id: 2,
          image: "/bottle-1.png",
          title: t("home-card-title2"),
          description: t("home-card-text2"),
        },
        {
          id: 3,
          image: "/bottle-0.5.png",
          title: t("home-card-title3"),
          description: t("home-card-text3"),
        },
      ]);
    }
  }, [translations, isLoading, error]);

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi!</p>;

  return (
    <div className="flex gap-4 overflow-x-auto p-4 scrollbar-hide">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          parseHTMLString={parseHTMLString}
          t={t}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ product, parseHTMLString, t }) => {
  return (
    <div className="border rounded-xl shadow-lg p-4 min-w-[326px] md:min-w-[498px] h-[653px] bg-white">
      <div className="border-[1px] border-[#C0CDE5] border-dashed rounded-[18px] py-5">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[310px] object-contain"
        />
      </div>
      <h3
        className="text-2xl font-medium leading-10 pt-10"
        dangerouslySetInnerHTML={{ __html: parseHTMLString(product.title) }}
      ></h3>
      <p
        className="text-[#2E3648] text-base font-normal leading-8 pt-4 tracking-[1%] pb-6"
        dangerouslySetInnerHTML={{
          __html: parseHTMLString(product.description),
        }}
      ></p>
      <button
        className="btn-bg flex gap-[10px] rounded-3xl text-white border-2 border-white pl-7 pr-2 py-2"
        onClick={() => {
          window.open("https://t.me/cheredevbot", "_blank");
        }}
        dangerouslySetInnerHTML={{
          __html: parseHTMLString(t("btn-order")),
        }}
      ></button>
    </div>
  );
};

export default ProductsHome;
