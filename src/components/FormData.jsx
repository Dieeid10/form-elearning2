import { Form } from "./Form"
import { useDataStudent } from "../hooks/useDataStudent"
import { FormMail } from './FormMail'


const data = {
    obj1: { name: 'areaCode', id: 'areaCode', label: 'Código de área: (No debe iniciar con 0)', type: 'text', placeholder: '11', key: 'codStudentForm', pattern:'[1-9]{2,3}', min:'1', max:'3'},
    obj2: { name: 'tel', id: 'tel', label: 'Telefono:', type: 'tel', placeholder: '4886-7915', key: 'telStudentForm', pattern:'[0-9]+' },
  }

  const prevForm = "formMail"

export function FormData () {
    const { dataStudent } = useDataStudent()
    const title = dataStudent.younger == 'true' ? "Ingrese los datos del alumno menor de edad: " : "Complete con los datos del alumno que realizará la cursada:"
    const next = dataStudent.younger ? "FormDataAdulto" : "ConfirmData"
    console.log(dataStudent['younger'])

    return (
        <Form data = {data} title = {title} nextForm={next} prevForm={prevForm} address='true' />
    )
}