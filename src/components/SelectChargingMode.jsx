import { useStep } from "../hooks/useStepForm";
import { Img } from "./Img";
import { IconClipboardText } from '@tabler/icons-react'

export function SelectChargingMode () {
    const { setStep } = useStep()

    const handlerStepDni = () => {
        setStep('DropzoneFront')
    }

    const handlerManualDni = () => {
        setStep('FormDataStudent')
    }

    return (
        <section className=" h-full w-full flex flex-col mirrorEffect">
            <header className="flex justify-center pt-10">
                <h1 className="text-3xl text-white">Elija la forma de cargar su datos:</h1>
            </header>
            <menu className="flex justify-around items-center p-4 w-full h-full box-border">
                <button 
                    className="w-1/3 h-5/6 justify-around items-center flex flex-col bg-transparent p-5 box-border rounded-md hover:border-2 border-sky-400"
                    onClick={handlerStepDni}
                >
                        <Img 
                            className='rounded-lg w-5 aspect-auto'
                            src="img/frente.webp"
                            alt='Frente de documento'
                            loading="eager"
                        />
                        <h3 className="text-lg text-white font-medium">
                            Cargar datos con una imagen del DNI argentino
                        </h3>
                </button>
                <button 
                    className="w-1/3 h-5/6 justify-around items-center flex flex-col bg-transparent p-5 box-border rounded-md hover:border-2 border-sky-400"
                    onClick={handlerManualDni}    
                >
                    <IconClipboardText size={300} stroke={1.5} color="azure" />
                    <h3 className="text-lg text-white font-medium">
                        Cargar los datos manualmente
                    </h3>
                </button>
            </menu>
        </section>
    )
}