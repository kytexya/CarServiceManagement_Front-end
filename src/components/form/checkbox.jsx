function Checkbox({ name, register, label, options, error }) {
  return (
    <div>
      {label && (
        <p className="block text-sm font-medium text-gray-700 mb-2">{label}</p>
      )}
      <div className="flex flex-wrap gap-3 items-center">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              value={option.id}
              {...register(name)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">{option.title}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error?.message}</p>}
    </div>
  );
}

export default Checkbox;