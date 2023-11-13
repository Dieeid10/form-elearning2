import { Form } from "./Form"
import { useDataStudent } from "../hooks/useDataStudent"
import { FormMail } from './FormMail'


const data = {
    obj1: { name: 'tel', id: 'tel', label: 'Telefono:', type: 'tel', placeholder: '4886-7915', key: 'telStudentForm' },
  }

  const prevForm = "formMail"

export function FormData () {
    const { dataStudent } = useDataStudent()
    const title = dataStudent.younger == 'true' ? "Ingrese los datos del alumno menor de edad: " : "Complete con los datos del alumno que realizará la cursada:"
    const next = dataStudent.younger == 'true' ? "FormDataAdulto" : "ConfirmData"
    console.log(dataStudent['younger'])

    return (
        <Form data = {data} title = {title} nextForm={next} prevForm={prevForm} address='true' />
    )
}