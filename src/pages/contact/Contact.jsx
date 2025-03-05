import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetTranslations, usePostContactUs } from "../../api";
import Header from "../../components/Header/Header";
import useParseHTML from "../../hooks/useParseHTML";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { data, error, isLoading } = useGetTranslations();
  const { parseHTMLString } = useParseHTML();
  const { lang } = useParams();
  const translations = data?.items;

  const t = (key, isHTML = false) => {
    const translation = translations?.find((item) => item.key === key);
    const text = translation ? translation[lang] : key;
    return isHTML ? parseHTMLString(text) : text;
  };

  const { mutate, isPending } = usePostContactUs();

  const handleOrder = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      toast.error("Ism faqat harflardan iborat bo‘lishi kerak!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error(
        "Telefon raqam +998 bilan boshlanishi va 13 ta belgidan iborat bo‘lishi kerak!",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }

    mutate(
      { name, phone },
      {
        onSuccess: () => {
          toast.success("Buyurtma muvaffaqiyatli jo‘natildi!", {
            position: "top-right",
            autoClose: 3000,
          });
          setName("");
          setPhone("");
        },
        onError: () => {
          toast.error("Xatolik yuz berdi, iltimos qayta urinib ko‘ring!", {
            position: "top-right",
            autoClose: 3000,
          });
        },
      }
    );
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
                <h3
                  className="inter md:text-[22px] text-base md:leading-[34px] leading-6 font-light md:pb-10 pb-12"
                  dangerouslySetInnerHTML={{
                    __html: parseHTMLString(t("contact-info-text")),
                  }}
                ></h3>
                <form onSubmit={handleOrder} className="flex flex-col">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={parseHTMLString(t("order-name"))}
                    className="inter md:text-2xl text-base md:leading-7 leading-5 md:py-[22px] py-[19px] md:px-8 px-6 border-[1px] border-[#54576366] rounded-2xl md:mb-11 mb-6"
                    required
                  />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={parseHTMLString(t("order-phone"))}
                    className="inter md:text-2xl text-base md:leading-7 leading-5 md:py-[22px] py-[16px] md:px-8 px-6 border-[1px] border-[#54576366] rounded-2xl md:mb-[100px] mb-14"
                    required
                  />
                  <button
                    type="submit"
                    className="py-6 bg-[#DDAE57] text-white inter  md:text-2xl text-base md:leading-7 leading-5 rounded-2xl"
                    dangerouslySetInnerHTML={{
                      __html: parseHTMLString(t("send")),
                    }}
                  ></button>
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
