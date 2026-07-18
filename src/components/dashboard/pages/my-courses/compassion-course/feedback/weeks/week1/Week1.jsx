import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import unCheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import correct from "../../../../../../../../assets/correct.png";
import wrong from "../../../../../../../../assets/wrong.png";
import {
  getWeekAssessment,
  getWeekContentExcludingVideos,
} from "../../../../compassion-course/weeks/data";
import { useQuery } from "@tanstack/react-query";
import userService from "../../../../../../../../services/api/user.js";
import schoolService from "../../../../../../../../services/api/school.js";
import adminService from "../../../../../../../../services/api/admin.js";
import { calculateResult } from "../../../utility.js";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer.js";
import Modal from "../../components/Modal.jsx";
import { useMutation } from "@tanstack/react-query";
import "../../feedback-layout.css";

function Week1({ enrollmentId, setWeekOneData, isSchool, studentId }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [activityFeedbackId, setActivityFeedbackId] = useState(null);
  const { pages } = getWeekContentExcludingVideos(1);
  const [activity1, activity2, activity3] = pages;
  const [activityData, setActivityData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);
  const { isAdmin, code } = useSelector(adminData);

  const [q1, q2, q3, q4, q5] = activity3.steps.slice(1);

  const { questions: assessments } = getWeekAssessment(1);
  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, isError } = useQuery({
    queryKey: ["dashboard/compassion-feedback-1", enrollmentId, 1],
    queryFn: () => {
      if (isAdmin) return adminService.getUserCourseData(enrollmentId, 1, code);
      if (isSchool) return schoolService.getStudentCourseData(enrollmentId, 1, studentId);
      return userService.getUserCourseData(enrollmentId, 1);
    },
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
        1,
        data?.activity?.user,
        code
      ),
    onSuccess: (data) => {
      setModalData("");
      // setIsOpen(true)
      // toast.success(data.message)
    },
    onError: (error) => {
      console.error("Registration error:", error);
      setModalData("");
      // toast.dismiss()
      // toast.error(error?.message)
      // navigate('/sign-in', { replace: true })
    },
  });

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setActivityFeedbackId(null);
    setShowModal(false);
  };

  useEffect(() => {
    if (!data) return;

    setActivityData(data.activity?.activities);
    setAssessmentData(data.assessment?.assessments);
    setWeekOneData(true);

    return () => { };
  }, [data, setWeekOneData]);

  function getActivityAnswer(activityId, itemId, index) {
    if (!itemId) {
      return activityData?.find((activity) => activity.page === activityId)
        ?.answer;
    } else {
      const answersList = activityData?.find(
        (activity) => activity.page === activityId
      )?.answer;
      const answerObject = answersList?.find(
        (activity) => activity.stepId === itemId
      )?.value;
      return answerObject ? answerObject[index] : "";
    }
  }

  function getActivityFeedback(activityId, itemId, index) {
    if (!itemId) {
      return activityData?.find((activity) => activity.page === activityId)
        ?.feedback;
    } else {
      const answersList = activityData?.find(
        (activity) => activity.page === activityId
      )?.answer;
      const answerObject = answersList?.find(
        (activity) => activity.stepId === itemId
      )?.feedback;
      return answerObject ? answerObject[index] : null;
    }
  }

  function renderQuestions(activityId, questions, stepId) {
    return questions.map((question, index) => (
      <div key={index} className="course-feedback-scenario-item">
        <p className="course-feedback-scenario-question d-inline-block bg-blue text-white rounded-4 px-2 px-md-3">
          {`${question.type}: ${question.question}`}
        </p>
        <div className="course-feedback-row">
          <h2 className="course-feedback-label text-gray fs-md-1">Answers:</h2>
          <p className="course-feedback-content fs-md-5">
            {getActivityAnswer(activityId, stepId, index)}
          </p>
          {isAdmin && !getActivityFeedback(activityId, stepId, index) && (
            <Icon
              onClick={() => {
                setActivityFeedbackId({ activityId, itemId: stepId, index });
                handleModalOpen();
              }}
              style={{ color: "#D6D6D6" }}
              width={35}
              icon="tabler:message-2"
            />
          )}
        </div>
        {getActivityFeedback(activityId, stepId, index) && (
          <div className="course-feedback-row course-feedback-text-row">
            <p className="course-feedback-label text-bg-secondary rounded-4 px-2 px-md-3 fs-md-5">
              Feedback
            </p>
            <p className="course-feedback-content bg-step-active text-gray fs-md-5 p-2 rounded">
              {getActivityFeedback(activityId, stepId, index)}
            </p>
            {isAdmin && (
              <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activityId, stepId, index));
                  setActivityFeedbackId({ activityId, itemId: stepId, index });
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
    ));
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError || !data) {
    return <div>Take Activity to see feedback.</div>;
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
      const answerData = activityData.find(
        (item) => item.page === activityFeedbackId.activityId
      );

      const feedbackData = answerData?.answer?.find(
        (item) => item.stepId === activityFeedbackId.itemId
      );
      if (!feedbackData.feedback) {
        feedbackData.feedback = {};
      }
      feedbackData.feedback[activityFeedbackId.index] = value; // Set feedback entry with key as index

      handleModalClose();
      mutation.mutate();
      // mutation.mutate({ /* pass necessary data */ });
    }
  };

  return (
    <>
      {/* Activity 1 */}
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 1
      </p>
      <hr />
      <div className="course-feedback-row course-feedback-question-row">
        <h2 className="course-feedback-label text-blue fs-md-1">Question:</h2>
        <p className="course-feedback-content text-blue fs-md-4">{activity1.question} "Compassion"?</p>
      </div>
      <div className="course-feedback-row">
        <h2 className="course-feedback-label text-gray fs-md-1">Answers:</h2>
        <p className="course-feedback-content fs-md-5">{getActivityAnswer(activity1.id)}</p>

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
          <div className="course-feedback-row course-feedback-text-row">
            <p className="course-feedback-label text-bg-secondary rounded-4 px-2 px-md-3 fs-md-5">
              Feedback
            </p>
            <p className="course-feedback-content bg-step-active text-gray fs-md-5 p-2 rounded">
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

      <hr className="course-feedback-divider" />
      {/* Activity 2 */}
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 2
      </p>
      <hr />
      <div className="course-feedback-row course-feedback-question-row">
        <h2 className="course-feedback-label text-blue fs-md-1">Question:</h2>
        <p className="course-feedback-content text-blue fs-md-4">{activity2.question} "Theory"?</p>
      </div>
      <div className="course-feedback-row">
        <h2 className="course-feedback-label text-gray fs-md-1">Answers:</h2>
        <p className="course-feedback-content fs-md-5">{getActivityAnswer(activity2.id)}</p>

        {isAdmin &&
          !activityData?.find((activity) => activity.page === activity2.id)
            ?.feedback && (
            <Icon
              onClick={() => {
                setActivityFeedbackId({ activityId: activity2.id });
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
        activityData?.find((activity) => activity.page === activity2.id)
          ?.feedback && (
          <div className="course-feedback-row course-feedback-text-row">
            <p className="course-feedback-label text-bg-secondary rounded-4 px-2 px-md-3 fs-md-5">
              Feedback
            </p>
            <p className="course-feedback-content bg-step-active text-gray fs-md-5 p-2 rounded">
              {getActivityFeedback(activity2.id)}
            </p>
            {isAdmin && (
              <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity2.id));
                  setActivityFeedbackId({ activityId: activity2.id });
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

      <hr className="course-feedback-divider" />
      {/* Activity 3 */}
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 3
      </p>
      <hr />
      <div className="course-feedback-row course-feedback-question-row">
        <h2 className="course-feedback-label text-blue fs-md-1">Question:</h2>
        <p className="course-feedback-content text-blue fs-md-4">{q1.title}</p>
      </div>
      {renderQuestions(activity3.id, q1.questions, q1.stepId)}
      <hr className="course-feedback-divider" />
      <div className="course-feedback-row course-feedback-question-row">
        <h2 className="course-feedback-label text-blue fs-md-1">Question:</h2>
        <p className="course-feedback-content text-blue fs-md-4">{q2.title}</p>
      </div>
      {renderQuestions(activity3.id, q2.questions, q2.stepId)}
      <hr className="course-feedback-divider" />
      <div className="course-feedback-row course-feedback-question-row">
        <h2 className="course-feedback-label text-blue fs-md-1">Question:</h2>
        <p className="course-feedback-content text-blue fs-md-4">{q3.title}</p>
      </div>
      {renderQuestions(activity3.id, q3.questions, q3.stepId)}
      <hr className="course-feedback-divider" />
      <div className="course-feedback-row course-feedback-question-row">
        <h2 className="course-feedback-label text-blue fs-md-1">Question:</h2>
        <p className="course-feedback-content text-blue fs-md-4">{q4.title}</p>
      </div>
      {renderQuestions(activity3.id, q4.questions, q4.stepId)}
      <hr className="course-feedback-divider" />
      <div className="course-feedback-row course-feedback-question-row">
        <h2 className="course-feedback-label text-blue fs-md-1">Question:</h2>
        <p className="course-feedback-content text-blue fs-md-4">{q5.title}</p>
      </div>
      {renderQuestions(activity3.id, q5.questions, q5.stepId)}

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
              // console.log(assessmentData,"AssessmentData")

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
            {score < 41
              ? "It looks like there’s room for improvement in your understanding of compassion and NVC. Reviewing these ideas will help you gain more clarity. Also, feel free to ask questions where you need help."
              : score < 61
                ? "You’re on the right track but might need to revisit some key concepts around compassion and NVC. Keep learning and exploring!"
                : score < 100
                  ? "Great job! You generally understand compassion and NVC, though there are a few areas you can explore further to deepen your knowledge."
                  : score === 100
                    ? "Your understanding of compassion and NVC is spot on! You’ve clearly understood the key concepts."
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

export default Week1;

{
  /* <Icon
                style={{ color: "#275DAD" }}
                width={35}
                icon="lucide:edit"
              /> */
}
{
  /* <Icon
                style={{ color: "#275DAD" }}
                width={35}
                icon="lucide:edit"
              /> */
}
