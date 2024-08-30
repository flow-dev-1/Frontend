import React, { useState, useEffect } from 'react'
import '../newcourse.css'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import strengthImg from '../../../../../../assets/selfawareness-images/strength.png'
import weeknessImg from '../../../../../../assets/selfawareness-images/weakness.png'

export default function ScenarioQuestions({ onSubmit, previous }) {
  // Load saved data from localStorage
  const loadSavedData = () => {
    const savedData = localStorage.getItem('scenarioSelections')
    return savedData ? JSON.parse(savedData) : null
  }

  const questionsArray = [
    {
      title:
        'A friend is feeling sad and needs someone to talk to because they just failed a test. They come to you for support. How would you help?',
      questionList: [
        'Empathy',
        'Active Listening',
        'Encouragement',
        'Problem-Solving',
        'Patience',
      ],
      questionListNegative: ['talkative', 'selfishness', 'impatience'],
    },
    {
      title:
        'Imagine you’re working on a group project at school. Your group is struggling to come up with an idea for the project. As a member of the team, how would you help?',
      questionList: [
        'Leadership',
        'communication',
        'team-work',
        'Problem-Solving',
        'organization',
      ],
      questionListNegative: [
        'impatience',
        'de-organization',
        'inability to work with a team',
      ],
    },
    {
      title:
        'Is there a sport you dislike? What sport is this? Now imagine you were asked to represent your house in this particular sport, for your School’s inter-house sport competition, to win a laptop and a gaming console. How would you go about this?',
      questionList: [
        'determination',
        'goal-orientation',
        'adoptability',
        'team-spirit',
        'resilience',
      ],
      questionListNegative: ['laziness', 'easily fed up', 'distraction'],
    },
  ]

  const savedData = loadSavedData()

  // Initialize states for strength, weakness selections, and currentIndex
  const [currentIndex, setCurrentIndex] = useState(savedData?.currentIndex || 1)
  const [reviewPopUp, setReviewPopUp] = useState(false)
  const [strengthChecked, setStrengthChecked] = useState(
    savedData?.strengthChecked ||
      questionsArray.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {})
  )
  const [weaknessChecked, setWeaknessChecked] = useState(
    savedData?.weaknessChecked ||
      questionsArray.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {})
  )

  const handleQuestionCheck = (questionIndex, optionIndex, isStrength) => {
    if (isStrength) {
      setStrengthChecked((prevState) => {
        const updated = { ...prevState }
        if (updated[questionIndex].includes(optionIndex)) {
          updated[questionIndex] = updated[questionIndex].filter(
            (i) => i !== optionIndex
          )
        } else {
          updated[questionIndex] = [...updated[questionIndex], optionIndex]
        }
        return updated
      })
    } else {
      setWeaknessChecked((prevState) => {
        const updated = { ...prevState }
        if (updated[questionIndex].includes(optionIndex)) {
          updated[questionIndex] = updated[questionIndex].filter(
            (i) => i !== optionIndex
          )
        } else {
          updated[questionIndex] = [...updated[questionIndex], optionIndex]
        }
        return updated
      })
    }
  }

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    const dataToSave = {
      currentIndex,
      strengthChecked,
      weaknessChecked,
    }
    localStorage.setItem('scenarioSelections', JSON.stringify(dataToSave))
  }, [currentIndex, strengthChecked, weaknessChecked])

  const handleStepClick = () => {
    // Validate that at least one strength and one weakness is selected
    const currentQuestionStrengths = strengthChecked[currentIndex - 1]
    const currentQuestionWeaknesses = weaknessChecked[currentIndex - 1]

    if (
      currentQuestionStrengths.length === 0 ||
      currentQuestionWeaknesses.length === 0
    ) {
      alert(
        'Please select at least one strength and one weakness before proceeding.'
      )
      return
    }

    if (currentIndex < questionsArray.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Prepare data for submission
      const strengths = questionsArray
        .map((_, index) =>
          strengthChecked[index].map(
            (optionIndex) => questionsArray[index].questionList[optionIndex]
          )
        )
        .flat()

      const weaknesses = questionsArray
        .map((_, index) =>
          weaknessChecked[index].map(
            (optionIndex) =>
              questionsArray[index].questionListNegative[optionIndex]
          )
        )
        .flat()

      onSubmit({ strengths, weaknesses })
    }

    if (currentIndex === 5) {
      setTimeout(() => {
        setReviewPopUp(true)

        setTimeout(() => {
          setReviewPopUp(false)
        }, 10000)
      }, 6000)
    }
  }

  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    } else {
      previous()
    }
  }

  const renderQuestion = () => {
    const currentQuestion = questionsArray[currentIndex - 1]
    return (
      <div className='week-two scenario'>
        <div className='assessment question-box py-4'>
          <div className='scenario-number px-4 mb-3 mx-auto'>
            <h1 className='text-center my-0'>Scenario {currentIndex}</h1>
          </div>
          <div className='question-box-header align-items-start'>
            <h1 className='mb-0 '>Question: </h1>
            <h2 className='mb-0 ms-3 text-center'>{currentQuestion.title}</h2>
          </div>

          <div className='d-flex justify-content-around mt-5'>
            <div className='text-center checkbox-questions strength'>
              <img src={strengthImg} alt='' />
              <ul className='p-0 mt-4'>
                {currentQuestion.questionList.map((item, index) => (
                  <li key={index} className='d-flex my-2'>
                    <img
                      onClick={() =>
                        handleQuestionCheck(currentIndex - 1, index, true)
                      }
                      className='cursor-pointer'
                      src={
                        strengthChecked[currentIndex - 1].includes(index)
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
            <div className='d-flex flex-column text-center checkbox-questions weakness'>
              <img src={weeknessImg} alt='' />
              <ul className='p-0 mt-4'>
                {currentQuestion.questionListNegative.map((item, index) => (
                  <li key={index} className='d-flex my-2'>
                    <img
                      onClick={() =>
                        handleQuestionCheck(currentIndex - 1, index, false)
                      }
                      className='cursor-pointer'
                      src={
                        weaknessChecked[currentIndex - 1].includes(index)
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
        <button className='btn progress-btn btn-dark' onClick={handleStepClick}>
          Next {'>>>'}
        </button>
      </div>
    </div>
  )
}
