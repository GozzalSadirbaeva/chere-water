import React from "react";
import { useParams } from "react-router-dom";
import { useGetTranslations } from "../../api";

const Features = () => {
  const { data, error, isLoading } = useGetTranslations();
  const { lang } = useParams();

  const translations = data?.items || [];

  const t = (key) => {
    const translation = translations?.find((item) => item.key === key);
    return translation ? translation[lang] : key;
  };

  if (isLoading)
    return <p className="text-center text-lg font-semibold">Yuklanmoqda...</p>;
  if (error)
    return (
      <p className="text-center text-lg font-semibold text-red-500">
        Xatolik yuz berdi!
      </p>
    );

  const features = [
    {
      id: 1,
      image: "/ic1.svg",
      title: t("home-why-title1"),
      description: t("home-why-text1"),
    },
    {
      id: 2,
      image: "/ic2.svg",
      title: t("home-why-title2"),
      description: t("home-why-text2"),
    },
    {
      id: 3,
      image: "/ic3.svg",
      title: t("home-why-title3"),
      description: t("home-why-text3"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  );
};

const FeatureCard = ({ feature }) => {
  return (
    <div className="flex md:flex-row items-center md:items-start gap-6 md:gap-8 md:text-left">
      <img
        src={feature.image}
        alt={feature.title}
        className="w-16 h-16 md:w-auto md:h-auto"
      />
      <div>
        <h3
          className="inter text-[24px] md:text-[32px] leading-8 font-semibold mt-2"
          dangerouslySetInnerHTML={{ __html: feature.title }} 
        />
        <p className="inter font-light text-[18px] md:text-[22px] leading-[28px] md:leading-[34px] pt-4 md:pt-6" dangerouslySetInnerHTML={{ __html: feature.description }} >
        </p>
      </div>
    </div>
  );
};

export default Features;
