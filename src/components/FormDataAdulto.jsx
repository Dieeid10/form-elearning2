import { useDataStudent } from "../hooks/useDataStudent"
import { useError } from "../hooks/useError"
import { Form } from "./Form"

const data = {
    obj1: { name: 'nameAdult', id: 'nameAdult', label: 'Nombre:', type: 'text', placeholder: 'Ernesto Pedro', key: 'nameFormAdult' },
    obj2: { name: 'lastNameAdult', id: 'lastNameAdult', label: 'Apellido:', type: 'text', placeholder: 'Gonzalez', key: 'lastNameFormAdult' },
    obj3: { name: 'mailAdult', id: 'mailAdult', label: 'Email:', type: 'email', placeholder: 'mimail@dominio.com', key: 'mailFormAdult' },
    obj4: { name: 'documentAdult', id: 'documentAdult', label: 'Número de documento del adulto responsable:', type: 'text', key: 'documentFormAdult' },
  }

const title = "Ingrese los datos del adulto responsable del alumno menor de edad:"

const nextForm = "ConfirmData"

const prevForm = "FormData"

export function FormDataAdulto () {
    const { dataStudent } = useDataStudent()
    const { changeError } = useError()

    const validateData = (newDataStudent) => {
        const { documentAdult } = newDataStudent
        console.log(documentAdult, dataStudent.documentNumber)
        if ( dataStudent.documentNumber === documentAdult ) {
            changeError("El número de documento del alumno y el número documento del adulto responsable no pueden ser el mismo.")
            return false
        }
        return true
    }

    return (
        <Form validateData={validateData} data={data} title={title} nextForm={nextForm} prevForm={prevForm} />
    )
}