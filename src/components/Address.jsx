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
      {
        dataStudent.country === 'AR' &&
        <Input
          key='localityStudentForm'
          name='locality'
          id='locality'
          label='Ingrese su localidad: '
          type='text'
        />
      }
      <Input
        key='addressStudentForm'
        name='address'
        id='address'
        label='Ingrese su dirección: '
        type='text'
        value={dataStudent.address || ''}
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