import { useContext } from "react"
import { StepContext } from "../context/dataStudent"

export function useStep () {
    const { step, setStep } = useContext(StepContext)

    return { step, setStep}
}