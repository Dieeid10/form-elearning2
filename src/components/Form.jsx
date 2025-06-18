import { useDataStudent } from "../hooks/useDataStudent"
import { useStep } from "../hooks/useStepForm"
import { Buttoms } from "./Buttoms"
import { Input } from "./Input"
import { useError } from "../hooks/useError"
import { Error } from "./Error"
import { DocumentForm } from "./DocumentFormComponent"
import { Address } from "./Address"
import { useIsYounger } from "../hooks/useIsYounger"
import { AuthorizationCheckTextArea } from "./AuthorizationCheckTextArea"
import { CuitInput } from "./CuitInput"
import { useState } from "react"
import { SavingDataElement } from "./SavingDataElement"

export const Form = ({ data, validateData = null, title, nextForm = null, documentForm = null, prevForm = null, address = false, AuthorizationText = false, AuthorizationCheck = false, checked=false, toggleCheckbox=false, cuitInput=false }) => {
  const { error, changeError } = useError()
  const { updateData, dataStudent, saveDate } = useDataStudent()
  const [ savingData, setSavingData ] = useState(false)
  const { step, setStep } = useStep()
  const { isYounger } = useIsYounger()

  const handleSubmit = async (event) => {
    event.preventDefault()
  
    const dataFormStudent = Object.fromEntries(new window.FormData(event.target))
  
    // Esperar el resultado de isYounger si es necesario
    if (
      dataFormStudent.birthdate &&
      dataFormStudent.birthdate !== '' &&
      typeof dataStudent.younger !== 'boolean'
    ) {
      try {
        console.log("Ingreso al if de fecha")
        console.log('La fecha es: ', dataFormStudent.birthdate)
  
        const result = await isYounger(dataFormStudent.birthdate)
        dataFormStudent.younger = result
      } catch (error) {
        console.error("Error al obtener el resultado:", error)
        changeError('Error al validar la edad')
        return
      }
    }
  
    // Validar los datos
    if (validateData) {
      const result = validateData(dataFormStudent)
      if (!result) {
        if (error !== '') return
        changeError('Datos incorrectos')
        return
      }
    }
  
    // Guardar o avanzar en el formulario
    if (step === 'FormData') {
      setSavingData(true)
      const result = await saveDate()
      if(result) setSavingData(false)
      if(!result?.success) {
        changeError(result?.message || 'Error al guardar los datos')
      }
      if(result?.success) {
        changeError(null)
      }
      return
    }
  
    await updateData(dataFormStudent)
    if (nextForm) setStep(nextForm)
  }

    return (
      <section className="h-full w-full flex flex-col justify-center items-center mirrorEffect p-2">
        {
          savingData &&
          <SavingDataElement />
        }
        <h3
          className="text-xl text-white font-medium text-gray-300 self-start mx-10"
        >
          {title}
        </h3>
        <form 
          className="flex w-2/3 h-full flex-col justify-around items-center my-2 gap-2"
          onSubmit = { handleSubmit } 
          >

          {
            data &&
            Object.keys(data).map((key) => (
              <Input 
                key={data[key].key}
                name={data[key].name}
                id={data[key].id}
                label={data[key].label}
                type={data[key].type}
                placeholder={data[key].placeholder}
                value={data[key].value}
                max={data[key].max || false}
                min={data[key].min || false}
                pattern={data[key].pattern || false}
                readOnly={data[key].readOnly || false}
              />
            ))
          }

          {
            !!documentForm &&
            address &&
            <DocumentForm documentForm={documentForm} Input={Input} />
          }

          {
            !!AuthorizationCheck &&
            <AuthorizationCheckTextArea checked={checked} toggleCheckbox={toggleCheckbox} />
          }

          {
            !!AuthorizationText &&
            <AuthorizationText />
          }

          {
            !!documentForm &&
            !address &&
            <DocumentForm documentForm={documentForm} Input={Input} />
          }

          {
            !!address &&
            <Address dataStudent={dataStudent} Input={Input} />
          }

          {
            !!cuitInput &&
            <CuitInput />
          }

          {
            !!error &&
            <Error />
          }
          <Buttoms prevForm={prevForm} nextButton={nextForm} />
        </form>
      </section>
    )
}