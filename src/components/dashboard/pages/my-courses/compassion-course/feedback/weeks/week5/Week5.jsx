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
import { calculateResult } from "../../../utility.js";

function Week5({ enrollmentId, setShowModal, setWeekFiveData }) {
  const { pages } = getWeekContentExcludingVideos(5);
  const [acitivity1] = pages;
  const [q1, q2, q3, q4, q5, q6, q7, q8] = acitivity1.scenarios;
  const [activityData, setActivityData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);

  const { questions: assessments } = getWeekAssessment(5);

  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/compassion-feedback-5", enrollmentId, 5],
    queryFn: () => userService.getUserCourseData(enrollmentId, 5),
    enabled: !!enrollmentId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  useEffect(() => {
    if (!data) return;

    setActivityData(data.activity?.activities);
    setAssessmentData(data.assessment?.assessments);
    setWeekFiveData(true);

    return () => {};
  }, [data]);

  function getActivityAnswer(item) {
    const actData = activityData[0]?.answer;
    const userAnswer = actData?.find(
      (activity) => activity.id === item?.id
    )?.value;

    return item?.options?.find((data) => data.id === userAnswer)?.text;
  }

  function getActivityFeedback(item) {
    const actData = activityData[0]?.answer;
    const userAnswer = actData?.find(
      (activity) => activity.id === item?.id - 1
    )?.value;
    return item?.feedback[userAnswer];
  }

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
      {/* Activity 1*/}
      <p className="bg-yellow py-1 px-2 py-md-3 px-md-5 text-gray d-inline-block rounded-5 fs-md-4">
        Activity 1
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>
        <p className="text-blue fs-md-4">{q1.question}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answers:</h2>
        <p className="fs-md-5 flex-grow-1">{getActivityAnswer(q1)}</p>
        {/* <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#D6D6D6" }} width={35} icon="tabler:message-2" /> */}
      </div>
      <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-2 px-md-3 fs-md-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
          {getActivityFeedback(q2)}
        </p>
        {/* <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#275DAD" }} width={35} icon="lucide:edit" /> */}
      </div>

      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>
        <p className="text-blue fs-md-4">{q3.question}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answers:</h2>
        <p className="fs-md-5 flex-grow-1">{getActivityAnswer(q3)}</p>
        {/* <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#D6D6D6" }} width={35} icon="tabler:message-2" /> */}
      </div>
      <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-2 px-md-3 fs-md-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
          {getActivityFeedback(q4)}
        </p>
        {/* <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#275DAD" }} width={35} icon="lucide:edit" /> */}
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>
        <p className="text-blue fs-md-4">{q5.question}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answers:</h2>
        <p className="fs-md-5 flex-grow-1">{getActivityAnswer(q5)}</p>
        {/* <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#D6D6D6" }} width={35} icon="tabler:message-2" /> */}
      </div>
      <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-2 px-md-3 fs-md-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
          {getActivityFeedback(q6)}
        </p>
        {/* <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#275DAD" }} width={35} icon="lucide:edit" /> */}
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-md-1">Questions:</h2>
        <p className="text-blue fs-md-4">{q7.question}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-md-1 text-gray">Answers:</h2>
        <p className="fs-md-5 flex-grow-1">{getActivityAnswer(q7)}.</p>
        {/* <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#D6D6D6" }} width={35} icon="tabler:message-2" /> */}
      </div>
      <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-2 px-md-3 fs-md-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-md-5 flex-grow-1 p-md-2 p-1 rounded">
          {getActivityFeedback(q8)}
        </p>
        {/* <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#275DAD" }} width={35} icon="lucide:edit" /> */}
      </div>

      <hr />

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
            {score < 41
              ? "It looks like you’re having some difficulty grasping the concepts of compassion and boundaries. You can take some time to review the concepts, and think about how you can show compassion in everyday situations while protecting your own well-being. Also, feel free to ask your teacher for help and email us if you have any questions."
              : score < 61
              ? "Good effort! You understand the basics of Compassion and I see more room for improvements. So, you can speak with your teacher to allow you to go through the course again and also search out more resources to help you understand compassion and boundaries better. Also, feel free to email us if you have any questions."
              : score < 100
              ? "Great job! You mostly understand Compassion, and you’ve done a great job coming this far. At your convenience, you can review the concepts again and feel free to email us if you have any questions."
              : score === 100
              ? "Amazing! You have an excellent understanding of Compassion, and setting healthy boundaries while being compassionate. We are super proud of you for making it this far and encourage you to keep being compassionate. At your convenience, you can review the concepts again and feel free to email us if you have any questions."
              : ""}
          </p>
        </div>
      </div>
    </>
  );
}

export default Week5;
