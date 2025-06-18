import { lectorMrz } from '../services/lectorMrz'
import { useDataStudent } from './useDataStudent'
import { useIsYounger } from './useIsYounger'
import countryJson from '../fichero/paises.json'

export function useMrzDecoder() {
    const { dataStudent } = useDataStudent()
    const { isYounger } = useIsYounger()

    function convertDateMrz(fechaMRZ) {
        const year = parseInt(fechaMRZ.slice(0, 2), 10);
        const month = fechaMRZ.slice(2, 4);
        const day = fechaMRZ.slice(4, 6);
        
        const currentYear = new Date().getFullYear() % 100;
        const fullYear = year > currentYear + 1 ? 1900 + year : 2000 + year;
        
        return `${fullYear}-${month}-${day}`;
        }

    const getDataMrz = async (file, parent) => {
        const response = await lectorMrz(file)
        let newDataDni
        if(response?.successful) {
            if(parent && !dataStudent?.nameAdult && !dataStudent?.lastNameAdult) {
                newDataDni = {
                  lastNameAdult: response.data_document['surname'] ?? 'n/d',
                  nameAdult: response.data_document['names'] ?? 'n/d',
                  sexAdult: response.data_document['sex'] ?? 'n/d',
                  documentNumberAdult: response.data_document['number'].replace('<', '') ?? 'n/d',
                  dateOdBirthAdult: convertDateMrz(response.data_document['date_of_birth']) ?? 'n/d',
                  dateOfIssueAdult: convertDateMrz(response.data_document['expiration_date']) ?? 'n/d',
                  documentTypeAdult: (response.data_document['type'] === 'ID' && response.data_document['country'] === 'ARG') ? 'DNI' : response.data_document['type'],
                  countryAdult: countryJson.find(country => country['alfa-3'] === response.data_document['country'].toUpperCase())['nombre'],
                  countryShortAdult: countryJson.find(country => country['alfa-3'] === response.data_document['country'].toUpperCase())['alfa-2']
                }
            } else if(!parent && !dataStudent?.name && !dataStudent?.lastName) {
                    newDataDni = {
                        lastName: response.data_document['surname'] ?? 'n/d',
                        name: response.data_document['names'] ?? 'n/d',
                        sex: response.data_document['sex'] ?? 'n/d',
                        documentNumber: response.data_document['number'].replace('<', '') ?? 'n/d',
                        dateOdBirth: convertDateMrz(response.data_document['date_of_birth']) ?? 'n/d',
                        dateOfIssue: convertDateMrz(response.data_document['expiration_date']) ?? 'n/d',
                        documentType: (response.data_document['type'] === 'ID' && response.data_document['country'] === 'ARG') ? 'DNI' : response.data_document['type'],
                        country: countryJson.find(country => country['alfa-3'] === response.data_document['country'].toUpperCase())['nombre'],
                        countryShort: countryJson.find(country => country['alfa-3'] === response.data_document['country'].toUpperCase())['alfa-2']
                    }
            } else if(!parent) {
                newDataDni = {
                    country: countryJson.find(country => country['alfa-3'] === response.data_document['country'].toUpperCase())['nombre'],
                    countryShort: countryJson.find(country => country['alfa-3'] === response.data_document['country'].toUpperCase())['alfa-2']
                }
            }

            if(!(typeof dataStudent.younger === "boolean") && response.data_document['date_of_birth']) {
                newDataDni.younger = await isYounger(response.data_document['date_of_birth'])
            }
            
            console.log('Termino de escanear el mrz.')
            return newDataDni
        }
    }

    const lectorDocumentMrz = async (file, parent) => {
        const newDataDni = await getDataMrz(file, parent)
        
        return newDataDni
    }

    return { lectorDocumentMrz }
}