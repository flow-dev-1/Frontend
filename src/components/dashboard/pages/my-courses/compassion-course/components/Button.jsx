import React from "react";

function Button({ text }) {
  const isNextButton = text === "Next";
  const isPrevButton = text === "Prev";

  return (
    <button
      className={`btn px-4 py-3 fs-5 rounded ${
        isNextButton
          ? "bg-blue text-white border-0 hover-prev"
          : isPrevButton
          ? "bg-transparent text-blue border border-blue hover-next"
          : ""
      }`}
    >
      {isPrevButton && <span className="me-2">{"<<<"}</span>}
      {text}
      {isNextButton && <span className="ms-2">{">>>"}</span>}
    </button>
  );
}

export default Button;
