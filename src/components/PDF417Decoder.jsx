import { useEffect, useState } from 'react';
import './TestFile.css';
import { usePDF417Decoder } from '../hooks/usePDF417Decoder';
import { useError } from '../hooks/useError';
import { useDataStudent } from '../hooks/useDataStudent';

export function PDF417Decoder({frontOrBack}) {
    const [imgUrl, setImgUrl] = useState('');
    const [setDataDni] = useState(null);
    const { decodePDF417 } = usePDF417Decoder()
    const { error, changeError } = useError()
    const { updateData } = useDataStudent()

    const handleFiles = async (f) => {
        const file = f.target.files[0];
        if( file.size === 0 || !file.type.match('image.*')) {
          changeError('El archivo no es una imagen válida, debe ser un archivo de tipo imagen como un jpg o png.')
          return
        }
        const newUrlImg = URL.createObjectURL(file)
        setImgUrl(newUrlImg)
        const newImage = {
            [`${frontOrBack}ImageFile`]: file,
            [`${frontOrBack}ImageName`]: file.name
        }
        !error && updateData(newImage)
    };

    useEffect(() => {
        if (imgUrl && frontOrBack == 'front') {
          const img = new Image();
          img.onload = async () => {
            const canvas = document.createElement('canvas');
            const canvasContext = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            canvasContext.drawImage(img, 0, 0, img.width, img.height);
      
            try {
              await decodePDF417(canvasContext, img, frontOrBack)
            } catch (err) {
              setError(err.message)
              setDataDni('')
              console.error(err)
            }
          };
          img.src = imgUrl
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
                Seleccione el archivo
            </label>
        </form>
    );
}
