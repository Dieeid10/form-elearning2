import './download.css'

export function AuthorizationText () {

  return (
    <>
      <p className='text-lg text-white {textWrap:balance;}'>Al alumno ser menor de edad, deberán completar la siguiente autorización, haciendo clic en el botón podrán descargarla, la misma será solicitada en la primera actividad al iniciar la cursada.</p>
      <a href='/Authorization.pdf' download='Authorization.pdf' className="button" >
        <span className="button_lg">
          <span className="button_sl"></span>
          <span href='/Authorization.pdf' download='Authorization.pdf' className="button_text">Descargar autorización</span>
        </span>
      </a>
    </>
  )
}