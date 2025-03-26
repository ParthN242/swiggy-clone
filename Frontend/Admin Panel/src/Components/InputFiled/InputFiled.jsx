const InputFiled = ({
  type = "text",
  inputValue,
  setInputValue,
  icon,
  placeholder,
  options,
}) => {
  return (
    <div
      className={`flex flex-1  gap-3 ${
        type === "textarea" ? "items-start" : "items-center"
      } border-b border-gray-300 py-3`}
    >
      {/* Icon */}
      {icon && <div className="text-xl text-textColor">{icon}</div>}

      {(type == "text" || type == "number") && (
        <input
          type={type}
          name="title"
          placeholder={placeholder}
          className="w-full outline-none text-md bg-transparent"
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
      )}

      {/* Textarea */}
      {type === "textarea" && (
        <textarea
          placeholder={placeholder}
          className="w-full outline-none text-md bg-transparent"
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
          rows={2}
          required
        />
      )}

      {/* Radio Buttons */}
      {type === "radio" && options.length > 0 ? (
        <div className="flex gap-8">
          {options.map((option) => (
            <div key={option.value} className="flex items-center gap-1">
              <input
                type="radio"
                name="radioGroup"
                id={option.label}
                checked={inputValue === option.value}
                onChange={() => setInputValue(option.value)}
                required
              />
              <label htmlFor={option.label} className="max-md:text-sm">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default InputFiled;
