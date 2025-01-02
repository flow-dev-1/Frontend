import React from "react";
import { Icon } from "@iconify/react";
import checkedImage from "../../../../../../../assets/checkedbox.png";
import unCheckedImage from "../../../../../../../assets/uncheckedBox.png";
import correct from "../../../../../../../assets/correct.png";
import wrong from "../../../../../../../assets/wrong.png";
import {
  getWeekAssessment,
  getWeekContentExcludingVideos,
} from "../../../compassion-course/weeks/data";

function Week3() {
  const { pages } = getWeekContentExcludingVideos(3);
  const [acitivity1, activity2, activity3, activity4, activity5] = pages;

  console.log(activity5);

  const { questions: assessments } = getWeekAssessment(3);
  return (
    <>
      {/* Activity 1 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 1
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{acitivity1.question}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#275DAD" }} width={40} icon="lucide:edit" />
      </div>
      <hr />

      {/* Activity 2 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 2
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{activity2.steps.question}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex  gap-3 ">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#275DAD" }} width={40} icon="lucide:edit" />
      </div>
      <hr />

      {/* Activity 3 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 3
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{activity3.question}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#275DAD" }} width={40} icon="lucide:edit" />
      </div>
      <hr />

      {/* Activity 4 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 4
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{activity4.question}</p>
      </div>
      <div className="d-flex gap-4">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <div className="flex-grow-1">
          <p className="fs-5">1. Figma ipsum component variant main layer.</p>
          <p className="fs-5">2. Figma ipsum component variant main layer.</p>
          <p className="fs-5">3. Figma ipsum component variant main layer.</p>
          <p className="fs-5">4. Figma ipsum component variant main layer.</p>
          <p className="fs-5">5. Figma ipsum component variant main layer.</p>
        </div>
         <Icon style={{ color: "#D6D6D6" }} width={30} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#275DAD" }} width={40} icon="lucide:edit" />
      </div>
      <hr />

      {/* Activity 5  */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 5
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">
          {activity5.title + " " + activity5.instructions.join(" ")}
        </p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#275DAD" }} width={40} icon="lucide:edit" />
      </div>
      <hr />

      <hr />
      {/* Assesment 1 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Assessment 1
      </p>
      <hr />
      {assessments.map(({ question, options, correctOption }, i) => {
        return (
          <>
            <div className="d-flex gap-3" key={i}>
              <h2 className="text-blue fs-1 text-nowrap">Questions {i + 1}:</h2>
              <p className="text-blue fs-4">{question}</p>
            </div>
            {options.map((option, index) => {
              const optionKey = Object.keys(option)[0];
              const optionText = option[optionKey];
              const isCorrectOption = correctOption === optionText;

              return (
                <div
                  key={index}
                  className="d-flex gap-2 mb-3 justify-content-between"
                >
                  <div className="d-flex gap-2">
                    <img
                      src={isCorrectOption ? checkedImage : unCheckedImage}
                      alt={`Option ${optionKey}`}
                      style={{ width: 20, height: 20 }}
                    />
                    <div>{`${optionText}. ${option.text}`}</div>
                  </div>
                  {isCorrectOption ? (
                    <p className="d-flex gap-1">
                      {" "}
                      <img src={correct} alt="" /> Correct
                    </p>
                  ) : (
                    <p className="d-flex gap-1">
                      {" "}
                      <img src={wrong} alt="" />
                      Wrong
                    </p>
                  )}
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
          <h2 className="text-gray fs-1 ratio-1x1 bg-aqua rounded-4 p-5 d-flex justify-content-center border border-6 border-blue">
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

export default Week3;
