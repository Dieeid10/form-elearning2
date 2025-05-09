import { createContext, useState } from "react";

// contexto para consumir
export const DataContext = createContext()
export const StepContext = createContext()
export const ErrorContext = createContext()

// acceso al contexto
export function DataStudent ({ children }) {
    const [ dataStudent, setDataStudent ] = useState({})

    return (
        <DataContext.Provider value={{
            dataStudent,
            setDataStudent
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export function StepForm ({ children }) {
    const [ step, setStep ] = useState('DropzoneFront')

    return (
        <StepContext.Provider value={{
            step,
            setStep
        }}
        >
            {children}
        </StepContext.Provider>
    )
}

export function ErrorToApi ({ children }) {
    const [ error, setError ] = useState(null)

    return (
        <ErrorContext.Provider value={{
            error,
            setError
        }}
        >
            {children}
        </ErrorContext.Provider>
    )
}