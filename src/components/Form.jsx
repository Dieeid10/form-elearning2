import { useDataStudent } from "../hooks/useDataStudent"
import { useStep } from "../hooks/useStepForm"
import { Buttoms } from "./Buttoms"
import { Input } from "./Input"
import { Country } from "./Country"
import { SelectProvinces } from "./SelectProvincy"
import { useError } from "../hooks/useError"
import { Error } from "./Error"

export const Form = ({ data, validateData = null, title, nextForm = null, documentForm = null, youngerSelect = null, prevForm = null, address = false }) => {
  const { error } = useError()
  const { updateData, dataStudent } = useDataStudent()
  const { setStep } = useStep()

  const handleSubmit = (event) => {
    event.preventDefault()
    const dataFormStudent = Object.fromEntries(new window.FormData(event.target))
    if (validateData) {
      const result = validateData(dataFormStudent)
      if(!result) {
        console.log('Datos incorrectos')
        return
      }
    }
    updateData(dataFormStudent)
    !!nextForm && setStep(nextForm)
  }

  const handleInputChange = (e, index) => {
    const newInputValues = {} 
    newInputValues[index] = e.target.value 
    updateData(newInputValues)
  }


    return (
      <section className=" h-full w-full flex flex-col justify-center items-center mirrorEffect p-10">
        <h3
          className="text-xl text-white font-medium text-gray-300 self-start mx-10"
        >
          {title}
        </h3>
        <form 
          className="flex w-2/3 h-full flex-col justify-around items-center"
          onSubmit = { handleSubmit } 
          >

          {
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
              />
            ))
          }

          {
            !!documentForm &&
            !address &&
            <fieldset 
              className="w-2/3"
            >
              <label 
                className='block mb-2 text-sm font-medium text-gray-300'
              >
                {documentForm.label}
              </label>
              <select 
                className='border text-sm rounded-lg block w-full p-2.5 bg-sky-200 broder-gray-600 placeholder-gray-400 text-sky-500 rounded-full'
                name={documentForm.nameType}
              >
                {
                  documentForm.typeToDocument.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))
                }
              </select>
            </fieldset>
          }

          {
            !!documentForm &&
            !address &&
            <Input
              key={documentForm.numberToDocument.key}
              name={documentForm.numberToDocument.name}
              id={documentForm.numberToDocument.id}
              label={documentForm.numberToDocument.label}
              type={documentForm.numberToDocument.type}
            />
          }

          {
            !!address &&
            (
              <>
                <Country />
                {
                  dataStudent.country === 'AR' &&
                  <SelectProvinces />
                }
                <Input
                  key='addressStudentForm'
                  name='address'
                  id='address'
                  label='Ingrese su dirección: '
                  type='text'
                />
                <Input
                  key='provinceStudentFormData'
                  name='CP'
                  id='CP'
                  label='Ingrese su código postal: '
                  type='text'
                />
              </>
            )
          }

          {
            !!youngerSelect &&
            !address &&
            <fieldset 
              className="w-2/3"
            >
              <label 
                className='block mb-2 text-sm font-medium text-gray-300'
              >
                {youngerSelect.labelYounger}
              </label>
              <select 
                className='border text-sm rounded-lg block w-full p-2.5 bg-sky-200 broder-gray-600 placeholder-gray-400 text-sky-500 rounded-full'
                name={youngerSelect.nameYoungerSelect}
              >
                {
                  youngerSelect.youngerOptions.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))
                }
              </select>
            </fieldset>
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