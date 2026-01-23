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
import schoolService from "../../../../../../../../services/api/school.js";
import userService from "../../../../../../../../services/api/user.js";
import adminService from "../../../../../../../../services/api/admin.js";
import { calculateResult } from "../../../utility.js";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer.js";
import Modal from "../../components/Modal.jsx";

function Week1({ enrollmentId, setWeekOneData, isSchool, studentId }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [activityFeedbackId, setActivityFeedbackId] = useState(null);
  const { pages } = getWeekContentExcludingVideos(1);

  const [activity1, activity2, activity3, activity4, activity5, activity6] =
    pages;
  const [activityData, setActivityData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);
  const { isAdmin, code } = useSelector(adminData);

  // const [q1, q2, q3] = activity1.steps;
  // const [f1, f2, f3] = activityData?.[0]?.feedback?.map((a) => a.value) || [];

  const [Q1, Q2] = activity4.steps;
  const [F1, F2] = activityData?.[3]?.feedback?.map((a) => a.value) || [];
  const { questions: assessments } = getWeekAssessment(1);
  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/emotional-regulation-feedback-1", enrollmentId, 1],
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

  function drag1(type) {
    if (!activityData || !activityData[3] || !activityData[3].answer) return [];

    const indices =
      type === "growth"
        ? activityData[3]?.answer?.[0]?.value?.green
        : activityData[3]?.answer?.[0]?.value?.red

    // console.log(indices, "Indices")

    // console.log(activity2,"Activity 2")
    return indices?.map((index) => activity4?.steps?.[1].images[index]) || [];
  }

  function challengeTable(type) {
    // console.log(activityData, "Activity Data")
    if (!activityData || !activityData[4] || !activityData[4]?.answer) return [];

    const data =
      type === "challenge"
        ? activityData[4]?.answer.map(item => item?.value[0])
        : activityData[4]?.answer.map(item => item?.value[1])

    return data || [];
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
        <p className="text-blue fs-md-4">{activity1.question} "Resilience"?</p>
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

      {/* Activity 2 */}
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 2
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>
        <p className="text-blue fs-md-4">{activity2.question}</p>
      </div>

      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answer:</h2>
        <ul className="list-unstyled fs-md-2 flex-grow-1">
          {getActivityAnswer(activity2.id)?.map((item, idx) => (
            <li key={idx} className="text-lg">
              {idx + 1}. {item.value}
            </li>
          ))}
        </ul>

        {
          //This is only Visible for Flow Admins
          isAdmin &&
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
          )
        }
      </div>

      {
        // Show this only id theres a feedback
        activityData?.find((activity) => activity.page === activity2.id)
          ?.feedback && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-1 px-md-3 fs-md-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-1 p-md-2 rounded">
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
      {/* Activity 3 */}
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 3
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>
        <p className="text-blue fs-md-4">{activity3.question} "Grit"?</p>
      </div>

      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answers:</h2>
        <p className="fs-md-5 flex-grow-1">{getActivityAnswer(activity3.id)}</p>
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
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 4
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>
        <p className="text-blue fs-md-4">You will be presented with four (4) scenarios and you are expected to drag and drop the scenarios to either resilience or grit.</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answers:</h2>
        <div className="flex-grow-1 d-flex">
          <div className="flex-grow-1">
            <h2 className="text-center bg-green text-white py-md-3 py-1 fs-md-1">
              Resilience
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
            <h2 className="bg-orange text-center text-white py-md-3 py-1 fs-md-1">
              Grit
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
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-1 p-md-2 rounded">
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


      {/* Activity 5 */}
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-md-4">
        Activity 5
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>
        <p className="text-blue fs-md-4">Mention four (4) things you are struggling with and use the power of yet to turn them into things you can still achieve.</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answers:</h2>
        <div className="flex-grow-1 d-flex">
          <div className="flex-grow-1">
            <h2 className="text-center bg-red text-white py-md-3 py-1 fs-md-1">
              Challenges
            </h2>
            <div className="px-2 py-1 px-md-5 py-md-3">
              {challengeTable("challenge")?.map((item, idx) => (
                <p className="fs-md-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-grow-1">
            <h2 className="bg-green text-center text-white py-md-3 py-1 fs-md-1">
              Your YET Statement
            </h2>
            <div className="px-2 py-1 px-md-5 py-md-3">
              {challengeTable("yet")?.map((item, idx) => (
                <p className="fs-md-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
        </div>
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
            <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-1 p-md-2 rounded">
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
                  className="d-flex gap-md-2 p-0 p-md-1 mb-3 justify-content-between"
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

export default Week1;
