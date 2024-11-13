import React, { useEffect, useState } from 'react'
import './Week1.css' // Import the CSS file for styling
import PersonalityFeedback from './PersonalityFeedback'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import { Icon } from '@iconify/react'
import FinalReport from './FinalReport'
import { useQuery } from '@tanstack/react-query'
import userService from '../../../../../../services/api/user'
import { decryptId } from '../../../../../../utils/encryption'
import schoolService from '../../../../../../services/api/school'
import { useParams } from 'react-router-dom'
const questions = [
  {
    question: 'When I make decisions:',
    options: [
      {
        label: 'A. I do it quickly and go with the first impressions.',
        color: 'Red',
        checked: true,
      },
      {
        label: 'B. I think about it, consider the options, and then decide.',
        color: 'Green',
        checked: false,
      },
      {
        label:
          'C. I listen to my feelings and consider how my decisions will affect others.',
        color: 'Blue',
        checked: false,
      },
      {
        label:
          'D. I take it seriously and always try to make the right decision.',
        color: 'Yellow',
        checked: false,
      },
    ],
  },
]

let questionsQuiz = [
  {
    question:
      'Which quality would help you best manage your chores and responsibilities at home well?',
    options: [
      {
        label: 'A. Empathy',
        color: 'Red',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label: 'B. Good Listener',
        color: 'Green',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label: 'C. Detail-oriented',
        color: 'Blue',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label: 'D. Responsible',
        color: 'Yellow',
        checked: false, // This is the correct option (assuming)
        isCorrect: true,
      },
    ],
  },
  {
    question:
      'You’ve identified that your weakness is impatience and your classmate asked you to wait for him so you can get lunch together while he uses the toilet. What will you do as someone trying to improve on their weakness?',
    options: [
      {
        label: 'A. Do Nothing',
        color: 'Red',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label: 'B. Wait for him to get lunch together.',
        color: 'Green',
        checked: false, // This is the correct option (assuming)
        isCorrect: true,
      },
      {
        label: 'C. Wait for only 1 minute and leave if he doesn’t show up.',
        color: 'Blue',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label: 'D. Tell him you’re hungry and cannot wait.',
        color: 'Yellow',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'You’ve identified your strength is honesty and your class teacher is asking who was making noise. You know it is Adetola, your best friend that was making noise because he is your seatmate. What will you do next?',
    options: [
      {
        label: 'A. Choose not to say anything',
        color: 'Red',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label: 'B. Tell the teacher that Adetola was making noise',
        color: 'Green',
        checked: false, // This is the correct option (assuming)
        isCorrect: true,
      },
      {
        label: 'C. Tell Adetola to report himself or else you would.',
        color: 'Blue',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label:
          'D. Ask to go to the toilet because you don’t want to talk about it',
        color: 'Yellow',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "You're trying to solve a difficult puzzle. Which quality would be most helpful in this situation?",
    options: [
      {
        label: 'A. Patience',
        color: 'Red',
        checked: false, // This is the correct option (assuming)
        isCorrect: true,
      },
      {
        label: 'B. Self-critical',
        color: 'Green',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label: 'C. Optimistic',
        color: 'Blue',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label: 'D. Brave',
        color: 'Yellow',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
    ],
  },
  {
    question:
      'You realized your best friend, John, has a weakness and you are interested in helping him work on this weakness. What would you do?',
    options: [
      {
        label: 'A. Ignore it to protect your friendship.',
        color: 'Red',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label:
          'B. Tell him about the strengths you have noticed he has and identify how to manage his weakness.',
        color: 'Green',
        checked: false, // This is the correct option (assuming)
        isCorrect: false,
      },
      {
        label: 'C. Tell your other friends about this weakness.',
        color: 'Blue',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label:
          'D. Tell him about your own weakness in hopes that it will get him to share as well.',
        color: 'Yellow',
        checked: false, // This is not the correct option
        isCorrect: true,
      },
    ],
  },
]

const Week2 = () => {
  const { userId } = useParams()
  const week = 2
  const courseId = '66853bf50118e2e0a02b6a5a'
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard/feedback/self-awareness', courseId, week],
    queryFn: () => schoolService.getStudentMyActivites(courseId, week, decryptId(userId)),
  })

  const [assessmentData, setAssessmentData] = useState(null)
  const [assessmentLoading, setAssessmentLoading] = useState(true)
  const [assessmentError, setAssessmentError] = useState(null)

  useEffect(() => {
    const fetchAndProcessAssessmentData = async () => {
      setAssessmentLoading(true)
      try {
        const data = await schoolService.getStudentAssessments(courseId, week, decryptId(userId));
        setAssessmentData(data)

        const assessmentForChecked =
          data?.existingAssessment?.assessments[0]?.assessment?.answers
        // console.log(data?.existingAssessment?.assessments[0]?.assessment?.answers[5]);
        // Ensure that assessmentForChecked is valid before slicing
        if (assessmentForChecked && assessmentForChecked.length >= 5) {
          const valuesToCheck = assessmentForChecked.slice(0, 5)
          console.log(valuesToCheck)

          questionsQuiz = questionsQuiz.map((question, index) => {
            return {
              ...question,
              options: question.options.map((option, optionIndex) => {
                return {
                  ...option,
                  checked: optionIndex === valuesToCheck[index],
                }
              }),
            }
          })

          // You might want to update the state with the modified questionsQuiz
          // console.log(questionsQuiz);
        } else {
          console.error('Assessment answers are missing or incomplete.')
        }
      } catch (error) {
        setAssessmentError(error)
      } finally {
        setAssessmentLoading(false)
      }
    }

    fetchAndProcessAssessmentData()
  }, [courseId, week])

  // console.log(updatedQuestionsQuiz);

  if (isLoading || assessmentLoading) {
    return <div>Loading...</div>
  }

  if (isError || assessmentError) {
    return <div>Take Activity to see feedback.</div>
  }
  const strengths = data?.activity?.activities[3]?.answers?.strengths
  const weaknesses = data?.activity?.activities[4]?.answers?.weakness
  const actviity1 = [
    {
      activity: 1,
      question: 'What do you think "Self Awareness" is?',
      answer: data?.activity?.activities[1]?.answers[0],
      feedback: '',
    },
  ]
  const activities = [
    {
      activity: 2, // New activity based on image
      question: 'Identify your Strengths.',
      answer: strengths,
      feedback: '',
    },
    {
      activity: 3, // New activity based on image
      question: 'Identify your Weaknesses.',
      answer: weaknesses,
      feedback: '',
    },
    // {
    //   activity: 4, // Another new activity based on image
    //   question:
    //     "Identify three (3) important people in your life and list their names below.",
    //   answer: ["1. Name 1", "2. Name 2", "3. Name 3"],
    //   feedback: null // No feedback provided in the image
    // },
    {
      activity: 4, // New activity based on the latest image
      question:
        'A friend is feeling sad and needs someone to talk to because they just failed a test.They come to you for support. How would you help?',
      answer: {
        strengths: data?.activity?.activities[6]?.answers?.strengthsQ1,
        weaknesses: data?.activity?.activities[6]?.answers?.weaknessesQ1,
      },
      feedback: '',
    },
    {
      activity: 4, // New activity based on the latest image
      question:
        'Imagine you’re working on a group project at school. Your group is struggling to come up with an idea for the project. As a member of the team, how would you help?',
      answer: {
        strengths: data?.activity?.activities[6]?.answers?.strengthsQ2,
        weaknesses: data?.activity?.activities[6]?.answers?.weaknessesQ2,
      },
      feedback: '',
    },
    {
      activity: 4, // New activity based on the latest image
      question:
        'Is there a sport you dislike? What sport is this? Now imagine you were asked to represent your house in this particular sport, for your School’s inter-house sport competition, to win a laptop and a gaming console. How would you go about this?',
      answer: {
        strengths: data?.activity?.activities[6]?.answers?.strengthsQ3,
        weaknesses: data?.activity?.activities[6]?.answers?.weaknessesQ3,
      },
      feedback: '',
    },
  ]
  const quizEssay = [
    {
      activity: 1,
      question:
        'What activity do you enjoy the most, and why do you think you are good at it?',
      answer:
        assessmentData?.existingAssessment?.assessments[0]?.assessment
          ?.answers[5],
      feedback: '',
    },

    {
      activity: 2, // New activity based on image
      question:
        'When working in a group, what role do you naturally take on (e.g., leader, planner, helper)? Can you give an example?',
      answer:
        assessmentData?.existingAssessment?.assessments[0]?.assessment
          ?.answers[7],
      feedback: '',
    },
    {
      activity: 3, // New activity based on image
      question:
        'Is there a task or subject that you avoid because you find it difficult? Why do you think it’s challenging for you?',
      answer:
        assessmentData?.existingAssessment?.assessments[0]?.assessment
          ?.answers[8],
      feedback: '',
    },
  ]
  const percentage = assessmentData?.existingAssessment?.rating
  return (
    <div className='week-content'>
      <p className='activity-badge'>Activity 1</p>

      {actviity1.map((activity, index) => (
        <div style={{ border: 'none' }} className='activity' key={index}>
          <p className='question d-flex align-items-center gap-2'>
            <h4 style={{ color: '#275DAD', marginTop: '.3rem' }}>Question:</h4>
            <span> {activity.question}</span>
          </p>

          {/* Check if answer is an array and render as an ordered list */}
          {Array.isArray(activity.answer) ? (
            <ol className='answer-options' style={{ paddingLeft: '1.5rem' }}>
              {activity.answer.map((item, idx) => (
                <li
                  key={idx}
                  style={{ marginBottom: '.5rem', fontSize: '14px' }}
                >
                  {idx + 1}. {item}
                </li>
              ))}
            </ol>
          ) : (
            <div className='answer d-flex align-items-center gap-2'>
              <h4 style={{ color: '#555', marginTop: '.3rem' }}>Answer:</h4>{' '}
              <p> {activity.answer}</p>
            </div>
          )}

          {/* Conditionally render feedback */}
          {activity.feedback && (
            <div className='feedback'>
              <div id='badge'>Feedback:</div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div className='feedback-card'>{activity.feedback}</div>
                {/* <Icon
                  style={{ color: "#275DAD" }}
                  width={20}
                  icon="lucide:edit"
                /> */}
              </div>
            </div>
          )}
        </div>
      ))}

      <p className='activity-badge'>Activity 2</p>
      {activities.map((activity, index) => (
        <div style={{ border: 'none' }} className='activity' key={index}>
          <p className='question d-flex align-items-center gap-2'>
            <h4 style={{ color: '#275DAD', marginTop: '.3rem' }}>Question:</h4>
            <span> {activity.question}</span>
          </p>

          {/* Check for answer type and render accordingly */}
          {activity.answer.strengths ? (
            <div
              style={{ display: 'flex', width: '90%', margin: '1rem auto' }}
              className='strengths-weaknesses'
            >
              <div style={{ width: '100%' }} className='strengths'>
                <h5
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    padding: '1rem',
                  }}
                  id='yes'
                >
                  Strengths
                </h5>
                <ul
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                  }}
                >
                  {activity.answer.strengths.map((item, idx) => (
                    <div className='d-flex align-items-center gap-2'>
                      <Icon
                        icon='radix-icons:dot-filled'
                        style={{ color: '#5B616A' }}
                      />
                      <li key={idx}>{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
              <div style={{ width: '100%' }} className='weaknesses'>
                <h5
                  id='no'
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    padding: '1rem',
                  }}
                >
                  Weaknesses
                </h5>
                <ul
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                  }}
                >
                  {activity.answer.weaknesses.map((item, idx) => (
                    <div className='d-flex align-items-center gap-2'>
                      <Icon
                        icon='radix-icons:dot-filled'
                        style={{ color: '#5B616A' }}
                      />
                      <li key={idx}>{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          ) : Array.isArray(activity.answer) ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
              }}
              className='answer-options'
            >
              {activity.answer.map((item, idx) => (
                <div className=' d-flex '>
                  <Icon
                    icon='radix-icons:dot-filled'
                    style={{ color: '#5B616A' }}
                  />
                  <p style={{ fontSize: '14px' }} className='answer-option'>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className='answer d-flex align-items-center gap-2'>
              <h4 style={{ color: '#555', marginTop: '.3rem' }}>Answer:</h4>{' '}
              {Array.isArray(activity.answer) ? (
                <ul>
                  {activity.answer.map((item, idx) => (
                    <div className='d-flex align-items-center gap-2'>
                      <Icon
                        icon='radix-icons:dot-filled'
                        style={{ color: '#5B616A' }}
                      />
                      <li key={idx}>{item}</li>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>{typeof(activity?.answer) !== "string" ? "" : activity?.answer}</p>
              )}
            </div>
          )}

          {/* Conditionally render feedback */}
          {activity.feedback && (
            <p className='feedback'>
              <div id='badge'>Feedback:</div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div className='feedback-card'>{activity.feedback}</div>
                {/* <Icon
                  style={{ color: "#275DAD" }}
                  width={20}
                  icon="lucide:edit"
                /> */}
              </div>
            </p>
          )}
        </div>
      ))}
      <p className='activity-badge'>Assessment 2</p>
      {questionsQuiz.map((q, index) => (
        <div className='question-block' key={index}>
          <p className='question d-flex align-items-center gap-2'>
            <h4 style={{ color: '#275DAD', marginTop: '.3rem' }}>
              Question{index + 1}:
            </h4>
            <span> {q.question}</span>
          </p>
          <div className='options'>
            {q.options.map((option, idx) => (
              <div className='option' key={idx}>
                <img
                  src={option.checked ? checkedImage : unCheckedImage}
                  alt={option.isCorrect ? 'Checked' : 'Unchecked'}
                  style={{ width: '20px', marginRight: '10px' }}
                />
                <span style={{ fontSize: '14px' }} className='option-label'>
                  {option.label}
                </span>
                <p style={{ width: '120px', textAlign: 'center' }}>
                  {option.isCorrect ? (
                    <span
                      style={{ color: '#50AA50' }}
                      className='d-flex align-items-center gap-2 align-items-center justify-content-center gap-1 '
                    >
                      <Icon width={17} icon='ph:seal-check-light' />
                      Correct
                    </span>
                  ) : (
                    <span
                      style={{ color: '#FD483D' }}
                      className='d-flex align-items-center gap-2 align-items-center justify-content-center gap-1'
                    >
                      <Icon width={17} icon='mdi:cross-circle-outline' />
                      Wrong
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {quizEssay.map((activity, index) => (
        <div style={{ border: 'none' }} className='activity' key={index}>
          <p className='question d-flex align-items-center gap-2'>
            <h4 style={{ color: '#275DAD', marginTop: '.3rem' }}>
              Question{index + 6}:
            </h4>
            <span>{activity.question}</span>
          </p>

          {/* Check if answer is an array and render as an ordered list */}
          {Array.isArray(activity.answer) ? (
            <ol className='answer-options' style={{ paddingLeft: '1.5rem' }}>
              {activity.answer.map((item, idx) => (
                <li
                  key={idx}
                  style={{ marginBottom: '.5rem', fontSize: '14px' }}
                >
                  {idx + 1}. {item}
                </li>
              ))}
            </ol>
          ) : (
            <div className='answer d-flex align-items-center gap-2'>
              <h4 style={{ color: '#555', marginTop: '.3rem' }}>Answer:</h4>{' '}
              <p> Answer: {activity.answer}</p>
            </div>
          )}

          {/* Conditionally render feedback */}
          {/* {activity.feedback && (
            <div className="feedback">
              <div id="badge">Feedback:</div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                }}
              >
                <div className="feedback-card">{activity.feedback}</div>
                // <Icon
                //   style={{ color: "#275DAD" }}
                //   width={20}
                //   icon="lucide:edit"
                // />
              </div>
            </div>
          )} */}
        </div>
      ))}
      <FinalReport rate={percentage} />
    </div>
  )
}

export default Week2
