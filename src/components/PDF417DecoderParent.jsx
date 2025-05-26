import { useError } from '../hooks/useError'
import { useDataStudent } from '../hooks/useDataStudent'
import { useMrzDecoder } from '../hooks/useMrzDecoder'
import './TestFile.css'

export function PDF417DecoderParent({frontOrBack, decodePDF417, parent = false}) {
    const { lectorDocumentMrz } = useMrzDecoder()
    const { error, changeError } = useError()
    const { updateData } = useDataStudent()

    const handleFiles = async (f) => {
      changeError('Decodificando documento, espere un momento...')
      const file = f.target.files[0]
      const newDataMrz = await lectorDocumentMrz(file, parent)
      const newUrlImg = URL.createObjectURL(file)
  
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
  
        const newDataDni = await decodePDF417(canvasContext, img, frontOrBack, parent)

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
        const newData = { ...newDataMrz, ...newImage, ...newDataDni }
        changeError(null)
        if (!error) updateData(newData)
      }
      img.src = newUrlImg
    }

    return (
        <form className='z-10'>
          <input
            type="file"
            id="fileParent"
            onChange={handleFiles}
            className='hidden'
          /> 
          <label 
              htmlFor='fileParent'
              className='bg-sky-400 p-4 rounded-lg decoration-cyan-800 text-sky-100 text-lg font-bold hover:bg-sky-200 text-sky-300 cursor-pointer active:bg-sky-700 text-sky-200'
          >
              Cargue la imagen
          </label>
        </form>
    )
}