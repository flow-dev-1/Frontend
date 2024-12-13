import React from "react";

function Button({ text, onClick }) {
  const isNextButton = text === "Next";
  const isPrevButton = text === "Prev";

  return (
    <button
      className={`btn fs-5 rounded w-183px h-42px ${
        isNextButton
          ? "bg-button text-white border-0 hover-prev"
          : isPrevButton
          ? "bg-transparent text-button-blue border border-blue hover-next"
          : ""
        }`}
      onClick={onClick}
    >
      {isPrevButton && <span className="me-2">{"<<<"}</span>}
      {text}
      {isNextButton && <span className="ms-2">{">>>"}</span>}
    </button>
  );
}

export default Button;
