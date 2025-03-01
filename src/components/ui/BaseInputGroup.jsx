// src/components/InputGroup.jsx

export default function InputGroup({
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    value,
    onChange,
    required = false,
    className = "",
}) {
    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-900"
                >
                    {label}
                </label>
            )}
            <div className="relative mt-2">
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`peer block w-full bg-gray-50 px-3 py-1.5 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm ${className}`}
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                />
            </div>
        </div>
    );
}
