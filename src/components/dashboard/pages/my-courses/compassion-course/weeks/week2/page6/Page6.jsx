import React from "react";
import "./page6.css";
import wishImage from "../../../../../../../../assets/wish-image.png";
import hugImage from "../../../../../../../../assets/hug-image.png";
import heartImage from "../../../../../../../../assets/heart-image.png";
import hugImage2 from "../../../../../../../../assets/hug-image-2.png";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";

function WeekTwoPage6() {
  const data = [
    { title: "I feel loved when", imgSrc: heartImage },
    { title: "I feel cared for when", imgSrc: hugImage },
    { title: "I need support when", imgSrc: hugImage2 },
    { title: "I wish someone would", imgSrc: wishImage },
  ];
  return (
    <>
      <QuestionBox>
        <div className="container">
          {data.map((item, index) => (
            <div key={index} className="container-item">
              <h3 className="fs-1">{item.title}...</h3>
              <img src={item.imgSrc} alt="images" />
              <input type="text" placeholder="Type your answer here..." />
            </div>
          ))}
        </div>
      </QuestionBox>

      <h1 className="text-center">TODO: step conter</h1>
      <div className="d-flex justify-content-center gap-4 mt-4">
        <Button text={"Prev"} />
        <Button text={"Next"} />
      </div>
    </>
  );
}

export default WeekTwoPage6;
