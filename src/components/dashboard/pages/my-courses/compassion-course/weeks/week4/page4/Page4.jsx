import React from "react";
import "./page4.css";
import { useSelector } from "react-redux";
import ArrowTrail from "../../../../../../../../assets/ArrowTrail.svg";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";

function WeekFourPage4() {
  const pageData = useSelector(selectPageData);

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
            {pageData.options.map((option, index) => (
              <h2 key={index} className={checkIndex(index + 1)}>
                {option}
              </h2>
            ))}
          </div>
          <div className="col bg-blue">
            <div className="d-flex align-items-start mb-2">
              <img src={ArrowTrail} alt="arrow trail" />
              <div className="text-center text-white pt-2">
                <h1>{pageData.instruction}</h1>
              </div>
              <img src={ArrowTrail} alt="arrow trail" />
            </div>
            <div className="d-flex justify-content-around px-4">
              {pageData.bowls.map((bowl, index) => (
                <div key={index}>
                  <h2
                    className={
                      bowl.id === "inner" ? "inner-count" : "outer-count"
                    }
                  >
                    {bowl.count}
                  </h2>
                  <div
                    className={
                      bowl.id === "inner" ? "inner-bowl" : "outer-bowl"
                    }
                  >
                    {bowl.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default WeekFourPage4;
