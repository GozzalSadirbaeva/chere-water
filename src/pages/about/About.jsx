import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetTranslations } from "../../api";
import Gallery from "../../components/Galery/Gallery";
import Header from "../../components/Header/Header";
import Order from "../../components/Order/Order";
import useParseHTML from "../../hooks/useParseHTML";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { parseHTMLString } = useParseHTML();

  const { data, error, isLoading } = useGetTranslations();
  const { lang } = useParams();
  const translations = data?.items;
  const t = (key) => {
    return translations?.find((item) => item.key === key)[lang];
  };
  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div>
          <div className="line-about bg-[#bfd6ff36]">
            <header className="container">
              <Header />
            </header>
            <section className="container pt-[80px] md:pt-[154px] pb-[100px] md:pb-[120px]">
              <h2
                className="font-bold md:text-[88px] text-[48px] leading-[50px] md:leading-[100px] text-color-second text-center"
                dangerouslySetInnerHTML={{
                  __html: parseHTMLString(t("about")),
                }}
              ></h2>
              <h3
                className="hidden md:block text-center inter text-[20px] md:text-[26px] leading-7 md:leading-8 text-[#727886] pt-6 md:pt-8 capitalize-each-word "
                dangerouslySetInnerHTML={{
                  __html: parseHTMLString(t("about-text")),
                }}
              ></h3>
              <h3
                className="md:hidden inter text-[17px] leading-[24px] md:px-[120px] text-center pt-5 px-12"
                dangerouslySetInnerHTML={{
                  __html: parseHTMLString(t("about-text2")),
                }}
              ></h3>
            </section>
          </div>

          <section className="bg-[#f6f6f7] pb-[80px] md:pb-[150px]">
            <div className="container md:pt-20 pt-0">
              <h2
                className="font-bold text-[23px] md:text-[60px] leading-[29px] md:leading-[71px] text-color-fourth pb-[60px] md:pb-[173px] text-center md:w-[90%] mx-auto px-4"
                dangerouslySetInnerHTML={{
                  __html: parseHTMLString(t("about-video")),
                }}
              ></h2>
              <div className="flex justify-center">
              <video src="/chere-video.mp4" controls autoplay loop muted className="w-full md:w-3/4 rounded-lg shadow-lg px-4" />

                
              </div>
            </div>
            <div className="container pt-[60px] md:pt-[100px] pb-[100px] md:pb-[192px]">
              <h2
                className="font-bold text-[48px] md:text-[72px] leading-[55px] md:leading-[80px] text-color-second pb-[40px] md:pb-[60px] text-center"
                dangerouslySetInnerHTML={{
                  __html: parseHTMLString(t("about-gallery")),
                }}
              ></h2>
              <Gallery />
            </div>
            <Order />
          </section>
        </div>
      )}
    </div>
  );
};

export default About;
