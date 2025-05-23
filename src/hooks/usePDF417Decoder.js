import { useRef, useState } from 'react'
import { useDataStudent } from './useDataStudent'
import { useError } from './useError'
import { BrowserMultiFormatReader } from '@zxing/library'
import { useStep } from "../hooks/useStepForm"

export function usePDF417Decoder() {
  const { setStep } = useStep()
  const [ decodedContent, setDecodedContent ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const { changeError } = useError()
  const { updateData } = useDataStudent()
  const intents = useRef(0)

  const decodePDF417 = async (ctx, img, frontOrBack, parent=false) => {
    if(frontOrBack === 'back') return

    setLoading(true)
    changeError(null)
    let attempsRotate = 0
    let newDataDni = null

    function convertToISOFormat(dateString) {
      if (!dateString) return '';
      
      // Partimos la fecha en día, mes y año
      const [day, month, year] = dateString.split('/');
      
      // Formateamos a YYYY-MM-DD
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

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
      const imagePath = parent ? 'imageBackgroundParent' : 'imageBackground'
      const imageBackround = document.getElementById(imagePath)
      console.log('El src que rota es: ', rotateImage.src)
      imageBackround.src = rotatedImg.src
      return rotatedImg
    }
    
    // Funcion recursiva para decodificar la imagen
    // Si no se puede decodificar, rota la imagen y vuelve a intentar
    // Si no se puede decodificar después de 3 intentos, muestra un error
    async function decoderImage(img) {
      try {
        console.log('La imagen que llega es: ', img)
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
          setLoading(false)
          return
        }
      }
    }

    try {
      const resultJson = await decoderImage(img)
      if(!resultJson) {
        if(intents.current < 3) {
          console.log('Intento de decodificacion: ', intents.current)
          intents.current++
          changeError('No se pudo decodificar la imagen, compruebe que posea código de DNI argentino y que este enfocado.')
        } else {
          changeError('No se pudo realizar el escaneo del DNI, por favor ingrese sus datos manualmente.')
          parent ? setStep('FormDataAdulto') : setStep('FormDataStudent')
        }
        setLoading(false)
        return
      }
      const dataDni = resultJson['text'].split('@')
      console.log(dataDni)
      const dateFormat = convertToISOFormat(dataDni[6])
      if(parent) {
        newDataDni = {
          nTramiteAdult: dataDni[0] ?? 'n/d',
          lastNameAdult: dataDni[1] ?? 'n/d',
          nameAdult: dataDni[2] ?? 'n/d',
          sexAdult: dataDni[3] ?? 'n/d',
          documentNumberAdult: dataDni[4] ?? 'n/d',
          ejemplarAdult: dataDni[5] ?? 'n/d',
          dateOdBirthAdult: dateFormat ?? 'n/d',
          dateOfIssueAdult: dataDni[7] ?? 'n/d',
          documentTypeAdult: 'DNI'
        }
      } else {
        newDataDni = {
            nTramite: dataDni[0] ?? 'n/d',
            lastName: dataDni[1] ?? 'n/d',
            name: dataDni[2] ?? 'n/d',
            sex: dataDni[3] ?? 'n/d',
            documentNumber: dataDni[4] ?? 'n/d',
            ejemplar: dataDni[5] ?? 'n/d',
            dateOdBirth: dateFormat ?? 'n/d',
            dateOfIssue: dataDni[7] ?? 'n/d',
            documentType: 'DNI'
        }
      }
      updateData(newDataDni)
      setDecodedContent(newDataDni)
      console.log(newDataDni)
      setLoading(false)
      changeError(null)
    } catch (error) {
      console.error('Error al decodificar el código PDF417:', error)
      setDecodedContent(null)
    }
  }

  return { decodedContent, decodePDF417, loading }
}