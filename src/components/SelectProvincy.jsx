import { useState, useId } from 'react'
import { useFilter } from "../hooks/useFilter.js";
import { Search } from './Svg';
import pronvincesJson from '../fichero/provincias.json'

export function SelectProvinces() {
  const { dataFilteded, updateFilter, filter } = useFilter({ data: pronvincesJson })
  const [ valueInput, setValueInput ] = useState("")
  const [ isActive, setIsActive ] = useState(false)
  const fieldset = useId()

  const handleChange = (e) => {
    const newFilter = e.target.value
    if (newFilter.startsWith(' ')) return
    updateFilter(newFilter)
  }

  const selectOption = (e) => {
    const value = e.target.value
    const textButton = e.target.innerText
    setValueInput(textButton)
    updateFilter("")
    setIsActive(!isActive)
  }

  const visibilityOptions = () => {
    setIsActive(!isActive)
  }

  return (
    <fieldset 
      className="w-2/3 relative"
      key={fieldset}
    >
      <label htmlFor="country" className='block mb-2 text-sm font-medium text-gray-300' >Seleccione su provincia: </label>
      <input 
        onClick={visibilityOptions} 
        type="text" 
        value={valueInput} 
        className={`w-full inputToSelect p-2.5 outline-none bg-black text-sky-300 placeholder:text-sky-300 cursor-pointer ${ isActive ? "rounded-t-lg" : "rounded-lg" } `} 
        placeholder='Provincia...'
        readOnly
        required 
      />
      <div className={`absolute flex flex-col transition-transform rounded-b-lg ${ isActive ? "h-40 overflow-auto" : "h-0 overflow-hidden" }`} >
        <div className='flex bg-black border-y border-sky-300 '>
          <input 
            type="text" 
            onChange={handleChange} 
            value={filter} 
            className='self-center w-full px-2 outline-none bg-black text-sky-300 placeholder:text-sky-300'
            placeholder='Buscador'
          />
          <Search /> 
        </div>
        <div className='overflow-auto w-full px-2 snap-none bg-black scrollBar rounded-b-lg'>
          {
            Object.values(dataFilteded).map(province => (
              <button 
                type='button'
                onClick={selectOption} 
                value={province["iso_id"]} 
                key={province["iso_id"]} 
                className='w-full text-left text-sky-300' 
                >
                  {province.iso_nombre}
                </button>
            ))
          }
        </div>
      </div>
    </fieldset>   
  )
}