import { Form } from "./Form"


const data = {
    obj1: { name: 'name', id: 'name', label: 'Nombre:', type: 'text', placeholder: 'Ernesto Pedro', key: 'nameStudentFormData' },
    obj2: { name: 'lastName', id: 'lastName', label: 'Apellido:', type: 'text', placeholder: 'Gonzalez', key: 'lastNameStudentFormData' },
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
 const youngerSelect = {
    labelYounger: '¿ El alumno es menor de edad ?',
    nameYoungerSelect: 'younger',
    youngerOptions: [
        { value: '', label: 'Elije la opción...' },
        { value: true, label: 'Si' },
        { value: false, label: 'no' },
    ]
 }

const title = "Ingrese los datos del alumno que realizara la cursada:"

const nextForm = "formMail"

const prevForm = "selectMode"

export function FormDataStudent () {
    

    return (
        <Form data={data} title={title} nextForm={nextForm} documentForm={documentForm} youngerSelect={youngerSelect} prevForm={prevForm} />
    )
}