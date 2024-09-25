import React, { useState, useEffect } from 'react'
import '../newcourse.css'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import { toast } from 'react-toastify'
import userService from '../../../../../../services/api/user.js'
import MatchingComponent from './MatchingComponent.js'

export default function WeekFourAssessmentForm({ onNext, onBack }) {
  const questionsArray = [
    {
      title: 'What are values?',
      questionList: [
        'A. Beliefs and principles that guide our actions and decisions',
        'B. Emotions and feelings we experience daily',
        'C. Skills and talents we possess',
        'D. Goals and dreams we want to achieve',
      ],
    },
    {
      title:
        'Select one statement that does not show the importance of values.',
      questionList: [
        'A. They help us make decisions',
        'B. They guide our behavior',
        'C. They define our talents',
        'D. They help us understand what is most important to us',
      ],
    },
    {
      title: 'Which of the following is an example of a value?',
      questionList: [
        'A. Happiness',
        'B. Respect',
        'C. Excitement',
        'D. Intelligence',
      ],
    },
    {
      title: 'How can knowing your values help you in life?',
      questionList: [
        'A. It can make you rich',
        'B. It can help you make choices that align with your beliefs',
        'C. It can make you more popular',
        'D. It can give you superpowers',
      ],
    },
    {
      title:
        'Imagine you value honesty. What would you likely do in a situation where you found a lost wallet?',
      questionList: [
        'A. Keep the wallet for yourself',
        'B. Ignore the wallet and walk away',
        'C. Try to find the owner and return the wallet',
        'D. Take the money and leave the wallet',
      ],
    },
    {
      title:
        'Imagine you value responsibility, what would you likely do in a situation where the teacher asks the class to clean their lockers but nobody is doing it?',
      questionList: [
        'A. Wait for the cleaner to come and clean your locker',
        'B. Do nothing',
        'C. Clean your locker',
        'D. Ask your classmate to help you clean your locker',
      ],
    },
    {
      title: 'My value can influence how I treat other people',
      questionList: ['A. True', 'B. False'],
    },
    {
      title:
        "If Honesty is one of your values, what would be your best response to the following scenario. I accidentally broke my friend's favorite toy. No one saw me doing it. I would rather:",
      questionList: [
        'A. Say it was someone else.',
        'B. Pretend nothing happened.',
        'C. Tell my friend the truth immediately.',
        'D. Replace the toy with a new one quietly.',
      ],
    },
    {
      title:
        'Match the following statements in the scenario to their respective values',
      questionList: [],
    },
    {
      title:
        'Match the following statements in the scenario to their respective values.',
      questionList: [],
    },
  ]

  const leftItemsArray = ['Kindness', 'Respect', 'Responsibility']

  const rightItemsArray = [
    "Sarah remembers she has her own after-school activity but suggests they put David's books in his locker first so he isn’t late to his next class.",
    'As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.',
    'Sarah offers to help David with the books.',
    ,
  ]
  const leftItemsArray2 = ['Loyalty', 'Punctuality', 'Generousity']

  const rightItemsArray2 = [
    'Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.',
    'Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project.',
    'Despite having a busy schedule, Alex prioritizes helping Ben, honouring their friendship.',
    ,
  ]

  const handleNext = () => {
    console.log('All items matched. Moving to next screen.')
    // Navigate to the next screen or handle the next step
  }

  const [currentIndex, setCurrentIndex] = useState(1)
  const [answers, setAnswers] = useState(() => {
    const storedData = localStorage.getItem('week-four-assessment')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        return parsedData.assessment?.answers || []
      } catch (e) {
        console.error('Error parsing local storage data', e)
        return []
      }
    }
    return []
  })

  const [matchesSet1, setMatchesSet1] = useState([])
  const [matchesSet2, setMatchesSet2] = useState([])

  const handleMatch = (leftIndex, rightIndex) => {
    console.log(`Matched Left: ${leftIndex}, Right: ${rightIndex}`)
    setMatchesSet1((prev) => [...prev, { left: leftIndex, right: rightIndex }])
  }
  const handleMatch2 = (leftIndex, rightIndex) => {
    console.log(`Matched Left: ${leftIndex}, Right: ${rightIndex}`)
    setMatchesSet2((prev) => [...prev, { left: leftIndex, right: rightIndex }])
  }

  const handleQuestionCheck = (optionIndex) => {
    // Check if the answer for the current question has already been selected and persisted
    if (answers[currentIndex - 1] !== undefined) {
      toast.error('You cannot change your answer once selected.')
      return
    }

    // Allow the user to select an answer only if it's not already saved
    setAnswers((prevState) => {
      const newAnswers = [...prevState]
      newAnswers[currentIndex - 1] = optionIndex // Save the selected option
      return newAnswers
    })
  }

  const handleNextStepClick = () => {
    // Check if current step requires matching (questions 9 and 10)
    if (currentIndex === 9 && matchesSet1.length !== leftItemsArray.length) {
      toast.error('Please complete the matching before proceeding.')
      return
    }
    if (currentIndex === 10 && matchesSet2.length !== leftItemsArray2.length) {
      toast.error('Please complete the matching before proceeding.')
      return
    }

    // Ensure users select an answer in earlier questions
    if (answers[currentIndex - 1] === undefined && currentIndex <= 8) {
      toast.error('Please select an answer before proceeding.')
      return
    }

    // Move to the next question or screen
    if (currentIndex < questionsArray.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      saveWeekFourAssessment()
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

  useEffect(() => {
    const assessmentData = {
      week: 4,
      assessment: { answers, matchesSet1, matchesSet2 },
    }
    localStorage.setItem('week-four-assessment', JSON.stringify(assessmentData))
    console.log(assessmentData)
  }, [answers, matchesSet1])

  const saveWeekFourAssessment = () => {
    const storedData = localStorage.getItem('week-four-assessment')
    let savedAnswers = JSON.parse(storedData)
    console.log(savedAnswers)
    const correctAnswers = [0, 2, 1, 1, 2, 2, 1, 2]
    const correctMatchesSet1 = [
      { left: 0, right: 2 },
      { left: 1, right: 1 },
      { left: 2, right: 0 },
    ]
    const correctMatchesSet2 = [
      { left: 0, right: 0 },
      { left: 1, right: 1 },
      { left: 2, right: 2 },
    ]
    const valuesToCheck = savedAnswers.assessment.answers
    const correctCount = valuesToCheck.reduce((count, current, index) => {
      return current === correctAnswers[index] ? count + 1 : count
    }, 0)

    // Check Matching Questionsma
    const valuesToCheckForMatchSet1 = savedAnswers.assessment.matchesSet1
    const valuesToCheckForMatchSet2 = savedAnswers.assessment.matchesSet2

    const isMatchSet1Correct =
      JSON.stringify(valuesToCheckForMatchSet1) ===
      JSON.stringify(correctMatchesSet1)
    const isMatchSet2Correct =
      JSON.stringify(valuesToCheckForMatchSet2) ===
      JSON.stringify(correctMatchesSet2)

    const matchCount =
      (isMatchSet1Correct ? 3 : 0) + (isMatchSet2Correct ? 3 : 0) // 3 matches per set

    // Total questions
    const totalQuestions = 8 + 2

    const totalCorrect = correctCount + matchCount
    const percentage = (totalCorrect / totalQuestions) * 100

    toast.success(`You scored ${percentage}% in the quiz`)
    const courseId = '66853bf50118e2e0a02b6a5a'
    const dataToSend = {
      rating: percentage,
      assessments: savedAnswers.assessment,
      week: 4,
    }
    userService
      .postMyAssessment(courseId, dataToSend)
      .then((response) => {
        if (response.message === 'You have already taken the assessment') {
          toast.error('You have already taken the assessment') // Show error toast with the message
        } else {
          console.log('Submission successful:', response)
          toast.success('Submitted your asessment score') // Optional: Show success message
        }
      })
      .catch((error) => {
        console.error('Submission failed:', error)
        // toast.error("Submission failed. Please try again later."); // General error message
      })
  }
  const renderQuestion = () => {
    const question = questionsArray[currentIndex - 1]

    return (
      <div className='week-two'>
        <div className='assessment question-box'>
          {currentIndex <= 1 && (
            <div className='assessment-box'>
              <h2 style={{ color: '#FAFAFA', textAlign:"center" }}>Assessment</h2>
              <p style={{ color: '#FAFAFA' }} className='text-center'>
                Scenario around your values.
              </p>
            </div>
          )}
          <div style={{marginTop:"3rem"}} className='d-flex align-items-start mt-6'>
            <h1 style={{ color: '#5B616A' }}>{currentIndex}.</h1>
            <h2
              style={{ color: '#5B616A' }}
              className='text-start mb-0  fs-1 ms-3'
            >
              {question.title}
            </h2>
          </div>
          {currentIndex <= 8 && (
            <div
              style={{ marginLeft: '3rem' }}
              className='text-center checkbox-questions'
            >
              <ul className='p-0 mt-4 d-flex flex-column'>
                {question.questionList.map((item, index) => (
                  <li key={index} className='d-flex align-items-center'>
                    <img
                      onClick={() => handleQuestionCheck(index)}
                      className='cursor-pointer'
                      src={
                        answers[currentIndex - 1] === index
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
          )}
          {currentIndex === 9 && (
            <div className='match'>
              <MatchingComponent
                leftItems={leftItemsArray}
                rightItems={rightItemsArray}
                onMatch={handleMatch}
                onNext={handleNext}
              />
            </div>
          )}
          {currentIndex === 10 && (
            <div className='match'>
              <MatchingComponent
                leftItems={leftItemsArray2}
                rightItems={rightItemsArray2}
                onMatch={handleMatch2}
                onNext={handleNext}
              />
            </div>
          )}
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
