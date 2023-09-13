import { Form } from "./Form"
import { useDataStudent } from "../hooks/useDataStudent"
import { FormMail } from './FormMail'


const data = {
    obj1: { name: 'tel', id: 'tel', label: 'Telefono:', type: 'tel', placeholder: '4886-7915', key: 'telStudentForm' },
    obj2: { name: 'country', id: 'country', label: 'Pais:', type: 'text', placeholder: 'Argentina', key: 'countryStudentForm' },
    obj3: { name: 'province', id: 'province', label: 'Provincia:', type: 'text', placeholder: 'Buenos Aires', key: 'provinceStudentForm' },
    obj4: { name: 'CP', id: 'CP', label: 'Código postal:', type: 'text', placeholder: '', key: 'provinceStudentFormData' },
  }

  const prevForm = "formMail"

export function FormData () {
    const { dataStudent } = useDataStudent()
    const title = dataStudent.younger == 'true' ? "Ingrese los datos del alumno menor de edad: " : "Complete con sus datos:"
    const next = dataStudent.younger == 'true' ? "FormDataAdulto" : "ConfirmData"
    console.log(dataStudent['younger'])

    return (
        <Form data = {data} title = {title} nextForm={next} prevForm={prevForm} />
    )
}