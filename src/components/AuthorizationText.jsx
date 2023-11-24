import { useState } from 'react'
import './download.css'
import { useDataStudent } from '../hooks/useDataStudent';
import { useError } from '../hooks/useError';

const validateType = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
const sizeMax = 500

export function AuthorizationText () {
  const [inputAuthorization, setInputAuthorization] = useState(false)
  const [nameFile, setNameFile] = useState(null);
  const { changeError } = useError()
  const { updateData } = useDataStudent()

  const inputAuthorizationView = () => {
    setInputAuthorization(true)
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const typeFile = selectedFile.type
    const size = Math.round(selectedFile.size / Math.pow(1024, 1))
    console.log(size)
    if ((!selectedFile.type.match('image.*') && !validateType.includes(typeFile)) || size > sizeMax) {
      changeError("El formato del achivo que ha cargado no es un formato valido.")
      console.log(typeFile)
      return
    }
    updateData({
      authorization: selectedFile,
      authorizationName: selectedFile.name
    })
    setNameFile(selectedFile.name)
  };

  return (
    <>
      <p className='text-lg text-white {textWrap:balance;}'>Al alumno ser menor de edad, deberán completar la siguiente autorización, haciendo clic en el botón podrán descargarla, la misma será solicitada en la primera actividad al iniciar la cursada.</p>
      <a onClick={inputAuthorizationView} href='/Authorization.pdf' download='Authorization.pdf' className="button" >
        <span className="button_lg">
          <span className="button_sl"></span>
          <span href='/Authorization.pdf' download='Authorization.pdf' className="button_text">Descargar autorización</span>
        </span>
      </a>
      {
        !!inputAuthorization &&
        <>
        <h2 className='text-white text-lg'>Cargue su autorización completada con siguente boton para continuar.</h2>
        <label className="button" htmlFor='inputAuthorization' >
          <span className="button_lg">
            <span className="button_sl"></span>
            <span className="button_text" >Cargar autorización</span>
          </span>
          <input id='inputAuthorization' type="file" onChange={handleFileChange} hidden />
        </label>
        {
          nameFile &&
          <h3 className='text-white text-sm' >Se ha cargado el archivo: {nameFile}</h3>
        }
        </>
      }
      
    </>
  )
}