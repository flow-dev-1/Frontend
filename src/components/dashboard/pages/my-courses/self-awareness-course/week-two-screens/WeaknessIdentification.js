import React, { useState, useEffect } from 'react'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'

import ProgressionButtons from '../components/ProgressionButtons';

export default function WeaknessIdentification({
  formData,
  onNext,
  onBack,
  activityIndex,
}) {
  const questionsArray = [
    'Anxious',
    'Insecure',
    'Pessimistic',
    'Easily distracted',
    'Shy',
    'Jealous',
    'Talkative',
    'Forgetful',
    'Overly competitive',
    'Rigid',
    'Passive',
    'Impulsive',
    'Overconfident',
    'Perfectionist',
    'Stubborn',
    'Lazy',
    'Inflexible',
    'Judgmental',
    'Procrastinator',
    'Overly emotional',
    'Moody',
    'Sensitive',
    'Overly critical',
    'Disorganized',
    'Too independent',
  ]

  // Find answers for the current activity index in formData
  const currentActivityData = formData?.activities.find(
    (item) => item.activity === activityIndex
  )

  // Extract saved answers if they exist
  const savedAnswers =
    currentActivityData &&
      currentActivityData.answers &&
      currentActivityData.answers.weakness
      ? currentActivityData.answers.weakness
      : []

  // Initialize state for checked questions based on savedAnswers
  const [questionChecked, setQuestionChecked] = useState({})

  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (currentActivityData && currentActivityData.answers && currentActivityData.answers.weakness) {
      const saved = currentActivityData.answers.weakness;
      setQuestionChecked(
        questionsArray.reduce(
          (acc, question, index) => ({
            ...acc,
            [index]: saved.includes(question),
          }),
          {}
        )
      );
      setSelectedAnswers(saved);
    } else {
      setQuestionChecked({});
      setSelectedAnswers([]);
    }
  }, [formData, activityIndex]);

  useEffect(() => {
    // Update selected answers whenever questionChecked state changes
    const answers = Object.entries(questionChecked)
      .filter(([_, isChecked]) => isChecked)
      .map(([index]) => questionsArray[index])

    setSelectedAnswers(answers)
  }, [questionChecked])

  const handleQuestionCheck = (questionIndex) => {
    setErrorMessage('')
    setQuestionChecked((prevState) => ({
      ...prevState,
      [questionIndex]: !prevState[questionIndex], // Toggle the checked state
    }))
  }

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) {
      setErrorMessage('Please select at least one weakness.')
      return false
    }

    setErrorMessage('')
    onNext({ weakness: selectedAnswers }) // Proceed to the next step
  }

  return (
    <div className=''>
      <div className='week-two question-box py-4'>
        <div className='d-flex align-items-start'>
          <div className='question-box-header mx-auto'>
            <h1 className='mb-0 '>Question: </h1>
            <h2 className='mb-0 d-flex ms-3' style={{ color: '#5B616A' }}>
              Identify Your Weaknesses
            </h2>
          </div>
        </div>
        <div className='assessment checkbox-questions mt-4'>
          <ul className='p-0'>
            {questionsArray.map((item, index) => (
              <li key={index} className='d-flex'>
                <img
                  onClick={() => handleQuestionCheck(index)}
                  className='cursor-pointer'
                  src={questionChecked[index] ? checkedImage : unCheckedImage}
                  alt=''
                />
                <p className='question-p ms-2 text-nowrap'>{item}</p>
              </li>
            ))}
          </ul>
        </div>
        {errorMessage && <div className='text-danger mt-3'>{errorMessage}</div>}
      </div>
      <div className="mt-3">
        <ProgressionButtons
          variant={'both'}
          onClickNext={handleSubmit}
          onClickPrev={onBack}
        />
      </div>
    </div>
  )
}
