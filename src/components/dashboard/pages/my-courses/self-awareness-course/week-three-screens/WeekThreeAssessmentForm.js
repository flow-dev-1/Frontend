import React, { useState, useEffect } from 'react'
import '../newcourse.css'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import { toast } from 'react-toastify'
import userService from '../../../../../../services/api/user.js'

export default function WeekThreeAssessmentForm({ onNext, onBack,course }) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [assessment, setAssessment] = useState([])
  const questionsArray = [
    {
      title:
        'Flowie believes that she can improve her drawing skills with practice and effort. Which mindset does this describe?',
      questionList: [
        'A. Fixed mindset',
        'B. Growth mindset',
        'C. Stagnant mindset',
        'D. Neutral mindset',
      ],
    },

    {
      title:
        "If someone says, I can't play the piano because I'm just not musically talented, which type of mindset are they demonstrating?",
      questionList: [
        'A. Fixed mindset',
        'B. Growth mindset',
        'C. Stagnant mindset',
        'D. Neutral mindset',
      ],
    },

    {
      title:
        'Why is it beneficial to have a growth mindset when facing challenges?',
      questionList: [
        'A. It helps you avoid mistakes altogether.',
        'B. It encourages you to embrace challenges and learn from mistakes.',
        'C. It ensures that you will never fail.',
        'D. It makes tasks easier and less challenging.',
      ],
    },

    {
      title: 'Which of the following statements reflects a growth mindset?',
      questionList: [
        "A. I'm either good at something, or I'm not.",
        'B. I can get better at this if I try.',
        "C. There's no point in trying if I'm going to fail.",
        'D. My abilities are fixed and cannot be changed.',
      ],
    },

    {
      title: 'Why is mindset important in how you approach learning and life?',
      questionList: [
        'A. It determines whether you can control your surroundings.',
        'B. It affects your openness to new experiences and resilience in the face of setbacks.',
        'C. It guarantees success in all endeavors.',
        'D. It limits your ability to change and grow.',
      ],
    },

    {
      title:
        'After receiving a poor grade, Flowa decides to work harder and seek help to improve. What mindset is she demonstrating?',
      questionList: [
        'A. Fixed mindset',
        'B. Growth mindset',
        'C. Static mindset',
        'D. Rigid mindset.',
      ],
    },

    {
      title: 'How can someone develop a growth mindset?',
      questionList: [
        'A. By avoiding all challenges and playing it safe.',
        'B. By changing the way they think and being open to learning and growth.',
        'C. By focusing only on their existing strengths.',
        'D. By believing that their abilities are unchangeable.',
      ],
    },

    {
      title:
        'Which of the following best describes the attitude of someone with a fixed mindset towards making mistakes?',
      questionList: [
        'A. They see mistakes as opportunities to learn.',
        'B. They believe mistakes mean they are not good at something and cannot improve.',
        'C. They are indifferent to making mistakes.',
        'D. They see mistakes as a natural part of the learning process.',
      ],
    },

    {
      title:
        'What activity could help someone practice thinking in new ways and developing a growth mindset?',
      questionList: [
        'A. Avoiding any new challenges.',
        'B. Setting goals, identifying challenges, and making a plan to tackle those challenges.',
        'C. Sticking to familiar tasks and routines.',
        'D. Focusing solely on their current abilities.',
      ],
    },
    {
      title:
        ' Which mindset is more likely to lead to resilience and perseverance in the face of setbacks?',
      questionList: [
        'A. Fixed mindset',
        'B. Growth mindset',
        'C. Static mindset',
        'D. Neutral mindset',
      ],
    },
  ]

  useEffect(() => {
    // Load saved answers from localStorage on component mount
    const savedAnswers = localStorage.getItem('week-three-assessment')
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers))
    }
  }, [])

  useEffect(() => {
    // Save answers to localStorage whenever selectedAnswers changes
    localStorage.setItem(
      'week-three-assessment',
      JSON.stringify(selectedAnswers)
    )
  }, [selectedAnswers])

  const handleNextStepClick = () => {
    if (selectedAnswers[currentIndex] === undefined) {
      toast.error('Please select an answer before proceeding.')
      return
    }

    if (currentIndex < questionsArray.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      const result = {
        week: 3,
        assessments: { answers: Object.values(selectedAnswers) },
      }
      saveWeekThreeAssessment(result)
      setAssessment(result)
      onNext()
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
    if (selectedAnswers[questionIndex + 1] !== undefined) {
      toast.error('You cannot change your answer once it is saved.')
      return
    }
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionIndex + 1]: optionIndex,
    }))
  }

  const saveWeekThreeAssessment = (result) => {
    const correctAnswers = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    const totalQuestions = Object.keys(selectedAnswers).length
    const correctCount = Object.keys(selectedAnswers).reduce((count, key) => {
      const selectedAnswerIndex = key - 1 // Adjusting for 0-indexing in correctAnswers array
      return selectedAnswers[key] === correctAnswers[selectedAnswerIndex]
        ? count + 1
        : count
    }, 0)
    const percentage = Math.round((correctCount / totalQuestions) * 100)
    toast.success(`You scored ${percentage}% in the quiz`)

    const dataToSend = {
      rating: percentage,
      assessments: result.assessments,
      week: 3,
    }

    userService
      .postMyAssessment(course?._id, dataToSend)
      .then((response) => {
        if (response.message === 'You have already taken the assessment') {
          toast.error('You have already taken the assessment')
        } else {
          toast.success('Submitted your assessment score')
        }
      })
      .catch((error) => {
        console.error('Submission failed:', error)
        toast.error('Submission failed. Please try again later.')
      })
  }

  const renderQuestion = () => {
    const question = questionsArray[currentIndex - 1]
    return (
      <div className='week-three'>
        <div
          style={{ height: '550px' }}
          className='assessment question-box py-4'
        >
          {currentIndex <= 1 && (
            <div className='assessment-box'>
              <h2 style={{ color: '#FAFAFA' }}>Assessment</h2>
              <p style={{ color: '#FAFAFA' }} className='text-center'>
                Scenario around your values.
              </p>
            </div>
          )}
          <div className='d-flex align-items-start mt-3'>
            <h1 style={{ color: '#5B616A' }}>{currentIndex}.</h1>
            <h2
              style={{ color: '#5B616A' }}
              className='text-start mb-0 fs-1 ms-3'
            >
              {question.title}
            </h2>
          </div>
          <div className='text-center checkbox-questions'>
            <ul className='p-0 mt-4 d-flex flex-column'>
              {question.questionList.map((item, index) => (
                <li key={index} className='d-flex align-items-center my-2'>
                  <img
                    onClick={() => handleQuestionCheck(currentIndex - 1, index)}
                    className='cursor-pointer'
                    src={
                      selectedAnswers[currentIndex] === index
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
      </div>
    )
  }

  return (
    <div>
      {renderQuestion()}

      <div className='slider-indicator'>
        <ul className='p-0 mt-5'>
          {Array.from({ length: questionsArray.length }, (_, index) => (
            <li
              key={index + 1}
              className={currentIndex >= index + 1 ? 'answered' : ''}
            ></li>
          ))}
        </ul>
      </div>

      <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
        <button
          className='btn progress-btn btn-light'
          onClick={handlePreviousStepClick}
        >
          Back
        </button>
        <button
          className='btn progress-btn btn-primary'
          onClick={handleNextStepClick}
        >
          {currentIndex === questionsArray.length ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  )
}
