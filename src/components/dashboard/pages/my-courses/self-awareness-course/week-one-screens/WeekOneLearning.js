import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import VideoComponent from "./VideoComponent";
import QuestionComponent from "./QuestionComponent";
import DragDropComponent from "./DragAndDrop";
import EndOfCourseComponent from "./EndOfCourseComponent";
import AssessmentForm from "./AssessmentForm";
import ModalComponent from "./ModalComponent";
import celebrate from "../../../../../../assets/celebrate.png";
import selfAwareness from "../../../../../../assets/selfawareness-images/self-awareness.png";
import personality from "../../../../../../assets/selfawareness-images/personality.png";
import emotionalHand from "../../../../../../assets/selfawareness-images/emotional.png";
import analyticHand from "../../../../../../assets/selfawareness-images/analytic.png";
import friendshipHand from "../../../../../../assets/selfawareness-images/friendship.png";
import actionHand from "../../../../../../assets/selfawareness-images/action.png";
import PersonalityDescriptionComponent from "./PersonalityDescriptionComponent";
import PersonalityQuestionComponent from "./PersonalityQuestionComponent ";
import PersonalityTest from "./PersonalityTest";
import userService from "../../../../../../services/api/user.js";
import "react-toastify/dist/ReactToastify.css";

export default function WeekOneLearning({
  course,
  onClose,
  currentWeekIndex,
  courseId
}) {
  const [currentActivity, setCurrentActivity] = useState(1);
  const [formData, setFormData] = useState([]);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [reviewPopUp, setReviewPopUp] = useState(false);
  const navigate = useNavigate();
  const week = 1;

  // Fetch data using react-query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["self-awareness-course", courseId, week],
    queryFn: () => userService.getMyActivites(courseId, week),
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  useEffect(() => {
    if (isError) {
      toast.success("Welcome, start your learning journey, today.");
    } else if (
      data?.activity?.activities?.length > 0 &&
      data?.activity?.additionalData
    ) {
      const activities = data?.activity?.activities;
      const history = data?.activity?.additionalData.history;
      const cards = data?.activity?.additionalData.cards;
      const buckets = data?.activity?.additionalData.buckets;
      const selectedPersonality =
        data?.activity?.additionalData.selectedPersonality;
      const personalityExplanation =
        data?.activity?.additionalData.personalityExplanation;
      const questionChecked = data?.activity?.additionalData.questionChecked;
      const answersForOne = data?.activity?.additionalData.answersForOne;

      toast.success("Continuing from your last checkpoint.");

      // Save the fetched data to state
      const lastActivityIndex = activities.length - 1;
      const lastActivity = activities[lastActivityIndex];
      setCurrentActivity(lastActivity?.activity || 1);
      setFormData(activities);

      // Save data to localStorage
      localStorage.setItem(
        "currentActivity",
        JSON.stringify(lastActivity?.activity || 1)
      );
      localStorage.setItem("activityData", JSON.stringify(activities));
      localStorage.setItem("history", JSON.stringify(history));
      localStorage.setItem("cards", JSON.stringify(cards));
      localStorage.setItem("buckets", JSON.stringify(buckets));
      localStorage.setItem(
        "selectedPersonality",
        JSON.stringify(selectedPersonality)
      );
      localStorage.setItem(
        "personalityExplanation",
        JSON.stringify(personalityExplanation)
      );
      localStorage.setItem("questionChecked", JSON.stringify(questionChecked));
      localStorage.setItem("answersForOne", JSON.stringify(answersForOne));
    } else if (data?.message === "No activity for this student") {
      // If no data is available, reset to the first activity
      setCurrentActivity(1);
      setFormData([]);
      localStorage.setItem("currentActivity", JSON.stringify(1));
      toast.success("Welcome, start your learning journey");
    }
  }, [data, isError]);

  const handleSubmit = async () => {
    try {
      // Function to safely stringify data
      const toJSONString = (data) => {
        try {
          return JSON.stringify(data);
        } catch (e) {
          console.warn("Stringifying error:", e);
          return JSON.stringify({});
        }
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

      // Load and parse data from localStorage
      const assessmentData = safeParse(
        localStorage.getItem("activityData"),
        []
      );
      const history = safeParse(localStorage.getItem("history"), {}); // Assuming history is an object
      const cards = safeParse(localStorage.getItem("cards"), []);
      const buckets = safeParse(localStorage.getItem("buckets"), {});
      const selectedPersonality =
        localStorage.getItem("selectedPersonality") || "";
      const personalityExplanation =
        localStorage.getItem("personalityExplanation") || "";
      const questionChecked = safeParse(
        localStorage.getItem("questionChecked"),
        {}
      );
      const currentCardIndex = localStorage.getItem("currentCardIndex");
      const answersForOne = safeParse(
        localStorage.getItem("answersForOne"),
        []
      );

      // Prepare the cleaned data object
      const cleanedData = {
        week: 1,
        activities: assessmentData,
        additionalData: {
          history,
          cards,
          buckets,
          selectedPersonality: selectedPersonality, // Ensure it's a string
          personalityExplanation: personalityExplanation, // Ensure it's a string
          questionChecked,
          answersForOne,
          currentCardIndex: Number(currentCardIndex)
        }
      };

      // console.log(cleanedData);

      // Convert the cleaned data to JSON string before submission
      const cleanedDataJSONString = toJSONString(cleanedData);

      // Submit the cleaned data to the backend
      const response = await userService.postMyActivity(
        courseId,
        cleanedDataJSONString
      );
      console.log("Submission successful:", response);

      // Show a success toast
      toast.success("Your assessment has been saved and recorded.");
       localStorage.setItem("currentActivity", JSON.stringify(1));
       localStorage.removeItem("activityData");
       localStorage.removeItem("history");
       localStorage.removeItem("cards");
       localStorage.removeItem("buckets");
       localStorage.removeItem("selectedPersonality");
       localStorage.removeItem("personalityExplanation");
       localStorage.removeItem("questionChecked");
       localStorage.removeItem("answersForOne");
      // Reset the state if needed
      setFormData([]);
      setCurrentActivity(1);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Submission failed. Please try again later.");
    }
  };

  const handleNext = async (data = {}) => {
    if (![1, 3, 5, 7, 9, 11].includes(currentActivity)) {
      setFormData((prevData) => {
        const existingData = prevData.find(
          (item) => item.activity === currentActivity
        );
        let updatedData;
        if (existingData) {
          updatedData = prevData.map((item) =>
            item.activity === currentActivity ? { ...item, ...data } : item
          );
        } else {
          updatedData = [...prevData, { activity: currentActivity, ...data }];
        }
        saveDataToLocalStorage(updatedData);
        return updatedData;
      });
    }

    const isLastActivity = currentActivity >= 13;

    if (isLastActivity) {
      handleSubmit();
    } else {
      const nextActivity = currentActivity + 1;
      setCurrentActivity(nextActivity);
      localStorage.setItem("currentActivity", JSON.stringify(nextActivity));
    }
  };

  const handleDragDropData = (newBuckets) => {
    setFormData((prevFormData) => {
      const existingData = prevFormData.find((item) => item.activity === 6);
      if (existingData) {
        const updatedData = prevFormData.map((item) =>
          item.activity === 6 ? { ...item, dragDropData: newBuckets } : item
        );
        saveDataToLocalStorage(updatedData);
        return updatedData;
      } else {
        const updatedData = [
          ...prevFormData,
          { activity: 6, dragDropData: newBuckets }
        ];
        saveDataToLocalStorage(updatedData);
        return updatedData;
      }
    });
  };

  const saveDataToLocalStorage = (data) => {
    if (data.length > 0) {
      localStorage.setItem("activityData", JSON.stringify(data));
    } else {
      localStorage.removeItem("activityData");
    }
  };

  const handlePrevious = () => {
    const prevActivity = currentActivity - 1;
    setCurrentActivity(prevActivity);
    localStorage.setItem("currentActivity", JSON.stringify(prevActivity));
  };

  const closeReviewPopUp = () => setReviewPopUp(false);

  useEffect(() => {
    // console.log("Form Data submitted:", formData);
  }, [formData]);

  const handleNextWeekCourse = () => {
    const nextWeekIndex = currentWeekIndex + 1;
    navigate("/dashboard/self-awareness-course/1", {
      state: { course, weekIndex: nextWeekIndex }
    });
  };

  const renderActivityContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!formData.length && !isLoading && !isError) {
      // Render basic UI when there is no data
      return (
        <div>
          <p>
            No activities found. Please start the course to begin your journey.
          </p>
          <VideoComponent
            videoPlaying={videoPlaying}
            setVideoPlaying={setVideoPlaying}
          />
          <div className="progression-buttons mt-3">
            <button
              className="btn progress-btn btn-dark"
              onClick={() => handleNext()}
            >
              Next {">>>"}
            </button>
          </div>
        </div>
      );
    }

    switch (currentActivity) {
      case 1:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
            />
            <div className="progression-buttons mt-3">
              <button
                className="btn progress-btn btn-dark"
                onClick={() => handleNext()}
              >
                Next {">>>"}
              </button>
            </div>
          </>
        );
      case 3:
      case 5:
      case 7:
      case 9:
      case 11:
        return (
          <>
            <VideoComponent
              videoPlaying={videoPlaying}
              setVideoPlaying={setVideoPlaying}
            />
            <div className="progression-buttons mt-3">
              <button
                className="btn progress-btn btn-light"
                onClick={() => handlePrevious()}
              >
                {"<<<"} Back
              </button>
              <button
                className="btn progress-btn btn-dark"
                onClick={() => handleNext()}
              >
                Next {">>>"}
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <QuestionComponent
            questionText={"What do you think"}
            activityIndex={2}
            imageSrc={selfAwareness}
            altText="is?"
            onBack={handlePrevious}
            onNext={(answer) =>
              handleNext({
                answers: [answer]
              })
            }
          />
        );
      case 4:
        return (
          <QuestionComponent
            questionText={"What do you think"}
            activityIndex={4}
            imageSrc={selfAwareness}
            altText="?"
            onBack={handlePrevious}
            onNext={(answer) =>
              handleNext({
                answers: [answer]
              })
            }
          />
        );
      case 6:
        return (
          <div className="drag-drop-section">
            <DragDropComponent
              onBack={handlePrevious}
              onNext={handleNext}
              handleDragDropData={handleDragDropData}
            />
          </div>
        );
      case 8:
        return (
          <PersonalityDescriptionComponent
            questionText="What do you understand by the word,"
            imageSrc={personality}
            emotionalHand={emotionalHand}
            analyticHand={analyticHand}
            friendshipHand={friendshipHand}
            actionHand={actionHand}
            altText="?"
            onBack={handlePrevious}
            onNext={(selectedPersonality) =>
              handleNext({
                selectedPersonality
              })
            }
          />
        );
      case 10:
        return <PersonalityTest onBack={handlePrevious} onNext={handleNext} />;
      case 12:
        return (
          <QuestionComponent
            activityIndex={12}
            questionText="Did you discover something new about yourself through this assessment? What did you learn?"
            imageSrc=""
            altText=""
            onBack={handlePrevious}
            onNext={(answer) =>
              handleNext({
                answers: [answer]
              })
            }
          />
        );
      case 13:
        return (
          <PersonalityQuestionComponent
            formData={formData}
            onBack={handlePrevious}
            onNext={(answers) => handleNext({ answers })}
          />
        );
      default:
        return (
          <EndOfCourseComponent
            onNextWeekCourse={handleNextWeekCourse}
            onClose={onClose}
            openReviewPopUp={() => setReviewPopUp(true)}
          />
        );
    }
  };

  return (
    <div>
      {renderActivityContent()}
      {reviewPopUp && <ModalComponent onClose={closeReviewPopUp} />}
    </div>
  );
}
