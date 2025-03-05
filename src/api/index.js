import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseURL = import.meta.env.VITE_POCKETBASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
});

export const useGetTranslations = () => {
  const getTranslations = async () => {
    const response = await api.get(
      "/api/collections/translations/records?page=1&perPage=1000"
    );
    return response.data;
  };
  return useQuery({
    queryKey: ["translations"],
    queryFn: () => getTranslations(),
  });
};

export const useGetImages = () => {
  const getImages = async () => {
    const response = await api.get(
      "/api/collections/image/records?page=1&perPage=1000"
    );
    return response.data;
  };
  return useQuery({
    queryKey: ["images"],
    queryFn: () => getImages(),
  });
};

export const usePostContactUs = () => {
  const postContactUs = async (data) => {
    const response = await api.post(
      "/api/collections/contact_with_us/records",
      data
    );
    return response.data;
  };
  return useMutation({
    mutationKey: "ContactUs",
    mutationFn: postContactUs,
  });
};

export const useGetProductList = () => {
  const getProductList = async () => {
    const response = await api.get("/api/collections/productlist/records");
    return response.data;
  };
  return useQuery({
    queryKey: ["ProductList"],
    queryFn: getProductList,
  });
};
