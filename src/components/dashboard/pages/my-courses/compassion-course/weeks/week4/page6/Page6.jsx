import React from "react";
import { useSelector } from "react-redux";
import ArrowTrail from "../../../../../../../../assets/ArrowTrail.svg";
import RedBucket from "../../../../../../../../assets/Buckets/Red Bucket.svg";
import OrangeBucket from "../../../../../../../../assets/Buckets/Orange Bucket.svg";
import GreenBucket from "../../../../../../../../assets/Buckets/Green Bucket.svg";
import Button from "../../../components/Button";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import CardBoard from "./components/CardBoard";
import StepIndicator from "../../../components/StepIndicator";

// Import all images
import image1 from "../../../../../../../../assets/drag-images/image1.png";
import image2 from "../../../../../../../../assets/drag-images/image2.png";
import image3 from "../../../../../../../../assets/drag-images/image3.png";
import image4 from "../../../../../../../../assets/drag-images/image4.png";
import image5 from "../../../../../../../../assets/drag-images/image5.png";
import image6 from "../../../../../../../../assets/drag-images/image6.png";
import image7 from "../../../../../../../../assets/drag-images/image7.png";
import image8 from "../../../../../../../../assets/drag-images/image8.png";
import image9 from "../../../../../../../../assets/drag-images/image9.png";
import image10 from "../../../../../../../../assets/drag-images/image10.png";

function WeekFourPage6() {
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = pageData.images.length;

  const imageMap = {
    "image1.png": image1,
    "image2.png": image2,
    "image3.png": image3,
    "image4.png": image4,
    "image5.png": image5,
    "image6.png": image6,
    "image7.png": image7,
    "image8.png": image8,
    "image9.png": image9,
    "image10.png": image10,
  };

  const bucketMap = {
    green: GreenBucket,
    red: RedBucket,
    orange: OrangeBucket,
  };

  const renderStep = () => {
    const currentImage = pageData.images[currentStep - 1];
    return currentImage ? <CardBoard imgSrc={imageMap[currentImage]} /> : null;
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center pt-2">
        <div className="row custom-border-20 w-1020px">
          <div className="col d-flex p-5 justify-content-center align-items-center">
            {renderStep()}
          </div>
          <div className="col bg-blue">
            <div className="d-flex align-items-start mb-2">
              <img src={ArrowTrail} alt="arrow trail" />
              <div className="text-center text-white pt-2">
                <h1>{pageData.instruction}</h1>
              </div>
              <img src={ArrowTrail} alt="arrow trail" />
            </div>
            <div className="d-flex justify-content-between px-4">
              {pageData.buckets.map((bucket, index) => (
                <img
                  key={index}
                  src={bucketMap[bucket.id]}
                  alt={`${bucket.id} bucket`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <StepIndicator totalSteps={totalSteps} />
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default WeekFourPage6;
