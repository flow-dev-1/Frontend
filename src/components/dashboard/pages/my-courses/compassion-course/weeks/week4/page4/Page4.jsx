import React from "react";
import "./page4.css";import ArrowTrail from "../../../../../../../../assets/ArrowTrail.svg";
import Button from "../../../components/Button";

function WeekFourPage4() {
  const options = [
    "Mum",
    "Dad",
    "Family friend",
    "Cousin",
    "Brother",
    "Sister",
    "Stranger",
    "Classmate",
    "Uncle",
    "Driver",
    "Best friend",
    "Teacher",
  ];

  // Check the index and return appropriate styles
  function checkIndex(index) {
    if (index === 2 || index === 5 || index === 8 || index === 11) {
      return "text-white bg-blue options";
    }
    return "text-blue bg-sky-blue options";
  }

  return (
    <>
      <div>
        <div className="custom-border-20 question-box-container d-flex w-1020px">
          <div className="p-5 d-flex gap-3 align-items-baseline flex-wrap flex-basis ">
            {options.map((option, index) => (
              <h2 key={index} className={checkIndex(index + 1)}>
                {option}
              </h2>
            ))}
          </div>
          <div className="col bg-blue">
            <div className="d-flex align-items-start mb-2">
              <img src={ArrowTrail} />
              <div className="text-center text-white pt-2">
                <h1>
                  Drag-and-drop the statements on the left into any of these
                  bowls
                </h1>
              </div>
              <img src={ArrowTrail} />
            </div>
            <div className="d-flex justify-content-around px-4">
              <div>
                <h2 className="inner-count">2</h2>
                <div className="inner-bowl">Inner Cycle</div>
              </div>
              <div>
                <h2 className="outer-count">2</h2>
                <div className="outer-bowl">Outer Cycle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center gap-4 mt-4">
        <Button text={"Prev"} />
        <Button text={"Next"} />
      </div>
    </>
  );
}

export default WeekFourPage4;
