import React from 'react'
import { Icon } from "@iconify/react";
import checkedImage from "../../../../../../../assets/checkedbox.png";
import unCheckedImage from "../../../../../../../assets/uncheckedBox.png";
import {
  getWeekAssessment,
  getWeekContentExcludingVideos,
} from "../../../compassion-course/weeks/data";

function Week3() {
    const { pages } = getWeekContentExcludingVideos(3);
    const [acitivity1, activity2, activity3] = pages;
    const [q1, q2, q3, q4, q5] = activity3.steps.slice(1);

    const { questions: assessments } = getWeekAssessment(3);
  return (
    <>
      {" "}
      <hr />
      {/* Assesment 1 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Assessment 1
      </p>
      <hr />
      {assessments.map(({ question, options, correctOption }, i) => {
        return (
          <>
            <div className="d-flex align-items-center gap-3" key={i}>
              <h2 className="text-blue fs-1">Questions {i + 1}:</h2>
              <p className="text-blue fs-4">{question}</p>
            </div>
            {options.map((option, index) => {
              const optionKey = Object.keys(option)[0];
              const optionText = option[optionKey];
              const isCorrectOption = correctOption === optionText;

              return (
                <div
                  key={index}
                  className="d-flex gap-2 mb-3 align-items-center justify-content-between"
                >
                  <div className="d-flex gap-2">
                    <img
                      src={isCorrectOption ? checkedImage : unCheckedImage}
                      alt={`Option ${optionKey}`}
                      style={{ width: 20, height: 20 }}
                    />
                    <div>{`${optionText}. ${option.text}`}</div>
                  </div>
                  <div>{isCorrectOption ? "Correct" : "Wrong"}</div>
                </div>
              );
            })}
          </>
        );
      })}
      <hr />
      {/* Weekly Report */}
      <div className="bg-button p-5 rounded-4">
        <h2 className="text-white fs-1">Weekly Report</h2>
        <div className="d-flex gap-4">
          <h2 className="text-gray fs-1 ratio-1x1 bg-aqua rounded-4 p-5 d-flex justify-content-center align-items-center border border-6 border-blue">
            100%
          </h2>
          <p className="text-white">
            Figma ipsum component variant main layer. Draft hand plugin arrow
            line plugin slice. Comment boolean background union stroke subtract
            underline vector. Italic move undo create pen strikethrough main
            arrange image. Component font.Figma ipsum component variant main
            layer. Draft hand plugin arrow line plugin slice. Comment boolean
            background union stroke subtract underline vector. Italic move undo
            create pen strikethrough main arrange image. Component font.
          </p>
        </div>
      </div>
    </>
  );
}

export default Week3