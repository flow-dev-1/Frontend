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

function Week1() {
  const { pages } = getWeekContentExcludingVideos(1);
  const [activity1, activity2, activity3] = pages;
  const [activityData, setActivityData] = useState([]);
  const [assessmentData, setAssessmentData] = useState([]);



  const [q1, q2, q3, q4, q5] = activity3.steps.slice(1);

  console.log(q1,"Quality 1")

  const { questions: assessments } = getWeekAssessment(1);

  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/compassion-course", ""],
    queryFn: () => userService.getUserCourseData("677ab910f44712a968f16832", 1),
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

  console.log(activityData, "Activity Data")
  console.log(assessmentData, "Assessmentdata")

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Take Activity to see feedback.</div>;
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
        <p className="text-blue fs-4">{activity1.question} "Compassion"?</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          {activityData?.find(activity => activity.page === activity1.id)?.answer}
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>

      {
        // Show this only id theres a feedback
        activityData?.find(activity => activity.page === activity1.id)?.feedback &&
        <div className="d-flex gap-3">
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
        </div>

      }

      <hr />
      {/* Activity 2 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Activity 2
      </p>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{activity2.question} "Theory"?</p>
      </div>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          {activityData?.find(activity => activity.page === activity2.id)?.answer}
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>

      {
         // Show this only if theres a feedback
         activityData?.find(activity => activity.page === activity2.id)?.feedback &&
         <div className="d-flex gap-3">
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
       </div>
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
      <p className="d-inline-block bg-blue text-white rounded-4 px-3">
        {`${q1.questions[0].type}: ${q1.questions[0].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3 my-2">
        {`${q1.questions[1].type}: ${q1.questions[1].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3 my-2">
        {`${q1.questions[2].type}: ${q1.questions[2].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{q2.title}</p>
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3">
        {`${q2.questions[0].type}: ${q2.questions[0].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3 my-2">
        {`${q2.questions[1].type}: ${q2.questions[1].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3 my-2">
        {`${q2.questions[2].type}: ${q2.questions[2].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{q3.title}</p>
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3">
        {`${q3.questions[0].type}: ${q3.questions[0].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3 my-2">
        {`${q3.questions[1].type}: ${q3.questions[1].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3 my-2">
        {`${q3.questions[2].type}: ${q3.questions[2].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{q4.title}</p>
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3">
        {`${q4.questions[0].type}: ${q4.questions[0].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3 my-2">
        {`${q4.questions[1].type}: ${q4.questions[1].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3 my-2">
        {`${q4.questions[2].type}: ${q4.questions[2].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <hr />
      <div className="d-flex gap-3">
        <h2 className="text-blue fs-1">Questions:</h2>
        <p className="text-blue fs-4">{q5.title}</p>
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3">
        {`${q5.questions[0].type}: ${q5.questions[0].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3 my-2">
        {`${q5.questions[1].type}: ${q5.questions[1].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <p className="d-inline-block bg-blue text-white rounded-4 px-3 my-2">
        {`${q5.questions[2].type}: ${q5.questions[2].question}`}
      </p>
      <div className="d-flex gap-3">
        <h2 className="text-gray fs-1 text-gray">Answers:</h2>
        <p className="fs-5 flex-grow-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          quaerat consequuntur veritatis quasi provident autem, sapiente id ipsa
          soluta dolorum accusamus, voluptates illum amet magnam ullam assumenda
          maxime possimus itaque.
        </p>
        <Icon style={{ color: "#D6D6D6" }} width={50} icon="tabler:message-2" />
      </div>
      <div className="d-flex gap-3">
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
      </div>
      <hr />

      <hr />
      {/* Assesment 1 */}
      <p className="bg-yellow py-3 px-5 text-gray d-inline-block rounded-5 fs-4">
        Assessment 1
      </p>
      <hr />
      {assessments.map(({ question, options, correctOption }, i) => {
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

              return (
                <div
                  key={index}
                  className="d-flex gap-2 mb-3 justify-content-between"
                >
                  <div className="d-flex gap-2">
                    <img
                      src={isCorrectOption ? checkedImage : unCheckedImage}
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
            100%
          </h2>
          <p className="text-white">
            Figma ipsum component variant main layer. Draft hand plugin arrow
            line plugin slice. Comment boolean background union stroke subtract
            underline vector. Italic move undo create pen strikethrough main
            arrange image. Component font.Figma ipsum component variant main
            layer. Draft hand plugin arrow line plugin slice. Comment boolean
            background union stroke subtract underline vector. Italic move undo
            create pen strikethrough main arrange image. Component font.
          </p>
        </div>
      </div>
    </>
  );
}

export default Week1;

{
  /* <Icon
                style={{ color: "#275DAD" }}
                width={20}
                icon="lucide:edit"
              /> */
}
{
  /* <Icon
                style={{ color: "#275DAD" }}
                width={20}
                icon="lucide:edit"
              /> */
}
