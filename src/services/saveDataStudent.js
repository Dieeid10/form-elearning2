import { urls } from './urls.js'

export const saveDataStudent = async (dataStudent) => {
    try{
        const formData = new FormData();

        Object.entries(dataStudent).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        // Si es un archivo (tipo File), lo agregamos directamente
        if (value instanceof File) {
            formData.append(key, value);
        } else {
            // Todo lo demás lo convertimos a string antes de agregarlo
            formData.append(key, value.toString());
        }
        })

        const response = await fetch(urls.saveDataStudent, {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error al decodificar la imagen: ", error)
    }
}