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
import { useQuery } from '@tanstack/react-query'
import userService from "../../../../../../../../services/api/user.js"
import { calculateResult } from "../../../utility.js";

function Week2({ enrollmentId, setShowModal }) {
  const { pages } = getWeekContentExcludingVideos(2);
  const [activity1, activity2, activity3] = pages;
  const [q1, q2, q3, q4] = activity3.prompts;
  const [activityData, setActivityData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);

  const { questions: assessments } = getWeekAssessment(2);

  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/compassion-feedback-2", enrollmentId, 2],
    queryFn: () => userService.getUserCourseData(enrollmentId, 2),
    enabled: !!enrollmentId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });

  useEffect(() => {
    if (!data) return;

    setActivityData(data.activity?.activities);
    setAssessmentData(data.assessment?.assessments);

    return () => {};
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

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError) {
    return <div>{data?.message}</div>;
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
        <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#D6D6D6" }} width={35} icon="tabler:message-2" />
      </div>
      {
        // Show this only id theres a feedback
        activityData?.find((activity) => activity.page === activity1.id)
          ?.feedback && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur quaerat consequuntur veritatis quasi provident autem,
              sapiente id ipsa soluta dolorum accusamus, voluptates illum amet
              magnam ullam assumenda maxime possimus itaque.
            </p>
            <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#275DAD" }} width={35} icon="lucide:edit" />
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
        <p className="text-blue fs-4">
          {activity2.title + " " + activity2.instructions.join(" ")}
        </p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">{getActivityAnswer(activity2.id)}</p>
        <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#D6D6D6" }} width={35} icon="tabler:message-2" />
      </div>
      {
        // Show this only if theres a feedback
        activityData?.find((activity) => activity.page === activity2.id)
          ?.feedback && (
          <div className="d-flex gap-3">
            <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
              Feedback
            </p>
            <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur quaerat consequuntur veritatis quasi provident autem,
              sapiente id ipsa soluta dolorum accusamus, voluptates illum amet
              magnam ullam assumenda maxime possimus itaque.
            </p>
            <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#275DAD" }} width={35} icon="lucide:edit" />
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
        <p className="text-blue fs-4">{q1.title}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          {getActivityAnswer(activity3.id, q1.id)}
        </p>
        <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#D6D6D6" }} width={35} icon="tabler:message-2" />
      </div>
      {/* <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">Feedback</p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#275DAD" }} width={35} icon="lucide:edit" />
      </div> */}

      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{q2.title}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          {getActivityAnswer(activity3.id, q2.id)}
        </p>
        <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#D6D6D6" }} width={35} icon="tabler:message-2" />
      </div>
      {/* <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">Feedback</p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#275DAD" }} width={35} icon="lucide:edit" />
      </div> */}

      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{q3.title}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          {getActivityAnswer(activity3.id, q3.id)}
        </p>
        <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#D6D6D6" }} width={35} icon="tabler:message-2" />
      </div>
      {/* <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">Feedback</p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#275DAD" }} width={35} icon="lucide:edit" />
      </div> */}

      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{q4.title}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          {getActivityAnswer(activity3.id, q4.id)}
        </p>
        <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#D6D6D6" }} width={35} icon="tabler:message-2" />
      </div>
      {/* <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">Feedback</p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon  onClick = {()=> setShowModal(true)} style={{ color: "#275DAD" }} width={35} icon="lucide:edit" />
      </div> */}

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
              ? "It seems like you could benefit from exploring self-compassion more. Learning to treat yourself with kindness is a valuable skill that can help you in many areas of life."
              : score < 61
              ? "You're on your way! Revisiting the concepts of self-compassion will help you further develop your ability to practice kindness toward yourself."
              : score < 100
              ? "Great work! You have a strong grasp of self-compassion, though there are a few areas where you can deepen your understanding."
              : score === 100
              ? "Excellent! Your responses indicate a clear understanding of self-compassion and its importance. Keep being kind to yourself!"
              : ""}
          </p>
        </div>
      </div>
    </>
  );
}

export default Week2;
