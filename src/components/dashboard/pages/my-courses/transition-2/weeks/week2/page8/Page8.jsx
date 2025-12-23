import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../components/Button";
import QuestionBox from "../../../components/QuestionBox";

import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";

import FlipCheckBoxesFrameSingle from "./components/FlipCheckBoxesFrameSingle";

function WeekTwoPage8() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);

  const [selectedValues, setSelectedValues] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;

    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );

    if (response?.answer) {
      setSelectedValues(response.answer.selectedValues || {});
    }
  }, [userAnswers, pageData.id]);

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;

    const chosenCount = Object.values(selectedValues).filter(Boolean).length;

    if (chosenCount < 5) {
      setErrorMessage("At least 5 values are required!");
      return false;
    }

    setErrorMessage("");

    dispatch(
      saveActivity({
        page: pageData.id,
        answer: {
          selectedValues,
        },
      })
    );

    return true;
  };

  const handleToggle = (index) => {
    setErrorMessage("");

    setSelectedValues((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-2 mb-5 flex-column flex-md-row">
          <h2 className="text-blue">Instruction:</h2>
          <h2 className="text-gray">{pageData.instruction}</h2>
        </div>

        <FlipCheckBoxesFrameSingle
          options={pageData.options}
          selectedValues={selectedValues}
          handleToggle={handleToggle}
          setErrorMessage={setErrorMessage}
        />
      </QuestionBox>

      {errorMessage && <div className="text-danger">{errorMessage}</div>}

      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekTwoPage8;
