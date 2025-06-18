import { useState, useId } from 'react'
import { useFilter } from "../hooks/useFilter.js";
import { Search } from './Svg';
import { useDataStudent } from '../hooks/useDataStudent'; // AÑADIDO
import pronvincesJson from '../fichero/provincias.json'

export function SelectProvinces() {
  const { dataFilteded, updateFilter, filter } = useFilter({ data: pronvincesJson })
  const { dataStudent, updateData } = useDataStudent() // AÑADIDO

  // Obtener la provincia seleccionada si existe en dataStudent
  const selectedProvince = dataStudent.provinceShort
    ? pronvincesJson.find(prov => prov.iso_id === dataStudent.provinceShort)
    : null

  const [valueInput, setValueInput] = useState(selectedProvince ? selectedProvince.iso_nombre : '')
  const [valueInputShort, setValueInputShort] = useState(selectedProvince ? selectedProvince.iso_id : '')
  const [isActive, setIsActive] = useState(false)
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
    setIsActive(false)

    // Guardamos nombre completo y versión corta
    updateData({
      province: textButton,
      provinceShort: value
    })
  }

  const visibilityOptions = () => {
    setIsActive(!isActive)
  }

  return (
    <fieldset 
      className="w-full sm:w-2/3 relative"
      key={fieldset}
    >
      <label htmlFor="province" className='block mb-2 text-sm font-medium text-gray-300'>
        Seleccione su provincia:
      </label>

      <input 
        onClick={visibilityOptions} 
        type="text"
        name='province'
        id='province'
        value={valueInput} 
        className={`w-full inputToSelect p-2.5 outline-none bg-black text-sky-300 placeholder:text-sky-300 cursor-pointer ${ isActive ? "rounded-t-lg" : "rounded-lg" }`} 
        placeholder='Provincia...'
        /* readOnly */
        required
      />

      {/* Hidden input con la abreviatura */}
      <input type="hidden" name='provinceShort' id='provinceShort' value={valueInputShort} />

      <div className={`absolute flex flex-col transition-transform rounded-b-lg ${ isActive ? "h-40 overflow-auto" : "h-0 overflow-hidden" } w-full`}>
        <div className='flex bg-black border-y border-sky-300'>
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
            Object.values(dataFilteded)
              .sort((a, b) => a.iso_nombre.localeCompare(b.iso_nombre))
              .map(province => (
                <button 
                  type='button'
                  onClick={selectOption} 
                  value={province.iso_id} 
                  key={province.iso_id} 
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
