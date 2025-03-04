import React from "react";

function CustomDropDown({ value, onChange, options = [] }) {
  return (
    <label className="dropdown-small-input p-3 border-0 dropdown-input-label px-5">
      <select
        className="border-0 bg-transparent border-outline-0 form-control dropdown-small-input"
        style={{ maxWidth: "100%", fontSize: "20px" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>Select an option...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default CustomDropDown;
