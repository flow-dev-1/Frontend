import React, { useState } from "react";
import ArrowTrail from "../../../../../../../../assets/ArrowTrail.svg";
import RedBucket from "../../../../../../../../assets/Buckets/Red Bucket.svg";
import OrangeBucket from "../../../../../../../../assets/Buckets/Orange Bucket.svg";
import GreenBucket from "../../../../../../../../assets/Buckets/Green Bucket.svg";
import Button from "../../../components/Button";
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
import CardBoard from "./components/CardBoard";

function WeekFourPage6() {
  const [currentStep, setCurrentStep] = useState(3);
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CardBoard imgSrc={images[currentStep - 1]} />;
      case 2:
        return <CardBoard imgSrc={images[currentStep - 1]} />;
      case 3:
        return <CardBoard imgSrc={images[currentStep - 1]} />;
      case 4:
        return <CardBoard imgSrc={images[currentStep - 1]} />;
      case 5:
        return <CardBoard imgSrc={images[currentStep - 1]} />;
      case 6:
        return <CardBoard imgSrc={images[currentStep - 1]} />;
      case 7:
        return <CardBoard imgSrc={images[currentStep - 1]} />;
      case 8:
        return <CardBoard imgSrc={images[currentStep - 1]} />;
      case 9:
        return <CardBoard imgSrc={images[currentStep - 1]} />;
      case 10:
        return <CardBoard imgSrc={images[currentStep - 1]} />;
      default:
        return null;
    }
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
              <img src={ArrowTrail} />
              <div className="text-center text-white pt-2">
                <h1>
                  Drag-and-drop the statements on the left into any of these
                  bowls
                </h1>
              </div>
              <img src={ArrowTrail} />
            </div>
            <div className="d-flex justify-content-between px-4">
              <img src={GreenBucket} />
              <img src={RedBucket} />
              <img src={OrangeBucket} />
            </div>
          </div>
        </div>{" "}
        <h2 className="text-center">TODO: step indicator</h2>
        <div className="d-flex justify-content-center gap-4 mt-4">
          <Button text={"Prev"} />
          <Button text={"Next"} />
        </div>
      </div>
    </>
  );
}

export default WeekFourPage6;
