import { useContext } from "react"
import { DataContext } from "../context/dataStudent"

export function useDataStudent () {
    const {dataStudent, setDataStudent} = useContext(DataContext)

    const updateData = (newData) => {
        const newDataStudent = {
            ...dataStudent,
            ...newData
        }
        setDataStudent(newDataStudent)
    }

    return { dataStudent, updateData }
}