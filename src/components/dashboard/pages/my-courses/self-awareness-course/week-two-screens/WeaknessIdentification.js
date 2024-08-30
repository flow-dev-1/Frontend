import React, { useState, useEffect } from 'react'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import '../newcourse.css'
import NavigationButtons from './NavigationButtons'
import { toast } from 'react-toastify'

export default function StrengthIdentification({ onSubmit, onNext, onBack }) {
  const questionsArray = [
    'creative',
    'energetic',
    'honest',
    'responsible',
    'organized',
    'patient',
    'friendly',
    'confident',
    'good listener',
    'team player',
    'brave',
    'analytical',
    'compassionate',
    'hardworking',
    'trustworthy',
    'flexible',
    'determined',
    'emphatic',
    'cooperative',
    'problem solver',
    'curious',
    'dependable',
    'adaptable',
    'enthusiastic',
    'kind',
    'generous',
    'respectful',
    'good communicator',
    'ability to lead',
    'detail-oriented',
  ]

  // Initialize state for checked questions and selected answers
  const [questionChecked, setQuestionChecked] = useState(() => {
    const savedState = JSON.parse(localStorage.getItem('strengthsChecked'))
    return (
      savedState ||
      questionsArray.reduce((acc, _, index) => ({ ...acc, [index]: false }), {})
    )
  })

  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedStrengths')) || []
  })

  useEffect(() => {
    // Update selected answers whenever questionChecked state changes
    const answers = Object.entries(questionChecked)
      .filter(([_, isChecked]) => isChecked)
      .map(([index]) => questionsArray[index])

    setSelectedAnswers(answers)
    // Save the selected answers and checked state to localStorage
    localStorage.setItem('selectedStrengths', JSON.stringify(answers))
    localStorage.setItem('strengthsChecked', JSON.stringify(questionChecked))
  }, [questionChecked])

  const handleQuestionCheck = (questionIndex) => {
    setQuestionChecked((prevState) => ({
      ...prevState,
      [questionIndex]: !prevState[questionIndex], // Toggle the checked state
    }))
  }

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) {
      // Show an alert if no answers are selected
      toast.error('Please select at least one strength.')
      return
    }

    onSubmit({ weaknesses: selectedAnswers }) // Pass the selected answers
    onNext() // Proceed to the next step
  }

  return (
    <div className=''>
      <div className='week-two question-box py-4'>
        <div className='d-flex align-items-start'>
          <div className='question-box-header mx-auto'>
            <h1 className='mb-0 '>Question: </h1>
            <h2 className='mb-0 d-flex ms-3'>Identify Your Weaknesses</h2>
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
      </div>
      <NavigationButtons onBack={onBack} onNext={handleSubmit} />
    </div>
  )
}
