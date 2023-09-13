import { useContext } from "react";
import { ErrorContext } from "../context/dataStudent";

export function useError() {
    const { error, setError } = useContext(ErrorContext)

    const changeError = (newError) => {
        setError(newError)
    }

    return { error, changeError }
}