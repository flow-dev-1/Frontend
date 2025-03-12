import React from "react";

function HeartTextBox({ handleChange, value }) {
  return (
    <label className="heart-input pl-12 border-0 heart-input-label">
      <textarea
        className=" border-0 bg-transparent border-outline-0 no-scrollbar w-100 resize-none"
        cols={55}
        rows={10}
        placeholder="Type your answer here..."
        style={{
          maxWidth: "100%",
          minWidth:"20%",
          fontSize: "25px",
        }}
        value={value}
        onChange={handleChange ? handleChange : () => {}}
      ></textarea>
    </label>
  );
}

export default HeartTextBox;


