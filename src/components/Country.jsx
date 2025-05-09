import { useState, useId } from 'react'
import { useFilter } from "../hooks/useFilter.js";
import { Search } from './Svg';
import { useDataStudent } from '../hooks/useDataStudent';
import countryJson from '../fichero/paises.json'
import { SelectProvinces } from './SelectProvincy';

export function Country() {
  const { dataFilteded, updateFilter, filter } = useFilter({ data: countryJson })
  const [ valueInput, setValueInput ] = useState("")
  const [ isActive, setIsActive ] = useState(false)
  const [ valueInputShort, setValueInputShort ] = useState('')
  const { updateData } = useDataStudent()
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
    setValueInputShort(value)
    updateFilter("")
    setIsActive(!isActive)
    updateData({ country: value })
  }

  const visibilityOptions = () => {
    setIsActive(!isActive)
  }

  return (
    <>
    <fieldset 
      className="w-2/3 relative"
      key={fieldset}
    >
      <label htmlFor="country" className='block mb-2 text-sm font-medium text-gray-300'>Seleccione el país donde fue emitido su documento: </label>
      <input 
        onClick={visibilityOptions} 
        name='country'
        id='country'
        type="text" 
        value={valueInput} 
        className={`w-full inputToSelect p-2.5 outline-none bg-black text-sky-500 placeholder:text-sky-300 text-sm cursor-pointer ${ isActive ? "rounded-t-lg" : "rounded-lg" } `} 
        placeholder='País...'
        readOnly
        required 
      />
      <input type="text" name='countryShort' id='countryShort' value={valueInputShort} hidden />
      <div className={`absolute w-full flex flex-col transition-transform rounded-b-lg z-20 ${ isActive ? "h-40 overflow-auto" : "h-0 overflow-hidden" }`} >
        <div className='flex bg-black border-y border-sky-300 text-sky-500'>
          <input 
            type="text" 
            onChange={handleChange} 
            value={filter} 
            className='self-center w-full px-2 outline-none bg-black text-sky-300 placeholder:text-sky-300'
            placeholder='Buscador'
          />
          <Search /> 
        </div>
        <div className='overflow-auto w-full px-2 snap-none bg-black scrollBar rounded-b-l'>
          {
            Object.values(dataFilteded).map(country => (
              <button 
                type='button'
                onClick={selectOption} 
                value={country["alfa-2"]} 
                key={country["alfa-3"]} 
                className='w-full text-left text-sky-500' 
                >
                  {country.nombre}
                </button>
            ))
          }
        </div>
      </div>
    </fieldset>
    </>
  )
}