import { useState, useEffect } from "react"
import { useRestoreImage } from "../hooks/useRestoreImage"

export const useImageBackground = ({frontOrBack, parent, dataStudent}) => {
    const [ dataImageBackground, setDataImageBackground] = useState({
        'imageUrl': '',
        'imageAlt': ''
    })

    useEffect(() => {
        const imageUrl = !parent ? ( frontOrBack === 'front' ? dataStudent.frontImageUrl : dataStudent.backImageUrl ) : ( frontOrBack === 'front' ? dataStudent.frontImageUrl : dataStudent.backImageUrl )
    }
    , [frontOrBack, parent, dataStudent, dataImageBackground])

    const updateDataImageBackground = (newData) => {
        setDataImageBackground({
            ...dataImageBackground,
            ...newData
        })
    }

    return { dataImageBackground, updateDataImageBackground }
}