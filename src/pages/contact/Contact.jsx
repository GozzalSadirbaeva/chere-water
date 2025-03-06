import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetTranslations } from "../../api";
import Header from "../../components/Header/Header";
import useContactForm from "../../hooks/useContactForm";
import useParseHTML from "../../hooks/useParseHTML";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { name, phone, errors, isPending, handleChange, handleOrder } =
    useContactForm();
  const { data, isLoading } = useGetTranslations();
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
        <div className="container contact-line">
          <ToastContainer />
          <header className="container">
            <Header />
          </header>
          <section className="pb-[151px]">
            <h2
              className="font-bold md:text-[88px] text-[48px] md:leading-[80px] leading-[56px] text-color-second text-center md:pb-[111px] pb-[88px] pt-[153px]"
              dangerouslySetInnerHTML={{
                __html: parseHTMLString(t("contact")),
              }}
            ></h2>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[174px]">
              <div className="pt-14 md:px-10 px-5 pb-12 bg-white mx-4 border border-[#D5D6D8] rounded-3xl shadow-lg">
                <h2
                  className="font-semibold md:text-[32px] text-[24px] leading-8 pb-6"
                  dangerouslySetInnerHTML={{
                    __html: parseHTMLString(t("contact-info")),
                  }}
                ></h2>
                <form onSubmit={handleOrder} className="flex flex-col">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      placeholder={parseHTMLString(t("order-name"))}
                      className="inter md:text-2xl text-base md:leading-7 leading-5 md:py-[22px] py-[16px] md:px-8 px-6 border-[1px] border-[#54576366] rounded-2xl "
                      required
                    />
                    {errors.name && (
                      <p className=" text-[#DDAE57] text-base mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col md:mt-11 mt-6 mb-14 md:mb-[100px]">
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      placeholder={parseHTMLString(t("order-phone"))}
                      className="inter md:text-2xl text-base md:leading-7 leading-5 md:py-[22px] py-[16px] md:px-8 px-6 border-[1px] border-[#54576366] rounded-2xl  "
                      required
                    />
                    {errors.phone && (
                      <p className=" text-[#DDAE57] text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="py-6 bg-[#DDAE57] text-white inter md:text-2xl text-base md:leading-7 leading-5 rounded-2xl"
                    disabled={isPending}
                  >
                    {isPending ? "Yuborilmoqda..." : parseHTMLString(t("send"))}
                  </button>
                </form>
              </div>
              <div className="container grid py-10 md:py-0 rounded-3xl md:gap-20 h-[469px] md:px-4 px-10">
                <div className="flex gap-5 items-center">
                  <div className="w-12 h-12 bg-[#DDAE57] rounded-full flex justify-center items-center">
                    <img src="/map.svg" alt="Location" />
                  </div>
                  <p
                    className="font-medium text-lg md:text-[32px] md:leading-[44px]"
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
                    className="font-medium text-lg md:text-[32px] md:leading-[44px]"
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
                    className="font-medium text-lg md:text-[32px] md:leading-[44px]"
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("time")),
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Contact;
