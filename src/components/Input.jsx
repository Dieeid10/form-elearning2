import { useId } from "react"
import './input.css'

export const Input = ({ id, name, label, type, placeholder, value = null, min, max, pattern, ...porps }) => {
  const fieldset = useId()
  const inputId = useId()
  console.log(max)

      return (
        <fieldset 
          className="w-full sm:w-2/3"
          key={fieldset}
        >
          <label className='block mb-2 text-sm font-medium text-gray-300' htmlFor={id} aria-describedby={inputId} >{label}</label>
          <input 
            className='border text-base rounded-lg block w-full p-2.5 bg-white/5 broder-gray-600 placeholder-gray-400 text-white rounded-full hover:bg-white/20' 
            type={type} 
            id={inputId} 
            name={name} 
            placeholder={placeholder}
            {...porps} 
            {...(min && { min: min })}
            {...(max && { max: max })}
            {...(pattern && { pattern: pattern })}
            {...(value && { value: value })}
            required
          />
        </fieldset>
      )
  }
  
