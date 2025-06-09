import { useIsYounger } from "../hooks/useIsYounger"
import { Form } from "./Form"
import { useDataStudent } from "../hooks/useDataStudent"

const currentYear = new Date().getFullYear();
const max = `${currentYear - 5}-01-01`
const min = `${currentYear - 100}-01-01`

const title = "Ingrese los datos del alumno que realizara la cursada:"

const nextForm = "formMail"

export function FormDataStudent () {
    const { isYounger } = useIsYounger()
    const { dataStudent } = useDataStudent()

    const data = {
        obj1: { 
            name: 'name',
            id: 'name',
            label: 'Nombre:',
            type: 'text',
            placeholder: dataStudent?.name || 'Ernesto Pedro',
            value: dataStudent?.name || '',
            key: 'nameStudentFormData',
            /* ...(dataStudent?.name && { readOnly: true }) */
        },
        obj2: { 
            name: 'lastName',
            id: 'lastName',
            label: 'Apellido:',
            type: 'text',
            placeholder: dataStudent?.lastName || 'Gonzalez',
            value: dataStudent?.lastName || '',
            key: 'lastNameStudentFormData',
            /* readOnly: !!dataStudent?.lastName */
        },
        ...( dataStudent?.dateOdBirth ? 
            {
                obj3: { 
                    name: 'birthdate',
                    id: 'birthdate',
                    label: 'Fecha de nacimiento (mes/día/año):',
                    type: 'text',
                    placeholder: '',
                    key: 'birthdateStudentFormData',
                    value: dataStudent?.dateOdBirth,
                    readOnly: true,
                    required: true
                }        
            } : {
                obj3: { 
                    name: 'birthdate',
                    id: 'birthdate',
                    label: 'Fecha de nacimiento (mes/día/año):',
                    type: 'date',
                    placeholder: '',
                    key: 'birthdateStudentFormData',
                    min: min,
                    max: max,
                    readOnly: false,
                    required: true
                }
            }
        )
    }

    const documentForm = {
        label: 'Tipo de documento:',
        nameType: 'documentType',
        value: dataStudent?.documentType || '',
        /* readOnly: !!dataStudent?.documentType, */
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
            name: 'documentNumber',
            id: 'documentNumber',
            label: 'Ingrese su número de documento:',
            type: 'text',
            key: 'numberDocumentFormData',
            value: dataStudent?.documentNumber || '',
            /* readOnly: !!dataStudent?.documentNumber, value: dataStudent?.documentNumber || ''  */
        },
    }

    const validateData = async (dataFormStudent) => {
        const { birthdate } = dataFormStudent
        const resultYounger = await isYounger(birthdate)
    }

    return (
        <Form data={data} validateData={validateData} title={title} nextForm={nextForm} documentForm={documentForm} />
    )
}