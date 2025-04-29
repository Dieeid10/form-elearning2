import { useContext } from "react"
import { DataContext } from "../context/dataStudent"

const url = import.meta.env.MODE === 'development' ? 'http://localhost:8000' : 'https://api.example.com'

export function useDataStudent () {
    const {dataStudent, setDataStudent} = useContext(DataContext)

    const updateData = (newData) => {
        const newDataStudent = {
            ...dataStudent,
            ...newData
        }
        setDataStudent(newDataStudent)
    }

    const saveDate = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataStudent)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Success:', data);
        })
    }

    return { dataStudent, updateData, saveDate }
}