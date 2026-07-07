// src/components/Hurray.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ConfettiAnimation from "./FireWork"; // Import the new component
import Button from "./Button";
import {
  hideHurray,
  selectNavigationState,
} from "../../../../../../redux/reducers/navigationSlice";
import { adminData } from "../../../../../../redux/reducers/adminReducer";
import "./question.css"

const Hurray = ({ currentWeek = 3 }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showEnrollPrompt, setShowEnrollPrompt] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLastWeek } = useSelector(selectNavigationState);
  const { isPreviewMode } = useSelector(adminData);
  const enrollPromptPath = location.state?.isPreview
    ? "/school-dashboard/courses/all"
    : "/dashboard/my-courses";

  const handleNext = () => {
    if (isPreviewMode && currentWeek === 1) {
      setShowEnrollPrompt(true);
      return;
    }

    sessionStorage.setItem("flow-currentPage", 1);
    sessionStorage.setItem("flow-currentStep", 1);
    if (isLastWeek) {
      navigate("/dashboard/my-courses");
    } else {
      dispatch(hideHurray());
    }
  };

  const getButtonText = () => {
    if (isLastWeek) {
      return "Back to Course";
    }
    return `Proceed to Week ${currentWeek + 1}`;
  };

  const weeks = [...Array(6)].map((_, i) => i + 1);

  if (showEnrollPrompt) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "60vh", padding: "2rem" }}
      >
        <h2 className="mb-3" style={{ color: "#275DAD" }}>
          Enroll to Continue
        </h2>
        <p style={{ maxWidth: "520px", color: "#4d4d4d" }}>
          You have completed the Week 1 preview. Enroll in this course to unlock
          Week 2 and continue learning.
        </p>
        <div className="d-flex gap-3 mt-4">
          <Button
            text="Back to Preview"
            customOnClick={() => setShowEnrollPrompt(false)}
          />
          <Button
            text="Enroll to Course"
            customOnClick={() => {
              sessionStorage.removeItem("flow-course-preview-mode");
              navigate(enrollPromptPath);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {showConfetti && <ConfettiAnimation onComplete={() => setShowConfetti(false)} />}
      <div>
        {currentWeek === 6 ? (
          <img
            src={require(`../../../../../../assets/weekEndHurray.png`)}
            alt="Course completion celebration"
            className="text-center hurray-img"
          />
        ) : (
          weeks.map(week => (
            week === currentWeek && (
              <img
                key={week}
                src={require(`../../../../../../assets/week${week}End.png`)}
                alt={`Week ${week} celebration`}
                className="text-center hurray-img"
              />
            )
          ))
        )}
      </div>

      <div className="d-flex justify-content-center w-1029px mt-4">
        <Button text={getButtonText()} customOnClick={handleNext} />
      </div>
    </>
  );
};

export default Hurray;
