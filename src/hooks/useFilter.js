import { useState, useEffect } from "react"

export function useFilter ({ data }) {
  const [ filter, setFilter ] = useState("")
  const [ dataFilteded, setDataFilteded ] = useState([])

  const updateFilter = (newFilter) => {
    setFilter(newFilter)
  }

  useEffect(() => {

    const filteredCountries = filter ?
      data.filter(country => country.nombre.toLowerCase().includes(filter.toLowerCase()))
      : data

    setDataFilteded(filteredCountries)

  }, [filter])

  return { dataFilteded, updateFilter, filter }
}
