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
    return (
        <Form data={data} title={title} nextForm={nextForm} prevForm={prevForm} />
    )
}