import { useState } from "react";
import { toast } from "react-toastify";
import { usePostContactUs } from "../api";

const useContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [message, setMessage] = useState("");

  const { mutate, isPending } = usePostContactUs();

  const validateName = (value) => {
    if (!value.trim()) {
      return "Ism kiritish majburiy!";
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return "Ism faqat harflar va bo'sh joylardan iborat bo‘lishi kerak!";
    }
    return "";
  };

  const validatePhone = (value) => {
    if (!value.trim()) {
      return "Telefon raqamini kiritish majburiy!";
    }
    if (!/^\+998\d{9}$/.test(value)) {
      return "Telefon raqami +998 bilan boshlanishi va 9 ta raqam bo‘lishi kerak!";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    } else if (name === "phone") {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const phoneError = validatePhone(phone);

    if (nameError || phoneError) {
      setErrors({ name: nameError, phone: phoneError });
      return;
    }

    console.log("Yuborilayotgan ma'lumotlar:", { name, phone });

    mutate(
      { Full_name_: name, Phone_number: phone },
      {
        onSuccess: () => {
          setMessage("Muvaffaqiyatli yuborildi! ✅");
          setName("");
          setPhone("");
          setErrors({ name: "", phone: "" });
          toast.success("Muvaffaqiyatli yuborildi! ✅");
        },
        onError: (error) => {
          console.error("Xatolik yuz berdi:", error);
          setMessage("Xatolik yuz berdi. ❌");
          toast.error("Xatolik yuz berdi. ❌");
        },
      }
    );
  };

  return {
    name,
    phone,
    errors,
    message,
    isPending,
    handleChange,
    handleOrder,
  };
};

export default useContactForm;
