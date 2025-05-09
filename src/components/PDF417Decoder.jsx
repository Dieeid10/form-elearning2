import { useEffect, useState } from 'react'
import { useError } from '../hooks/useError'
import { useDataStudent } from '../hooks/useDataStudent'
import './TestFile.css'

export function PDF417Decoder({frontOrBack, decodePDF417, parent = false}) {
    const [ imgUrl, setImgUrl ] = useState('')
    const [ setDataDni ] = useState(null)
    const { error, changeError } = useError()
    const { updateData } = useDataStudent()

    const handleFiles = async (f) => {
        const file = f.target.files[0]
        console.log('El archivo es: ', file)
        if( file.size === 0 || !file.type.match('image.*')) {
          changeError('El archivo no es una imagen válida, debe ser un archivo de tipo imagen como un jpg o png.')
          return
        }
        const newUrlImg = URL.createObjectURL(file)
        setImgUrl(newUrlImg)
        let newImage = null
        if(!parent) {
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
        !error && updateData(newImage)
    }

    useEffect(() => {
        if (imgUrl && frontOrBack == 'front') {
          const img = new Image()
          img.onload = async () => {
            const canvas = document.createElement('canvas')
            const canvasContext = canvas.getContext('2d')
            canvas.width = img.width
            canvas.height = img.height
            canvasContext.drawImage(img, 0, 0, img.width, img.height)
      
            const imageBackround = document.getElementById('imageBackground')
            console.log('El imgUrl es: ', imgUrl)
            imageBackround.src = imgUrl
            try {
              await decodePDF417(canvasContext, img, frontOrBack, parent)
            } catch (err) {
              setDataDni('')
              changeError('No se pudo decodificar la imagen, compruebe que posea código de DNI argentino y que este enfocado.')
              console.error(err)
            }
          }
          img.src = imgUrl
        }

        return () => {
          setImgUrl('');
        }
      }, [imgUrl])

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
