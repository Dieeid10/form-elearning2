
import { useState } from 'react';
import { useDataStudent } from './useDataStudent';
import { useStep } from './useStepForm';
import { useError } from './useError';

export function usePDF417Decoder() {
  const [decodedContent, setDecodedContent] = useState(null);
  const { changeError } = useError()
  const { updateData } = useDataStudent()
  const { setStep } = useStep()

  const decodePDF417 = (ctx, img, frontOrBack) => {
    
    try {
      const source = new ZXing.BitmapLuminanceSource(ctx, img)
      const binarizer = new ZXing.Common.HybridBinarizer(source)
      const bitmap = new ZXing.BinaryBitmap(binarizer)
      const resultJson = ZXing.PDF417.PDF417Reader.decode(bitmap, null, false)
      if ( resultJson[0] == '' ) {
        changeError('Error al decodificar el código PDF417. Por favor, asegúrate de que la imagen contenga un código PDF417 válido.')
        return
      }
      const dataDni = resultJson[0]?.Text.split('@')
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
      const newStep = frontOrBack == 'front' ? 'DropzoneBack' : 'DropzoneFront'
      setStep(newStep)
      changeError(null)
    } catch (error) {
      console.error('Error al decodificar el código PDF417:', error)
      setDecodedContent(null)
      changeError('Error al decodificar el código PDF417. Por favor, asegúrate de que la imagen contenga un código PDF417 válido.')
    }
  };

  return { decodedContent, decodePDF417 }
}