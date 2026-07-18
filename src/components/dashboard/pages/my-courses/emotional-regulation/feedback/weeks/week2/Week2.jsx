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
import { useQuery } from "@tanstack/react-query";
import userService from "../../../../../../../../services/api/user.js";
import adminService from "../../../../../../../../services/api/admin.js";
import { calculateResult } from "../../../utility.js";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer.js";
import Modal from "../../components/Modal.jsx";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

function Week2({ enrollmentId, setWeekTwoData }) {
  const { pages } = getWeekContentExcludingVideos(2);
  const [activityData, setActivityData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [activityFeedbackId, setActivityFeedbackId] = useState(null);

  const { isAdmin, code } = useSelector(adminData);

  const { questions: assessments } = getWeekAssessment(2);



  const [activity1, activity2, activity3, activity4] = pages;
  const [q1, q2] = activity3.steps;

  const answers = activityData?.[2]?.answer || [];
  const [a1, a2] = answers;

  const [Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8] = activity4.steps;

  const answers1 = activityData?.[3]?.answer || [];
  const [A1, A2, A3, A4, A5, A6, A7, A8] = answers1;


  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/emotional-regulation-feedback-2", enrollmentId, 2],
    queryFn: () =>
      isAdmin
        ? adminService.getUserCourseData(enrollmentId, 2, code)
        : userService.getUserCourseData(enrollmentId, 2),
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
        2,
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
    setWeekTwoData(true);

    return () => { };
  }, [data]);

  function getActivityAnswer(activityId, itemId) {
    if (!itemId) {
      return activityData?.find((activity) => activity.page === activityId)
        ?.answer;
    } else {
      const answersList = activityData?.find(
        (activity) => activity.page === activityId
      )?.answer;

      const answerObject = answersList?.find(
        (activity) => activity.id === itemId
      )?.value;
      return answerObject ? answerObject : "";
    }
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

  function def(type) {
    if (!activityData || !activityData[1] || !activityData[1].answer) return [];

    const data =
      type === "question"
        ? activity2.steps.filter(item => item.type === "dropdownScenario").map(item => item.question)
        : activityData[1].answer.map(item => item.value);

    return data

    // const items = indices?.map((index) => activity2?.images[index]) || [];

    // // Sort with featured names first
    // return items.sort((a, b) => {
    //   const aFeatured = featuredNames.includes(a);
    //   const bFeatured = featuredNames.includes(b);
    //   if (aFeatured && !bFeatured) return -1;
    //   if (!aFeatured && bFeatured) return 1;
    //   return 0;
    // });
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError) {
    return <div>{data?.message}</div>;
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
        (item) => item.id === activityFeedbackId.itemId
      );

      feedbackData.feedback = value; // Set feedback entry with key as index

      handleModalClose();
      mutation.mutate();
    }
  };

  // Color mapping configuration
  const COLOR_MAP = {
    'A': { bg: '#0d6efd', text: '#ffffff', label: 'Blue' },
    'B': { bg: '#198754', text: '#ffffff', label: 'Green' },
    'C': { bg: '#ffc107', text: '#000000', label: 'Yellow' },
    'D': { bg: '#dc3545', text: '#ffffff', label: 'Red' }
  };

  // Helper function to get color configuration
  const getColorConfig = (value) => {
    return COLOR_MAP[value] || { bg: 'transparent', text: '#000000', label: value };
  };

  // Helper function to render colored answer
  const renderColoredAnswer = (value) => {
    const colors = getColorConfig(value || '');

    return (
      <h2
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          padding: '0px 16px',
          display: 'inline-block',
          width: '120px',
          textAlign: 'center'
        }}
        className="fs-3"
      >
        {colors.label}
      </h2>
    );
  };

  // Helper function to get feedback for activity
  const hasActivityFeedback = (activityData, activityId) => {
    return activityData?.find((activity) => activity.page === activityId)?.feedback;
  };

  // Helper function to render question section
  const renderQuestionSection = (question, answer, activityId, props, sn) => {
    const { activityData, isAdmin, setActivityFeedbackId, handleModalOpen, setModalData, getActivityFeedback } = props;
    const feedback = hasActivityFeedback(activityData, activityId);

    return (
      <>
        <div className="d-flex gap-3">
          <h2 className="text-blue fs-md-1">Questions{sn}:</h2>
          <p className="text-blue fs-md-4">{question}</p>
        </div>

        <div className="d-flex gap-3">
          <h2 className="text-gray fs-md-1">Answers:</h2>
          <p className="fs-md-5 flex-grow-1">
            {renderColoredAnswer(answer?.value)}
          </p>

          {isAdmin && !feedback && (
            <Icon
              onClick={() => {
                setActivityFeedbackId({ activityId });
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
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
              {getActivityFeedback(activityId)}
            </p>
            {isAdmin && (
              <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activityId));
                  setActivityFeedbackId({ activityId });
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
      </>
    );
  };

  // Helper function to render question section
  const renderActivity4QuestionSection = (question, answer, activityId, props, sn) => {
    const { activityData, isAdmin, setActivityFeedbackId, handleModalOpen, setModalData, getActivityFeedback } = props;
    const feedback = hasActivityFeedback(activityData, activityId);

    return (
      <>
        <div className="d-flex gap-3">
          <h2 className="text-blue fs-md-1" style={{ whiteSpace: 'nowrap' }}>Questions {sn}:</h2>
          <p className="text-blue fs-md-4">{question}</p>
        </div>

        <div className="d-flex gap-3 my-2">
          <div className="d-flex flex-column flex-grow-1">
            <div className="d-flex">
              <h2 className="text-gray fs-md-1">Energy Level: </h2>
              <p className="fs-md-5 flex-grow-1 mx-3">
                {renderColoredAnswer(answer?.value?.energyLevel)}
              </p>
            </div>

            <div className="d-flex">
              <h2 className="text-gray fs-md-1">Zone of Regulation: </h2>
              <p className="fs-md-5 flex-grow-1 mx-3">
                {renderColoredAnswer(answer?.value?.zone)}
              </p>
            </div>
          </div>


          {isAdmin && !feedback && (
            <Icon
              onClick={() => {
                setActivityFeedbackId({ activityId });
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
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
              {getActivityFeedback(activityId)}
            </p>
            {isAdmin && (
              <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activityId));
                  setActivityFeedbackId({ activityId });
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
      </>
    );
  };

  const helperProps = {
    activityData,
    isAdmin,
    setActivityFeedbackId,
    handleModalOpen,
    setModalData,
    getActivityFeedback
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
        <p className="text-blue fs-md-4">{activity1.question}</p>
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

      {/* Activity 2  */}
      <p className="bg-yellow py-md-3 px-md-5 py-1 px-2 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 2
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>
        <p className="text-blue fs-md-4">Match the mood to the right Zone</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1">Answers:</h2>

        <div className="d-flex flex-column flex-grow-1">

          {/* Items rows */}
          {Array.from({ length: 4 }).map((_, idx) => {
            const fixedValue = def("fixed")?.[idx];

            // Define color mappings
            const colorMap = {
              'A': { bg: 'bg-primary', text: 'text-white', label: 'Blue' },
              'B': { bg: 'bg-success', text: 'text-white', label: 'Green' },
              'C': { bg: 'bg-warning', text: 'text-dark', label: 'Yellow' },
              'D': { bg: 'bg-danger', text: 'text-white', label: 'Red' }
            };

            const colors = colorMap[fixedValue] || { bg: '', text: '', label: fixedValue };

            return (
              <div key={idx} className="d-flex">
                <div className="col-6 px-md-5 px-2 py-md-3 py-1">
                  <p className="fs-md-4 mb-0">
                    {idx + 1}. {def("question")?.[idx]}
                  </p>
                </div>
                <h2 className="col-6 px-md-5 px-2 py-md-3 py-1 fs-3">
                  <h2 className={`${colors.bg} ${colors.text} px-3 d-inline-block fs-3 text-center`} style={{ width: "120px" }}>
                    {colors.label}
                  </h2>
                </h2>
              </div>
            );
          })}
        </div>

        {isAdmin &&
          !activityData?.find((a) => a.page === activity2.id)?.feedback && (
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


      {/* {
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
      } */}
      <hr />

      {/* Activity 3  */}
      <p className="bg-yellow py-md-3 px-md-5 py-1 px-2 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 3
      </p>
      <hr />
      {renderActivity4QuestionSection(q1.question, a1, activity3.id, helperProps, 1)}
      {renderActivity4QuestionSection(q2.question, a2, activity3.id, helperProps, 2)}


      {/* Activity 3  */}
      <p className="bg-yellow py-md-3 px-md-5 py-1 px-2 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 4
      </p>
      <hr />
      {renderActivity4QuestionSection(Q1.question, A1, activity4.id, helperProps, 1)}
      {renderActivity4QuestionSection(Q2.question, A2, activity4.id, helperProps, 2)}
      {renderActivity4QuestionSection(Q3.question, A3, activity4.id, helperProps, 3)}
      {renderActivity4QuestionSection(Q4.question, A4, activity4.id, helperProps, 4)}
      {renderActivity4QuestionSection(Q5.question, A5, activity4.id, helperProps, 5)}
      {renderActivity4QuestionSection(Q6.question, A6, activity4.id, helperProps, 6)}
      {renderActivity4QuestionSection(Q7.question, A7, activity4.id, helperProps, 7)}
      {renderActivity4QuestionSection(Q8.question, A8, activity4.id, helperProps, 8)}

      {/* Assesment 1 */}
      <p className="bg-yellow py-md-3 px-md-5 py-1 px-2 text-gray d-inline-block rounded-5 fs-md-4">
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
                  className="d-flex gap-md-2 p-1 mb-3 justify-content-between"
                >
                  <div className="d-flex gap-md-2 p-1">
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

export default Week2;
