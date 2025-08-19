function TextArea({ name, register, label, placeholder, error, rows = 4 }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={rows}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error?.message}</p>}
    </div>
  );
}

export default TextArea;