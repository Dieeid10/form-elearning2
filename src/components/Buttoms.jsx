import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react'
import { useDataStudent } from "../hooks/useDataStudent"
import { useStep } from '../hooks/useStepForm'

export function Buttoms ({ prevForm, nextButton = true }) {
  const { step, setStep } = useStep()
  const { saveDate } = useDataStudent()

  const handleSubmitForm = (event) => {
    event.preventDefault()
    saveDate()
  }

  const handlePrev = (e) => {
    e.preventDefault()
    setStep(prevForm)
  }

    return (
        <nav 
          className={`flex w-full ${prevForm ? 'justify-between' : 'justify-end'}`}
        >
          {
            prevForm &&
          <button 
            className="w-1/4 flex justify-center border text-sm rounded-lg block p-2.5 bg-white/5 broder-gray-600 text-white rounded-full self-start ease-out duration-75 hover:bg-white/20 hover:scale-110 active:bg-white/50 px-4"
            type='button'
            onClick={handlePrev}
          >
            <IconArrowNarrowLeft /> Anterior
          </button>
          }
          {
            step != 'ConfirmData' &&
            nextButton &&
            <button 
              className="w-1/4 flex justify-center border text-sm rounded-lg block p-2.5 bg-white/5 broder-gray-600 text-white rounded-full self-end ease-out duration-75 hover:bg-white/20 hover:scale-110 active:bg-white/50"
              type='submit'
            >
              Siguiente <IconArrowNarrowRight />
            </button>
          }
          {
            step === 'ConfirmData' &&
            <button 
              className="w-1/4 flex justify-center border text-sm rounded-lg block p-2.5 bg-white/5 broder-gray-600 text-white rounded-full self-end ease-out duration-75 hover:bg-white/20 hover:scale-110 active:bg-white/50"
              type='submit'
              onClick={handleSubmitForm}
            >
              Enviar
            </button>
          }
        </nav>
    )
}