import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPageData,
  selectCurrentStep,
} from "../../../../../../../../redux/reducers/navigationSlice";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import StepIndicator from "../../../components/StepIndicator";
import Button from "../../../components/Button";

import CheckboxFrame from "./components/CheckboxFrame";
import TextInputFrame from "./components/TextInputFrame";

function Page14() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);

  const totalSteps = pageData?.steps?.length || 0;
  const step = pageData?.steps[currentStep - 1];

  const [checkboxAnswers, setCheckboxAnswers] = useState({});
  const [textAnswer, setTextAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );

    if (response?.answer) {
      setCheckboxAnswers(response.answer.checkboxAnswers || {});
      setTextAnswer(response.answer.textAnswer || "");
    }
  }, [userAnswers, pageData.id]);

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;

    // Validation for step 2 (checkbox)
    if (currentStep === 2) {
      const hasSelection = Object.values(checkboxAnswers).some((val) => val);
      if (!hasSelection) {
        setErrorMessage("Oops! Please select at least one option!");
        return false;
      }
    }

    // Validation for step 1 (text input)
    if (currentStep === 1 || currentStep === 3) {
      if (!textAnswer.trim()) {
        setErrorMessage("Oops! Please enter a valid input!");
        return false;
      }
    }

    setErrorMessage("");

    dispatch(
      saveActivity({
        page: pageData.id,
        answer: {
          checkboxAnswers,
          textAnswer,
        },
      })
    );

    return true;
  };

  // Check if "Others" option is selected
  // const isOthersSelected = () => {
  //   if (currentStep !== 1) return false;
  //   const othersIndex = step?.options?.findIndex(
  //     (option) => option.toLowerCase() === "others"
  //   );
  //   return othersIndex !== -1 && checkboxAnswers[othersIndex];
  // };

  const renderStep = () => {
    if (!step) return <div>Invalid Step</div>;

    switch (step.type) {
      case "checkbox":
        return (
          <CheckboxFrame
            step={step}
            checkboxAnswers={checkboxAnswers}
            setCheckboxAnswers={setCheckboxAnswers}
            setErrorMessage={setErrorMessage}
          />
        );

      case "question":
        return (
          <TextInputFrame
            step={step}
            textAnswer={textAnswer}
            setTextAnswer={setTextAnswer}
            setErrorMessage={setErrorMessage}
          />
        );

      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <>
      {renderStep()}
      {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}

      <StepIndicator totalSteps={totalSteps} />

      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default Page14;
