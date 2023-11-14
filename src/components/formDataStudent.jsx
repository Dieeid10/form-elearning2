import { useIsYounger } from "../hooks/useIsYounger"
import { Form } from "./Form"

const atualyDate = new Date()
console.log(atualyDate)

const data = {
    obj1: { name: 'name', id: 'name', label: 'Nombre:', type: 'text', placeholder: 'Ernesto Pedro', key: 'nameStudentFormData' },
    obj2: { name: 'lastName', id: 'lastName', label: 'Apellido:', type: 'text', placeholder: 'Gonzalez', key: 'lastNameStudentFormData' },
    obj3: { name: 'birthdate', id: 'birthdate', label: 'Fecha de nacimiento:', type: 'date', placeholder: '', key: 'birthdateStudentFormData', min:'1950-01-01', max:'' },
}

const documentForm = {
    label: 'Tipo de documento:',
    nameType: 'documentType',
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
    numberToDocument: { name: 'documentNumber', id: 'documentNumber', label: 'Ingrese su número de documento:', type: 'text', key: 'numberDocumentFormData' },
}

const title = "Ingrese los datos del alumno que realizara la cursada:"

const nextForm = "formMail"

const prevForm = "selectMode"

export function FormDataStudent () {
    const { isYounger } = useIsYounger()

    const validateData = async (dataFormStudent) => {
        const { birthdate } = dataFormStudent
        const resultYounger = await isYounger(birthdate)
        if (resultYounger) {
            result = {
                "campo": "campo fecha",
                "isYounger": resultYounger
            }
            console.log(result)
            return result
        }
    }

    return (
        <Form data={data} validateData={validateData} title={title} nextForm={nextForm} documentForm={documentForm} prevForm={prevForm} />
    )
}