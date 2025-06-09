import { useDrop } from "../hooks/useDrop"
import { PDF417Decoder } from "./PDF417Decoder"
import { useError } from '../hooks/useError'
import { Buttoms } from "./Buttoms"
import { useDataStudent } from "../hooks/useDataStudent"
import { useRestoreImage } from "../hooks/useRestoreImage"
import { useStep } from "../hooks/useStepForm"
import { usePDF417Decoder } from '../hooks/usePDF417Decoder'
import { Charge } from "./Charge"
import { useCharge } from "../hooks/useCharge"
import './imgBackround.css'

export function ImageDropzone({ frontOrBack, parent = false }) {
  const { handleDragOver, handleDrop, calculateYears } = useDrop({frontOrBack})
  const { decodePDF417, loading, changeLoading } = usePDF417Decoder()
  const { charge, updateCharge } = useCharge()
  const { error } = useError()
  const { dataStudent } = useDataStudent()
  const file = frontOrBack === 'front' ?  dataStudent.frontImageFile : dataStudent.backImageFile
  console.log('El charge es: ', charge)
  const { imageSrc } = useRestoreImage(file)
  const { setStep } = useStep()

  let prevForm = frontOrBack === 'front' ? null : 'DropzoneFront'
  let title = frontOrBack === 'front' ? `Ingrese la imagen frontal del documento del ${!parent ? 'alumno': 'padre, madre o tutor.'}` : `Ingrese la parte posterior del documento del ${!parent ? 'alumno': 'padre, madre o tutor.'}`
  let nextButton = frontOrBack === 'front' ? (dataStudent.documentNumber ? true : false) : (dataStudent.backImageFile ? true : false)
  
  const handleSubmitForm = async (event) => {
    event.preventDefault()
    if (!!dataStudent.documentNumber && frontOrBack === 'front') {
      setStep('DropzoneBack')
    }
    if (!!dataStudent.frontImageFile && frontOrBack === 'back') {
      await calculateYears()
      setStep('FormDataStudent')
    }
  }

  return (
    <section className=" h-full w-full flex flex-col mirrorEffect gap-5 p-5">
      <h1
        className="font-semibold font text-sky-200 text-lg"
      >
        {title}
      </h1>
      <h2 className="font-semibold font text-sky-200 text-sm" >Confirme que sea una imagen clara donde pueda verse todo el documento.</h2>
      <div
        id="dropzone"
        style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
        onDragOver={handleDragOver}
        onDrop={ (e) => {
          e.preventDefault()
          const newFile = e.dataTransfer.files[0]
          handleDrop(newFile, parent, updateCharge)}}
        className= {`h-full w-full flex justify-center items-center flex-col sm:flex-row gap-2 rounded-xl relative overflow-hidden  ${ !imageSrc && (frontOrBack == 'front' ? 'imgBackroundFront' : 'imgBackroundBack') }`}
      >
        {
          imageSrc && 
          <img
            id='imageBackground'
            src={imageSrc ? imageSrc : frontOrBack === 'front' ? 'img/frente.png' : 'img/dorso.png'}
            alt={ frontOrBack === 'front' ? 'imagen del frente del documento' : 'imagen del dorso del documento' }
            className="absolute z-0 w-3/4 rounded-xl opacity-40"
          />
        }
        <h4 className="text-sky-200 text-lg font-bold z-10" >Arrastra la imagen aquí o </h4>
        <PDF417Decoder frontOrBack={frontOrBack} decodePDF417={decodePDF417} parent={parent} updateCharge={updateCharge} changeLoading={changeLoading} />
        {
          !!error &&
          !loading &&
          <div 
            className="absolute top-5 bg-slate-100 font-semibold text-slate-600 opacity-50 h-1/3 w-1/2 flex justify-center items-center rounded-lg p-10 hover:opacity-100"
          > 
            <h2>{error}{loading}</h2>
          </div>
        }
        {
          !!charge &&
          <Charge charge={charge} />
        }
      </div>
      <form onSubmit={handleSubmitForm}>
       <Buttoms prevForm={prevForm} nextButton={ nextButton } />
      </form>
      
    </section>
  );
}