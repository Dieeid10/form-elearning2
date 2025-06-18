import { useContext } from "react"
import { DataContext } from "../context/dataStudent"
import { saveDataStudent } from "../services/saveDataStudent"

export function useDataStudent () {
    const {dataStudent, setDataStudent} = useContext(DataContext)

    const updateData = async (newData, filteredToRemove = []) => {
        const clearDataStudent = { ...dataStudent }
        filteredToRemove.forEach(attr => delete clearDataStudent[attr])

        const newDataStudent = {
            ...clearDataStudent,
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