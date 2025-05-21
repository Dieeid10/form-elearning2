import { Form } from "./Form"
import { AuthorizationText } from './AuthorizationText'
import { useDataStudent } from "../hooks/useDataStudent"

const title = "Entrega de autorización de participación:"

const nextForm = "FormData"

export function AuthorizationForm () {
    const { dataStudent } = useDataStudent()
    
    return (
        <Form AuthorizationText={AuthorizationText} title={title} nextForm={dataStudent.authorizationName ? nextForm : false} />
    )
}