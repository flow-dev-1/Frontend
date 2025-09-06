import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import unCheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import correct from "../../../../../../../../assets/correct.png";
import wrong from "../../../../../../../../assets/wrong.png";
import {
  getWeekAssessment,
  getWeekContentExcludingVideos,
} from "../../../../resilience-grit/data/index.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import userService from "../../../../../../../../services/api/user.js";
import adminService from "../../../../../../../../services/api/admin.js";
import { calculateResult } from "../../../utility.js";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer.js";
import Modal from "../../components/Modal.jsx";

function Week3({ enrollmentId, setWeekThreeData }) {
  const { pages } = getWeekContentExcludingVideos(3);
  const [activity1, activity2, activity3] = pages;
  const [activityData, setActivityData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [activityFeedbackId, setActivityFeedbackId] = useState(null);
  const { isAdmin, code } = useSelector(adminData);

  console.log(activity2.steps," Activity 2 Steps")

  const [_,q1, q2, q3, q4, q5] = activity2.steps;
  const [a1, a2, a3, a4, a5] =
    activityData?.[1]?.answer?.map((a) => a.value) || [];
  const [f1, f2, f3, f4, f5, f6] =
    activityData?.[0]?.feedback?.map((a) => a.value) || [];

  const { questions: assessments } = getWeekAssessment(3);

  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/transition-feedback-3", enrollmentId, 3],
    queryFn: () =>
      isAdmin
        ? adminService.getUserCourseData(enrollmentId, 3, code)
        : userService.getUserCourseData(enrollmentId, 3),
    enabled: !!enrollmentId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  useEffect(() => {
    if (!data) return;

    setActivityData(data.activity?.activities);
    setAssessmentData(data.assessment?.assessments);
    setWeekThreeData(true);

    return () => {};
  }, [data]);

  // const [q1, q2, q3, q4, q5] = activity3.steps;
  // const [a1, a2, a3, a4, a5] =
  //   activityData?.[2]?.answer?.map((a) => a.value) || [];
  // const [f1, f2, f3, f4, f5] =
  //   activityData?.[2]?.feedback?.map((a) => a.value) || [];

  function getActivityAnswer(activityId) {
    return activityData?.find((activity) => activity.page === activityId)
      ?.answer;
  }

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

  const mutation = useMutation({
    mutationFn: () =>
      adminService.submitAdminFeedback(
        activityData,
        enrollmentId,
        3,
        data?.activity?.user,
        code
      ),
    onSuccess: (data) => {
      setModalData("");
      // Handle success (e.g., show a success message)
    },
    onError: (error) => {
      console.error("Feedback submission error:", error);
      setModalData("");
      // Handle error (e.g., show an error message)
    },
  });

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setActivityFeedbackId(null);
    setShowModal(false);
  };

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

  function drag1(type) {
    console.log(activityData, "Activity Data")
    if (!activityData || !activityData[2] || !activityData[2].answer) return [];

    const indices =
      type === "growth"
        ? activityData[2]?.answer?.green
        : activityData[2]?.answer?.red

        console.log(activity3, "Activity 3")

    // console.log(indices, "Indices")

    // console.log(activity2,"Activity 2")
    return indices?.map((index) => activity3?.images[index]) || [];
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError) {
    return <div>{data?.message || "Internal server error!"}</div>;
  }

  const score =
    calculateResult(assessments, assessmentData, assessments?.length) || 0;

  const renderActivity3 = (question, answer, feedback, activityId, index) => {
    return (
      <div key={index}>
        <div className="d-flex gap-3 align-items-center">
          <h2 className="text-blue fs-md-1 text-nowrap">
            Questions {index + 1}:
          </h2>
          <p className="text-blue fs-md-4 mb-0">{question.title}</p>
        </div>

        <div>
          <span className="bg-green rounded-3 text-white px-1 px-md-3 py-1">
            Within your control:
          </span>
        </div>

        <div className="d-flex gap-3 align-items-center">
          <h2 className="text-gray fs-md-1 mb-0">Answer:</h2>
          <p className="fs-md-5 flex-grow-1 mb-0">{answer?.[0]}</p>
          {isAdmin && !feedback && (
            <Icon
              onClick={() => {
                setActivityFeedbackId({ activityId, itemId: index + 1 });
                handleModalOpen();
              }}
              style={{ color: "#D6D6D6" }}
              width={35}
              icon="tabler:message-2"
            />
          )}
        </div>

        <div>
          <span className="bg-orange rounded-3 text-muted px-1 px-md-3 py-1">
            Outside your control:
          </span>
        </div>

        <div className="d-flex gap-3 align-items-center">
          <h2 className="text-gray fs-md-1 mb-0">Answer:</h2>
          <p className="fs-md-5 flex-grow-1 mb-0">{answer?.[1]}</p>
        </div>

        {feedback && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start mb-0">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-1 p-md-2 rounded mb-0">
              {feedback}
            </p>
            {isAdmin && (
              <Icon
                onClick={() => {
                  setModalData(feedback);
                  setActivityFeedbackId({ activityId, itemId: index + 1 });
                  handleModalOpen();
                }}
                style={{ color: "#275DAD" }}
                width={35}
                icon="lucide:edit"
              />
            )}
          </div>
        )}
      </div>
    );
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
        <p className="text-blue fs-md-4">{activity1.question} "Adaptability"?</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answers:</h2>
        <p className="fs-md-5 flex-grow-1">{getActivityAnswer(activity1.id)}</p>
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

      {/* Activity 2*/}
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 2
      </p>
      <hr />
      {[
        [q1, a1, f1],
        [q2, a2, f2],
        [q3, a3, f3],
        [q4, a4, f4],
        [q5, a5, f5],
      ].map(([question, answer, feedback], index) => (
        <React.Fragment key={index}>
          <div className="d-flex gap-3">
            <h2 className="text-blue fs-md-1 text-nowrap">Question {index + 1}:</h2>
            <p className="text-blue fs-md-4">
              {question?.questions?.[0]?.question}
            </p>
          </div>
          <div className="d-flex gap-3">
            <h2 className="text-gray fs-md-1 text-gray">Answer:</h2>
            <p className="fs-md-5 flex-grow-1">{answer?.[0]}</p>

            {isAdmin && !feedback && (
              <Icon
                onClick={() => {
                  setActivityFeedbackId({
                    activityId: activity1.id,
                    itemId: index + 1,
                  });
                  handleModalOpen();
                }}
                style={{ color: "#D6D6D6" }}
                width={35}
                icon="tabler:message-2"
              />
            )}
          </div>
          {feedback && (
            <div className="d-flex gap-3">
              <p className="text-bg-secondary rounded-4 px-2 px-md-3 fs-md-5 align-self-start">
                Feedback
              </p>
              <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-1 p-md-2 rounded">
                {feedback}
              </p>
              {isAdmin && (
                <Icon
                  onClick={() => {
                    setModalData(feedback);
                    setActivityFeedbackId({
                      activityId: activity1.id,
                      itemId: index + 1,
                    });
                    handleModalOpen();
                  }}
                  style={{ color: "#275DAD" }}
                  width={35}
                  icon="lucide:edit"
                />
              )}
            </div>
          )}
          <hr />
        </React.Fragment>
      ))}


      {/* Activity 3  */}
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 3
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>
        <p className="text-blue fs-md-4">Drag-and-drop the statements on the left into any of these bowls.</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answers:</h2>
        <div className="flex-grow-1 d-flex">
          <div className="flex-grow-1">
            <h2 className="text-center bg-green text-white py-md-3 py-1 fs-md-1">
              Adaptability
            </h2>
            <div className="px-2 py-1 px-md-5 py-md-3">
              {drag1("growth")?.map((item, idx) => (
                <p className="fs-md-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-grow-1">
            <h2 className="bg-red text-center text-white py-md-3 py-1 fs-md-1">
              Not Adaptabilty
            </h2>
            <div className="px-2 py-1 px-md-5 py-md-3">
              {drag1("fixed")?.map((item, idx) => (
                <p className="fs-md-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
        </div>
        {isAdmin &&
          !activityData?.find((activity) => activity.page === activity3.id)
            ?.feedback && (
            <Icon
              onClick={() => {
                setActivityFeedbackId({ activityId: activity3.id });
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
        activityData?.find((activity) => activity.page === activity3.id)
          ?.feedback && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-1 p-md-2 rounded">
              {getActivityFeedback(activity3.id)}
            </p>
            {isAdmin && (
              <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity3.id));
                  setActivityFeedbackId({ activityId: activity3.id });
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
                  className="d-flex gap-2 mb-3 justify-content-between"
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
              ? "Well done on starting your journey into understanding resilience! You’ve gained a basic understanding of the words, ‘Resilience’ and ‘Grit’. However, you need to revisit the course again and listen more attentively to the lessons. You can reach out to your teachers or classmates for help if you still find yourself struggling. Reaching out for help shows that you are a smart person."
              : score < 60
                ? "Good job! You’ve shown a good understanding of resilience and grits. You’re beginning to grasp concepts like the 7 C’s and the role of support systems in building resilience. To deepen your understanding, try practicing adaptability in real-life scenarios and applying the coping skills you have learned. Work on applying these principles when facing challenges, no matter how little or insignificant the challenge might seem; with consistent effort, you’ll strengthen your resilient bones."
                : score < 80
                  ? "Great work! You’ve developed a solid understanding of resilience and grit. To take it a step further, focus on building stronger connections with your support network and practicing coping skills in real-life situations. Apply these principles consistently, even in small challenges, to strengthen your resilience and ability to bounce back. Keep up the good work—you’re on the right track!"
                  : score < 95
                    ? "Excellent job! You’ve shown a strong understanding of resilience and how to build it into your life. You have learned to effectively use strategies like the 7 C’s, practicing adaptability, and relying on your support systems when needed. To continue growing, focus on maintaining these habits and applying them in different areas of your life, whether it’s personal goals or overcoming unexpected challenges. Remember, resilience is a skill that gets stronger with use, and your dedication is truly inspiring. Keep pushing forward—you’re doing amazing!"
                    : score <= 100
                      ? "Outstanding achievement! You’ve demonstrated exceptional mastery of resilience and grit. Your understanding of the 7 C’s, adaptability, and the role of support systems will help you greatly as you handle challenges. You’ve not only learned to bounce back but to thrive and grow stronger in the process. Keep building on this incredible foundation and inspiring others with your example. Your hard work and perseverance are commendable—your resilience is a skill that will serve you for a lifetime!"
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

export default Week3;
