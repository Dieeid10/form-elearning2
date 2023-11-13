import { useDataStudent } from "../hooks/useDataStudent"
import { Form } from "./Form"

const title = "Confirme sus datos del alumno que realizará la cursada:"

export function ConfirmData () {
    const { dataStudent } = useDataStudent()
    const prevForm = dataStudent.younger == 'true' ? "FormDataAdulto" : "FormData"

    const data = {
        obj1: { name: 'name', id: 'name', label: 'Nombre:', type: 'text', placeholder: '', key: 'nameStudentConfirm', value: dataStudent.name },
        obj2: { name: 'lastName', id: 'lastName', label: 'Apellido:', type: 'text', placeholder: '', key: 'lastNameStudentConfirm', value: dataStudent.lastName },
        obj3: { name: 'documentNumber', id: 'documentNumber', label: 'Número de documento', type: 'text', placeholder: '', key: 'documentNumberStudentConfirm', value: dataStudent.documentNumber },
        obj4: { name: 'email', id: 'email', label: 'Mail:', type: 'email', placeholder: '', key: 'documentMailStudentConfirm', value: dataStudent.email },
    }

    return (
        <Form data = {data} title = {title} prevForm={prevForm} />
    )
}