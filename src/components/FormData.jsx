import { Form } from "./Form"
import { useDataStudent } from "../hooks/useDataStudent"

export function FormData () {
    const { dataStudent } = useDataStudent()
    const title = dataStudent.younger == 'true' ? "Ingrese los datos del alumno menor de edad: " : "Complete con los datos del alumno que realizará la cursada:"

    const data = {
        obj2: { name: 'tel', id: 'tel', label: 'Telefono:', type: 'tel', placeholder: '4886-7915', key: 'telStudentForm', pattern:'[0-9]+', value: dataStudent.tel || '' }
    }

    return (
        <Form data={data} title={title} address={true} cuitInput={true} />
    )
}