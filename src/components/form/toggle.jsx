import { useState } from "react";

export default function Toggle({
  isActive = false,
  onClick = () => {},
  label,
}) {
  const [status, setStatus] = useState(isActive);

  const toggleStatus = () => {
    setStatus(!status);
    onClick && onClick();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleStatus}
        className={`relative inline-flex items-center h-6 w-[43px] rounded-full transition-colors ${
          status ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <span
          className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${
            status ? "translate-x-[100%]" : "translate-x-[3px]"
          }`}
        />
      </button>
      {label && <label className="text-sm text-gray-900">{label}</label>}
    </div>
  );
}
