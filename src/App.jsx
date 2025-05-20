import './App.css'
import { ImageDropzone } from './components/Drag&Drop'
import { Footer } from './components/Footer'
import { FormMail } from './components/FormMail'
import { IS_DEVELOPMENT } from './config'
import { useStep } from './hooks/useStepForm'
import './components/cube.css'
import { SelectChargingMode } from './components/SelectChargingMode'
import './components/mirrorEfect.css'
import { FormData } from './components/FormData'
import { FormDataAdulto } from './components/FormDataAdulto'
import { ConfirmData } from './components/ConfirmData'
import { FormDataStudent } from './components/formDataStudent'
import { useDataStudent } from './hooks/useDataStudent'
import { AuthorizationForm } from './components/AuthorizationForm'
import { ImageDropzoneParent } from './components/Drag&DropParent'
import { AuthorizationChech } from './components/Authoritation'
import { useSearchParams } from 'react-router-dom'

const steps = {
  formMail: <FormMail className='' />,
  DropzoneFront: <ImageDropzone frontOrBack='front' />,
  DropzoneBack: <ImageDropzone frontOrBack='back' />,
  DropzoneFrontParent: <ImageDropzoneParent frontOrBack='front' parent='true' />,
  DropzoneBackParent: <ImageDropzoneParent frontOrBack='back' parent='true' />,
  selectMode: <SelectChargingMode />,
  FormData: <FormData />,
  FormDataAdulto: <FormDataAdulto />,
  ConfirmData: <ConfirmData />,
  FormDataStudent: <FormDataStudent />,
  AuthorizationForm: <AuthorizationForm />,
  AuthorizationChech: <AuthorizationChech />,
}

function App() {
  const { dataStudent } = useDataStudent()
  const { step } = useStep()
  const [searchParams] = useSearchParams()
  const isParent = searchParams.get('parent')
  console.log('isParent', isParent)

  return (
    <>
      <div
        id='cube'
        className='absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5 -z-10'
      />
      {steps[step]}
      
      { IS_DEVELOPMENT && <Footer dataStudent={dataStudent} /> }
    </>
  )
}

export default App
