import { useState } from 'react'
import { useDataStudent } from './useDataStudent'
import { useError } from './useError'
import { BrowserMultiFormatReader } from '@zxing/library'

export function usePDF417Decoder() {
  const [ decodedContent, setDecodedContent ] = useState(null)
  const { changeError } = useError()
  const { updateData } = useDataStudent()

  const decodePDF417 = async (ctx, img, frontOrBack) => {
    if(frontOrBack === 'back') return

    let attempsRotate = 0
    let newDataDni = null

    // Funcion para rotar la imagen
    function rotateImage(originalImg, degrees) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
    
      const radians = degrees * Math.PI / 180
    
      if (degrees % 180 !== 0) {
        canvas.width = originalImg.height
        canvas.height = originalImg.width
      } else {
        canvas.width = originalImg.width
        canvas.height = originalImg.height
      }
    
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(radians)
      ctx.drawImage(originalImg, -originalImg.width / 2, -originalImg.height / 2)

      const rotatedImg = new Image()
      rotatedImg.src = canvas.toDataURL()
      return rotatedImg
    }
    
    // Funcion recursiva para decodificar la imagen
    // Si no se puede decodificar, rota la imagen y vuelve a intentar
    // Si no se puede decodificar después de 3 intentos, muestra un error
    async function decoderImage(img) {
      try {
        const codeReader = new BrowserMultiFormatReader()
        const resultJson = await codeReader.decodeFromImage(img)
        return resultJson
      } catch (error) {
        if (attempsRotate < 4) {
          attempsRotate++
          const rotatedImg = rotateImage(img, 90)
          return decoderImage(rotatedImg)
        } else {
          changeError('Error al decodificar el código PDF417. Por favor, asegúrate de que la imagen contenga un código PDF417 válido.')
          return
        }
      }
    }

    try {
      const resultJson = await decoderImage(img)
      if(!resultJson) {
        changeError('No se pudo decodificar la imagen, compruebe que posea código de DNI argentino y que este enfocado.')
        return
      }
      const dataDni = resultJson['text'].split('@')
      console.log(dataDni)
      newDataDni = {
          nTramite: dataDni[0] ?? 'n/d',
          lastName: dataDni[1] ?? 'n/d',
          name: dataDni[2] ?? 'n/d',
          sex: dataDni[3] ?? 'n/d',
          documentNumber: dataDni[4] ?? 'n/d',
          ejemplar: dataDni[5] ?? 'n/d',
          dateOdBirth: dataDni[6] ?? 'n/d',
          dateOfIssue: dataDni[7] ?? 'n/d',
          documentType: 'DNI'
      }
      updateData(newDataDni)
      setDecodedContent(newDataDni)
      console.log(newDataDni)
      changeError(null)
    } catch (error) {
      console.error('Error al decodificar el código PDF417:', error)
      setDecodedContent(null)
    }
  }

  return { decodedContent, decodePDF417 }
}