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

function Week4() {
  const { pages } = getWeekContentExcludingVideos(4);
  const [activity1, activity2, activity3] = pages;
  const [activityData, setActivityData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([])


  const { questions: assessments } = getWeekAssessment(4);
  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/compassion-feedback-4", 4],
    queryFn: () => userService.getUserCourseData("677ab910f44712a968f16832", 4),
    // enabled: !!currentWeek,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false
  });

  useEffect(() => {
    if (!data) return

    setActivityData(data.activity?.activities)
    setAssessmentData(data.assessment?.assessments)

    return () => { }
  }, [data])

  console.log(activityData[2]?.answer, "Activity")

  console.log(activity3.images, "Activity 3")

  function getActivityAnswer(activityId) {
    return activityData?.find(activity => activity.page === activityId)?.answer

  }

  function drag1(type) {

    const indices = (type === "inner") ? activityData[1]?.answer?.inner : activityData[1]?.answer?.outer
    return indices?.map(index => activity2?.options[index]);
  }

  function drag2(type) {
    const indices = (type === "green") ? activityData[2]?.answer?.green :
      (type === "orange") ? activityData[2]?.answer?.orange :
        (type === "red") ? activityData[2]?.answer?.red : []
    return indices?.map(index => activity3?.images[index]);
  }


  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data?.status === "failed" || isError) {
    return <div>{data?.message || "Internal server error!"}</div>;
  }

  const score = calculateResult(assessments, assessmentData, assessments?.length) || 0

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
        <p className="fs-5 flex-grow-1">
          {getActivityAnswer(activity1.id)}
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      {/* <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#275DAD" }} width={40} icon="lucide:edit" />
      </div> */}
      <hr />

      {/* Activity 2 */}
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
              Innner Cycle
            </h2>
            <div className="px-5 py-3">
              {
                drag1("inner")?.map((item, idx) => (
                  <p className="fs-4">{idx + 1}. {item}</p>
                ))
              }

            </div>
          </div>
          <div className="flex-grow-1">
            <h2 className="bg-orange text-center text-white py-3 fs-1">
              Outer Cycle
            </h2>
            <div className="px-5 py-3">
              {
                drag1("outer")?.map((item, idx) => (
                  <p className="fs-4">{idx + 1}. {item}</p>
                ))
              }
            </div>
          </div>
        </div>
        <Icon style={{ color: "#D6D6D6" }} width={30} icon="tabler:message-2" />
      </div>
      {/* <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#275DAD" }} width={40} icon="lucide:edit" />
      </div> */}
      <hr />

      {/* Activity 3 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 3
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{activity3.instruction}</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <div className="flex-grow-1 d-flex">
          <div className="flex-grow-1">
            <h2 className="text-center bg-green text-white py-3 fs-1">
              Innner Cycle
            </h2>
            <div className="py-3">
              {
                drag2("green")?.map((item, idx) => (
                  <p className="fs-4">{idx + 1}. {item}</p>
                ))
              }
            </div>
          </div>
          <div className="flex-grow-1">
            <h2 className="text-center bg-red text-white py-3 fs-1">Both</h2>
            <div className="py-3">
              {
                drag2("orange")?.map((item, idx) => (
                  <p className="fs-4">{idx + 1}. {item}</p>
                ))
              }
            </div>
          </div>
          <div className="flex-grow-1">
            <h2 className="bg-orange text-center text-white py-3 fs-1">
              Outer Cycle
            </h2>
            <div className="py-3">
              {
                drag2("red")?.map((item, idx) => (
                  <p className="fs-4">{idx + 1}. {item}</p>
                ))
              }
            </div>
          </div>
        </div>
        <Icon style={{ color: "#D6D6D6" }} width={30} icon="tabler:message-2" />
      </div>
      {/* <div className="d-flex gap-3">
        <p className="text-bg-secondary rounded-4 px-3 fs-5 align-self-start">
          Feedback
        </p>
        <p className="bg-step-active text-gray fs-5 flex-grow-1 p-2 rounded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
         <Icon style={{ color: "#275DAD" }} width={40} icon="lucide:edit" />
      </div> */}
      <hr />


      <hr />
      {/* Assesment 1 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Assessment 1
      </p>
      <hr />
      {assessments.map(({ id, question, options, correctOption }, i) => {
        const selectedAnswer = assessmentData?.find(answer => answer.id === id)?.value
        return (
          <>
            <div className="d-flex align-items-center gap-3" key={i}>
              <h2 className="text-blue fs-1 text-nowrap">Questions {i + 1}:</h2>
              <p className="text-blue fs-4">{question}</p>
            </div>
            {options.map((option, index) => {
              const optionKey = Object.keys(option)[0];
              const optionText = option[optionKey];
              const isCorrectOption = correctOption === optionText;
              const isAnswer = selectedAnswer === optionText
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
          <h2 className="text-gray fs-1 ratio-1x1 bg-aqua rounded-4 p-5 d-flex justify-content-center align-items-center border border-6 border-blue">
            {score}%
          </h2>
          <p className="text-white">
            {
              score < 41 ? "It seems like you need more time to fully understand the Circle of Concern and the difference between showing compassion to your inner and outer circles. Review the concept and think about how to apply it in your daily life." :
                score < 61 ? "Good effort! You have a general idea of the Circle of Concern, but there’s room for improvement in recognizing how to show compassion appropriately to different groups." :
                  score < 100 ? "Great job! You mostly understand the Circle of Concern, though you could benefit from thinking more about the boundaries between your inner and outer circles." :
                    score === 100 ? "Excellent understanding! You clearly grasp the idea of the Circle of Concern and how to interact with people in your inner and outer circles with compassion and respect." : ""
            }

          </p>
        </div>
      </div>
    </>
  );
}

export default Week4;
