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
import { toast, ToastContainer } from "react-toastify";

export default function WeekTwoLearning({ course, onClose, currentWeekIndex }) {
  const navigate = useNavigate();
  const courseid = course._id;
  const week = 2;

  const [currentActivity, setCurrentActivity] = useState(1);
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("weekTwoCurrentStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["self-awareness-course", courseid, week],
    queryFn: () => userService.getMyActivites(courseid, week),
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("weekTwoFormData");
    return savedData ? JSON.parse(savedData) : { week: 2, activities: [] };
  });

  const [videoPlaying, setVideoPlaying] = useState(false);

useEffect(() => {
  if (isError) {
    toast.success("Welcome, start your learning journey for Week Two");
  } else if (
    data?.activity?.activities?.length > 0 &&
    data?.activity?.additionalData
  ) {
    const activities = data?.activity?.activities;
    const additionalData = data?.activity?.additionalData;

    const lastActivityIndex = activities.length - 1;
    const lastActivity = activities[lastActivityIndex];
    setCurrentActivity(lastActivity?.activity || 1);
    setFormData({ ...formData, activities });

    // Save data to localStorage
    localStorage.setItem(
      "currentActivity2",
      JSON.stringify(lastActivity?.activity || 1)
    );
    localStorage.setItem("weekTwoFormData", JSON.stringify(activities));
    localStorage.setItem(
      "scenarioSelections",
      JSON.stringify(additionalData.scenarioSelections)
    );
    localStorage.setItem(
      "strengthsChecked",
      JSON.stringify(additionalData.strengthsChecked)
    );
    localStorage.setItem(
      "selectedStrengths",
      JSON.stringify(additionalData.selectedStrengths)
    );
    localStorage.setItem("answers", JSON.stringify(additionalData.answers));
    localStorage.setItem(
      "answer_What do you understand by",
      JSON.stringify(additionalData.notherAnswer)
    );
  } else if (data?.message === "No activity for this student") {
    toast.success("Continuing from your last checkpoint.");
    setCurrentActivity(1);
    setFormData({ week: 2, activities: [] });
    localStorage.setItem("currentActivity2", JSON.stringify(1));
    localStorage.removeItem("weekTwoFormData");
  }
}, [data, isError]);


  useEffect(() => {
    localStorage.setItem("weekTwoCurrentStep", currentStep);
  }, [currentStep]);

  useEffect(() => {
    try {
      localStorage.setItem("weekTwoFormData", JSON.stringify(formData));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [formData]);

  const handleNext = (data = {}) => {
    if (data.videoSrc) {
      setCurrentStep((prevStep) => prevStep + 1);
      return;
    }

    setFormData((prevFormData) => {
      const activityIndex = prevFormData?.activities?.findIndex(
        (item) => item.activity === data.activity
      );

      const updatedActivities = Array.isArray(prevFormData.activities)
        ? [...prevFormData.activities]
        : [];

      if (activityIndex > -1) {
        updatedActivities[activityIndex] = data;
      } else {
        updatedActivities.push(data);
      }

      const updatedFormData = {
        ...prevFormData,
        activities: updatedActivities,
        week: 2
      };

      return updatedFormData;
    });

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const safeParse = (data, defaultValue) => {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn("Parsing error:", e);
      return defaultValue;
    }
  };

  const handleSubmit = () => {
    const answers = safeParse(localStorage.getItem("answers"), []);
    const notherAnswer = localStorage.getItem(
      "answer_What do you understand by"
    );
    const scenarioSelections = safeParse(
      localStorage.getItem("scenarioSelections"),
      []
    );
    const strengthsChecked = safeParse(
      localStorage.getItem("strengthsChecked"),
      {}
    );
    const selectedStrengths = safeParse(
      localStorage.getItem("selectedStrengths"),
      {}
    );

    const formToBeSubmitted = {
      activities: formData.activities,
      additionalData: {
        answers,
        notherAnswer,
        scenarioSelections,
        strengthsChecked,
        selectedStrengths
      },
      week: 2
    };
    console.log(formToBeSubmitted);

    userService
      .postMyActivity(courseid, formToBeSubmitted)
      .then((response) => {
        console.log("Submission successful:", response);

        localStorage.removeItem("answers");
        localStorage.removeItem("answer_What do you understand by");
        localStorage.removeItem("currentActivity2");
        localStorage.removeItem("weekTwoFormData");

        setFormData({ week: 2, activities: [] });
        setCurrentActivity(1);
      })
      .catch((error) => {
        console.error("Submission failed:", error);
      });
  };

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1;
    navigate("/dashboard/self-awareness-course/1", {
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
            onSubmit={(data) => handleNext({ activity: 2, answers: data })}
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
            onNext={handleNext}
            onBack={handlePrevious}
            onSubmit={(data) => handleNext({ activity: 4, answers: data })}
          />
        );
      case 5:
        return (
          <WeaknessIdentification
            onBack={handlePrevious}
            onSubmit={(data) => handleNext({ activity: 5, answers: data })}
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
              handleNext({ activity: 7, answers: data });
              handleSubmit();
            }}
          />
        );
      case 8:
        return (
          <WeekTwoAssessmentForm
            previous={handlePrevious}
            submit={handleSubmit}
            celebrate={<MyFireWorks />}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1>Week 2: Learning</h1>
      {renderStepContent()}
    </div>
  );
}
