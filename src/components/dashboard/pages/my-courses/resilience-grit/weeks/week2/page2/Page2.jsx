import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import Button from "../../../components/Button";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import uncheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import {
  userAnswer,
  saveActivity,
} from "../../../../../../../../redux/reducers/userAnswersReducer";
import "./page2.css";
function WeekTwoPage2() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);
  const [myAnswer, setMyAnswer] = useState(userAnswers);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (!userAnswers) return;
    const response = userAnswers?.activities?.find(
      (item) => item.page === pageData.id
    );
    const savedAnswer = response?.answer ? response.answer : "";
    setMyAnswer(savedAnswer);
    setSelectedOption(savedAnswer); // Also set the selected option
  }, [userAnswers]);

  const handleOptionChange = (e) => {
    setErrorMessage("");
    const value = e.target.value;
    setSelectedOption(value);
    setMyAnswer(value); // Set myAnswer when option changes
  };

  const saveUserInput = () => {
    if (!adminDatas.isAdmin && !selectedOption) {
      setErrorMessage("Please select an option to continue!");
      return false;
    }

    setErrorMessage("");
    dispatch(
      saveActivity({
        page: pageData.id,
        answer: selectedOption,
      })
    );
    return true;
  };

  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-2 mt-5 ms-5 align-center-lg-custom">
          <div>
            <form className="d-flex gap-3 flex-column align-items-center w-100">
              {/* Question text */}
              <div className="d-flex align-items-start mb-4 ">
                <h2 className="text-blue me-3 week-2-question-text">Question:</h2>
                <h2 className="text-gray week-2-question-text">{pageData.question}</h2>
              </div>

              {/* Options evenly spaced */}
              <div className="d-flex flex-row justify-content-evenly align-items-center w-50">
                {pageData.options.map((option, index) => {
                  const optionKey = Object.keys(option);
                  const optionID = option[optionKey[0]];
                  const optionText = option[optionKey[1]];
                  const isChecked = selectedOption === optionID;

                  return (
                    <div
                      key={index}
                      className="d-flex gap-3 align-items-center"
                    >
                      <input
                        type="radio"
                        id={optionID}
                        name="optionID"
                        value={optionID}
                        checked={isChecked}
                        onChange={handleOptionChange}
                        style={{ display: "none" }}
                      />
                      <img
                        src={isChecked ? checkedImage : uncheckedImage}
                        alt={optionKey}
                        style={{ width: 60, height: 60, cursor: "pointer" }}
                        onClick={() => {
                          setErrorMessage("");
                          setSelectedOption(optionID);
                        }}
                      />
                      <label htmlFor={optionID} className="fs-1">
                        {optionText}
                      </label>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        </div>
      </QuestionBox>


      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <div className="d-flex justify-content-center gap-96px mt-4 gap-4">
        <Button text="Prev" />
        <Button text="Next" customOnClick={saveUserInput} />
      </div>
    </>
  );
}

export default WeekTwoPage2;
