import React from "react";
import QuestionBox from "../../../../components/QuestionBox";
import SmallTextBox from "../../../../components/SmallTextBox";

function Frame({ data }) {
  const { title, questions } = data;

  return (
    <QuestionBox>
      <h2 className="text-blue text-center fs-1">{title}</h2>

      {questions.map((question, index) =>
        (() => {
          const [key, value] = Object.entries(question)[0]; // extract the key value pair
          return (
            <div key={index} className="mb-2">
              <div className="d-flex gap-2">
                <h2 className="text-blue">{key}: </h2>
                <h2 className="text-gray">{value}</h2>
              </div>
              <SmallTextBox />
            </div>
          );
        })()
      )}
    </QuestionBox>
  );
}

export default Frame;
