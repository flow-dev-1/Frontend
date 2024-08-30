import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyFireWorks from "../Fireworks";
import celebrate from "../../../../../../assets/celebrate.png";
import selfAwareness from "../../../../../../assets/selfawareness-images/strengthweakness.png";
import StrengthIdentification from "./StrengthIdentification";
import WeaknessIdentification from "./WeaknessIdentification";
import ScenarioQuestions from "./ScenarioQuestions";
import WeekTwoAssessmentForm from "./WeekTwoAssessmentForm";
import VideoComponent from "./VideoComponent";
import QuestionComponent from "./QuestionComponent";
import NavigationButtons from "./NavigationButtons";
import userService from "../../../../../../services/api/user.js";
import { useQuery } from "@tanstack/react-query";

export default function WeekTwoLearning({ course, onClose, currentWeekIndex }) {
  const [currentStep, setCurrentStep] = useState(() => {
    return parseInt(localStorage.getItem("weekTwoCurrentStep"), 10) || 1;
  });
  const [formData, setFormData] = useState([]);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const navigate = useNavigate();
  const courseId = "66853bf50118e2e0a02b6a5a";
  const week = 2;

  // Fetching Data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["self-awareness-course", courseId, week],
    queryFn: async () => userService.getMyActivites(courseId, week),
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const saveDataToLocalStorage = (data) => {
    try {
      // Filter out any non-serializable data (like DOM elements or functions)
      const serializableData = data.map((item) => {
        const { answers, ...rest } = item;

        // Ensure answers do not include any non-serializable content
        const cleanedAnswers = answers.map((answer) => {
          if (typeof answer === "object" && answer !== null) {
            return JSON.parse(JSON.stringify(answer));
          }
          return answer;
        });

        return { ...rest, answers: cleanedAnswers };
      });

      if (serializableData.length > 0) {
        localStorage.setItem(
          "weekTwoFormData",
          JSON.stringify(serializableData)
        );
      } else {
        localStorage.removeItem("weekTwoFormData");
      }
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  };

  console.log(data);

  const handleSubmit = async () => {
    try {
      const assessmentData = localStorage.getItem("weekTwoFormData");
      if (assessmentData) {
        const parsedData = JSON.parse(assessmentData);
        const filteredData = parsedData.filter(
          (item) => ![1, 3, 6, 8].includes(item.activity) // Exclude video-related activities
        );
        const cleanedData = {
          week: 2,
          activities: filteredData
        };
        console.log(cleanedData);
        const response = await userService.postMyActivity(
          courseId,
          cleanedData
        );
        console.log("Submission successful:", response);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const handleNext = (data = {}) => {
    setFormData((prevData) => {
      const existingData = prevData.find(
        (item) => item.activity === currentStep
      );
      let updatedData;
      if (existingData) {
        updatedData = prevData.map((item) =>
          item.activity === currentStep ? { ...item, ...data } : item
        );
      } else {
        updatedData = [...prevData, { activity: currentStep, ...data }];
      }
      saveDataToLocalStorage(updatedData); // Save updated data to localStorage
      return updatedData;
    });

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    localStorage.setItem("weekTwoCurrentStep", nextStep);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      localStorage.setItem("weekTwoCurrentStep", prevStep);
    }
  };

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1;
    navigate("/dashboard/self-awareness-course/2", {
      state: { course, weekIndex: nextWeekIndex }
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc="https://www.youtube.com/embed/CW-f1RVjCws"
            />
            <NavigationButtons onNext={handleNext} isBackDisabled />
          </>
        );
      case 2:
        return (
          <QuestionComponent
            question={{
              text: "What do you understand by",
              image: selfAwareness,
              alt: "selfAwareness image",
              suffix: "?"
            }}
            onBack={handlePrevious}
            onNext={handleNext}
            onSubmit={(data) => handleNext({ answers: data })}
          />
        );
      case 3:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc="https://www.youtube.com/embed/CW-f1RVjCws"
            />
            <NavigationButtons onBack={handlePrevious} onNext={handleNext} />
          </>
        );
      case 4:
        return (
          <StrengthIdentification
            onBack={handlePrevious}
            onSubmit={(data) => handleNext({ answers: data })}
          />
        );
      case 5:
        return (
          <WeaknessIdentification
            onBack={handlePrevious}
            onSubmit={(data) => handleNext({ answers: data })}
          />
        );
      case 6:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc="https://www.youtube.com/embed/CW-f1RVjCws"
            />
            <NavigationButtons onBack={handlePrevious} onNext={handleNext} />
          </>
        );
      case 7:
        return (
          <ScenarioQuestions
            previous={handlePrevious}
            onSubmit={(data) => {
              handleNext({ answers: data });
              handleSubmit();
            }}
          />
        );
      case 8:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
              videoSrc="https://www.youtube.com/embed/CW-f1RVjCws"
            />
            <NavigationButtons onBack={handlePrevious} onNext={handleNext} />
          </>
        );
      case 9:
        return (
          <WeekTwoAssessmentForm
            previous={handlePrevious}
            onSubmit={(data) => handleNext({ answers: data })}
          />
        );
      case 10:
        return (
          <div className="end-of-course-page">
            <div className="congrats">
              <img src={celebrate} alt="celebrate" />
              <h1>Hurray!</h1>
              <p className="text-center fs-5">
                You have made it to Week {currentWeekIndex + 1}!
              </p>
            </div>
            <MyFireWorks />
            <button
              className="btn progress-btn btn-dark"
              onClick={handleNextWeekCourse}
            >
              Proceed to Week {currentWeekIndex + 2}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="course-progression-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : (
        renderStepContent()
      )}
    </div>
  );
}
