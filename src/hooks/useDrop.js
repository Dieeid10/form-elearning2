import { useDataStudent } from "./useDataStudent"
import { useError } from "./useError"
import { usePDF417Decoder } from "./usePDF417Decoder"
import { useMrzDecoder } from '../hooks/useMrzDecoder'

export function useDrop({frontOrBack}) {
  const { decodedContent, decodePDF417 } = usePDF417Decoder()
  const { lectorDocumentMrz } = useMrzDecoder()
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
    e.preventDefault()
  }

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const handleDrop = async (file, parent=false, updateCharge) => {
    console.log('El nuevo archivo es: ', file)
    changeError(null)
    await updateCharge('10')
    await wait(100)
    
    if (!file || !file.type.startsWith('image/')) {
      changeError('Por favor, seleccione un archivo de imagen válido.')
      return
    }

    const newDataMrz = await lectorDocumentMrz(file, parent)
    const newUrlImg = URL.createObjectURL(file)
    await updateCharge('30')
    await wait(100)

    const img = new Image()
    img.onload = async () => {
      const canvas = document.createElement('canvas')
      const canvasContext = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      canvasContext.drawImage(img, 0, 0, img.width, img.height)

      const imageBackround = document.getElementById('imageBackground')
      if (imageBackround) {
        imageBackround.src = newUrlImg
      }
      await updateCharge('40')
      await wait(100)
      const newDataDni = await decodePDF417(canvasContext, img, frontOrBack, parent)
      await updateCharge('70')
      await wait(100)
      let newImage = null
      if (!parent) {
        newImage = {
          [`${frontOrBack}ImageFile`]: file,
          [`${frontOrBack}ImageName`]: file.name
        }
      } else {
        newImage = {
          [`${frontOrBack}ImageFileParent`]: file,
          [`${frontOrBack}ImageNameParent`]: file.name,
        }
      }
      await updateCharge('80')
      await wait(100)
      const newData = { ...newDataMrz, ...newImage, ...newDataDni }
      if (!error) updateData(newData)
      await updateCharge('100')
      await wait(100)
      await wait(null)
    }
    img.src = newUrlImg
  }

 /*  const handleDrop = async (newFile, parent=false) => {
    console.log('El nuevo archivo es: ', newFile)
    changeError(null)
    if( !newFile?.type?.match('image.*')) {
      changeError('El archivo no es una imagen válida, debe ser un archivo de tipo imagen como un jpg, jpeg o png.')
      return
    }
    setParent(parent)
    setFile(newFile)
    let newImage = null
    if(!parent) {
      newImage = {
        [`${frontOrBack}ImageFile`]: newFile,
        [`${frontOrBack}ImageName`]: newFile.name
      }
    } else {
      newImage = {
        [`${frontOrBack}ImageFileParent`]: newFile,
        [`${frontOrBack}ImageNameParent`]: newFile.name,
      }
    }
    
    await updateData(newImage)
  } */

  return { decodedContent, error, handleDragOver, handleDrop, calculateYears }
}