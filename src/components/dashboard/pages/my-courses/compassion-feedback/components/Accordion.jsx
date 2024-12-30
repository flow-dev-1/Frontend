import React, { useState } from "react";
import "./accordion.css";
import { Icon } from "@iconify/react";

function Accordion({ activeIndex, setActiveIndex, items }) {
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      <h2 className="accordion-header p-4 fs-1 bg-blue text-center text-white">
        Feedback for Compassion
      </h2>

      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={
              index > 4
                ? "bg-blue-feedback  py-4 px-5 d-flex gap-3 align-items-center justify-space-between"
                : "py-4 px-5 d-flex gap-3 align-items-center justify-space-between"
            }
            onClick={() => handleToggle(index)}
          >
            <div className="d-flex align-items-center gap-3 flex-grow-1">
              {index < 5 ? (
                <h2 className="text-gray fs-1">Week {index + 1}:</h2>
              ) : (
                <h2 className="text-gray fs-1">FInal Report:</h2>
              )}
              <p className="fs-4 text-gray">{item.title}</p>
              {index === 5 && <p className="text-blue fs-2">(Download PDF)</p>}
            </div>
            <Icon
              icon={
                activeIndex === index
                  ? "simple-line-icons:arrow-up"
                  : "simple-line-icons:arrow-down"
              }
              style={{ cursor: "pointer" }}
            />
          </div>
          {activeIndex === index && (
            <div className="accordion-content">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
