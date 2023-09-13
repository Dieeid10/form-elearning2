import './Footer.css'

export function Footer ({ dataStudent }) {
    return (
        <footer className="footer">
            { 
                JSON.stringify(dataStudent, null, 2)
            }
        </footer>
    )
}