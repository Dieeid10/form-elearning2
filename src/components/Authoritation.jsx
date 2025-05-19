import { Form } from "./Form"
import { useState } from 'react'

const title = "Acepte los siguientes terminos:"

const nextForm = "AuthorizationForm"

export const AuthorizationChech = () => {
    const [checked, setChecked] = useState(false)

    const toggleCheckbox = () => {
        console.log(checked)
        setChecked(!checked)
    }

    return (
        <Form title={title} nextForm={checked ? nextForm : false} AuthorizationCheck={true} checked={checked} toggleCheckbox={toggleCheckbox} />
    )
}