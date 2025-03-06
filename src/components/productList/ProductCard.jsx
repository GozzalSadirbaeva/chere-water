import React, { useEffect } from "react";
import { useImageByKey } from "../../hooks/useImageByKey";

const ProductCard = ({ product, translations, parseHTMLString, lang }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = (key, isHTML = false) => {
    const translation = translations?.find((item) => item.key === key);
    const text = translation ? translation[lang] : key;
    return isHTML ? parseHTMLString(text) : text;
  };

  const { imageUrl, isLoading, error } = useImageByKey(product.imageKey);

  return (
    <div className="bg-white shadow-lg rounded-3xl md:pl-[100px] px-[21px] md:py-[114px] pt-5 pb-[37px] flex md:flex-row flex-col justify-between overflow-hidden">
      {isLoading ? (
        <p>Loading image...</p>
      ) : error ? (
        ""
      ) : (
        <img
          src={imageUrl}
          alt={product.imageKey}
          className="w-[66px] md:w-[166px] self-center"
        />
      )}

      <div className="max-w-[1000px]">
        <h2
          className="md:text-[72px] text-[32px] md:leading-[97px] leading-[43px] mt-2"
          dangerouslySetInnerHTML={{ __html: t(product.size) }}
        ></h2>
        <p
          className="text-[#4D566A] md:text-[32px] text-[14px] md:leading-[43px] leading-[19px] pt-4"
          dangerouslySetInnerHTML={{ __html: t(product.description) }}
        ></p>
        <div className="flex md:gap-9 gap-4 md:my-[72px] mt-4 pb-7">
          {product.elements.name.map((elementName, index) => (
            <span
              key={index}
              className="bg-gray-200 md:w-[149px] md:h-[149px] w-[60px] h-[60px] border border-[#F0F3FA] bg-gradient-to-b from-white to-[#D3DBEB] text-sm flex flex-col "
            >
              <span className="font-medium md:text-base md:leading-7 text-[6px] leading-[11px] uppercase pt-1 px-1">
                {elementName}
              </span>
              <span className="inter md:text-[68px] text-[27px] md:leading-[80px] leading-[32px] text-center md:pt-4 pt-1 pb-7">
                {product.elements.percent[index]}
              </span>
            </span>
          ))}
        </div>

        <button
          className="btn-bg md:px-[51px] px-[43px] md:py-[27px] py-3 font-medium md:text-[32px] text-[18px] md:leading-10 leading-6 text-white rounded-2xl md:w-[355px] "
          onClick={() => {
            window.open("https://t.me/cheredevbot", "_blank");
          }}
          dangerouslySetInnerHTML={{
            __html: parseHTMLString(t("btn-order")),
          }}
        ></button>
      </div>
    </div>
  );
};

export default ProductCard;
