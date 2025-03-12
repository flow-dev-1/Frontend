import React from "react";

function ColoredStarTextBox({ handleChange, value,color}) {
  return (
    <label className={`colored-star-input  border-0 ${color}-star-colored-small-input-label colored-small-star-input-label`}>
      <textarea
        className=" border-0 bg-transparent border-outline-0 no-scrollbar w-100 resize-none colored-star-input"
        cols={10}
        rows={4}
        placeholder="Type your answer here..."
        value={value}
        onChange={handleChange}
      >

        
      </textarea>
    </label>
  );
}

export default ColoredStarTextBox;
