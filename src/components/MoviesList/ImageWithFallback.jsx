import { useState } from "react";
import box from "./../../assets/image.png";

export const ImageWithFallback = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(box);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={imgSrc === box ? "movie-image-box" : "movie-image-cover"}
    />
  );
};
