import { useDataStudent } from "../hooks/useDataStudent"

export const AuthorizationCheckTextArea = ({checked, toggleCheckbox}) => {
    const { dataStudent } = useDataStudent()

    return (
        <div className="flex gap-4 flex-col justify-end items-center">
            <div
                className="w-full h-[50vh] overflow-y-auto overflow-x-hidden p-4 border rounded text-justify"
            >
                    <h2>Estimada Familia:</h2>
                    <p>En el marco de la emergencia sanitaria producto del COVID19 y asumiendo el
                    rol de educadores y formadores de conocimientos, resulta de interés de nuestra Facultad,
                    acercar propuestas educativas para niños, que colaboren con su formación en este contexto de
                    encierro. Es por ello, que un equipo de docentes llevará adelante estas capacitaciones para niños
                    por medio de recursos audiovisuales, actividades en línea e incluso videoconferencias en VIVO;
                    que se utilizarán con fines exclusivamente pedagógicos y como complemento a sus tareas
                    educativas habituales.</p>
                    <p>Para su realización, necesitamos del compromiso de las familias en el
                    cumplimiento de ciertas reglas para su puesta en práctica, que servirán para crear el ambiente
                    propicio y evitar situaciones imprevistas.</p>
                    <p>Los alumnos deberán conectarse en un ambiente físico adecuado, sentados
                    contra una pared, a fin de evitar que detrás de ellos puedan aparecer otros miembros de la
                    familia o distracciones. Las clases en VIVO deberán ser bajo la supervisión permanente de un
                    adulto responsable, con cámara de video apagada y micrófonos silenciados, salvo cuando el
                    docente otorgue el uso de la palabra. Esto, además de evitar interferencias, colabora con
                    organizar la participación de todos los alumnos.</p>
                    <p>Los días, horarios y frecuencia, ya fueron establecidos por el docente y siempre
                    serán dictados por las herramientas previstas dentro de la plataforma de E-Learning Total;
                    siendo este el único medio de interacción en vivo válido y habilitado con el alumno.
                    Las clases serán grabadas por los docentes a modo de registro pedagógico,
                    pudiendo los alumnos y los padres, ver las grabaciones las veces que sea necesario durante la
                    vigencia del curso.</p>
                    <p>Las clases en vivo siempre serán grupales, y en ningún caso se dictarán clases
                    individuales.</p>
                    <p>Es importante que tanto el alumno como el adulto responsable de
                    acompañarlo, guarden las buenas normas de usos y costumbres, en todo sentido, de la misma
                    forma en que se procedería en una enseñanza presencial.</p>
                    <p>Es condición de carácter obligatorio para iniciar esta capacitación, completar
                    y firmar por adulto responsable la siguiente autorización, la que se deberá entregar como “Tarea
                    1”, en formato de imagen escaneada o fotografía.</p>

                    <p>Quienes no cumplimenten la suscripción de la presente autorización en un
                    plazo máximo de 48 hs. de iniciada la propuesta formativa, serán suspendidos de forma
                    transitoria hasta tanto lo realicen, sin derecho a reclamo o indemnización de ningún tipo.</p>

                    <p>Será el referente parental a cargo, quien autorice para que pueda participar de diferentes clases
                    virtuales. La/el que suscribe {dataStudent?.nameAdult} {dataStudent?.lastNameAdult} {dataStudent?.documentTypeAdult} {dataStudent?.documentNumberAdult} al estudiante {dataStudent?.name} {dataStudent?.lastName} {dataStudent?.documentType} {dataStudent?.documentNumber} preinscripto en el curso: _____________________________
                    Autorizo a participar de clases en entornos virtuales en la plataforma Elearning Total con fines
                    exclusivamente pedagógicos realizadas por la Universidad Tecnológica Nacional - Facultad
                    Regional Resistencia, desligando a dicha Facultad, a la plataforma, docentes, coordinadores y/o
                    tutores de la responsabilidad por cualquier situación imprevista que pueda suscitarse,
                    comprometiéndome a acompañar a mi hijo/a durante el desarrollo de éstas.</p>
                
                    <p>Mail del alumno, para conectarse a la plataforma virtual:__________________________</p>
            </div>
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
                    Acepto los términos y condiciones
                </span>
            </label>
        </div>
    )
}