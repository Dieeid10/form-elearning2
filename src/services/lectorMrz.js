import { urls } from './urls.js'

export const lectorMrz = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    console.log(file instanceof File)
    console.log(typeof(file))

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

export const lectorAddress = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    console.log(file instanceof File)
    console.log(typeof(file))

    try{
        const response = await fetch(urls.lectorCuilAndAddress, {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        console.log('Se encontro la dirección o el cuil del alumno: ', data)
        return data
    } catch (error) {
        console.error("Error al decodificar la imagen: ", error)
    }
}