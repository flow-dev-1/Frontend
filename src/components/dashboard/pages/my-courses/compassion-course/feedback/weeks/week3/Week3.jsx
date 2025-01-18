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
import { useQuery, useMutation } from "@tanstack/react-query";
import userService from "../../../../../../../../services/api/user.js";
import adminService from "../../../../../../../../services/api/admin.js";
import { calculateResult } from "../../../utility.js";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer.js";
import Modal from "../../components/Modal.jsx";

function Week3({ enrollmentId, setWeekThreeData }) {
  const { pages } = getWeekContentExcludingVideos(3);
  const [activity1, activity2, activity3, activity4, activity5] = pages;
  const [activityData, setActivityData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [activityFeedbackId, setActivityFeedbackId] = useState(null);
  const { isAdmin, code } = useSelector(adminData);

  const { questions: assessments } = getWeekAssessment(3);

  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/compassion-feedback-3", enrollmentId, 3],
    queryFn: () => userService.getUserCourseData(enrollmentId, 3),
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

  function getActivityAnswer(activityId) {
    return activityData?.find((activity) => activity.page === activityId)
      ?.answer;
  }

  function getActivityFeedback(activityId) {
    return activityData?.find((activity) => activity.page === activityId)?.feedback;
 
  }

  const mutation = useMutation({
    mutationFn: () => adminService.submitAdminFeedback(activityData, enrollmentId, 3,data?.activity?.user, code),
    onSuccess: (data) => {
      setModalData("");
      // Handle success (e.g., show a success message)
    },
    onError: (error) => {
      console.error('Feedback submission error:', error);
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
    const answerData = activityData.find(item => item.page === activityFeedbackId.activityId);
    answerData.feedback = value;
    handleModalClose();
    mutation.mutate();
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError) {
    return <div>{data?.message || "Internal server error!"}</div>;
  }

  const score =
    calculateResult(assessments, assessmentData, assessments?.length) || 0;

  return (
    <>
      {/* Activity 1 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 1
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{activity1.question}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">{getActivityAnswer(activity1.id)}</p>
        {isAdmin && !getActivityFeedback(activity1.id) && (
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

      {getActivityFeedback(activity1.id) && (
        <div className="d-flex gap-3">
          <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">Feedback</p>
          <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
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
      )}

      <hr />

      {/* Activity 2 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 2
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{activity2?.steps[0]?.question}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          {/* This is a static answer for everyone */}
          {activity2?.steps[0]?.options[0]?.text}
        </p>
        {
          (isAdmin && !activityData?.find((activity) => activity.page === activity2.id)?.feedback) && <Icon
            onClick={() => {
              setActivityFeedbackId({ activityId: activity2.id })
              handleModalOpen()
            }}
            style={{ color: "#D6D6D6" }}
            width={35}
            icon="tabler:message-2"
          />
        }
      </div>

      {
        // Show this only id theres a feedback
        (activityData?.find((activity) => activity.page === activity2.id)
          ?.feedback) && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
              {getActivityFeedback(activity2.id)}
            </p>
            {
              isAdmin && <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity2.id))
                  setActivityFeedbackId({ activityId: activity2.id })
                  handleModalOpen()
                }}
                style={{ color: "#275DAD" }}
                width={35}
                icon="lucide:edit"
              />
            }

          </div>
        )
      }
      <hr />

      {/* Activity 3 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 3
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{activity3.question}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">{getActivityAnswer(activity3.id)}</p>
        {
          (isAdmin && !activityData?.find((activity) => activity.page === activity3.id)?.feedback) && <Icon
            onClick={() => {
              setActivityFeedbackId({ activityId: activity3.id })
              handleModalOpen()
            }}
            style={{ color: "#D6D6D6" }}
            width={35}
            icon="tabler:message-2"
          />
        }
      </div>
      {
        // Show this only id theres a feedback
        (activityData?.find((activity) => activity.page === activity3.id)
          ?.feedback) && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
              {getActivityFeedback(activity3.id)}
            </p>
            {
              isAdmin && <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity3.id))
                  setActivityFeedbackId({ activityId: activity3.id })
                  handleModalOpen()
                }}
                style={{ color: "#275DAD" }}
                width={35}
                icon="lucide:edit"
              />
            }

          </div>
        )
      }
      <hr />

      {/* Activity 4 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 4
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{activity4.question}</p>
      </div>
      <div className="d-flex gap-4">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <div className="flex-grow-1">
          {getActivityAnswer(activity4.id)?.map((item, idx) => (
            <p key={idx} className="fs-5">
              {idx + 1}. {item.value}.
            </p>
          ))}
        </div>
        {
          (isAdmin && !activityData?.find((activity) => activity.page === activity4.id)?.feedback) && <Icon
            onClick={() => {
              setActivityFeedbackId({ activityId: activity4.id })
              handleModalOpen()
            }}
            style={{ color: "#D6D6D6" }}
            width={35}
            icon="tabler:message-2"
          />
        }
      </div>
      {
        // Show this only id theres a feedback
        (activityData?.find((activity) => activity.page === activity4.id)
          ?.feedback) && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
              {getActivityFeedback(activity4.id)}
            </p>
            {
              isAdmin && <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity4.id))
                  setActivityFeedbackId({ activityId: activity4.id })
                  handleModalOpen()
                }}
                style={{ color: "#275DAD" }}
                width={35}
                icon="lucide:edit"
              />
            }

          </div>
        )
      }
      <hr />

      {/* Activity 5  */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 5
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">
          {activity5.title + " " + activity5.instructions.join(" ")}
        </p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">{getActivityAnswer(activity5.id)}</p>
        {
          (isAdmin && !activityData?.find((activity) => activity.page === activity5.id)?.feedback) && <Icon
            onClick={() => {
              setActivityFeedbackId({ activityId: activity5.id })
              handleModalOpen()
            }}
            style={{ color: "#D6D6D6" }}
            width={35}
            icon="tabler:message-2"
          />
        }
      </div>
      {
        // Show this only id theres a feedback
        (activityData?.find((activity) => activity.page === activity5.id)
          ?.feedback) && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
              {getActivityFeedback(activity5.id)}
            </p>
            {
              isAdmin && <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity5.id))
                  setActivityFeedbackId({ activityId: activity5.id })
                  handleModalOpen()
                }}
                style={{ color: "#275DAD" }}
                width={35}
                icon="lucide:edit"
              />
            }

          </div>
        )
      }
      <hr />

      <hr />
      {/* Assesment 1 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
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
              <h2 className="text-blue fs-1 text-nowrap">Questions {i + 1}:</h2>
              <p className="text-blue fs-4">{question}</p>
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
                      <img src={correct} alt="" /> Correct
                    </p>
                  ) : (
                    <p className="d-flex gap-1">
                      {" "}
                      <img src={wrong} alt="" />
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
      <div className="bg-button p-5 rounded-4">
        <h2 className="text-white fs-1">Weekly Report</h2>
        <div className="d-flex gap-4">
          <h2 className="text-gray fs-1 ratio-1x1 bg-aqua rounded-4 p-5 d-flex justify-content-center border border-6 border-blue">
            {score}%
          </h2>
          <p className="text-white">
            {score < 41
              ? "It looks like you may need more practice understanding compassion. Take time to reflect on how you can be more empathetic and caring toward others."
              : score < 61
              ? "Good effort! You’re on the right track, but revisiting some aspects of showing compassion could help you improve further."
              : score < 100
              ? "Well done! You have a strong grasp of compassion, though there are some areas where you could practice being more mindful of others' needs."
              : score === 100
              ? "Fantastic! Your answers show a deep understanding of compassion and how to apply it in different situations. Keep up the great work!"
              : ""}
          </p>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        closeModal={handleModalClose}
        data={modalData}
        handleSubmit={submitFeedback}
      />
    </>
  );
}

export default Week3;
