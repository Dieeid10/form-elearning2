import { useState } from 'react'

export const useCharge = () => {
    const [charge, setCharge] = useState(null)

    const updateCharge = (newCharge) => {
        setCharge(newCharge)
    }
    const resetCharge = () => {
        setCharge(null)
    }
    return { charge, updateCharge, resetCharge }
}