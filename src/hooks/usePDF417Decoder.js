
import { useState } from 'react';
import { useDataStudent } from './useDataStudent';
import { useError } from './useError';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';

export function usePDF417Decoder() {
  const [decodedContent, setDecodedContent] = useState(null);
  const { changeError } = useError()
  const { updateData } = useDataStudent()

  const decodePDF417 = async (ctx, img, frontOrBack) => {
    
    try {
      console.log(frontOrBack)
      if(frontOrBack === 'back') return
      const codeReader = new BrowserMultiFormatReader();

      const resultJson = await codeReader.decodeFromImage(img);
      console.log(resultJson['text'])
      
      if ( resultJson['text'] == '' || !resultJson ) {
        changeError('Error al decodificar el código PDF417. Por favor, asegúrate de que la imagen contenga un código PDF417 válido.')
        return
      }
      const dataDni = resultJson['text'].split('@')
      console.log(dataDni)
      const newDataDni = {
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
      changeError('Error al decodificar el código PDF417. Por favor, asegúrate de que la imagen contenga un código PDF417 válido.')
    }
  };

  return { decodedContent, decodePDF417 }
}