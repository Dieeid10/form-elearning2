import { useDataStudent } from "../hooks/useDataStudent"
import { useStep } from "../hooks/useStepForm"
import { Buttoms } from "./Buttoms"
import { Input } from "./Input"
import { useError } from "../hooks/useError"
import { Error } from "./Error"
import { DocumentForm } from "./DocumentFormComponent"
import { Address } from "./Address"
import { useIsYounger } from "../hooks/useIsYounger"
import { AuthorizationText } from "./AuthorizationText"

export const Form = ({ data, validateData = null, title, nextForm = null, documentForm = null, prevForm = null, address = false, AuthorizationText = false }) => {
  const { error, changeError } = useError()
  const { updateData, dataStudent } = useDataStudent()
  const { setStep } = useStep()
  const { isYounger } = useIsYounger()

  const handleSubmit = (event) => {
    event.preventDefault()
    const dataFormStudent = Object.fromEntries(new window.FormData(event.target))
    if (validateData) {
      const result = validateData(dataFormStudent)
      
      if(!result) {
        if(error !== '') return
        changeError('Datos incorrectos')
        return
      }
    }
    updateData(dataFormStudent)
    !!nextForm && setStep(nextForm)
  }

  const handleInputChange = (e, index) => {
    const newInputValues = {} 
    newInputValues[index] = e.target.value 
    if (e.target.type === 'date'){
      isYounger(e.target.value)
        .then((result) => {
          newInputValues['younger'] = result
          updateData(newInputValues)
        })
        .catch((error) => {
          console.error("Error al obtener el resultado:", error);
      });
    }
    updateData(newInputValues)
  }


    return (
      <section className="h-full w-full flex flex-col justify-center items-center mirrorEffect p-2">
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
                onChange={(e) => handleInputChange(e, data[key].name)}
                max={data[key].max || false}
                min={data[key].min || false}
                
              />
            ))
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
            !!error &&
            <Error />
          }
          <Buttoms prevForm={prevForm} />
        </form>
      </section>
    )
}