import React from "react";
import QuestionBox from "../../../../components/QuestionBox";

function LadderFrame({ data }) {
  // const { imagePath } = data;
 const imagePath = require(`../../../../../../../../../assets/tot-images/week2/page10/ladder-scenario.png`);

  return (
    <QuestionBox extraStyle="bg-custom-blue">
      <div className="p-1 p-md-5">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <img
            src={imagePath}
            alt="Ladder"
            className="img-fluid"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </div>
      </div>
    </QuestionBox>
  );
}

export default LadderFrame;
