import { useZXing } from "./useZXing";

export function useDrop() {
  const { decodedContent, error, decodePDF417 } = useZXing();

  const handleDragOver = (e) => {
    e.preventDefault();
  };
    
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log(file)
    
    if (file.type.match('image.*')) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const img = new Image();
        img.src = URL.createObjectURL(e.dataTransfer.files[0])
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          console.log(canvas.height, canvas.width)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          console.log(ctx)
          console.log(img)
          /* const imgData = ctx.getImageData(0, 0, img.width, img.height);
          const imgByteArray = imgData.data; */
          decodePDF417(ctx, img)
        };
      };

      reader.readAsDataURL(file);
    } else {
      alert('El archivo no es una imagen válida');
    }
  };

  return { decodedContent, error, handleDragOver, handleDrop };
}