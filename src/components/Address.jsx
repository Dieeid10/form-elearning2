import { Country } from "./Country"
import { SelectProvinces } from "./SelectProvincy"

export function Address ({ dataStudent, Input }) {
  return (
    <>
      <Country />
      {
        dataStudent.country === 'AR' &&
        <div className="flex gap-4 justify-center items-center">
          <SelectProvinces />
          <Input
            key='localityStudentForm'
            name='locality'
            id='locality'
            label='Ingrese su localidad: '
            type='text'
          />
        </div>
      }
      <div className="flex gap-4 justify-center items-center">
        <Input
          key='addressStudentForm'
          name='address'
          id='address'
          label='Ingrese su dirección: '
          type='text'
          value={dataStudent.address}
        />
        <Input
          key='provinceStudentFormData'
          name='CP'
          id='CP'
          label='Ingrese su código postal: '
          type='text'
        />
      </div>
    </>
  )
}