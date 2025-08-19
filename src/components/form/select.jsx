function Select({
  name,
  register,
  label,
  options,
  error,
  fieldValue = "value",
  fieldName = "label",
  placeholder = 'Nhấn để chọn...'
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        {...register(name)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{placeholder}</option>
        {options.map((template, index) => (
          <option key={index} value={template[fieldValue]}>
            {template[fieldName]}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error?.message}</p>}
    </div>
  );
}

export default Select;
