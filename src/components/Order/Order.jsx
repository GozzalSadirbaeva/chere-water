"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetTranslations, usePostContactUs } from "../../api";
import useParseHTML from "../../hooks/useParseHTML";
import useContactForm from "../../hooks/useContactForm";

export default function Order() {
  const { parseHTMLString } = useParseHTML();
  const [message, setMessage] = useState("");

  const { data, error, isLoading } = useGetTranslations();
  const { name, phone, errors, isPending, handleChange, handleOrder } =
  useContactForm();
  
  const { lang } = useParams();
  const translations = data?.items || [];

  const t = (key, isHTML = false) => {
    const translation = translations?.find((item) => item.key === key);
    const text = translation ? translation[lang] : key;
    return isHTML ? parseHTMLString(text) : text;
  };

  // const { mutate, isPending } = usePostContactUs();

  // const validateName = (value) => {
  //   if (!/^[a-zA-Z]+$/.test(value)) {
  //     return "Ism faqat harflardan iborat bo‘lishi kerak!";
  //   }
  //   return "";
  // };

  // const validatePhone = (value) => {
  //   if (!/^\+998\d{9}$/.test(value)) {
  //     return "Telefon raqami +998 bilan boshlanishi va 9 ta raqam bo‘lishi kerak!";
  //   }
  //   return "";
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "name") {
  //     setName(value);
  //     setErrors((prev) => ({ ...prev, name: validateName(value) }));
  //   } else if (name === "phone") {
  //     setPhone(value);
  //     setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
  //   }
  // };

  // const handleOrder = (e) => {
  //   e.preventDefault();

  //   const nameError = validateName(name);
  //   const phoneError = validatePhone(phone);
  //   if (nameError || phoneError) {
  //     setErrors({ name: nameError, phone: phoneError });
  //     return;
  //   }

  //   mutate(
  //     { name, phone },
  //     {
  //       onSuccess: () => {
  //         setMessage("Muvaffaqiyatli yuborildi! ✅");
  //         setName("");
  //         setPhone("");
  //         setErrors({ name: "", phone: "" });
  //         toast.success("Muvaffaqiyatli yuborildi! ✅");
  //       },
  //       onError: () => {
  //         setMessage("Xatolik yuz berdi. ❌");
  //         toast.error("Xatolik yuz berdi. ❌");
  //       },
  //     }
  //   );
  //   console.log(mutate);
    
  // };

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
        <div className="relative flex-1">
          <input
            type="text"
            name="name"
            placeholder={parseHTMLString(t("order-name"))}
            value={name}
            onChange={handleChange}
            className="md:px-8 px-5 md:py-[22px] py-[15px] inter md:text-2xl text-base leading-7 rounded-lg text-black outline-none max-w-[520px] w-full"
            required
          />
          {errors.name && (
            <p className="absolute left-0 text-[#DDAE57] text-base mt-1 ">
              {errors.name}
            </p>
          )}
        </div>

        <div className="relative flex-1">
          <input
            type="tel"
            name="phone"
            placeholder={parseHTMLString(t("order-phone"))}
            value={phone}
            onChange={handleChange}
            className="md:px-8 px-5 md:py-[22px] py-[15px] inter md:text-2xl text-base rounded-lg text-black outline-none max-w-[520px] w-full"
            required
          />
          {errors.phone && (
            <p className="absolute left-0 text-[#DDAE57] text-sm mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#DDAE57] inter font-medium md:text-2xl text-lg md:leading-7 leading-5 text-white rounded-lg md:px-[66px] py-[17px] px-[58px] md:ml-16 md:mx-0 mt-5 md:mt-0"
          disabled={isPending}
        >
          {isPending ? "Yuborilmoqda..." : parseHTMLString(t("order-place"))}
        </button>
      </form>
    </div>
  );
}
