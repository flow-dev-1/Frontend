import React, { useState, useEffect } from 'react'
import '../newcourse.css'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import { toast } from 'react-toastify'
import userService from '../../../../../../services/api/user.js'

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
      title: 'Match the actions with the values they represent:',
      questionList: [],
    },
    {
      title: 'Match the scenarios with the appropriate responses:',
      questionList: [],
    },
  ]

  const leftItemsArray = [
    ['Kindness', 'Respect', 'Responsibility'],
    ['Loyalty', 'Punctuality', 'Generosity'],
  ]

  const rightItemsArray = [
    [
      "Sarah remembers she has her own after-school activity but suggests they put David's books in his locker first so he isn’t late to his next class.",
      'As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.',
      'Sarah offers to help David with the books.',
    ],
    [
      'Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project.',
      'Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project.',
      'Despite having a busy schedule, Alex prioritizes helping Ben, honouring their friendship.',
    ],
  ]

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
    if (
      (currentIndex === 9 && matchesSet1.length !== leftItemsArray[0].length) ||
      (currentIndex === 10 && matchesSet2.length !== leftItemsArray[1].length)
    ) {
      toast.error('Please complete the matching before proceeding.')
      return
    }

    if (answers[currentIndex - 1] === undefined && currentIndex <= 8) {
      toast.error('Please select an answer before proceeding.')
      return
    }

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
  }, [answers, matchesSet1, matchesSet2])

  const colors = ['#FFB6C1', '#ADD8E6', '#90EE90'] // Colors for pairing

  const [selectedLeft1, setSelectedLeft1] = useState(null)
  const [selectedRight1, setSelectedRight1] = useState(null)

  const [selectedLeft2, setSelectedLeft2] = useState(null)
  const [selectedRight2, setSelectedRight2] = useState(null)

  const handleLeftItemClick1 = (index) => {
    if (selectedRight1 !== null) {
      const newMatch = {
        left: index,
        right: selectedRight1,
        color: colors[matchesSet1.length % colors.length],
      }

      setMatchesSet1((prev) => [...prev, newMatch])

      // Save updated matches in localStorage
      const updatedAssessment = {
        week: 4,
        assessment: {
          answers, // Preserve answers
          matchesSet1: [...matchesSet1, newMatch], // Update the first match set
          matchesSet2, // Preserve second match set
        },
      }
      localStorage.setItem(
        'week-four-assessment',
        JSON.stringify(updatedAssessment)
      )

      setSelectedLeft1(null)
      setSelectedRight1(null)
    } else {
      setSelectedLeft1(index)
    }
  }

  const handleRightItemClick1 = (index) => {
    if (selectedLeft1 !== null) {
      setMatchesSet1((prev) => [
        ...prev,
        {
          left: selectedLeft1,
          right: index,
          color: colors[matchesSet1.length % colors.length],
        },
      ])
      setSelectedLeft1(null)
      setSelectedRight1(null)
    } else {
      setSelectedRight1(index)
    }
  }

  const handleLeftItemClick2 = (index) => {
    if (selectedRight2 !== null) {
      const newMatch = {
        left: index,
        right: selectedRight2,
        color: colors[matchesSet2.length % colors.length],
      }

      setMatchesSet2((prev) => [...prev, newMatch])

      // Save updated matches in localStorage
      const updatedAssessment = {
        week: 4,
        assessment: {
          answers, // Preserve answers
          matchesSet1, // Preserve first match set
          matchesSet2: [...matchesSet2, newMatch], // Update the second match set
        },
      }
      localStorage.setItem(
        'week-four-assessment',
        JSON.stringify(updatedAssessment)
      )

      setSelectedLeft2(null)
      setSelectedRight2(null)
    } else {
      setSelectedLeft2(index)
    }
  }

  const handleRightItemClick2 = (index) => {
    if (selectedLeft2 !== null) {
      setMatchesSet2((prev) => [
        ...prev,
        {
          left: selectedLeft2,
          right: index,
          color: colors[matchesSet2.length % colors.length],
        },
      ])
      setSelectedLeft2(null)
      setSelectedRight2(null)
    } else {
      setSelectedRight2(index)
    }
  }

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

    // Check Matching Questions
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
    const leftItems = leftItemsArray[currentIndex - 9] || []
    const rightItems = rightItemsArray[currentIndex - 9] || []

    return (
      <div className='week-two'>
        <div className='assessment question-box'>
          {currentIndex <= 1 && (
            <div className='assessment-box'>
              <h2>Assessment</h2>
              <p className='text-center'>Scenario around your values.</p>
            </div>
          )}
          <div className='d-flex align-items-start mt-3'>
            <h1>{currentIndex}.</h1>
            <h2 className='text-center mb-0 fs-1 ms-3'>{question.title}</h2>
          </div>
          {currentIndex <= 8 && (
            <div className='text-center checkbox-questions'>
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
              <div className='matching-container'>
                {/* Left Column */}
                <div className='left-column '>
                  {leftItems.map((item, index) => (
                    <div
                      id={`left-item-1-${index}`}
                      key={index}
                      className='match-item text-area-box-2'
                      style={{
                        backgroundColor: getColorForItem(
                          index,
                          'left',
                          matchesSet1
                        ),
                        border: 'none',
                        padding: '1.5rem',
                      }}
                      onClick={() => handleLeftItemClick1(index)}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className='right-column'>
                  {rightItems.map((item, index) => (
                    <div
                      id={`right-item-1-${index}`}
                      key={index}
                      className='match-item text-area-box-3'
                      style={{
                        backgroundColor: getColorForItem(
                          index,
                          'right',
                          matchesSet1
                        ),
                        padding: '1rem',
                      }}
                      onClick={() => handleRightItemClick1(index)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {currentIndex === 10 && (
            <div className='match'>
              <div className='matching-container'>
                {/* Left Column */}
                <div className='left-column  '>
                  {leftItems.map((item, index) => (
                    <div
                      id={`left-item-2-${index}`}
                      key={index}
                      className='match-item text-area-box-2 '
                      style={{
                        backgroundColor: getColorForItem(
                          index,
                          'left',
                          matchesSet2
                        ),
                        border: 'none',
                        textAlign: 'left',
                        padding: '1rem',
                      }}
                      onClick={() => handleLeftItemClick2(index)}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className='right-column '>
                  {rightItems.map((item, index) => (
                    <div
                      id={`right-item-2-${index}`}
                      key={index}
                      className='match-item text-area-box-3'
                      style={{
                        backgroundColor: getColorForItem(
                          index,
                          'right',
                          matchesSet2
                        ),
                        border: 'none',
                        padding: '1rem',
                      }}
                      onClick={() => handleRightItemClick2(index)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const getColorForItem = (index, side, matches) => {
    const match = matches.find((match) => match[side] === index)
    return match ? match.color : 'transparent'
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
