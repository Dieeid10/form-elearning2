import { useError } from '../hooks/useError'
import { useDataStudent } from '../hooks/useDataStudent'
import { useMrzDecoder } from '../hooks/useMrzDecoder'
import { useIntents } from '../hooks/useIntents'
import './TestFile.css'

export function PDF417Decoder({frontOrBack, decodePDF417, updateCharge, changeLoading, parent = false}) {
    const { lectorDocumentMrz } = useMrzDecoder()
    const { intents, incrementIntents, intentsLimit } = useIntents()
    const { error, changeError } = useError()
    const { updateData } = useDataStudent()

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const handleFiles = async (f) => {
      await changeLoading(true)
      await updateCharge('0')
      await wait(100)
      await updateCharge('10')
      await wait(100)

      const file = f.target.files[0]

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
        if((!newDataDni?.documentNumber && !newDataDni?.documentNumberAdult) && (!newDataMrz?.country && !newDataMrz?.countryAdult) && frontOrBack === 'front') {
          await updateCharge(null)
          await wait(100)
          intents < intentsLimit ? changeError('No se pudo decodificar el documento. Por favor, cargue los datos manualmente.') : changeError('No se pudo decodificar el documento. Por favor, asegúrese de que la imagen sea clara y legible.')
          return
        }
        const newData = { ...newDataMrz, ...newImage, ...newDataDni }
        if (!error && !!newData) updateData(newData)
        await updateCharge('100')
        await wait(100)
        await updateCharge(null)
        await wait(100)
        changeLoading(false)
        changeError(null)
      }
      img.src = newUrlImg
    }

    return (
        <form className='z-10'>
          <input
            type="file"
            id="file"
            onChange={handleFiles}
            className='hidden'
          /> 
          <label 
              htmlFor='file'
              className='bg-sky-400 p-4 rounded-lg decoration-cyan-800 text-sky-100 text-lg font-bold hover:bg-sky-200 text-sky-300 cursor-pointer active:bg-sky-700 text-sky-200'
          >
              Cargue la imagen
          </label>
        </form>
    )
}
