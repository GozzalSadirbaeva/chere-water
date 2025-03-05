import React from "react";
import { useImageByKey } from "../../hooks/useImageByKey";

const Gallery = ({ translations, parseHTMLString, lang }) => {
  const t = (key, isHTML = false) => {
    const translation = translations?.find((item) => item.key === key);
    const text = translation ? translation[lang] : key;
    return isHTML ? parseHTMLString(text) : text;
  };

  const images = [
    { id: 1, key: "galery1" },
    { id: 2, key: "galery2" },
    { id: 3, key: "galery3" },
    { id: 4, key: "galery4" },
    { id: 5, key: "galery5" },
    { id: 6, key: "galery6" },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-8 gap-3 md:px-8 px-4">
        {images.map((image) => {
          const { imageUrl, isLoading } = useImageByKey(image.key);

          return (
            <div key={image.id} className="overflow-hidden">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <img
                  src={imageUrl}
                  alt={image.key}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: "10px" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
