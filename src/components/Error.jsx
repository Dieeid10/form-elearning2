import { useError } from "../hooks/useError"
import { Alert, Close } from "./Svg"

export function Error() {
  const { error, changeError } = useError()

  return (
    <div 
      className="absolute top-5 bg-slate-100 font-semibold text-slate-600 h-1/3 w-1/2 flex items-center flex-col rounded-lg hover:opacity-100"
    > 
      <header className="w-full h-1/3 flex flex-col">
        <button className="cursor-pointer self-end" onClick={() => (changeError(''))} >
          <Close className="top-0 right-0" />
        </button>
        <div className="w-full flex justify-center items-center" >
          <Alert />
        </div>
      </header>
      <div className="w-full h-2/3 flex justify-center items-center p-3">
        <h2 className="{textWrap:balance;} text-lg">{error}</h2>
      </div>
    </div>
  )
}