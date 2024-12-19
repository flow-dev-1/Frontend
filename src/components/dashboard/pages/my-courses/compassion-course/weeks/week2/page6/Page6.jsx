import React from "react";
import { useSelector } from "react-redux";
import "./page6.css";
import wishImage from "../../../../../../../../assets/wish-image.png";
import hugImage from "../../../../../../../../assets/hug-image.png";
import heartImage from "../../../../../../../../assets/heart-image.png";
import hugImage2 from "../../../../../../../../assets/hug-image-2.png";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import { selectPageData, selectCurrentStep } from "../../../../../../../../redux/reducers/navigationSlice";

function WeekTwoPage6() {
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);

  // Map image imports to their filenames
  const imageMap = {
    'heart-image.png': heartImage,
    'hug-image.png': hugImage,
    'hug-image-2.png': hugImage2,
    'wish-image.png': wishImage,
  };

  return (
    <>
      <QuestionBox>
        <div className="container">
          {pageData.prompts.map((item, index) => (
            <div key={index} className="container-item">
              <h3 className="fs-1">{item.title}...</h3>
              <img src={imageMap[item.imgSrc]} alt="images" />
              <input 
                type={pageData.inputType} 
                placeholder={pageData.inputPlaceholder} 
              />
            </div>
          ))}
        </div>
      </QuestionBox>

      <h2 className="text-center">Step {currentStep}</h2>
      <div className="d-flex justify-content-center gap-96px mt-4 ">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default WeekTwoPage6;
