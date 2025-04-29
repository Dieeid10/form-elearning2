import { useDrop } from "../hooks/useDrop"
import { PDF417Decoder } from "./PDF417Decoder"
import { useError } from '../hooks/useError'
import './imgBackround.css'
import { Buttoms } from "./Buttoms"
import { useDataStudent } from "../hooks/useDataStudent"
import { useRestoreImage } from "../hooks/useRestoreImage"
import { useStep } from "../hooks/useStepForm"

export function ImageDropzone({ frontOrBack }) {
  const { handleDragOver, handleDrop, calculateYears } = useDrop({frontOrBack});
  const { error } = useError()
  const { dataStudent } = useDataStudent()
  const file = frontOrBack === 'front' ?  dataStudent.frontImageFile : dataStudent.backImageFile
  const { imageSrc } = useRestoreImage(file)
  const { setStep } = useStep()

  let prevForm = frontOrBack === 'front' ? 'selectMode' : 'DropzoneFront'
  let title = frontOrBack === 'front' ? 'Ingrese la imagen frontal del DNI' : 'Ingrese la parte posterior del DNI'
  let nextButton = frontOrBack === 'front' ? (dataStudent.documentNumber ? true : false) : (dataStudent.backImageFile ? true : false)
  
  const handleSubmitForm = async (event) => {
    event.preventDefault()
    if (!!dataStudent.documentNumber && frontOrBack === 'front') {
      setStep('DropzoneBack')
    }
    if (!!dataStudent.frontImageFile && frontOrBack === 'back') {
      await calculateYears()
      setStep('formMail')
    }
  }

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
        className= {`h-full w-full flex justify-center items-center flex-col sm:flex-row gap-2 rounded-xl relative overflow-hidden  ${ !imageSrc && (frontOrBack == 'front' ? 'imgBackroundFront' : 'imgBackroundBack') }`}
      >
        {
          imageSrc && 
          <img 
            src={imageSrc} 
            alt={ frontOrBack === 'front' ? 'imagen del frente del DNI' : 'imagen del dorso del DNI' } 
            className="absolute z-0 w-3/4 rounded-xl opacity-40"
          />
        }
        <h4 className="text-sky-200 text-lg font-bold z-10" >Arrastra la imagen aquí o </h4>
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
      <form onSubmit={handleSubmitForm}>
       <Buttoms prevForm={prevForm} nextButton={ nextButton } />
      </form>
    </section>
  );
}