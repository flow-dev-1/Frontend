import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyFireWorks from "../Fireworks";
import celebrate from "../../../../../../assets/celebrate.png";
import mindset from "../../../../../../assets/selfawareness-images/mindset.png";
import QuestionFromVideo from "./QuestionFromVideo";
import WeekThreeAssessmentForm from "./WeekThreeAssessmentForm";
import VideoComponent from "./VideoComponent";
import NavigationButtons from "../week-two-screens/NavigationButtons";
import QuestionComponent from "./QuestionComponent";
import userService from "../../../../../../services/api/user.js";
import SecondQuestionComponent from "./SecondQuestionComponet.js";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

export default function WeekThreeLearning({ course, currentWeekIndex }) {
  const [currentActivity, setCurrentActivity] = useState(1);

  const navigate = useNavigate();
  const courseId = course._id;
  const week = 3;

  // Fetch data using react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["self-awareness-course", courseId, week],
    queryFn: async () => userService.getMyActivites(courseId, week),
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  useEffect(() => {
    const formatData = (data) => {
      const formattedData = [];

      data.activities.forEach((activity) => {
        activity.answers.forEach((answerObj) => {
          const formattedObj = {
            activity: activity.activity,
            answer: answerObj.answer,
            answers: {}
          };
          formattedData.push(formattedObj);
          formattedData.push({}); // Add an empty object as the next entry
        });
      });

      // Handle additionalData if needed
      if (data?.additionalData) {
        formattedData.push({
          activity: data?.additionalData?.activity,
          answers: data?.additionalData?.answers?.additionalDataForActivity6
        });
      }

      return formattedData;
    };

    if (isError) {
      toast.success("Welcome, start your learning journey for Week Three");
    } else if (data?.activity?.activities?.length > 0) {
      const formattedData = formatData(data.activity);
      console.log(formattedData);
      toast.success("Continuing from your last checkpoint.");

      // Save the fetched data to state
      const lastActivityIndex = formattedData.length - 1;
      const lastActivity = formattedData[lastActivityIndex];
      setCurrentActivity(lastActivity?.activity || 1);
      setFormData(formattedData);
      console.log("formatted", formattedData);

      // Save data to localStorage
      localStorage.setItem(
        "currentActivity",
        JSON.stringify(lastActivity?.activity || 1)
      );
      localStorage.setItem("weekThreeFormData", JSON.stringify(formattedData));
      console.log("weekThreeFormData", formattedData);
    } else {
      // Clear localStorage if no data is available
      localStorage.removeItem("currentActivity");
      localStorage.removeItem("weekThreeFormData");

      // Reset state to initial values
      setCurrentActivity(1);
      setFormData([]);
    }
  }, [data, isError]);

  // Retrieve the current step and form data from localStorage, or initialize defaults
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("weekThreeCurrentStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("weekThreeFormData");
    return savedData ? JSON.parse(savedData) : [];
  });

  // Log the formData after component mounts
  useEffect(() => {
    console.log("Retrieved Form Data from localStorage:", formData);
  }, []);

  const [videoPlaying, setVideoPlaying] = useState(false);

  // Save currentStep to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("weekThreeCurrentStep", currentStep);
  }, [currentStep]);

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    try {
      console.log("Current Form Data:", formData);
      localStorage.setItem("weekThreeFormData", JSON.stringify(formData));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [formData]);

  const handleNext = (data = {}) => {
    setFormData((prevFormData) => {
      const isVideoStep = [1, 3, 5, 7].includes(currentStep);

      if (isVideoStep) {
        return prevFormData; // Skip updates for video steps
      }

      // Check if the activity already exists in the formData
      const existingEntryIndex = prevFormData.findIndex(
        (item) => item.activity === data.activity
      );

      if (existingEntryIndex !== -1) {
        // Update the existing entry, only if there's new data
        const existingData = prevFormData[existingEntryIndex];
        const updatedData = {
          ...existingData,
          ...data,
          answers: { ...existingData.answers, ...data.answers }
        };

        const updatedFormData = [...prevFormData];
        updatedFormData[existingEntryIndex] = updatedData;
        return updatedFormData;
      } else {
        // Add new entry if not found
        return [...prevFormData, data];
      }
    });

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = () => {
    const activityMap = new Map();
    let additionalDataForActivity6 = {};

    formData.forEach((item) => {
      const { activity, answer, answers = {} } = item;

      if (activity) {
        if (!activityMap.has(activity)) {
          activityMap.set(activity, { activity, answers: [] });
        }

        const activityEntry = activityMap.get(activity);

        if (activity === 6) {
          // Store answers for activity 6 in additionalData
          Object.keys(answers).forEach((key) => {
            additionalDataForActivity6[key] = answers[key];
          });
        } else {
          // Handle other activities normally
          const formattedAnswers = {
            ...answers,
            ...(answer && { answer })
          };
          activityEntry.answers.push(formattedAnswers);
        }
      }
    });

    const uniqueActivities = Array.from(activityMap.values());
    const dataFromLocalStorage = localStorage.getItem("weekThreeFormData");
    console.log(dataFromLocalStorage)
    // Prepare the data to be sent, including additionalData for activity 6
    const submissionData = {
      week: 3,
      activities: uniqueActivities,
      additionalData: { formData}
    };

    console.log("Submitting Form Data:", submissionData);

    userService
      .postMyActivity(courseId, submissionData)
      .then((response) => {
        console.log("Submission successful:", response);

        // Clear local storage after successful submission
        localStorage.removeItem("answers");
        localStorage.removeItem("answer_What do you understand by");
        localStorage.removeItem("currentActivity");
        localStorage.removeItem("weekThreeFormData"); // Assuming you're storing form data for week three

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
              text: "What do you understand by the word",
              image: mindset,
              alt: "mindset image",
              suffix: "?"
            }}
            onBack={handlePrevious}
            onNext={handleNext}
            onSubmit={(data) => handleNext({ activity: 2, ...data })}
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
          <SecondQuestionComponent
            question={{
              text: "Do you feel like you have a growth mindset, or do you sometimes find yourself with a fixed mindset? Share your thoughts. It’s okay to be honest, this is all about learning and growing together!",
              suffix: "?"
            }}
            onBack={handlePrevious}
            onNext={handleNext}
            onSubmit={(data) => handleNext({ activity: 4, ...data })}
          />
        );

      case 5:
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

      case 6:
        return (
          <div className="assessment-page">
            <QuestionFromVideo
              previous={handlePrevious}
              onSubmit={(answers) =>
                handleNext({ activity: 6, ...answers }, handleSubmit())
              }
            />
          </div>
        );

      case 7:
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

      case 8:
        return (
          <div className="assessment-page">
            <WeekThreeAssessmentForm previous={handlePrevious} />
          </div>
        );

      case 10:
        return (
          <div className="end-of-course-page">
            <div className="congrats">
              <img src={celebrate} alt="celebrate" />
              <h1>Hurray!</h1>
              <p className="text-center fs-5">
                You have made it to the <br /> Week {currentWeekIndex + 1}
              </p>
            </div>
            <MyFireWorks />

            <div className="d-flex align-items-center justify-content-around mx-auto mt-5">
              <button
                className="btn progress-btn btn-dark"
                onClick={handleNextWeekCourse}
              >
                Proceed to Week {currentWeekIndex + 2}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="course-progression-page">{renderStepContent()}</div>;
}
