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
import { useSelector } from "react-redux";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer.js";
import Modal from "../../components/Modal.jsx";
import { useMutation } from "@tanstack/react-query";
import "../../../components/question.css"

function Week4({ enrollmentId, setWeekFourData }) {
  const { pages } = getWeekContentExcludingVideos(4);
  const [activity1, activity2] = pages;
  const [activityData, setActivityData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [activityFeedbackId, setActivityFeedbackId] = useState(null);
  const [assessmentData, setAssessmentData] = useState([]);
  const { isAdmin, code } = useSelector(adminData);

  console.log(activity2, "Activity2")

  console.log(activityData, "Activity Data Week 4");


  const { questions: assessments } = getWeekAssessment(4);
  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/emotional-regulation-feedback-4", enrollmentId, 4],
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
    setWeekFourData(true);

    return () => { };
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
        <p className="text-blue fs-md-4">{activity1.question}?</p>
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
        <p className="text-blue fs-md-4">
          Remember a time when you felt the different emotions mentioned below and identify what you did to feel better.
          After that, classify that behavior as healthy or unhealthy. For instance, if you yelled to feel better, you might have felt better,
          however it doesn’t qualify as a healthy coping skill because it stressed you and others around you. If you listened to music though to feel better,
          it can be classified as a healthy coping skill because it helped you feel better and did not bring further stress to you or those around you.
        </p>
      </div>

      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answer:</h2>


        <div className="container">
          <div className="table-responsive">
            <table className="table table-bordered border border-1 border-secondary">
              <thead>
                <tr>
                  <th
                    className="text-center text-white py-3 px-4 border border-1 border-secondary"
                    style={{ backgroundColor: "#27AE60", width: "25%" }}
                  >
                    <h2 className="mb-0 text-white">Emotion</h2>
                  </th>
                  <th
                    className="text-center text-white py-3 px-4 border border-1 border-secondary"
                    style={{ backgroundColor: "#27AE60", width: "45%" }}
                  >
                    <h2 className="mb-0 text-white">What you did</h2>
                  </th>
                  <th
                    className="text-center text-white py-3 px-4 border border-1 border-secondary"
                    style={{ backgroundColor: "#27AE60", width: "30%" }}
                  >
                    <h2 className="mb-0 text-white">Healthy/Unhealthy</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                {['Sad', 'Excited', 'Frustrated', 'Bored', 'Angry', 'Overwhelmed'].map((emotion) => {
                  const healthStatus = activityData[1]?.answer[0]?.value[`${emotion}_healthStatus`];
                  const action = activityData[1]?.answer[0]?.value[`${emotion}_whatYouDid`];

                  return (
                    <tr key={emotion}>
                      <td className="align-middle py-3 px-4 border-bottom border border-1 border-secondary">
                        <h2 className="text-gray fs-3">{emotion}</h2>
                      </td>
                      <td className="align-middle py-3 px-4 border-bottom border border-1 border-secondary">
                        <h2 className="text-gray fs-3">{action || '-'}</h2>
                      </td>
                      <td className="align-middle py-3 px-4 border-bottom border border-1 border-secondary">
                        <h2 className="text-gray fs-3">{healthStatus || '-'}</h2>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        </div>
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

export default Week4;
