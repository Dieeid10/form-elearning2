import { useDataStudent } from "../hooks/useDataStudent"
import { useError } from "../hooks/useError"
import { Form } from "./Form"

const title = "Ingrese los datos del adulto responsable del alumno menor de edad:"

const nextForm = "AuthorizationChech"

export function FormDataAdulto () {
    const { dataStudent } = useDataStudent()
    const { changeError } = useError()

    const data = {
        obj1: { 
            name: 'nameAdult',
            id: 'nameAdult',
            label: 'Nombre:',
            type: 'text',
            placeholder: 'Ernesto Pedro',
            key: 'nameFormAdult',
            value: dataStudent?.nameAdult || '',
            ...(dataStudent?.nameAdult && { readOnly: true })
        },
        obj2: { 
            name: 'lastNameAdult',
            id: 'lastNameAdult',
            label: 'Apellido:',
            type: 'text',
            placeholder: 'Gonzalez',
            key: 'lastNameFormAdult',
            value: dataStudent?.lastNameAdult || '',
            ...(dataStudent?.lastNameAdult && { readOnly: true })
        }
    }

    const documentForm = {
        label: 'Tipo de documento:',
        nameType: 'documentTypeAdult',
        value: dataStudent?.documentTypeAdult || '',
        ...(dataStudent?.documentTypeAdult && { readOnly: true }),
        typeToDocument: [
            { value: '', label: 'Elegir...' },
            { value: 'DNI', label: 'DNI' },
            { value: 'CUIT/CUIL', label: 'CUIT/CUIL' },
            { value: 'CDI', label: 'CDI' },
            { value: 'LE', label: 'LE' },
            { value: 'LC', label: 'LC' },
            { value: 'CI Argentia', label: 'CI Argentia' },
            { value: 'CI Extranjera', label: 'CI Extranjera' },
            { value: 'Pasaporte', label: 'Pasaporte' },
            { value: 'Certificado de Migración', label: 'Certificado de Migración' },
            { value: 'Cédula de Ciudadanía', label: 'Cédula de Ciudadanía' },
            { value: 'RUT', label: 'RUT' },
            { value: 'CURP', label: 'CURP' },
            { value: 'Otro Documento', label: 'Otro Documento' },
        ],
        numberToDocument: { 
            name: 'documentNumberAdult',
            id: 'documentNumberAdult',
            label: 'Ingrese su número de documento:',
            type: 'text',
            key: 'numberDocumentFormData',
            value: dataStudent?.documentNumberAdult || '',
            ...(dataStudent?.documentNumberAdult && { readOnly: true })
        },
    }

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
        <Form validateData={validateData} data={data} title={title} nextForm={nextForm} documentForm={documentForm} />
    )
}