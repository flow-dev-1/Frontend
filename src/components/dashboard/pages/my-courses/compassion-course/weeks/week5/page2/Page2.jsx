import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import ScenariosOne from "./components/ScenariosOne";
import ScenariosTwo from "./components/ScenarioTwo";
import ScenariosThree from "./components/ScenarioThree";
import ScenariosFour from "./components/ScenarioFour";
function WeekFivePage2() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ScenariosOne />;
      case 2:
        return <ScenariosTwo />;
      case 3:
        return <ScenariosThree />;
      case 4:
        return <ScenariosFour />;
      default:
        return null;
    }
  };
  return (
    <>
      {renderStep()}

      <h2 className="text-center"> TODO: step indicator</h2>
      <div className="d-flex justify-content-center gap-4 mt-4">
        <Button text={"Prev"} />
        <Button text={"Next"} />
      </div>
    </>
  );
}
export default WeekFivePage2;
