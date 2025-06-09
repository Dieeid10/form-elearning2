import { useState } from "react"
import { useStep } from "../hooks/useStepForm"
import { Form } from "./Form"
import { useDataStudent } from "../hooks/useDataStudent"

const data = {
    obj1: { name: 'email', id: 'email', label: 'Email:', type: 'email', placeholder: 'mimail@dominio.com', key: 'emailStudentForm' },
    obj2: { name: 'emailConfirm', id: 'emailConfirm', label: 'Confirme su Email:', type: 'email', placeholder: 'mimail@dominio.com', key: 'confirmEmailStudentForm' },
  }

const title = "Ingrese su mail del alumno:"

const nextForm = "FormData"

export function FormMail () {
    const [ error, setError ] = useState()
    const { setStep } = useStep()
    const { dataStudent } = useDataStudent()
    const title = dataStudent.younger ? "Ingrese los datos del alumno menor de edad: " : "Complete con los datos del alumno que realizará la cursada:"
    const next = dataStudent.younger ? "DropzoneFrontParent" : "FormData"
    setStep(next)

    const prevForm = dataStudent.nTramite ? null : "FormDataStudent"

    const validateMail = (newDataStudent) => {
        const { email, emailConfirm } = newDataStudent
        if(email !== emailConfirm) {
            setError("El mail no coincide")
        }
        return email == emailConfirm
    }

    return (
        <Form data={data} validateData={validateMail} title={title} error={error} nextForm={nextForm} prevForm={prevForm} />
    )
}