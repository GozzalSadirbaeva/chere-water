import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTranslations } from "../api/index";
const NavigatePage = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  useEffect(() => {
    if (!(lang === "uz" || lang === "ru")) navigate("uz");
  }, [navigate, lang]);
  const {} = useGetTranslations();

  return null;
};

export default NavigatePage;
