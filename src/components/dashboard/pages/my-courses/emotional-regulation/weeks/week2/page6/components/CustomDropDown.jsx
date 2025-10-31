import React, { useState, useRef, useEffect } from "react";

function CustomDropDown({ value, onChange, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((option) => option.id === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionId) => {
    onChange(optionId);
    setIsOpen(false);
  };

  return (
    <div className="position-relative mx-auto" ref={dropdownRef}>
      <label className="dropdown-small-input py-1 border-0 dropdown-input-label px-2 w-100 d-block mx-auto">
        <div
          className="border-0 bg-transparent border-outline-0 form-control dropdown-small-input d-flex align-items-center justify-content-between cursor-pointer"
          style={{ maxWidth: "100%", fontSize: "1.25rem", cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? (
            <div>
              <div className="text-gray text-nowrap">
                {selectedOption.id}. {selectedOption.text}
              </div>
              {selectedOption.subText && (
                <div className="text-primary" style={{ fontSize: "0.9rem" }}>
                  {selectedOption.subText}
                </div>
              )}
            </div>
          ) : (
            <span className="text-muted">Select an option</span>
          )}
        </div>
      </label>

      {isOpen && (
        <div
          className="position-absolute bg-white border rounded shadow-lg d-flex flex-column"
          style={{
            top: "100%",
            left: 0,
            zIndex: 1000,
            // maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <div
            className="p-2 cursor-pointer"
            onClick={() => handleOptionClick("")}
            style={{
              cursor: "pointer",
              borderBottom: "1px dotted #eee",
            }}
          >
            <span className="text-muted">Select an option</span>
          </div>
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => handleOptionClick(option.id)}
              style={{
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                // e.target.style.backgroundColor = "#f8f9fa";
              }}
              onMouseLeave={(e) => {
                // e.target.style.backgroundColor = "transparent";
              }}
            >
              <h2
                className="text-gray text-center px-5 py-2 m-0"
                style={{
                  fontWeight: "500",
                  background: option.bgColor,
                  color: option.color,
                }}
              >
                {option.id}. {option.text}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropDown;
