import React, { useState, useEffect } from 'react'
import '../newcourse.css'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import strengthImg from '../../../../../../assets/selfawareness-images/strength.png'
import weeknessImg from '../../../../../../assets/selfawareness-images/weakness.png'
import { toast } from 'react-toastify'

export default function ScenarioQuestions({
  onBack,
  onNext,
  formData,
  activityIndex,
}) {
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
      questionListNegative: ['Talkative', 'Selfishness', 'Impatience'],
    },
    {
      title:
        'Imagine you’re working on a group project at school. Your group is struggling to come up with an idea for the project. As a member of the team, how would you help?',
      questionList: [
        'Leadership',
        'Communication',
        'Team-work',
        'Problem-Solving',
        'Organization',
      ],
      questionListNegative: [
        'Impatience',
        'De-organization',
        'Inability to work with a team',
      ],
    },
    {
      title:
        'Is there a sport you dislike? What sport is this? Now imagine you were asked to represent your house in this particular sport, for your School’s inter-house sport competition, to win a laptop and a gaming console. How would you go about this?',
      questionList: [
        'Determination',
        'Goal-orientation',
        'Adoptability',
        'Team-spirit',
        'Resilience',
      ],
      questionListNegative: ['Laziness', 'Easily fed up', 'Distraction'],
    },
  ]

  // Helper function to find index of each answer in questionsArray
  const getSelectedIndexes = (answers, list) => {
    return answers
      ? answers
          .map((answer) => list.indexOf(answer))
          .filter((index) => index !== -1)
      : []
  }

  // Function to extract the correct answers for strengths or weaknesses
  const getAnswersByQuestion = (activity, questionNumber, type) => {
    const answers = formData?.activities?.find(
      (activity) => activity.activity === activityIndex
    )?.answers

    return answers ? answers[`${type}Q${questionNumber}`] || [] : []
  }

  // Pre-fill strengthChecked state based on formData
  const [strengthChecked, setStrengthChecked] = useState(() =>
    questionsArray.reduce((acc, question, index) => {
      const questionNumber = index + 1 // Assuming questionsArray is ordered
      const answers = getAnswersByQuestion(
        activityIndex,
        questionNumber,
        'strengths'
      )
      acc[index] = getSelectedIndexes(answers, question.questionList)
      return acc
    }, {})
  )

  // Pre-fill weaknessChecked state based on formData
  const [weaknessChecked, setWeaknessChecked] = useState(() =>
    questionsArray.reduce((acc, question, index) => {
      const questionNumber = index + 1 // Assuming questionsArray is ordered
      const answers = getAnswersByQuestion(
        activityIndex,
        questionNumber,
        'weaknesses'
      )
      acc[index] = getSelectedIndexes(answers, question.questionListNegative)
      return acc
    }, {})
  )

  const [currentIndex, setCurrentIndex] = useState(1)
  const [reviewPopUp, setReviewPopUp] = useState(false)

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

  const handleStepClick = () => {
    // Validate that at least one strength and one weakness is selected
    const currentQuestionStrengths = strengthChecked[currentIndex - 1]
    const currentQuestionWeaknesses = weaknessChecked[currentIndex - 1]

    if (
      currentQuestionStrengths.length === 0 ||
      currentQuestionWeaknesses.length === 0
    ) {
      toast.error(
        'Please select at least one strength and one weakness before proceeding.'
      )
      return
    }

    if (currentIndex < questionsArray.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Prepare data for submission
      const data = questionsArray.reduce((acc, _, index) => {
        acc[`strengthsQ${index + 1}`] = strengthChecked[index].map(
          (optionIndex) => questionsArray[index].questionList[optionIndex]
        )
        acc[`weaknessesQ${index + 1}`] = weaknessChecked[index].map(
          (optionIndex) =>
            questionsArray[index].questionListNegative[optionIndex]
        )
        return acc
      }, {})

      onNext(data)
      console.log(data)
    }
  }

  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    } else {
      onBack()
    }
  }

  const renderQuestion = () => {
    const currentQuestion = questionsArray[currentIndex - 1]
    return (
      <div className='week-two scenario'>
        <div
          style={{ height: '550px' }}
          className='assessment question-box py-4'
        >
          <div
            className='scenario-number px-4 mt-8 mb-3 mx-auto'
            style={{ marginTop: '1rem' }}
          >
            <h1 className='text-center my-0'>Scenario {currentIndex}</h1>
          </div>
          <div className='question-box-header align-items-start'>
            <h1 className='mb-0 '>Question: </h1>
            <h2
              style={{ color: '#5B616A', fontSize: '38px' }}
              className='mb-0 ms-3 text-center'
            >
              {currentQuestion.title}
            </h2>
          </div>

          <div className='d-flex justify-content-around mt-2'>
            <div className='text-center checkbox-questions strength'>
              <img src={strengthImg} alt='' />
              <ul className='p-0 mt-4'>
                {currentQuestion.questionList.map((item, index) => (
                  <li key={index} className='d-flex my-1'>
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
              <img style={{ width: '120px' }} src={weeknessImg} alt='' />
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
        <ul className='p-0 mt-2'>
          {Array.from({ length: questionsArray.length }, (_, index) => (
            <li
              key={index + 1}
              className={currentIndex >= index + 1 ? 'answered' : ''}
            ></li>
          ))}
        </ul>
      </div>

      <div className='d-flex align-items-center justify-content-around mx-auto mt-2'>
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
