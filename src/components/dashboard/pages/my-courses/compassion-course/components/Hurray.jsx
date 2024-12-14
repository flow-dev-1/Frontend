// src/components/Hurray.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import celebrate from "../../../../../../assets/celebrate.png";
import FireWorks from "./FireWork";
import Button from "./Button";
import { hideHurray, selectNavigationState } from "../../../../../../redux/reducers/navigationSlice";

const Hurray = ({ currentWeek = 3 }) => {
  const [showFireWork, setShowFireWork] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLastWeek } = useSelector(selectNavigationState);

  const handleNext = () => {
    if (isLastWeek) {
      navigate("/my-courses");
    } else {
      dispatch(hideHurray());
    }
  };

  const getButtonText = () => {
    if (isLastWeek) {
      return "Back to Course";
    }
    return `Go to Week ${currentWeek + 1}`;
  };

  return (
    <>
      {showFireWork && <FireWorks setFirework={setShowFireWork} />}
      <div className="bg-sky-blue custom-border-20 question-box-container w-1029px d-flex justify-content-center align-items-center flex-column gap-3">
        <img src={celebrate} alt="celebrate" className="text-center" />
        <h1 className="text-white font-lg">Hurray!</h1>
        <p className="text-center fs-5">
          You have made it to the <br /> end of Week {currentWeek}
        </p>
      </div>
      <div className="d-flex justify-content-center w-1029px mt-4">
        <Button text={getButtonText()} customOnClick={handleNext} />
      </div>
    </>
  );
};

export default Hurray;
