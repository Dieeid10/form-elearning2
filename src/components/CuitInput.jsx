import { useState, useEffect } from "react"
import { Input } from "./Input"
import { useDataStudent } from "../hooks/useDataStudent"

export function CuitInput() {
    const [checked, setChecked] = useState(false)
    const [ cuitData, setCuitData ] = useState({
        cuit: '',
        cuitError: false,
    })
    const { updateData, dataStudent } = useDataStudent()
    const [debounceTimeout, setDebounceTimeout] = useState(null)

    const toggleCheckbox = () => {
        setChecked(!checked)
    }

    const handleInputChange = (e) => {
        const { value } = e.target
        setCuitData((prev) => ({
            ...prev,
            cuit: value,
        }))

        // Clear the previous timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout)
        }

        // Set a new timeout for debounce
        const timeout = setTimeout(() => {
            const isValid = /^[0-9]{2}-[0-9]{8}-[0-9]$/.test(value)
            setCuitData({
                cuit: value,
                cuitError: value !== '' && !isValid,
            })

            if (isValid) {
                updateData({ cuit: value })
            } else {
                updateData({ cuit: '' })
            }
        }, 700)

        setDebounceTimeout(timeout)
    }

    useEffect(() => {
        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout)
            }
        }
    }, [debounceTimeout])

    return (
        <>
            <input
                type="checkbox"
                checked={checked}
                onChange={() => { }}
                style={{ display: 'none' }}
            />
            <label
                onClick={toggleCheckbox}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    gap: '10px',
                    userSelect: 'none',
                }}
            >
                <div
                    style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: checked ? '#4caf50' : 'white',
                        transition: 'background-color 0.2s ease',
                    }}
                    className="broder-gray-600"
                >
                    {checked && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                </div>

                <span className="text-white" style={{ fontSize: '16px' }}>
                    El curso será abonado por un tercero
                </span>
            </label>
            
            {
                !!checked &&
                <Input
                    name='cuit'
                    id='cuit'
                    label='Ingrese el CUIT:'
                    type='text'
                    placeholder='20-12345678-9'
                    value={cuitData.cuit}
                    pattern='[0-9]{2}-[0-9]{8}-[0-9]'
                    onChange={handleInputChange}
                />
            }
            {
                cuitData.cuitError &&
                <p className="text-red-500 text-sm">
                    El CUIT ingresado no es válido
                </p>
            }
        </>
    )
}