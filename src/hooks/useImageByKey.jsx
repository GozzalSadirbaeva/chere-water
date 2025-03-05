import { useGetImages } from "../api";
const baseURL = import.meta.env.VITE_POCKETBASE_URL;

export const useImageByKey = (name) => {
  const { data: imagesData, isLoading, error } = useGetImages();
  // console.log(imagesData);

  if (isLoading) return { imageUrl: null, isLoading, error };
  if (error) return { imageUrl: null, isLoading, error };

  const image = imagesData?.items?.find((item) => item.name === name);
  if (!image)
    return { imageUrl: null, isLoading: false, error: "Image not found" };

  return {
    imageUrl: `${baseURL}/api/files/${image.collectionName}/${image.id}/${image.image_file}`,
    isLoading: false,
    error: null,
  };
};
