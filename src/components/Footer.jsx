import { useState } from 'react'
import './Footer.css'

export function Footer({ dataStudent }) {
    const [showData, setShowData] = useState(false)

    const toggleData = () => {
        setShowData((prevState) => !prevState)
    }

    return (
        <footer className="footer">
            <button className="toggle-button" onClick={toggleData}>
                {showData ? 'Ocultar Datos' : 'Mostrar Datos'}
            </button>
            {showData && dataStudent && (
                <pre className="data-display">
                    {JSON.stringify(dataStudent, null, 2)}
                </pre>
            )}
        </footer>
    )
}