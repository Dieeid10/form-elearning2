export function DocumentForm ({ documentForm, Input }) {
  return (
    <>
    <fieldset 
      className="w-2/3"
    >
      <label 
        className='block mb-2 text-sm font-medium text-gray-300'
      >
        {documentForm.label}
      </label>
      <select 
        className='border text-sm rounded-lg block w-full p-2.5 bg-sky-200 broder-gray-600 placeholder-gray-400 text-sky-500 rounded-full'
        name={documentForm.nameType}
      >
        {
          documentForm.typeToDocument.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))
        }
      </select>
    </fieldset>
    <Input
      key={documentForm.numberToDocument.key}
      name={documentForm.numberToDocument.name}
      id={documentForm.numberToDocument.id}
      label={documentForm.numberToDocument.label}
      type={documentForm.numberToDocument.type}
    />
  </>
  )
}