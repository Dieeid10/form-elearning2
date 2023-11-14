import { Country } from "./Country"
import { SelectProvinces } from "./SelectProvincy"

export function Address ({ dataStudent, Input }) {
  return (
    <>
      <Country />
      {
        dataStudent.country === 'AR' &&
        <SelectProvinces />
      }
      <Input
        key='addressStudentForm'
        name='address'
        id='address'
        label='Ingrese su dirección: '
        type='text'
      />
      <Input
        key='provinceStudentFormData'
        name='CP'
        id='CP'
        label='Ingrese su código postal: '
        type='text'
      />
    </>
  )
}