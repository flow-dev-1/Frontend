import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import unCheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import correct from "../../../../../../../../assets/correct.png";
import wrong from "../../../../../../../../assets/wrong.png";
import {
  getWeekAssessment,
  getWeekContentExcludingVideos,
} from "../../../data/index.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import userService from "../../../../../../../../services/api/user.js";
import { calculateResult } from "../../../utility.js";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer.js";
import { useSelector } from "react-redux";
import adminService from "../../../../../../../../services/api/admin.js";
import Modal from "../../components/Modal.jsx";

function Week5({ enrollmentId, setWeekFiveData }) {
  const { pages } = getWeekContentExcludingVideos(5);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");

  const [activity1] = pages;

  const [activityData, setActivityData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);
  const [activityFeedbackId, setActivityFeedbackId] = useState(null);
  const { isAdmin, code } = useSelector(adminData);

  const { questions: assessments } = getWeekAssessment(5);

  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/emotional-regulation-feedback-5", enrollmentId, 5],
    queryFn: () =>
      isAdmin
        ? adminService.getUserCourseData(enrollmentId, 5, code)
        : userService.getUserCourseData(enrollmentId, 5),
    enabled: !!enrollmentId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  const mutation = useMutation({
    mutationFn: () =>
      adminService.submitAdminFeedback(
        activityData,
        enrollmentId,
        5,
        data?.activity?.user,
        code
      ),
    onSuccess: (data) => {
      setModalData("");
    },
    onError: (error) => {
      console.error("Registration error:", error);
      setModalData("");
    },
  });

  useEffect(() => {
    if (!data) return;

    setActivityData(data.activity?.activities);
    setAssessmentData(data.assessment?.assessments);
    setWeekFiveData(true);

    return () => { };
  }, [data]);


  function getActivityFeedback(activityId, itemId, index) {
    if (!itemId) {
      return activityData?.find((activity) => activity.page === activityId)
        ?.feedback;
    } else {
      const answersList = activityData?.find(
        (activity) => activity.page === activityId
      )?.feedback;
      const answerObject = answersList?.find(
        (activity) => activity.stepId === itemId
      ).value;

      // return answerObject ? answerObject[index] : null;
      return answerObject ? answerObject : null;
    }
  }

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setActivityFeedbackId(null);
    setShowModal(false);
  };

  function drag1(type) {
    if (!activityData || !activityData[0] || !activityData[0].answer) return [];

    const indices =
      type === "green"
      ? activityData[0]?.answer?.[0]?.value?.green
      : type === "blue"
      ? activityData[0]?.answer?.[0]?.value?.blue
      : type === "yellow"
      ? activityData[0]?.answer?.[0]?.value?.yellow
      : activityData[0]?.answer?.[0]?.value?.red

    return indices?.map((index) => activity1?.steps?.[1].skills[index]) || [];
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError) {
    return <div>{data?.message || "Internal server error!"}</div>;
  }

  const score =
    calculateResult(assessments, assessmentData, assessments?.length) || 0;



  const submitFeedback = (value) => {
    if (!activityFeedbackId?.itemId) {
      const answerData = activityData.find(
        (item) => item.page === activityFeedbackId.activityId
      );
      answerData.feedback = value;
      handleModalClose();
      mutation.mutate();
    } else {
      const answerData = activityData?.find(
        (item) => item.page === activityFeedbackId.activityId
      );

      if (!answerData.feedback) {
        answerData.feedback = [];
      }

      const existingFeedbackIndex = answerData.feedback.findIndex(
        (item) => item.stepId === activityFeedbackId.itemId
      );

      if (existingFeedbackIndex >= 0) {
        answerData.feedback[existingFeedbackIndex].value = value;
      } else {
        answerData.feedback.push({
          stepId: activityFeedbackId.itemId,
          value: value,
        });
      }

      handleModalClose();
      setModalData("");
      mutation.mutate();
    }
  };

  return (
    <>
      {/* Activity 1 */}
      <p className="bg-yellow py-md-3 px-md-5 py-1 px-2 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 1
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>

        <p className="text-blue fs-md-4">Below are several coping skills. Your task is to pick and drop each skill/ activity to the zone it can help regulate.</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answers:</h2>
        <div className="flex-grow-1 d-flex">
          <div className="flex-grow-1">
            <h2 className="text-center bg-green text-white py-md-3 py-1 fs-md-1">
              Green
            </h2>
            <div className="px-2 py-1 px-md-5 py-md-3">
              {drag1("green")?.map((item, idx) => (
                <p className="fs-md-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-grow-1">
            <h2 className="bg-yellow text-center text-white py-md-3 py-1 fs-md-1">
              Yellow
            </h2>
            <div className="px-2 py-1 px-md-5 py-md-3">
              {drag1("yellow")?.map((item, idx) => (
                <p className="fs-md-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
                    <div className="flex-grow-1">
            <h2 className="bg-blue text-center text-white py-md-3 py-1 fs-md-1">
              Blue
            </h2>
            <div className="px-2 py-1 px-md-5 py-md-3">
              {drag1("blue")?.map((item, idx) => (
                <p className="fs-md-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
                    <div className="flex-grow-1">
            <h2 className="bg-red text-center text-white py-md-3 py-1 fs-md-1">
              Red
            </h2>
            <div className="px-2 py-1 px-md-5 py-md-3">
              {drag1("red")?.map((item, idx) => (
                <p className="fs-md-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
        </div>
        {isAdmin &&
          !activityData?.find((activity) => activity.page === activity1.id)
            ?.feedback && (
            <Icon
              onClick={() => {
                setActivityFeedbackId({ activityId: activity1.id });
                handleModalOpen();
              }}
              style={{ color: "#D6D6D6" }}
              width={35}
              icon="tabler:message-2"
            />
          )}
      </div>
      {
        // Show this only id theres a feedback
        activityData?.find((activity) => activity.page === activity1.id)
          ?.feedback && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
              {getActivityFeedback(activity1.id)}
            </p>
            {isAdmin && (
              <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity1.id));
                  setActivityFeedbackId({ activityId: activity1.id });
                  handleModalOpen();
                }}
                style={{ color: "#275DAD" }}
                width={35}
                icon="lucide:edit"
              />
            )}
          </div>
        )
      }

      <hr />

      {/* Assesment 1 */}
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-4">
        Assessment 1
      </p>
      <hr />
      {assessments.map(({ id, question, options, correctOption }, i) => {
        const selectedAnswer = assessmentData?.find(
          (answer) => answer.id === id
        )?.value;
        return (
          <>
            <div className="d-flex gap-3" key={i}>
              <h2 className="text-blue fs-md-1 text-nowrap">
                Questions {i + 1}:
              </h2>
              <p className="text-blue fs-md-4">{question}</p>
            </div>
            {options.map((option, index) => {
              const optionKey = Object.keys(option)[0];
              const optionText = option[optionKey];
              const isCorrectOption = correctOption === optionText;
              const isAnswer = selectedAnswer === optionText;

              return (
                <div
                  key={index}
                  className="d-flex gap-2 mb-3 align-items-center justify-content-between"
                >
                  <div className="d-flex gap-2">
                    <img
                      src={isAnswer ? checkedImage : unCheckedImage}
                      alt={`Option ${optionKey}`}
                      style={{ width: 20, height: 20 }}
                    />
                    <div>{`${optionText}. ${option.text}`}</div>
                  </div>
                  {isCorrectOption ? (
                    <p className="d-flex gap-1">
                      {" "}
                      <img
                        src={correct}
                        alt=""
                        style={{ width: 20, height: 20 }}
                      />{" "}
                      Correct
                    </p>
                  ) : (
                    <p className="d-flex gap-1">
                      {" "}
                      <img
                        src={wrong}
                        alt=""
                        style={{ width: 20, height: 20 }}
                      />
                      Wrong
                    </p>
                  )}
                </div>
              );
            })}
          </>
        );
      })}
      <hr />

      {/* Weekly Report */}

      <div className="bg-button p-3 p-md-5 rounded-4">
        <h2 className="text-white fs-md-1">Weekly Report</h2>
        <div className="d-flex flex-column flex-md-row gap-4">
          <h2 className="text-gray fs-md-1 ratio-1x1 bg-aqua rounded-4 p-3 p-md-5 d-flex justify-content-center border border-6 border-blue">
            {score}%
          </h2>
          <p className="text-white">
            {score < 40
              ? "Well done on starting your journey into Emotional Regulation! You’ve begun to explore the basics, including understanding emotions and identifying energy levels, but there’s plenty of room to grow. Spend more time revisiting key concepts, such as understanding the SONAR method for managing emotions. Practice small coping techniques and try applying them to simple daily challenges. Remember, emotional regulation is a skill that develops over time, so keep learning and practicing."
              : score < 60
                ? "Good job! You’ve shown a foundational understanding of emotional regulation. To build on this, focus on strengthening your ability to identify emotions as they arise and using the SONAR method to deal with them effectively. Practice coping skills like physical or creative activities to handle difficult moments. With consistent effort, you’ll see more confidence in managing emotions across different situations."
                : score < 80
                  ? "Great work! You’ve developed a solid understanding of emotional regulation. Over the course of these weeks, you’ve learned how to recognize energy levels, understand the SONAR method, and use basic coping skills. To take your skills further, focus on applying what you’ve learned to help you deal with high-energy or low-energy states and practice applying these skills in more complex situations. Keep practicing these techniques daily, and you’ll continue to see significant improvement in your emotional balance."
                  : score < 95
                    ? "Excellent work! You’ve demonstrated a strong understanding of emotional regulation concepts, from recognizing your energy levels to using the SONAR method and applying coping skills effectively. To keep growing, focus on applying these skills in a variety of scenarios, such as managing stress, improving relationships, or achieving personal goals. Your dedication to mastering emotional regulation is commendable—keep up the great work!"
                    : score <= 100
                      ? "Outstanding achievement! You’ve shown an exceptional understanding of emotional regulation and its application in your daily life. Your ability to recognize and manage emotions, balance energy levels, and use the SONAR framework effectively is truly impressive, and will set you up for great success and impact in life. Keep inspiring others with your emotional intelligence, and continue refining these skills as you grow. Your mastery of emotional regulation will serve you well in every aspect of life!"
                      : ""}
          </p>
        </div>
        <Modal
          isOpen={showModal}
          closeModal={handleModalClose}
          data={modalData}
          handleSubmit={submitFeedback}
        />
      </div>
    </>
  );
}

export default Week5;
