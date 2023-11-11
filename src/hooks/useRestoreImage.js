import { useEffect, useState } from "react";

export const useRestoreImage = (file) => {
  const [ imageSrc, setImageSrc ] = useState(null)

  useEffect(() => {
    const loadImage = () => {
      if (!file) {
        setImageSrc(null)
        return
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    loadImage();
  }, [file]);

  return { imageSrc }
}