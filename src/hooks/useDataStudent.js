import { useContext } from "react"
import { DataContext } from "../context/dataStudent"
import { saveDataStudent } from "../services/saveDataStudent"

export function useDataStudent () {
    const {dataStudent, setDataStudent} = useContext(DataContext)

    const updateData = async (newData) => {
        const newDataStudent = {
            ...dataStudent,
            ...newData
        }
        setDataStudent(newDataStudent)
    }

    const saveDate = async () => {
        const result = await saveDataStudent(dataStudent)
        return result
    }

    return { dataStudent, updateData, saveDate }
}