import React, { useState, useEffect } from 'react'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import userService from '../../../../../../services/api/user.js'
import '../newcourse.css'
import Modal from 'react-modal'
import ReviewPopUp from '../../../../../modals-pages/dashboard-modals/ReviewModal'
import { toast } from 'react-toastify'

export default function WeekOneAssessmentForm({
  onSubmit,
  onNext,
  onBack,
  courseId,
}) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [reviewPopUp, setReviewPopUp] = useState(false)
  const [personalityColor, setPersonalityColor] = useState('')
  const [questionChecked, setQuestionChecked] = useState([])

  useEffect(() => {
    // Check if the assessment data is already in localStorage
    const storedData = localStorage.getItem('weekOneAssessmentData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      if (
        parsedData &&
        parsedData.formattedData &&
        parsedData.formattedData.week === 1
      ) {
        // Set personality color and persist the answers
        setPersonalityColor(parsedData.formattedData.personalityColor)
        setQuestionChecked(
          parsedData.formattedData.assessments.map((a) => a.answer)
        )
      }
    }
  }, [])

  const questionsArrayRed = [
    {
      title:
        "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
      questionList: [
        'A. You immediately take charge, assigning tasks to ensure everything is done efficiently.',
        'B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.',
        "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
        'D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere.',
      ],
    },
    {
      title: 'How do you approach situations that involve risk?',
      questionList: [
        'A. I embrace risks, seeing them as opportunities.',
        'B. I weigh the pros and cons but am open to taking risks.',
        'C. I prefer to minimize risks and proceed with caution.',
        'D. I avoid risks whenever possible.',
      ],
    },
    {
      title: 'In a competitive situation, how do you typically feel?',
      questionList: [
        'A. I like competition and aim to win.',
        'B. I enjoy competition but also focus on fair play.',
        'C. I participate, but winning isn’t my main goal.',
        'D. I avoid competition and prefer cooperative situations.',
      ],
    },
    {
      title:
        'When faced with a challenging task, what is your initial response?',
      questionList: [
        'A. I dive in immediately and start tackling it head-on.',
        'B. I quickly assess the situation and then take action.',
        'C. I take time to analyze before deciding on a course of action.',
        'D. I feel hesitant and may delay starting.',
      ],
    },
    {
      title:
        'When planning activities with friends, what is your typical approach?',
      questionList: [
        'A. I suggest adventurous or spontaneous ideas to keep things exciting.',
        "B. I propose activities that are fun but also consider everyone's preferences.",
        'C. I prefer to go along with others’ suggestions.',
        'D. I stick to well-planned and familiar activities.',
      ],
    },
    // Add more questions for Red
  ]

  const questionsArrayBlue = [
    {
      title:
        'When working on a group project, how do you typically contribute?',
      questionList: [
        'A. I focus on ensuring everyone feels included and valued.',
        'B. I bring up new ideas and focus on just the planning aspect.',
        'C. I take charge and make decisions for the group.',
        'D. I prefer to focus on the technical aspects and problem-solving.',
      ],
    },
    {
      title:
        'How do you approach situations where someone is feeling upset or emotional?',
      questionList: [
        'A. How do you approach situations where someone is feeling upset or emotional?',
        'B. I suggest practical solutions to help them feel better.',
        'C. I give them space to process their emotions alone.',
        'D. I focus on getting them to move past it and carry on.',
      ],
    },
    {
      title: 'In a conflict, what is your usual response?',
      questionList: [
        'A. I try to mediate and find a solution that keeps everyone happy.',
        'B. I discuss the issues openly and try to resolve them logically.',
        'C. I assert my position and work to get my point across.',
        'D. I avoid the conflict and hope it resolves itself.',
      ],
    },
    {
      title: 'When making decisions, what do you consider most?',
      questionList: [
        'A. How it will affect the people involved and their feelings.',
        'B. The logical outcomes and possible consequences.',
        'C. How quickly I can implement the decision.',
        'D. The rules and guidelines that should be followed.',
      ],
    },
    {
      title: 'IHow do you typically show you care about someone?',
      questionList: [
        'A. I spend quality time with them and offer emotional support.',
        'B. I give them thoughtful advice or help them solve problems.',
        'C. I involve them in fun and exciting activities.',
        'D. I do things for them or help with their responsibilities.',
      ],
    },
    // Add more questions for Blue
  ]

  const questionsArrayYellow = [
    {
      title: 'When working on a group project, how do you usually contribute?',
      questionList: [
        'A. Ensure everything is organized and everyone knows their tasks.',
        'B. Lead the group and make quick decisions.',
        'C. Provide emotional support and encourage everyone.',
        'D. Offer innovative ideas and solutions.',
      ],
    },
    {
      title: 'How do you handle unexpected changes or challenges?',
      questionList: [
        'A. Make a detailed plan to address the changes.',
        'B. Adapt quickly and go with the flow.',
        'C. Seek support from others and talk through the issues.',
        'D. Avoid the challenge if possible and focus on something else.',
      ],
    },
    {
      title: 'In a social setting, how do you usually behave?',
      questionList: [
        'A. Keep everything organized and ensure everyone is on track.',
        'B. Engage in conversations and make new connections.',
        'C. Take charge and organize the event or activity.',
        'D. Support and help others feel included and valued.',
      ],
    },
    {
      title: 'When making decisions, what is your primary focus?',
      questionList: [
        'A. Making sure the decision aligns with long-term goals and values.',
        'B. Quickly resolving the issue to move on to other tasks.',
        'C. Considering how the decision will affect everyone involved.',
        'D. Following a detailed plan and ensuring accuracy.',
      ],
    },
    {
      title: 'How do you feel about setting and achieving goals?',
      questionList: [
        'A. Setting clear goals and making sure they are achieved is very important.',
        'B. Achieving goals is less important than having fun and enjoying the process.',
        'C. There is no need to set goals.',
        'D. Prefer to set goals but not worry too much about following through.',
      ],
    },
  ]

  const questionsArrayGreen = [
    {
      title: 'When faced with a problem, how do you typically approach it?',
      questionList: [
        'A. Analyze the situation thoroughly before acting.',
        'B. Act based on my first thought.',
        'C. Seek advice from others before making a decision.',
        'D. Ignore the problem and hope it resolves itself.',
      ],
    },
    {
      title: 'How do you prefer to spend your free time?',
      questionList: [
        'A. Engaging in intellectual activities, like reading or puzzles.',
        'B. Socializing with friends and family.',
        'C. Participating in adventurous or spontaneous activities.',
        'D. Watching movies.',
      ],
    },
    {
      title: 'When working on a group project, how do you contribute?',
      questionList: [
        'A. Provide logical analysis and critical thinking.',
        'B. Offer emotional support and encourage teamwork.',
        'C. Take the lead and make quick decisions.',
        'D. Just do my allocated part.',
      ],
    },
    {
      title:
        'In a situation where you need to make a decision, what is your priority?',
      questionList: [
        'A. Gathering and evaluating all the relevant information.',
        'B. Considering how the decision will impact others.',
        'C. Making a decision quickly to keep things moving.',
        'D. I focus on my feelings.',
      ],
    },
    {
      title: 'When you encounter a new concept or idea, how do you react?',
      questionList: [
        'A. Research and seek to understand it deeply.',
        'B. Embrace it enthusiastically and share it with others.',
        'C. I immediately reject it if it does not align with my values.',
        'D. Implement it immediately.',
      ],
    },
  ]

  const getQuestionsArray = () => {
    switch (personalityColor) {
      case 'Red':
        return questionsArrayRed
      case 'Blue':
        return questionsArrayBlue
      case 'Yellow':
        return questionsArrayYellow
      case 'Green':
        return questionsArrayGreen
      default:
        return []
    }
  }

  const handleNextStepClick = () => {
    const questionsArray = getQuestionsArray()
    const questionIndex = currentIndex - 2

    // Check if the user has selected an answer for the current question
    if (
      questionIndex >= 0 &&
      questionIndex < questionsArray.length &&
      questionChecked[questionIndex] === undefined
    ) {
      toast.error('Please select an answer before proceeding.')
      return
    }

    // Proceed to the next step if valid
    if (currentIndex < questionsArray.length + 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      saveAssessmentData()
      onNext()
      setReviewPopUp(true) // Show review popup immediately
    }
  }

  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    } else {
      onBack()
    }
  }

  const handleQuestionCheck = (questionIndex, optionIndex) => {
    // If the assessment is already completed, prevent further selection
    if (localStorage.getItem('weekOneAssessmentData')) {
      toast.error('You have already taken the assessment.')
      return
    }

    setQuestionChecked((prevState) => {
      const newState = [...prevState]
      newState[questionIndex] = optionIndex
      return newState
    })
  }

  const saveAssessmentData = () => {
    const questionsArray = getQuestionsArray()

    // Format data to match the required structure
    const formattedData = {
      week: 1,
      personalityColor: personalityColor,
      assessments: questionsArray.map((_, index) => ({
        answer:
          questionChecked[index] !== undefined ? questionChecked[index] : null, // Save the selected answer as an index or null if not selected
      })),
    }

    console.log('Formatted Data', formattedData)

    // Basic marking (for demonstration purposes)
    const correctAnswers = questionsArray.map(() => 0) // Assuming correct answers are at index 0
    const totalQuestions = correctAnswers.length
    const correctCount = formattedData.assessments.reduce(
      (count, current, index) => {
        return current.answer === correctAnswers[index] ? count + 1 : count
      },
      0
    )

    const percentage = (correctCount / totalQuestions) * 100
    console.log(`Correct Answers: ${correctCount} / ${totalQuestions}`)
    console.log(`Percentage: ${percentage}%`)
    toast.success(`You scored ${percentage}% in the quiz`)

    // Save data to local storage
    localStorage.setItem(
      'weekOneAssessmentData',
      JSON.stringify({ formattedData, percentage })
    )

    // Post data to the API (if needed)
    const courseId = '66853bf50118e2e0a02b6a5a'
    userService
      .postMyAssessment(
        courseId,
        JSON.stringify({
          week: formattedData.week,
          assessments: formattedData.assessments,
          rating: percentage,
          percentage,
          personalityColor: formattedData.personalityColor,
        })
      )
      .then((response) => {
        if (response.message === 'You have already taken the assessment') {
          toast.error('You have already taken the assessment')
        } else {
          console.log('Submission successful:', response)
          toast.success('Submission successful!')
        }
      })
      .catch((error) => {
        console.error('Submission failed:', error)
      })
  }

  const renderQuestion = () => {
    const questionsArray = getQuestionsArray()

    if (currentIndex === 1) {
      return (
        <div style={{justifyContent:"start"}} className='assessment question-box py-4'>
          <div className=''>
            <div className='assessment-box'>
              <h2 style={{ color: '#FAFAFA' }}>Assessment</h2>
              Scenario around your personality colors.
            </div>
            <h2
              style={{ color: '#5B616A' }}
              className='my-5 text-justify mx-auto w-75'
            >
              Before we proceed, please select the result of your personality
              test. What is your personality colour?
            </h2>
            <div style={{ height: '70px' }} className='px-4 text-area-box two '>
              <select
                style={{ margin: '2rem' }}
                value={personalityColor}
                onChange={(e) => setPersonalityColor(e.target.value)}
              >
                <option value=''>Choose from the options </option>
                <option value='Green'>Green</option>
                <option value='Red'>Red</option>
                <option value='Blue'>Blue</option>
                <option value='Yellow'>Yellow</option>
              </select>
            </div>
          </div>
        </div>
      )
    }

    const questionIndex = currentIndex - 2
    if (questionIndex >= 0 && questionIndex < questionsArray.length) {
      return (
        <div className='assessment question-box py-4'>
          <div className='d-flex align-items-start'>
            <h1>{currentIndex - 1}.</h1>
            <h2 className='text-center mb-0 fs-1 ms-3'>
              {questionsArray[questionIndex].title}
            </h2>
          </div>
          <div className='checkbox-questions'>
            <ul className='p-0'>
              {questionsArray[questionIndex].questionList.map((item, index) => (
                <li key={index} className='d-flex my-3'>
                  <img
                    onClick={() => handleQuestionCheck(questionIndex, index)}
                    className='cursor-pointer'
                    src={
                      questionChecked[questionIndex] === index
                        ? checkedImage
                        : unCheckedImage
                    }
                    alt=''
                  />
                  <p className='question-p ms-3'>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div>
      {renderQuestion()}

      <div className='slider-indicator'>
        <ul className='p-0 mt-5' style={{ width: '200px' }}>
          {Array.from(
            { length: getQuestionsArray().length + 1 },
            (_, index) => (
              <li
                key={index}
                className={currentIndex >= index + 1 ? 'answered' : ''}
              ></li>
            )
          )}
        </ul>
      </div>

      <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
        <button
          className='btn progress-btn btn-light'
          onClick={handlePreviousStepClick}
        >
          {'<<<'} Back
        </button>
        <button
          className='btn progress-btn btn-dark'
          onClick={handleNextStepClick}
        >
          Next {'>>>'}
        </button>
      </div>
    </div>
  )
}
