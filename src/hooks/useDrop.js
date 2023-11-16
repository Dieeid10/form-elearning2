import { useEffect, useState } from "react";
import { useDataStudent } from "./useDataStudent";
import { useError } from "./useError";
import { usePDF417Decoder } from "./usePDF417Decoder"
import { useStep } from "./useStepForm";

export function useDrop({frontOrBack}) {
  const { decodedContent, decodePDF417 } = usePDF417Decoder();
  const [ file, setFile ] = useState(null)
  const { error, changeError } = useError()
  const { dataStudent, updateData } = useDataStudent()

  const calculateYears = () => {
      const fechaStr = dataStudent.dateOdBirth
      const partesFehca = fechaStr.split('/')
  
      const day = parseInt(partesFehca[0])
      const month = parseInt(partesFehca[1] - 1)
      const year = parseInt(partesFehca[2])
  
      const dateOdBirth = new Date(year, month, day)
      const currentDate = new Date()
  
      const diferenceMS = currentDate - dateOdBirth
      const milisecondsInYear = 1000 * 60 * 60 * 24 * 365.25
      const diferenceYear = diferenceMS / milisecondsInYear
      if(Math.floor(diferenceYear) >= 18) {
        updateData({younger: false})
      } else {
        updateData({younger: true})
      }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };
    
  const handleDrop = async (e) => {
    e.preventDefault()
    const newFile = e.dataTransfer.files[0]
    if( !newFile.type.match('image.*')) {
      changeError('El archivo no es una imagen válida, debe ser un archivo de tipo imagen como un jpg o png.')
      return
    }
    setFile(newFile)
    const newImage = {
      [`${frontOrBack}ImageFile`]: newFile,
      [`${frontOrBack}ImageName`]: newFile.name
    }
    await !error && updateData(newImage)


  }

  useEffect(() => {

    if (!file)  return
    const img = new Image()
    
    img.src = URL.createObjectURL(file)
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (frontOrBack == 'front') {
        await decodePDF417(ctx, img, frontOrBack)
      }  
    };
  
  }, [file])
    

  return { decodedContent, error, handleDragOver, handleDrop, calculateYears };
}