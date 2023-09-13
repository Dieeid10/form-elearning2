import { useDrop } from "../hooks/useDrop"
import { PDF417Decoder } from "./PDF417Decoder"
import { useError } from '../hooks/useError'
import './imgBackround.css'
import { Buttoms } from "./Buttoms";

export function ImageDropzone({ frontOrBack }) {
  const { handleDragOver, handleDrop } = useDrop({frontOrBack});
  const { error } = useError()

  let prevForm = frontOrBack === 'front' ? 'selectMode' : 'DropzoneFront'
  let title = frontOrBack === 'front' ? 'Ingrese la imagen frontal del DNI' : 'Ingrese la parte posterior del DNI'

  return (
    <section className=" h-full w-full flex flex-col mirrorEffect gap-5 p-5">
      <h1
        className="font-semibold font text-sky-200 text-lg"
      >
        {title}
      </h1>
      <div
        id="dropzone"
        style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
        onDragOver={handleDragOver}
        onDrop={ handleDrop}
        className= {`h-full w-full flex justify-center items-center gap-2 rounded-xl relative  ${ frontOrBack == 'front' ? 'imgBackroundFront' : 'imgBackroundBack' }`}
      >
        <h4 className="text-sky-200 text-lg font-bold" >Arrastra la imagen aquí o </h4>
        <PDF417Decoder frontOrBack={frontOrBack} />
        {
          error &&
          <div 
            className="absolute top-5 bg-slate-100 font-semibold text-slate-600 opacity-50 h-1/3 w-1/2 flex justify-center items-center rounded-lg p-10 hover:opacity-100"
          > 
            <h2>{error}</h2> 
          </div>
        }
      </div>
      <Buttoms prevForm={prevForm} nextButton={false}/>
    </section>
  );
}