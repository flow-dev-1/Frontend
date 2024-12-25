import React from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import ScenariosOne from "./components/ScenariosOne";
import ScenariosTwo from "./components/ScenarioTwo";
import ScenariosThree from "./components/ScenarioThree";
import ScenariosFour from "./components/ScenarioFour";
import StepIndicator from "../../../components/StepIndicator";

function WeekFivePage2() {
  const pageData = useSelector(selectPageData);
  const totalSteps = pageData?.scenarios?.length || 0;

  const currentStep = useSelector(selectCurrentStep);

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
      <StepIndicator totalSteps={totalSteps} />

      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        <Button text="Prev" />
        <Button text="Next" />
      </div>
    </>
  );
}

export default WeekFivePage2;
