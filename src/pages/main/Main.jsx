import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import { useGetTranslations } from "../../api";
import Features from "../../components/Features/Features";
import Gallery from "../../components/Galery/Gallery";
import Header from "../../components/Header/Header";
import Order from "../../components/Order/Order";
import ProductsHome from "../../components/Products-home/ProductsHome";
import { useImageByKey } from "../../hooks/useImageByKey";
import useParseHTML from "../../hooks/useParseHTML";

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, error, isLoading } = useGetTranslations();
  // console.log(data);
  const { parseHTMLString } = useParseHTML();

  const { lang } = useParams();
  const translations = data?.items;
  const t = (key, isHTML = false) => {
    const translation = translations?.find((item) => item.key === key);
    const text = translation ? translation[lang] : key;

    return isHTML ? parseHTMLString(text) : text;
  };

  const { imageUrl, isLoading: imgLoading } = useImageByKey('banner');
  console.log(imageUrl);

  const images = imageUrl?.items;
  const key = (name) => {
    const image = images?.find((item) => item.name === name);
    return image ? image.url : "";
  };

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div className="relative">
          <div className="bg-[url(/banner.svg)] bg-cover bg-center">
            <header>
              <Header />
            </header>
            <section className="container">
              <div className="grid md:grid-cols-2 grid-cols-1 lg:text-left relative md:pt-[192px] pt-[100px]">
                <div className="flex flex-col h-full  m-auto">
                  <h1
                    className="md:block hidden text-color font-bold text-[48px] md:text-[96px] leading-[50px] md:leading-[84px] pb-12 sm:text-center md:text-left text-center md:px-8 px-4"
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("home-h1")),
                    }}
                  ></h1>
                  <h1
                    className="md:hidden block text-color font-bold text-[48px] md:text-[96px] leading-[50px] md:leading-[84px] pb-12 sm:text-center md:text-left text-center md:px-8 px-4"
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("home-h1-m")),
                    }}
                  ></h1>
                  <h3
                    className="hidden md:block font-normal text-lg md:text-2xl leading-8 text-[#4D566A] pb-10 md:max-w-[561px]"
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("home-h3")),
                    }}
                  ></h3>
                  <h3
                    className="md:hidden inter text-xl leading-6 text-center text-[#4D566A] capitalize-each-word pb-9 px-16"
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("home-h3-m")),
                    }}
                  ></h3>

                  <button
                    className="btn-bg-second px-6 md:px-[51px] py-4 md:py-[27px] text-lg md:text-[32px] font-medium text-white rounded-2xl w-[250px] md:w-[355px] self-center md:self-start mb-[400px]"
                    onClick={() => {
                      window.open("https://t.me/cheredevbot", "_blank");
                    }}
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("btn-order")),
                    }}
                  ></button>
                </div>
                <div className="hidden md:block max-w-[400px] md:max-w-[857px] md:absolute md:right-[-100px] top-[-50px]">
                  <img
                    src="/banner-product.png"
                    alt="Banner Product"
                    className="w-full"
                  />
                </div>
                <div className="absolute bottom-[-100px] md:hidden right-[30px]">
                  <img src="/one-bottle.png" alt="" />
                </div>
              </div>
            </section>
          </div>

          <section className="container pt-40 md:pt-[99px] md:pb-[279px] pb-[215px]">
            <h2
              className="text-color-second font-bold text-[48px] md:text-[72px] leading-[50px] md:leading-[80px] text-center md:text-left pb-4"
              dangerouslySetInnerHTML={{
                __html: parseHTMLString(t("home-products")),
              }}
            ></h2>
            <p
              className="pb-10 md:pb-[78px] font-normal text-lg md:text-2xl md:leading-8 leading-6 text-[#4D566A] capitalize-each-word text-center md:text-left px-[50px] md:px-0 md:w-[681px] w-full"
              dangerouslySetInnerHTML={{
                __html: parseHTMLString(t("home-product-h3")),
              }}
            ></p>
            <ProductsHome />
          </section>

          <section className="bg-[#DEE2E9] relative">
            <div className="container">
              <div className="flex flex-col lg:flex-row border-2 border-[#E4E5E7] px-6 md:px-[70px] py-8 md:py-[83px] rounded-[46px] gap-10 lg:gap-[62px] bg-white absolute md:top-[-140px] top-[-100px]  left-1/2 transform -translate-x-1/2 w-full max-w-[1200px] items-center">
                <img
                  src="/qol-icon.svg"
                  alt=""
                  className="md:absolute md:top-[-80px] md:w-[160px] w-[106px]"
                />

                <div className="text-center lg:text-left">
                  <h2
                    className="font-medium text-[40px] md:text-[60px] leading-[45px] md:leading-[66px]"
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("home-cert-title")),
                    }}
                  ></h2>
                  <h3
                    className="md:block hidden font-normal text-lg md:text-[28px] leading-8 md:leading-10 text-[#4D566A] pt-6 max-w-[901px]"
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("home-cert-text")),
                    }}
                  ></h3>
                  <h3
                    className="md:hidden block inter text-base leading-6 pt-12"
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("home-cert-text2")),
                    }}
                  ></h3>
                </div>
                <div className="max-w-[300px] md:max-w-[424px]">
                  <img
                    src="/sertificate.png"
                    alt="Sertificate"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div className="container pt-[600px] md:pt-[327px] pb-20 md:pb-[153px]">
              <h2
                className="text-color font-bold text-[48px] md:text-[72px] leading-[50px] md:leading-[80px] pb-10 md:pb-[78px] md:text-left text-center"
                dangerouslySetInnerHTML={{
                  __html: parseHTMLString(t("home-why-title")),
                }}
              ></h2>
              <Features />
            </div>
          </section>

          <section className="bg-[#0f1219] bg-line py-20 md:py-[158px] mt-20 md:mt-[247px] bg-cover relative">
            <div className="container flex flex-col lg:flex-row justify-between text-center lg:text-left">
              <div className="md:w-[768px]">
                <h2
                  className="text-white font-bold text-[48px] md:text-[72px] leading-[50px] md:leading-[80px] pb-6"
                  dangerouslySetInnerHTML={{
                    __html: parseHTMLString(t("home-delivery")),
                  }}
                ></h2>
                <h3
                  className="inter font-normal text-lg md:text-[30px] leading-8 md:leading-10 text-[#8DA1D0] md:pb-8 pb-[75px] px-8"
                  dangerouslySetInnerHTML={{
                    __html: parseHTMLString(t("home-delivery-text")),
                  }}
                ></h3>
                <button className="border-2 border-[#ffffff63] btn-bg-second px-4 md:px-[36px] py-3 md:py-5 font-semibold text-lg md:text-2xl leading-8 text-white rounded-[88px] md:w-[340px] flex items-center gap-2 mx-auto lg:mx-0">
                  <span
                    onClick={() => {
                      window.open("https://t.me/cheredevbot", "_blank");
                    }}
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("btn-order")),
                    }}
                  />
                  <img src="/line-order.svg" alt="" />
                </button>
              </div>
              <div className="w-[300px] md:w-[300px] lg:w-[440px] mx-auto mt-10 lg:mt-0 md:absolute top-[-150px] right-0">
                <img
                  src="/box.svg"
                  alt="Box"
                  className="md:w-full w-[230px] md:h-auto place-self-center"
                />
              </div>
            </div>
          </section>
          <section className="py-[130px] container md:px-8 px-4">
            <h2
              className="font-bold md:text-[72px] text-[48px] md:leading-[80px] leading-[56px] text-color-second pb-7"
              dangerouslySetInnerHTML={{
                __html: parseHTMLString(t("home-about")),
              }}
            ></h2>
            <h3
              className="inter font-normal md:text-2xl text-base md:leading-10 leading-6 text-[#2E3648] capitalize-each-word md:pb-10 pb-14 "
              dangerouslySetInnerHTML={{
                __html: parseHTMLString(t("home-about-text")),
              }}
            ></h3>

            <Gallery />
          </section>
          <Order />

          <section className="container pt-32 md:px-8 px-4">
            <div className="flex flex-col md:flex-row w-full justify-between py-10 px-6 md:px-[50px] border-2 border-[#DBDBDB] border-dashed rounded-3xl bg-white relative bottom-[-70px] gap-[30px] md:gap-0">
              <div className="flex gap-5 items-center">
                <div className="w-12 h-12 bg-[#DDAE57] rounded-full flex justify-center items-center">
                  <img src="/map.svg" alt="Location" />
                </div>
                <p
                  className="font-medium text-lg md:text-2xl leading-[30px]"
                  dangerouslySetInnerHTML={{
                    __html: parseHTMLString(t("address")),
                  }}
                ></p>
              </div>
              <div className="flex gap-5 items-center">
                <div className="w-12 h-12 bg-[#DDAE57] rounded-full flex justify-center items-center">
                  <img src="/phone.svg" alt="Phone" />
                </div>
                <p
                  className="font-medium text-lg md:text-2xl leading-[30px]"
                  dangerouslySetInnerHTML={{
                    __html: parseHTMLString(t("number")),
                  }}
                ></p>
              </div>
              <div className="flex gap-5 items-center">
                <div className="w-12 h-12 bg-[#DDAE57] rounded-full flex justify-center items-center">
                  <img src="/clock.svg" alt="Clock" />
                </div>
                <p
                  className="font-medium text-lg md:text-2xl leading-[30px]"
                  dangerouslySetInnerHTML={{
                    __html: parseHTMLString(t("time")),
                  }}
                ></p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Main;
