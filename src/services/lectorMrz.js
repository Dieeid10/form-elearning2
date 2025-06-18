import { urls } from './urls.js'

export const lectorMrz = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    console.log('file: ', file)

    try{
        const response = await fetch(urls.lectorCodeMrz, {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        console.log('Se decodifico el código mrz: ', data)
        return data
    } catch (error) {
        console.error("Error al decodificar la imagen: ", error)
    }
}