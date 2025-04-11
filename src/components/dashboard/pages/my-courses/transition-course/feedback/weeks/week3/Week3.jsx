import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import checkedImage from "../../../../../../../../assets/checkedbox.png";
import unCheckedImage from "../../../../../../../../assets/uncheckedBox.png";
import correct from "../../../../../../../../assets/correct.png";
import wrong from "../../../../../../../../assets/wrong.png";
import {
  getWeekAssessment,
  getWeekContentExcludingVideos,
} from "../../../../transition-course/data/index.js";
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

    return () => { };
  }, [data]);

  const [q1, q2, q3, q4, q5] = activity3.steps;
  const [a1, a2, a3, a4, a5] = activityData?.[2]?.answer?.map(a => a.value) || [];

  function getActivityAnswer(activityId) {
    return activityData?.find((activity) => activity.page === activityId)
      ?.answer;
  }

  function getActivityFeedback(activityId) {
    return activityData?.find((activity) => activity.page === activityId)?.feedback;

  }

  const mutation = useMutation({
    mutationFn: () => adminService.submitAdminFeedback(activityData, enrollmentId, 3, data?.activity?.user, code),
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

  function drag1(type) {
    if (!activityData || !activityData[1] || !activityData[1].answer) return [];

    const indices =
      type === "growth"
        ? activityData[1].answer.green
        : activityData[1].answer.red;


    // console.log(indices, "Indices")

    // console.log(activity2,"Activity 2")
    return indices?.map((index) => activity2?.images[index]) || [];
  }


  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError) {
    return <div>{data?.message || "Internal server error!"}</div>;
  }

  const score =
    calculateResult(assessments, assessmentData, assessments?.length) || 0;

  const renderActivity3 = (question, answer, activityId, index) => {
    return (
      <div key={index}>
      <div className="d-flex gap-3 align-items-center">
        <h2 className="text-blue fs-1">Questions {index + 1}:</h2>
        <p className="text-blue fs-4 mb-0">{question.title}</p>
      </div>

      <div>
        <span className="bg-green rounded-3 text-white px-3 py-1">
        Within your control:
        </span>
      </div>

      <div className="d-flex gap-3 align-items-center">
        <h2 className="text-gray fs-1 mb-0">Answer:</h2>
        <p className="fs-5 flex-grow-1 mb-0">{answer?.[0]}</p>
        {(isAdmin && !activityData?.find(activity =>
        activity.page === activityId)?.feedback) && (
          <Icon
          onClick={() => {
            setActivityFeedbackId({ activityId })
            handleModalOpen()
          }}
          style={{ color: "#D6D6D6" }}
          width={35}
          icon="tabler:message-2"
          />
        )}
      </div>

      <div>
        <span className="bg-orange rounded-3 text-muted px-3 py-1">
        Outside your control:
        </span>
      </div>

      <div className="d-flex gap-3 align-items-center">
        <h2 className="text-gray fs-1 mb-0">Answer:</h2>
        <p className="fs-5 flex-grow-1 mb-0">{answer?.[1]}</p>
      </div>

      {activityData?.find(activity =>
        activity.page === activityId)?.feedback && (
        <div className="d-flex gap-3">
          <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start mb-0">
          Feedback
          </p>
          <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded mb-0">
          {getActivityFeedback(activityId)}
          </p>
          {isAdmin && (
          <Icon
            onClick={() => {
            setModalData(getActivityFeedback(activityId))
            setActivityFeedbackId({ activityId })
            handleModalOpen()
            }}
            style={{ color: "#275DAD" }}
            width={35}
            icon="lucide:edit"
          />
          )}
        </div>
        )}
      </div>
    )
  }

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
        {
          (isAdmin && !activityData?.find((activity) => activity.page === activity1.id)?.feedback) && <Icon
            onClick={() => {
              setActivityFeedbackId({ activityId: activity1.id })
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
        (activityData?.find((activity) => activity.page === activity1.id)
          ?.feedback) && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
              {getActivityFeedback(activity1.id)}
            </p>
            {
              isAdmin && <Icon
                onClick={() => {
                  setModalData(getActivityFeedback(activity1.id))
                  setActivityFeedbackId({ activityId: activity1.id })
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

      {/* Activity 2  */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 2
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{activity2.instruction}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <div className="flex-grow-1 d-flex">
          <div className="flex-grow-1">
            <h2 className="text-center bg-green text-white py-3 fs-1">
              Inner Circle
            </h2>
            <div className="px-5 py-3">
              {drag1("growth")?.map((item, idx) => (
                <p className="fs-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-grow-1">
            <h2 className="bg-orange text-center text-white py-3 fs-1">
              Outer Circle
            </h2>
            <div className="px-5 py-3">
              {drag1("fixed")?.map((item, idx) => (
                <p className="fs-4">
                  {idx + 1}. {item}
                </p>
              ))}
            </div>
          </div>
        </div>
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

      {/* /* Activity 3  */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 3
      </p>
      <hr />
      <>

        {[q1, q2, q3, q4, q5].map((question, index) =>
          renderActivity3(
            question,
            [a1, a2, a3, a4, a5][index],
            activity3.id,
            index
          )
        )}

      </>
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
            {score < 40
              ? "Well done on starting your journey toward a smooth transition into secondary school! You’ve made an effort to understand important ideas like understanding your “why,” identifying what’s in your control, and the importance of values. There’s still room to deepen your understanding and practice what you’ve learned. Focus on building small habits, like managing your time more effectively or thinking about how a growth mindset can help you face challenges. Remember, every step you take brings you closer to feeling confident and ready for this new chapter. Keep trying—you’re capable of great things! Also, I recommend you take the course again from the beginning, as this will help you get more familiar with the concepts."
              : score < 60
                ? "Good job! You’ve made solid progress and shown a great understanding of how to transition into secondary school successfully. To build on this, try putting what you’ve learned into action more consistently. Practice navigating relationships with friends and family, and reflect on how your core values can guide your decisions. With steady effort, you’ll become even more prepared for this exciting new stage. Keep going—you’re on the right track!"
                : score < 80
                  ? "Great work! You’ve proven to have gained a good understanding of the key concepts that will help you navigate the exciting transition from primary to secondary school. You can start applying ideas like cultivating a growth mindset, focusing on what’s within your control, and understanding your core values. To build on this progress, try practicing these lessons in your daily life—whether it’s managing your time, setting goals, or building meaningful relationships. With consistent effort, you’ll feel more confident and ready to take on this new chapter. Keep it up—you’re doing well!"
                  : score < 95
                    ? "Excellent job! You’ve shown a strong grasp of the skills and mindset needed to transition smoothly into secondary school. Remember it’s highly important to keep applying what you’ve learned about time management, goal setting, and resilience in every way you can. To continue growing, focus on using these tools to face new challenges and opportunities everyday. Your hard work is paying off, and you’re well on your way to thriving in secondary school. Keep up the fantastic progress!"
                    : score <= 100
                      ? "Outstanding achievement! You’ve shown mastery and a deep understanding of the skills and mindset to navigate your transition into secondary school with confidence and purpose. Your understanding of growth and fixed mindsets, time management, and resilience is exceptional, and you’ve shown you can apply these concepts to real-life situations. You’re not only ready for this new stage but also equipped to make the most of it. Keep inspiring others with your example, and continue using these tools to grow and succeed in every area of your life. Well done—you’re ready to shine in secondary school!"
                      : ""}
          </p>
        </div>
        <Modal
          isOpen={showModal}
          closeModal={handleModalClose}
          data={modalData}
          handleSubmit={submitFeedback} />
      </div>
    </>
  );
}

export default Week3;
