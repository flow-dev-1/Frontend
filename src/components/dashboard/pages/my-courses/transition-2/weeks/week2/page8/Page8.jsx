import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../components/Button";
import QuestionBox from "../../../components/QuestionBox";
import StepIndicator from "../../../components/StepIndicator";

import {
  selectCurrentStep,
  selectPageData,
} from "../../../../../../../../redux/reducers/navigationSlice";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";

import FlipCheckBoxesFrameSingle from "./components/FlipCheckBoxesFrameSingle";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import "./page8.css";
import {
  clearActivityDraft,
  getActivityDraft,
  saveActivityDraft,
} from "../../../utils/activityDrafts";

function WeekTwoPage8() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = Array.isArray(pageData?.steps)
    ? pageData.steps.length
    : pageData?.steps || 2;
  const userAnswers = useSelector(userAnswer);
  const adminDatas = useSelector(adminData);

  const [selectedValues, setSelectedValues] = useState({});
  const [rankValues, setRankValues] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!userAnswers) return;

    const response = userAnswers.activities?.find(
      (item) => item.page === pageData.id
    );

    const draftAnswer = getActivityDraft(userAnswers, pageData.id);
    const answer = response?.answer || draftAnswer;

    if (answer) {
      setSelectedValues(answer.selectedValues || {});
      setRankValues(answer.rankValues || {});
    }
  }, [userAnswers, pageData.id]);

  const saveUserInput = () => {
    if (adminDatas.isAdmin) return true;

    const chosenCount = Object.values(selectedValues).filter(Boolean).length;

    if (chosenCount !== 5) {
      setErrorMessage("Please choose exactly 5 values before moving on.");
      return false;
    }

    if (currentStep === 2) {
      const selectedOptions = getSelectedOptions();
      const ranks = selectedOptions.map((option) => rankValues[option.value]);
      const hasMissingRank = ranks.some((rank) => !rank);
      const validRanks = ["1", "2", "3", "4", "5"];
      const hasInvalidRank = ranks.some((rank) => !validRanks.includes(rank));
      const uniqueRanks = new Set(ranks);

      if (hasMissingRank) {
        setErrorMessage("Please rank each selected value from 1 to 5.");
        return false;
      }

      if (hasInvalidRank || uniqueRanks.size !== 5) {
        setErrorMessage("Please use each rank from 1 to 5 only once.");
        return false;
      }
    }

    setErrorMessage("");

    dispatch(
      saveActivity({
        page: pageData.id,
        answer: {
          selectedValues,
          rankValues,
        },
      })
    );
    clearActivityDraft(userAnswers, pageData.id);

    return true;
  };

  const handleToggle = (index) => {
    setErrorMessage("");

    setSelectedValues((prev) => {
      const nextSelectedValues = {
        ...prev,
        [index]: !prev[index],
      };
      saveActivityDraft(userAnswers, pageData.id, {
        selectedValues: nextSelectedValues,
        rankValues,
      });
      return nextSelectedValues;
    });
  };

  const handleRankChange = (value, rank) => {
    setErrorMessage("");
    if (rank && !["1", "2", "3", "4", "5"].includes(rank)) return;
    setRankValues((prev) => {
      const nextRankValues = {
        ...prev,
        [value]: rank,
      };
      saveActivityDraft(userAnswers, pageData.id, {
        selectedValues,
        rankValues: nextRankValues,
      });
      return nextRankValues;
    });
  };

  const getSelectedOptions = () =>
    pageData.options?.filter((_, index) => selectedValues[index]) || [];

  return (
    <>
      <QuestionBox>
        {currentStep === 1 ? (
          <>
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
          </>
        ) : (
          <div className="transition2-page12-rank">
            <h2 className="transition2-page12-rank-question">
              <span className="text-blue">Question:</span>{" "}
              {pageData.rankInstruction}
            </h2>
            <div className="transition2-page12-rank-list">
              {getSelectedOptions().map((option) => (
                <div
                  className="transition2-page12-rank-row"
                  key={option.value}
                >
                  <div
                    className={`transition2-page12-value-card transition2-page12-value-${option.color}`}
                  >
                    <span>{option.value}</span>
                    <img src={checkedImage} alt="" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    className="transition2-page12-rank-input"
                    value={rankValues[option.value] || ""}
                    onChange={(event) =>
                      handleRankChange(option.value, event.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </QuestionBox>

      {errorMessage && <div className="text-danger">{errorMessage}</div>}

      <StepIndicator totalSteps={totalSteps} />

      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekTwoPage8;
