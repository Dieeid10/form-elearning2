import { Form } from "./Form"
import { AuthorizationText } from './AuthorizationText'

const title = "Entrega de autorización de participación:"

const nextForm = "ConfirmData"

const prevForm = "FormDataAdulto"

export function AuthorizationForm () {
    
    return (
        <Form AuthorizationText={AuthorizationText} title={title} nextForm={nextForm} prevForm={prevForm} />
    )
}