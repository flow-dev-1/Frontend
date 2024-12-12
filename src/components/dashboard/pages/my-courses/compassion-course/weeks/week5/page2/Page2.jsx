import React, { useState } from "react";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import getPageContent from "../../data";
import ScenariosOne from "./components/ScenariosOne";
import ScenariosTwo from "./components/ScenarioTwo";
import ScenariosThree from "./components/ScenarioThree";
import ScenariosFour from "./components/ScenarioFour";

function WeekFivePage2() {
  const currentWeek = 5;
  const currentPage = 2;
  const pageData = getPageContent(currentWeek, currentPage);

  const [currentStep, setCurrentStep] = useState(4);

  const scenarioComponents = {
    1: ScenariosOne,
    2: ScenariosTwo,
    3: ScenariosThree,
    4: ScenariosFour,
  };

  const renderStep = () => {
    const ScenarioComponent = scenarioComponents[currentStep];
    return ScenarioComponent ? <ScenarioComponent /> : null;
  };

  return (
    <>
      {renderStep()}

      <h2 className="text-center">TODO: step indicator</h2>
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        {pageData.navigation.prev && <Button text={"Prev"} />}
        {pageData.navigation.next && <Button text={"Next"} />}
      </div>
    </>
  );
}

export default WeekFivePage2;
