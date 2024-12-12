import React from "react";
import "./page6.css";
import wishImage from "../../../../../../../../assets/wish-image.png";
import hugImage from "../../../../../../../../assets/hug-image.png";
import heartImage from "../../../../../../../../assets/heart-image.png";
import hugImage2 from "../../../../../../../../assets/hug-image-2.png";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import getPageContent from "../../data";

function WeekTwoPage6() {
  const currentWeek = 2;
  const currentPage = 6;
  const pageData = getPageContent(currentWeek, currentPage);

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

      <h1 className="text-center">TODO: step counter</h1>
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        {pageData.navigation.prev && <Button text={"Prev"} />}
        {pageData.navigation.next && <Button text={"Next"} />}
      </div>
    </>
  );
}

export default WeekTwoPage6;
