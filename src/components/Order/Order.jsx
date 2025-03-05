"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetTranslations, usePostContactUs } from "../../api";
import useParseHTML from "../../hooks/useParseHTML";

export default function Order() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { parseHTMLString } = useParseHTML();

  const { data, error, isLoading } = useGetTranslations();
  const { lang } = useParams();
  const translations = data?.items || [];

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
      toast.error("Telefon raqam +998 bilan boshlanishi va 13 ta belgidan iborat bo‘lishi kerak!", {
        position: "top-right",
        autoClose: 3000,
      });
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
    <div className="container bg-[#1a367c] order text-white pt-[72px] pb-20 rounded-2xl mt-10 px-7">
      <ToastContainer />
      <h2
        className="md:text-[72px] text-5xl font-bold leading-[80px] text-center text-color-third"
        dangerouslySetInnerHTML={{ __html: t("order") }}
      ></h2>
      <p
        className="text-center inter md:text-[28px] text-[18px] md:leading-10 leading-6 text-[#8DA1D0] mt-8 mb-[101px]"
        dangerouslySetInnerHTML={{ __html: t("order-text") }}
      ></p>
      <form
        onSubmit={handleOrder}
        className="mt-6 flex flex-col md:flex-row gap-4 md:px-20"
      >
        <input
          type="text"
          placeholder={parseHTMLString(t("order-name"))}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 md:px-8 px-5 md:py-[22px] py-[15px] inter md:text-2xl text-base leading-7 rounded-lg text-black outline-none max-w-[520px]"
          required
        />
        <input
          type="tel"
          placeholder={parseHTMLString(t("order-phone"))}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 md:px-8 px-5 md:py-[22px] py-[15px] inter md:text-2xl text-base rounded-lg text-black outline-none max-w-[520px]"
          required
        />
        <button
          type="submit"
          className="bg-[#DDAE57] inter font-medium md:text-2xl text-lg md:leading-7 leading-5 text-white rounded-lg py-[17px] px-[58px] md:ml-16  md:mx-0 mt-5 md:mt-0"
        >
          {parseHTMLString(t("order-place"))}
        </button>
      </form>
    </div>
  );
}
