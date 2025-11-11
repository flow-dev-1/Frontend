import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import unCheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import correct from "../../../../../../../../assets/correct.png";
import wrong from "../../../../../../../../assets/wrong.png";
import {
  getWeekAssessment,
  getWeekContentExcludingVideos,
  getWeekPreAssessment,
} from "../../../data/index.js";
import { useQuery } from "@tanstack/react-query";
import userService from "../../../../../../../../services/api/user.js";
import adminService from "../../../../../../../../services/api/admin.js";
import { calculateResult } from "../../../utility.js";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer.js";
import Modal from "../../components/Modal.jsx";
import { useMutation } from "@tanstack/react-query";

function Week4({ enrollmentId, setWeekFourData }) {
  const { pages } = getWeekContentExcludingVideos(4);
  const [_, activity1, activity2, activity3, activity4] = pages;
  const [activityData, setActivityData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [activityFeedbackId, setActivityFeedbackId] = useState(null);
  const [assessmentData, setAssessmentData] = useState([]);
  const [preAssessmentData, setPreAssessmentData] = useState([]);
  const { isAdmin, code } = useSelector(adminData);

  const { questions: assessments } = getWeekAssessment(4);
  const { questions: preAssessments } = getWeekPreAssessment(4);

  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/tot-feedback-4", enrollmentId, 4],
    queryFn: () =>
      isAdmin
        ? adminService.getUserCourseData(enrollmentId, 4, code)
        : userService.getUserCourseData(enrollmentId, 4),
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
        4,
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

  useEffect(() => {
    if (!data) return;

    setActivityData(data.activity?.activities);
    setAssessmentData(data.assessment?.assessments);
    setPreAssessmentData(
      data.activity?.activities.find((p) => p.page == 2).answer
    );
    setWeekFourData(true);

    return () => {};
  }, [data]);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setActivityFeedbackId(null);
    setShowModal(false);
  };

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

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError) {
    return <div>{data?.message || "Internal server error!"}</div>;
  }

  function drag1(type) {
    console.log(activityData, "Activity Data");

    if (
      !activityData ||
      !Array.isArray(activityData) ||
      !activityData[1]?.answer?.[0]?.value
    ) {
      return [];
    }

    const values = activityData[1].answer[0].value;
    const indices = type === "growth" ? values.green : values.red;

    if (!Array.isArray(indices) || !activity1?.steps?.[1]?.images) return [];

    return indices
      .map((index) => activity1.steps[1].images[index])
      .filter(Boolean);
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
      {/* PreAssesment 1 */}
      <p className="bg-blue py-1 px-1 py-md-3 px-md-2 text-white d-inline-block rounded-5 fs-md-4">
        Pre-Assessment
      </p>
      <hr />
      {preAssessments.map(({ id, question, options, correctOption }, i) => {
        // todo:  fetch preassesment data from backend and switch
        const selectedAnswer = Array.isArray(preAssessmentData)
          ? preAssessmentData.find((answer) => answer.id === id)?.value
          : undefined;
        return (
          <>
            <div className="d-flex gap-3" key={i}>
              <p
                className="text-blue fs-md-1 text-nowrap week-2-question-text fw-bold"
                style={{ fontSize: 1 + "em" }}
              >
                Questions {i + 1}:
              </p>
              <p
                className="text-blue fs-md-4 week-2-question-text"
                style={{ fontSize: 1 + "em" }}
              >
                {question}
              </p>
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
                  className="d-flex gap-md-2 p-0 p-md-1 mb-3 justify-content-between"
                >
                  <div className="d-flex gap-md-2 p-1">
                    <img
                      src={isAnswer ? checkedImage : unCheckedImage}
                      alt={`Option ${optionKey}`}
                      style={{ width: 20, height: 20 }}
                    />
                    <div
                      className="week-2-question-text text-gray"
                      style={{ fontSize: 1 + "em" }}
                    >{`${optionText}. ${option.text}`}</div>
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

      {/* Activity 1 */}
      <p className="bg-blue py-md-3 px-md-5 py-1 px-2 text-white d-inline-block rounded-5 fs-md-4">
        Activity 1
      </p>
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {[activity1.steps[0].instruction].map((text) => (
          <>
            <span className="text-gray">{text}</span>
            <br />
          </>
        ))}
      </p>
      <hr />
      <div className="d-flex gap-3">
        <p
          className="text-blue fs-md-1 week-2-question-text fw-bold"
          style={{ fontSize: 1 + "em" }}
        >
          Questions 1:
        </p>
        <p
          className="text-blue fs-md-4 week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          {activity1.steps[1].instruction}
        </p>
      </div>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <div className="flex-grow-1 d-flex">
          <div className="flex-grow-1">
            <p
              className="text-center bg-green text-white py-md-3 py-1 fs-md-1 week-2-question-text"
              style={{ fontSize: 1 + "em" }}
            >
              Growth Mindset
            </p>
            <div className="px-2 py-1 px-md-5 py-md-3">
              {drag1("growth")?.map((item, idx) => (
                <p className="fs-md-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-grow-1">
            <p
              className="bg-red text-center text-white py-md-3 py-1 fs-md-1 week-2-question-text"
              style={{ fontSize: 1 + "em" }}
            >
              Fixed Mindset
            </p>
            <div className="px-2 py-1 px-md-5 py-md-3">
              {drag1("fixed")?.map((item, idx) => (
                <p className="fs-md-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {
          //This is only Visible for Flow Admins
          isAdmin &&
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
            )
        }
      </div>
      {
        // Show this only id theres a feedback
        activityData?.find((activity) => activity.page === activity1.id)
          ?.feedback && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-1 p-md-2 rounded">
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
      <div className="d-flex gap-3">
        <p
          className="text-blue fs-md-1 week-2-question-text fw-bold"
          style={{ fontSize: 1 + "em" }}
        >
          Question 2:
        </p>
        <p
          className="text-blue fs-md-4 week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          {activity1.steps[2].question}
        </p>
      </div>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const answers = getActivityAnswer(activity1.id);
            if (!Array.isArray(answers) || !answers[1] || !answers[1].value)
              return "";
            return answers[1].value;
          })()}
        </p>

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
      <hr />

      {/* Activity 2 */}
      <p className="bg-blue py-md-3 px-md-5 py-1 px-2 text-white d-inline-block rounded-5 fs-md-4">
        Activity 2
      </p>
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[0].instructions.map((text) => (
          <>
            <span className="text-gray">{text}</span>
            <br />
          </>
        ))}
      </p>
      <hr />
      <div className="d-flex gap-3">
        <p
          className="text-blue fs-md-1 week-2-question-text fw-bold"
          style={{ fontSize: 1 + "em" }}
        >
          Scenario 1:
        </p>
        <p
          className="text-blue fs-md-4 week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          {activity2.steps[1].boxes[4].text}
        </p>
      </div>
      <hr />
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[1].boxes[4].questions[0].question}{" "}
        {activity2.steps[1].boxes[4].questions[0].subQuestion}
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const data = getActivityAnswer(activity2.id);
            if (!data || typeof data !== "object") return "";
            if (!data["1"] || typeof data["1"] !== "object") return "";
            return data["1"]["1"] ?? "";
          })()}
        </p>

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
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <hr />
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[1].boxes[4].questions[1].question}{" "}
        {activity2.steps[1].boxes[4].questions[1].subQuestion}
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const data = getActivityAnswer(activity2.id);
            if (!data || typeof data !== "object") return "";
            if (!data["1"] || typeof data["1"] !== "object") return "";
            return data["1"]["2"] ?? "";
          })()}
        </p>
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
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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

      <hr />
      <div className="d-flex gap-3">
        <p
          className="text-blue fs-md-1 week-2-question-text fw-bold"
          style={{ fontSize: 1 + "em" }}
        >
          Scenario 2:
        </p>

        <p
          className="text-blue fs-md-4 week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          {activity2.steps[1].boxes[3].text}
        </p>
      </div>
      <hr />
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[1].boxes[3].questions[0].question}{" "}
        {activity2.steps[1].boxes[3].questions[0].subQuestion}
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const data = getActivityAnswer(activity2.id);
            if (!data || typeof data !== "object") return "";
            if (!data["2"] || typeof data["2"] !== "object") return "";
            return data["2"]["1"] ?? "";
          })()}
        </p>
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
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <hr />
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[1].boxes[3].questions[1].question}{" "}
        {activity2.steps[1].boxes[3].questions[1].subQuestion}
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const data = getActivityAnswer(activity2.id);
            if (!data || typeof data !== "object") return "";
            if (!data["2"] || typeof data["2"] !== "object") return "";
            return data["2"]["2"] ?? "";
          })()}
        </p>
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
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <hr />
      <div className="d-flex gap-3">
        <p
          className="text-blue fs-md-1 week-2-question-text fw-bold"
          style={{ fontSize: 1 + "em" }}
        >
          Scenario 3:
        </p>

        <p
          className="text-blue fs-md-4 week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          {activity2.steps[1].boxes[2].text}
        </p>
      </div>
      <hr />
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[1].boxes[2].questions[0].question}{" "}
        {activity2.steps[1].boxes[2].questions[0].subQuestion}
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const data = getActivityAnswer(activity2.id);
            if (!data || typeof data !== "object") return "";
            if (!data["3"] || typeof data["3"] !== "object") return "";
            return data["3"]["1"] ?? "";
          })()}
        </p>
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
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <hr />
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[1].boxes[2].questions[1].question}{" "}
        {activity2.steps[1].boxes[2].questions[1].subQuestion}
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const data = getActivityAnswer(activity2.id);
            if (!data || typeof data !== "object") return "";
            if (!data["3"] || typeof data["3"] !== "object") return "";
            return data["3"]["2"] ?? "";
          })()}
        </p>
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
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <hr />
      <div className="d-flex gap-3">
        <p
          className="text-blue fs-md-1 week-2-question-text fw-bold"
          style={{ fontSize: 1 + "em" }}
        >
          Scenario 4:
        </p>

        <p
          className="text-blue fs-md-4 week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          {activity2.steps[1].boxes[1].text}
        </p>
      </div>
      <hr />
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[1].boxes[1].questions[0].question}{" "}
        {activity2.steps[1].boxes[1].questions[0].subQuestion}
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const data = getActivityAnswer(activity2.id);
            if (!data || typeof data !== "object") return "";
            if (!data["4"] || typeof data["4"] !== "object") return "";
            return data["4"]["1"] ?? "";
          })()}
        </p>
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
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <hr />
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[1].boxes[1].questions[1].question}{" "}
        {activity2.steps[1].boxes[1].questions[1].subQuestion}
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const data = getActivityAnswer(activity2.id);
            if (!data || typeof data !== "object") return "";
            if (!data["4"] || typeof data["4"] !== "object") return "";
            return data["4"]["2"] ?? "";
          })()}
        </p>
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
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <hr />
      <div className="d-flex gap-3">
        <p
          className="text-blue fs-md-1 week-2-question-text fw-bold"
          style={{ fontSize: 1 + "em" }}
        >
          Scenario 5:
        </p>

        <p
          className="text-blue fs-md-4 week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          {activity2.steps[1].boxes[0].text}
        </p>
      </div>
      <hr />
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[1].boxes[0].questions[0].question}{" "}
        {activity2.steps[1].boxes[0].questions[0].subQuestion}
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const data = getActivityAnswer(activity2.id);
            if (!data || typeof data !== "object") return "";
            if (!data["5"] || typeof data["5"] !== "object") return "";
            return data["5"]["1"] ?? "";
          })()}
        </p>
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
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <hr />
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity2.steps[1].boxes[0].questions[1].question}{" "}
        {activity2.steps[1].boxes[0].questions[1].subQuestion}
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const data = getActivityAnswer(activity2.id);
            if (!data || typeof data !== "object") return "";
            if (!data["5"] || typeof data["5"] !== "object") return "";
            return data["5"]["2"] ?? "";
          })()}
        </p>
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
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <hr />

      {/* Activity 3*/}
      <p className="bg-blue py-md-3 px-md-5 py-1 px-2 text-white d-inline-block rounded-5 fs-md-4">
        Activity 3
      </p>
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {activity3.steps[0].instructions.map((text) => (
          <>
            <span className="text-gray">{text}</span>
            <br />
          </>
        ))}
      </p>
      <hr />
      <p
        className="text-blue fs-md-1 week-2-question-text fw-bold"
        style={{ fontSize: 1 + "em" }}
      >
        Example:
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-white bg-orange rounded-3 px-4 fs-md-1 text-gray week-2-question-text mb-3"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Statement
        </p>
        <p className="fs-md-5 flex-grow-1">
          {activity3.steps[1].questions[0].question}
        </p>
      </div>
      <div className="d-flex gap-3">
        <p
          className="text-white bg-green rounded-3 px-4 fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Reframe
        </p>
        <p className="fs-md-5 flex-grow-1">
          I can see how much effort you put into solving that problem!
        </p>
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
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <p
        className="text-blue fs-md-1 week-2-question-text fw-bold"
        style={{ fontSize: 1 + "em" }}
      >
        Scenario 1:
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-white bg-orange rounded-3 px-4 fs-md-1 text-gray week-2-question-text mb-3"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Statement
        </p>
        <p className="fs-md-5 flex-grow-1">
          {activity3.steps[2].questions[0].question}
        </p>
      </div>
      <div className="d-flex gap-3">
        <p
          className="text-white bg-green rounded-3 px-4 fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Reframe
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const answers = getActivityAnswer(activity3.id);
            if (!Array.isArray(answers) || !answers[0] || !answers[0].reframe)
              return "";
            return answers[0].reframe;
          })()}
        </p>
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
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <p
        className="text-blue fs-md-1 week-2-question-text fw-bold"
        style={{ fontSize: 1 + "em" }}
      >
        Scenario 2:
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-white bg-orange rounded-3 px-4 fs-md-1 text-gray week-2-question-text mb-3"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Statement
        </p>
        <p className="fs-md-5 flex-grow-1">
          {activity3.steps[3].questions[0].question}
        </p>
      </div>
      <div className="d-flex gap-3">
        <p
          className="text-white bg-green rounded-3 px-4 fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Reframe
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const answers = getActivityAnswer(activity3.id);
            if (!Array.isArray(answers) || !answers[1] || !answers[1].reframe)
              return "";
            return answers[1].reframe;
          })()}
        </p>
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
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <p
        className="text-blue fs-md-1 week-2-question-text fw-bold"
        style={{ fontSize: 1 + "em" }}
      >
        Scenario 3:
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-white bg-orange rounded-3 px-4 fs-md-1 text-gray week-2-question-text mb-3"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Statement
        </p>
        <p className="fs-md-5 flex-grow-1">
          {activity3.steps[4].questions[0].question}
        </p>
      </div>
      <div className="d-flex gap-3">
        <p
          className="text-white bg-green rounded-3 px-4 fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Reframe
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const answers = getActivityAnswer(activity3.id);
            if (!Array.isArray(answers) || !answers[2] || !answers[2].reframe)
              return "";
            return answers[2].reframe;
          })()}
        </p>
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
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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
      <p
        className="text-blue fs-md-1 week-2-question-text fw-bold"
        style={{ fontSize: 1 + "em" }}
      >
        Scenario 4:
      </p>
      <div className="d-flex gap-3">
        <p
          className="text-white bg-orange rounded-3 px-4 fs-md-1 text-gray week-2-question-text mb-3"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Statement
        </p>
        <p className="fs-md-5 flex-grow-1">
          {activity3.steps[5].questions[0].question}
        </p>
      </div>
      <div className="d-flex gap-3">
        <p
          className="text-white bg-green rounded-3 px-4 fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Reframe
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const answers = getActivityAnswer(activity3.id);
            if (!Array.isArray(answers) || !answers[3] || !answers[3].reframe)
              return "";
            return answers[3].reframe;
          })()}
        </p>
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
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
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

      {/* Activity 4 */}
      <p className="bg-blue py-md-3 px-md-5 py-1 px-2 text-white d-inline-block rounded-5 fs-md-4">
        Activity 4
      </p>
      <p
        className="text-gray fs-md-4 week-2-question-text"
        accordion
        style={{ fontSize: 1 + "em" }}
      >
        {[activity1.steps[0].instructions].map((text) => (
          <>
            <span className="text-gray">{text}</span>
            <br />
          </>
        ))}
      </p>
      <hr />
      <div className="d-flex gap-3">
        <p
          className="text-blue fs-md-1 week-2-question-text fw-bold"
          style={{ fontSize: 1 + "em" }}
        >
          Question 1:
        </p>
        <p
          className="text-blue fs-md-4 week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          {activity4.steps[1].questions[0].question}
        </p>
      </div>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const answers = getActivityAnswer(activity4.id);
            if (!Array.isArray(answers) || !answers[0] || !answers[0].value)
              return "";
            return answers[0].value;
          })()}
        </p>
        {isAdmin &&
          !activityData?.find((activity) => activity.page === activity4.id)
            ?.feedback && (
            <Icon
              onClick={() => {
                setActivityFeedbackId({ activityId: activity4.id });
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
        activityData?.find((activity) => activity.page === activity4.id)
          ?.feedback && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
              {getActivityFeedback(activity4.id)}
            </p>
            {isAdmin && (
              <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity4.id));
                  setActivityFeedbackId({ activityId: activity4.id });
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
      <div className="d-flex gap-3">
        <p
          className="text-blue fs-md-1 week-2-question-text fw-bold"
          style={{ fontSize: 1 + "em" }}
        >
          Question 2:
        </p>
        <p
          className="text-blue fs-md-4 week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          {activity4.steps[2].questions[0].question}
        </p>
      </div>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const answers = getActivityAnswer(activity4.id);
            if (!Array.isArray(answers) || !answers[1] || !answers[1].value)
              return "";
            return answers[1].value;
          })()}
        </p>
        {isAdmin &&
          !activityData?.find((activity) => activity.page === activity4.id)
            ?.feedback && (
            <Icon
              onClick={() => {
                setActivityFeedbackId({ activityId: activity4.id });
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
        activityData?.find((activity) => activity.page === activity4.id)
          ?.feedback && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
              {getActivityFeedback(activity4.id)}
            </p>
            {isAdmin && (
              <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity4.id));
                  setActivityFeedbackId({ activityId: activity4.id });
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
      <div className="d-flex gap-3">
        <p
          className="text-blue fs-md-1 week-2-question-text fw-bold"
          style={{ fontSize: 1 + "em" }}
        >
          Question 3:
        </p>
        <p
          className="text-blue fs-md-4 week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          {activity4.steps[3].questions[0].question}
        </p>
      </div>
      <div className="d-flex gap-3">
        <p
          className="text-gray fs-md-1 text-gray week-2-question-text"
          accordion
          style={{ fontSize: 1 + "em" }}
        >
          Answers:
        </p>
        <p className="fs-md-5 flex-grow-1">
          {(() => {
            const answers = getActivityAnswer(activity4.id);
            if (!Array.isArray(answers) || !answers[2] || !answers[2].value)
              return "";
            return answers[2].value;
          })()}
        </p>
        {isAdmin &&
          !activityData?.find((activity) => activity.page === activity4.id)
            ?.feedback && (
            <Icon
              onClick={() => {
                setActivityFeedbackId({ activityId: activity4.id });
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
        activityData?.find((activity) => activity.page === activity4.id)
          ?.feedback && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
              {getActivityFeedback(activity4.id)}
            </p>
            {isAdmin && (
              <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity4.id));
                  setActivityFeedbackId({ activityId: activity4.id });
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

      <hr />
      {/* Assesment 1 */}
      <p className="bg-blue py-1 px-1 py-md-3 px-md-2 text-white d-inline-block rounded-5 fs-md-4">
        Post-Assessment
      </p>
      <hr />
      {assessments.map(({ id, question, options, correctOption }, i) => {
        const selectedAnswer = assessmentData?.find(
          (answer) => answer.id === id
        )?.value;
        return (
          <>
            <div className="d-flex gap-3" key={i}>
              <p
                className="text-blue fs-md-1 text-nowrap week-2-question-text fw-bold"
                style={{ fontSize: 1 + "em" }}
              >
                Questions {i + 1}:
              </p>
              <p
                className="text-blue fs-md-4 week-2-question-text"
                style={{ fontSize: 1 + "em" }}
              >
                {question}
              </p>
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
                  className="d-flex gap-md-2 p-0 p-md-1 mb-3 justify-content-between"
                >
                  <div className="d-flex gap-md-2 p-1">
                    <img
                      src={isAnswer ? checkedImage : unCheckedImage}
                      alt={`Option ${optionKey}`}
                      style={{ width: 20, height: 20 }}
                    />
                    <div
                      className="week-2-question-text text-gray"
                      style={{ fontSize: 1 + "em" }}
                    >{`${optionText}. ${option.text}`}</div>
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

export default Week4;
