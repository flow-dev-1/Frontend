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
  const [currentActivity, setCurrentActivity] = useState(1);
  const week = 2;
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("weekTwoCurrentStep");
    return savedStep ? parseInt(savedStep, 10) : 1; // Default to step 1 if not found
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["self-awareness-course", courseid, week],
    queryFn: () => userService.getMyActivites(courseid, week),
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  useEffect(() => {
    if (isError) {
      toast.success("Welcome, start your learning journey for Week Two");
    } else if (
      data?.activity?.activities?.length > 0 &&
      data?.activity?.additionalData
    ) {
      const activities = data?.activity?.activities;
      const additionalData = data?.activity?.additionalData;
      // console.log(data?.activity?.additionalData);

      // Save the fetched data to state
      const lastActivityIndex = activities.length - 1;
      const lastActivity = activities[lastActivityIndex];
      setCurrentActivity(lastActivity?.activity || 1);
      setFormData(activities);

      // Save data to localStorage
      localStorage.setItem(
        "currentActivity2",
        JSON.stringify(lastActivity?.activity || 1)
      );
      localStorage.setItem("weekTwoFormData", JSON.stringify(activities));

      const answers = data?.activity?.additionalData?.answers;
      const notherAnswer = data?.activity?.additionalData?.notherAnswer;
      localStorage.setItem("answers", JSON.stringify(answers));
      localStorage.setItem(
        "answer_What do you understand by",
        JSON.stringify(notherAnswer)
      );
    } else if (data?.message === "No activity for this student") {
      // If no data is available, reset to the first activity
      toast.success("Continuing from your last checkpoint.");
      setCurrentActivity(1);
      setFormData([]);
      localStorage.setItem("currentActivity2", JSON.stringify(1));
      localStorage.removeItem("weekTwoFormData");
      toast.success("Welcome, start your learning journey");
    }
  }, [data, isError]);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("weekTwoFormData");
    return savedData ? JSON.parse(savedData) : { week: 2, activities: [] };
  });

  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    localStorage.setItem("weekTwoCurrentStep", currentStep);
  }, [currentStep]);

  useEffect(() => {
    try {
      const serializableData = { ...formData };
      console.log("Current Form Data:", serializableData);
      localStorage.setItem("weekTwoFormData", JSON.stringify(serializableData));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [formData]);

  formData.activities = Array.isArray(formData.activities)
    ? formData.activities.filter(
        (activity) => Object.keys(activity).length !== 0
      )
    : []; // Ensure activities is always an array

  // Todo Post data
  console.log("Post this data", formData);

  const handleNext = (data = {}) => {
    setFormData((prevFormData) => {
      const activityIndex = prevFormData?.activities?.findIndex(
        (item) => item.activity === data.activity
      );

      const updatedActivities = Array.isArray(prevFormData.activities)
        ? [...prevFormData.activities]
        : []; // Ensure activities is always an array

      if (activityIndex > -1) {
        updatedActivities[activityIndex] = data; // Update existing activity
      } else {
        updatedActivities.push(data); // Add new activity
      }

      const updatedFormData = {
        week: "2",
        ...prevFormData,
        activities: updatedActivities
      };

      try {
        JSON.stringify(updatedFormData); // Check for serializability
        return updatedFormData;
      } catch (error) {
        console.error("Error serializing formData:", error);
        return prevFormData;
      }
    });

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // Function to safely parse JSON data
  const safeParse = (data, defaultValue) => {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn("Parsing error:", e);
      return defaultValue;
    }
  };

  const handleSubmit = () => {
    // console.log(formData);
    const answers = localStorage.getItem("answers");
    const notherAnswer = localStorage.getItem(
      "answer_What do you understand by"
    );
    const scenarioSelections = safeParse(localStorage.getItem("scenarioSelections"),[] );
    const strengthsChecked = safeParse(localStorage.getItem("strengthsChecked"), {});
    const selectedStrengths = safeParse(localStorage.getItem("selectedStrengths"), {});

    const formToBeSubmitted = {
      activities: formData,
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

        // Clear local storage after successful submission
        localStorage.removeItem("answers");
        localStorage.removeItem("answer_What do you understand by");
        localStorage.removeItem("currentActivity");
        localStorage.removeItem("weekTwoFormData"); // Assuming you're storing form data for week two

        // Optionally reset state or navigate
        setFormData([]);
        setCurrentActivity(1);

        // Optionally handle next week course or any other logic
        // handleNextWeekCourse(); // Uncomment if needed
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
          <>
            <StrengthIdentification
              onNext={handleNext}
              onBack={handlePrevious}
              onSubmit={(data) => handleNext({ activity: 4, answers: data })}
            />
          </>
        );
      case 5:
        return (
          <>
            <WeaknessIdentification
              onBack={handlePrevious}
              onSubmit={(data) => handleNext({ activity: 5, answers: data })}
            />
          </>
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
            onSubmit={(data) => handleNext({ activity: 9, answers: data })}
          />
        );
      default:
        return null;
    }
  };

  return <div className="course-progression-page">{renderStepContent()}</div>;
}
