import { useStep } from "../hooks/useStepForm";
import { Img } from "./Img";
import { IconClipboardText } from '@tabler/icons-react'
import { BanSvg } from "./Svg";

export function SelectChargingMode () {
    const { setStep } = useStep()

    const handlerStepDni = () => {
        setStep('DropzoneFront')
    }

    const handlerManualDni = () => {
        setStep('FormDataStudent')
    }

    return (
        <section className=" h-full w-full flex flex-col justify-center mirrorEffect">
            <header className="flex justify-center pt-10">
                <h1 className="text-3xl text-white">¿El alumno que realizará la cursada posee DNI argentino?</h1>
            </header>
            <menu className="flex justify-around items-center flex-col sm:flex-row p-4 w-full h-2/3 sm:h-full box-border">
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
                        Sí, poseo DNI argentino.
                    </h3>
                </button>
                <button 
                    className="w-1/3 h-5/6 justify-around items-center flex flex-col bg-transparent p-5 box-border rounded-md hover:border-2 border-sky-400"
                    onClick={handlerManualDni}    
                >
                    <div className="relative text-red-600 rounded-md">
                        <Img 
                            className='rounded-lg w-5 aspect-auto'
                            src="img/frente.webp"
                            alt='Frente de documento'
                            loading="eager"
                        />
                        
                            <BanSvg />
                        
                    </div>
                    <h3 className="text-lg text-white font-medium">
                        No, no poseo DNI argentino.
                    </h3>
                </button>
            </menu>
        </section>
    )
}