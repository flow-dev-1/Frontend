import React, { useEffect } from "react";
import QuestionBox from "../../../../components/QuestionBox";
import checkedImage from "../../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../../assets/uncheckedBox.png";

import confidentImg from "../../../../../../../../../assets/transition-2-images/week1/page6/confident.png";
import independentImg from "../../../../../../../../../assets/transition-2-images/week1/page6/independent.png";
import disciplinedImg from "../../../../../../../../../assets/transition-2-images/week1/page6/disciplined.png";
import socialImg from "../../../../../../../../../assets/transition-2-images/week1/page6/social.png";
import curiousImg from "../../../../../../../../../assets/transition-2-images/week1/page6/curious.png";
import resilientImg from "../../../../../../../../../assets/transition-2-images/week1/page6/resilient.png";
import creativeImg from "../../../../../../../../../assets/transition-2-images/week1/page6/creative.png";
import leaderImg from "../../../../../../../../../assets/transition-2-images/week1/page6/leader.png";
import "../page6.css";

function CheckboxFrame({
  step,
  checkboxAnswers,
  setCheckboxAnswers,
  setErrorMessage,
}) {
  const optionImageMap = {
    Confident: confidentImg,
    Independent: independentImg,
    Discplined: disciplinedImg,
    Social: socialImg,
    Curious: curiousImg,
    Resilent: resilientImg,
    Creative: creativeImg,
    Leader: leaderImg,
  };

  const handleCheckboxChange = (index) => {
    setErrorMessage("");
    setCheckboxAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: !prevAnswers[index],
    }));
  };

  return (
    <QuestionBox>
      <div className="d-flex gap-3 flex-column flex-md-row flex-md-nowrap align-items-start mt-5 text-center">
        <h2 className="text-blue fs-1 mb-0 flex-shrink-0">Question:</h2>
        <div className="d-flex flex-column flex-grow-1 min-w-0">
          <h2 className="text-gray fs-1 mb-2">{step.question}</h2>
        </div>
      </div>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-0">
          {step.options?.map((option, index) => (
            <div
              key={index}
              className="col d-flex flex-column align-items-center shared-background"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                padding: "5px",
                // minHeight: "140px",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: "100%",
                  height: "100px",
                }}
              >
                <img
                  src={optionImageMap[option]}
                  alt={option}
                  style={{
                    maxWidth: "80px",
                    maxHeight: "80px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div
                style={{
                  backgroundColor: "#E5DBFC",
                  width: "100%",
                  borderRadius: "8px",
                  marginTop: "-20px",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={!!checkboxAnswers[index]}
                  onChange={() => handleCheckboxChange(index)}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor={`checkbox-${index}`}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={checkboxAnswers[index] ? checkedImage : uncheckedImage}
                    alt=""
                    style={{ width: 30, height: 30 }}
                  />
                </label>

                <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                  {option}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </QuestionBox>
  );
}

export default CheckboxFrame;
