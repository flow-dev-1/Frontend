import React, { useState } from 'react'
import '../newcourse.css'
import Modal from 'react-modal'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import NavigationButtons from './NavigationButtons'

Modal.setAppElement('#root')

export default function CoreValuesQuestion({ onBack, onNext, onSubmit }) {
  const [selectedValues, setSelectedValues] = useState([])

  const questionsArray = [
    {
      title: [
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
        'Kindness',
        'Tolerance',
        'Patience',
        'Friendship',
      ],
    },
  ]

  const handleQuestionCheck = (value) => {
    setSelectedValues((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((v) => v !== value)
      } else {
        return [...prevState, value]
      }
    })
  }

  const handleNextClick = () => {
    if (selectedValues.length < 4) {
      alert('Please select at least four core values before proceeding.')
      return
    }
    onNext(selectedValues) // Pass the selected values to the onNext function
  }

  const renderQuestion = () => {
    const currentQuestion = questionsArray[0]

    if (currentQuestion && currentQuestion.title) {
      return (
        <div className=''>
          <div className='mindset question-box'>
            <div className='mt-2 '>
              <div className='question-box-header align-items-start'>
                <h1 className='mb-0 '>Instruction: </h1>
                <h2 className='mb-0 d-flex ms-3 text-left'>
                  Identify four (4) core values that resonate with you the most.
                </h2>
              </div>
              <div className='flip-div'>
                <ul className='p-0 mt-4 '>
                  {currentQuestion.title.map((item, index) => (
                    <li
                      key={index}
                      className='d-flex align-items-center justify-content-between'
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
          <NavigationButtons onBack={onBack} onNext={handleNextClick} />
        </div>
      )
    }

    return null
  }

  return <div>{renderQuestion()}</div>
}
