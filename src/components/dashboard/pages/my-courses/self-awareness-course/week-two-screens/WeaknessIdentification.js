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
  const [questionChecked, setQuestionChecked] = useState(
    questionsArray.reduce((acc, _, index) => ({ ...acc, [index]: false }), {})
  )
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Update selected answers whenever questionChecked state changes
    const answers = Object.entries(questionChecked)
      .filter(([_, isChecked]) => isChecked)
      .map(([index]) => questionsArray[index])

    setSelectedAnswers(answers)
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

    setIsSubmitting(true)
    onSubmit({ weaknesses: selectedAnswers }) // Pass the selected answers
    setIsSubmitting(false)
  }

  // Check if at least one question is checked
  const isSubmitDisabled = selectedAnswers.length === 0

  return (
    <div className=''>
      <div className='week-two question-box py-4'>
        <div className='d-flex align-items-start'>
          <div className='question-box-header mx-auto'>
            <h1 className='mb-0 '>Question: </h1>
            <h2 className='mb-0 d-flex ms-3'>Identify Your Weakness</h2>
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
        <div className='d-flex justify-content-center mt-4'></div>
      </div>
      <NavigationButtons onBack={onBack} onNext={handleSubmit} />
    </div>
  )
}
