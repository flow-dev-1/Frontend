import React, { useState, useEffect } from 'react'
import '../newcourse.css'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import { toast } from 'react-toastify'

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
      title: 'Why are values important? (Select all that apply)',
      questionList: [
        'A. They help us make decisions',
        'B. They guide our behavior',
        'C. They define our talents',
        'D. They help us understand what is most important to us',
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
    ['Honesty', 'Empathy', 'Patience'],
  ]

  const rightItemsArray = [
    [
      "Sarah remembers she has her own after-school activity but suggests they put David's books in his locker first so he isn’t late to his next class.",
      'As they walk, Sarah asks David if everything is alright but doesn’t pry if he doesn’t want to talk.',
      'Sarah offers to help David with the books.',
    ],
    [
      'Tom tells the truth about accidentally breaking the vase.',
      "Jane listens to her friend's problems without interrupting.",
      'Emily waits patiently for her turn to speak during a group discussion.',
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
    setAnswers((prevState) => {
      const newAnswers = [...prevState]
      newAnswers[currentIndex - 1] = optionIndex
      return newAnswers
    })
  }

  const handleNextStepClick = () => {
    if (
      (currentIndex === 3 && matchesSet1.length !== leftItemsArray[0].length) ||
      (currentIndex === 4 && matchesSet2.length !== leftItemsArray[1].length)
    ) {
      toast.error('Please complete the matching before proceeding.')
      return
    }

    if (answers[currentIndex - 1] === undefined && currentIndex <= 2) {
      toast.error('Please select an answer before proceeding.')
      return
    }

    if (currentIndex < questionsArray.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
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
      setMatchesSet1((prev) => [
        ...prev,
        {
          left: index,
          right: selectedRight1,
          color: colors[matchesSet1.length % colors.length],
        },
      ])
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
      setMatchesSet2((prev) => [
        ...prev,
        {
          left: index,
          right: selectedRight2,
          color: colors[matchesSet2.length % colors.length],
        },
      ])
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

  const renderQuestion = () => {
    const question = questionsArray[currentIndex - 1]
    const leftItems = leftItemsArray[currentIndex - 3] || []
    const rightItems = rightItemsArray[currentIndex - 3] || []

    return (
      <div className='week-two'>
        <div className='assessment question-box'>
          {currentIndex === 1 && (
            <div className='assessment-box'>
              <h2>Assessment</h2>
              <p>Scenario around your values.</p>
            </div>
          )}
          <div className='d-flex align-items-start mt-3'>
            <h1>{currentIndex}.</h1>
            <h2 className='text-center mb-0 fs-1 ms-3'>{question.title}</h2>
          </div>
          {currentIndex <= 2 && (
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
          {currentIndex > 2 && currentIndex === 3 && (
            <div className='match'>
              <div className='matching-container'>
                {/* Left Column */}
                <div className='left-column'>
                  {leftItems.map((item, index) => (
                    <div
                      id={`left-item-1-${index}`}
                      key={index}
                      className='match-item'
                      style={{
                        backgroundColor: getColorForItem(
                          index,
                          'left',
                          matchesSet1
                        ),
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
                      className='match-item'
                      style={{
                        backgroundColor: getColorForItem(
                          index,
                          'right',
                          matchesSet1
                        ),
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
          {currentIndex > 3 && (
            <div className='match'>
              <div className='matching-container'>
                {/* Left Column */}
                <div className='left-column'>
                  {leftItems.map((item, index) => (
                    <div
                      id={`left-item-2-${index}`}
                      key={index}
                      className='match-item'
                      style={{
                        backgroundColor: getColorForItem(
                          index,
                          'left',
                          matchesSet2
                        ),
                      }}
                      onClick={() => handleLeftItemClick2(index)}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className='right-column'>
                  {rightItems.map((item, index) => (
                    <div
                      id={`right-item-2-${index}`}
                      key={index}
                      className='match-item'
                      style={{
                        backgroundColor: getColorForItem(
                          index,
                          'right',
                          matchesSet2
                        ),
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
    return match ? match.color : '#f0f0f0'
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
