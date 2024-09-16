import React, { useState, useEffect } from 'react'
import '../newcourse.css'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import NavigationButtons from './NavigationButtons'
import { toast } from 'react-toastify'

export default function CoreValuesQuestion({
  onBack,
  onNext,
  formData,
  activityIndex,
}) {
  // Retrieve answers from formData for the current activity index
  const initialSelectedValues =
    formData.activities.find(
      (activity) => activity.activity === activityIndex && activity.answers
    )?.answers || []

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues)

  const questionsArray = [
    'Generosity',
    'Respect',
    'Leadership',
    'Responsibility',
    'Integrity',
    'Empathy',
    'Compassion',
    'Gratitude',
    'Courage',
    'Forgiveness',
    'Perseverance',
    'Cooperation',
  ]

  // Toggle the selection of a question
  const handleQuestionCheck = (item) => {
    setSelectedValues((prevState) => {
      if (prevState.includes(item)) {
        return prevState.filter((value) => value !== item)
      } else {
        return [...prevState, item]
      }
    })
  }

  // Proceed to the next step or submit answers
  const handleNext = () => {
    // Ensure at least 4 values are selected
    if (selectedValues.length < 4) {
      toast.error('Please select at least four core values before proceeding.')
      return
    }
    // Submit the selected values
    onNext(selectedValues)
  }

  // Render the list of questions
  const renderQuestions = () => {
    return (
      <div className='mindset question-box'>
        <div className='mt-2'>
          <div className='question-box-header align-items-start'>
            <h1 className='mb-0'>Instruction:</h1>
            <h2
              className='mb-0 d-flex ms-3 text-left'
              style={{ color: '#5b6161' }}
            >
              Identify four (4) core values that resonate with you the most.
            </h2>
          </div>
          <div className='flip-div'>
            <ul
              className='p-0 mt-4'
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                justifyContent: 'center',
              }}
            >
              {questionsArray.map((item, index) => (
                <li
                  key={index}
                  className='d-flex align-items-center m-2'
                  style={{
                    flex: '0 0 30%',
                    maxWidth: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p className='question-p'>{item}</p>
                  </div>
                  <img
                    onClick={() => handleQuestionCheck(item)}
                    className='cursor-pointer'
                    src={
                      selectedValues.includes(item)
                        ? checkedImage
                        : unCheckedImage
                    }
                    alt=''
                  />
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
      {renderQuestions()}

      <NavigationButtons onBack={onBack} onNext={handleNext} />
    </div>
  )
}
