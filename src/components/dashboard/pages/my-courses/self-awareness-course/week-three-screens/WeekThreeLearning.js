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

export default function WeekThreeLearning({ course, currentWeekIndex }) {
  const navigate = useNavigate();
  const courseId = course._id;
  
    // const week = 1;

    // // Fetch data using react-query
    // const { data, isLoading, isError } = useQuery({
    //   queryKey: ["self-awareness-course"],
    //   queryFn: async () => userService.getMyActivites(courseId, week),
    //   refetchOnMount: true,
    //   refetchOnWindowFocus: true
    // });

    // useEffect(() => {
    //   if (data?.activity?.activities?.length > 0) {
    //     const activities = data.activity.activities;
    //     console.log(activities);

    //     // Save the fetched data to state
    //     const lastActivityIndex = activities.length - 1;
    //     const lastActivity = activities[lastActivityIndex];
    //     setCurrentActivity(lastActivity?.activity || 1);
    //     setFormData(activities);

    //     // Save data to localStorage
    //     localStorage.setItem(
    //       "currentActivity",
    //       JSON.stringify(lastActivity?.activity || 1)
    //     );
    //     localStorage.setItem("activityData", JSON.stringify(activities));
    //   } else {
    //     // Clear localStorage if no data is available
    //     localStorage.removeItem("currentActivity");
    //     localStorage.removeItem("activityData");

    //     // Reset state to initial values
    //     setCurrentActivity(1);
    //     setFormData([]);
    //   }
    // }, [data]);


  // Retrieve the current step and form data from localStorage, or initialize defaults
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("weekThreeCurrentStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("weekThreeFormData");
    return savedData
      ? JSON.parse(savedData)
      : { week: 3, activity: 1, answers: [] };
  });

  const [videoPlaying, setVideoPlaying] = useState(false);

  // Save currentStep to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("weekThreeCurrentStep", currentStep);
  }, [currentStep]);

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    try {
      const serializableData = { ...formData };
      console.log("Current Form Data:", serializableData);
      localStorage.setItem(
        "weekThreeFormData",
        JSON.stringify(serializableData)
      );
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [formData]);

const handleNext = (data = {}) => {
  setFormData((prevFormData) => {
    // Filter out video-related data before saving
    const isVideoStep = [1, 3, 5, 7].includes(currentStep); // Assuming these are video steps

    if (isVideoStep) {
      return prevFormData; // Do not update formData for video steps
    }

    const activityIndex = prevFormData.answers.findIndex(
      (item) => item.activity === data.activity
    );

    const updatedAnswers = [...prevFormData.answers];

    if (activityIndex > -1) {
      updatedAnswers[activityIndex] = data;
    } else {
      updatedAnswers.push(data);
    }

    const updatedFormData = {
      ...prevFormData,
      answers: updatedAnswers
    };

    console.log(updatedFormData); // Log to verify data being saved
    return updatedFormData;
  });

  setCurrentStep((prevStep) => prevStep + 1);
};


  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = () => {
    console.log(formData);
    userService
      .postMyActivity(courseId, formData)
      .then((response) => {
        console.log("Submission successful:", response);
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
              onSubmit={(answers) => handleNext({ activity: 6, ...answers })}
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
