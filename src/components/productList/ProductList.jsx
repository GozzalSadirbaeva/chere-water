import React from "react";
import { useParams } from "react-router-dom";
import { useGetTranslations } from "../../api";
import useParseHTML from "../../hooks/useParseHTML";
import ProductCard from "./ProductCard";
const ProductList = () => {
  const products = [
    {
      id: 1,
      size: "product-card1",
      description: "product-card-text1",
      imageKey: "bottle-0.5",
      elements: {
        name: ["Calcium", "Bicarbonates", "Magnesium", "Kaliy", "Chlorides"],
        percent: [80, 360, 70, 71, 70],
      },
    },
    {
      id: 2,
      size: "product-card2",
      description: "product-card-text2",
      imageKey: "bottle-1",
      elements: {
        name: ["Calcium", "Bicarbonates", "Magnesium", "Kaliy", "Chlorides"],
        percent: [80, 360, 70, 25, 25],
      },
    },
    {
      id: 3,
      size: "product-card3",
      description: "product-card-text3",
      imageKey: "bottle-20",
      elements: {
        name: ["Calcium", "Bicarbonates", "Magnesium", "Kaliy", "Chlorides"],
        percent: [80, 360, 70, 25, 25],
      },
    },
    {
      id: 4,
      size: "product-card4",
      description: "product-card-text4",
      imageKey: "bottle-20",
      elements: {
        name: [
          "Calcium",
          "Bicarbonates",
          "Magnesium",
          "Magnesium",
          "Chlorides",
        ],
        percent: [80, 360, 70, 25, 25],
      },
    },
  ];

  const { data, error, isLoading } = useGetTranslations();
  // const { data: products } = useGetProductList();
  const { parseHTMLString } = useParseHTML();
  const { lang } = useParams();
  const translations = data?.items || [];

  return (
    <div className="container grid grid-cols-1 gap-6 p-6 pb-[140px]">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          translations={translations}
          parseHTMLString={parseHTMLString}
          lang={lang}
        />
      ))}
    </div>
  );
};

export default ProductList;
