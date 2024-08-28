import React, { useState } from 'react'
import { toast } from 'react-toastify'

const PersonalityDescriptionComponent = ({
  onBack,
  onNext,
  emotionalHand,
  friendshipHand,
  analyticHand,
  actionHand,
}) => {
  const [selectedPersonality, setSelectedPersonality] = useState('')
  const [explanation, setExplanation] = useState('')

  const handlePersonalitySelect = (type) => {
    setSelectedPersonality(type)
    setExplanation(type) // Update the text area with the selected personality type
  }

  const handleExplanationChange = (event) => {
    setExplanation(event.target.value)
  }

  const handleNext = () => {
    if (selectedPersonality && explanation) {
      onNext({ selectedPersonality, explanation })
    } else {
      toast.error(
        'Please select a personality type and provide an explanation.'
      )
    }
  }

  return (
    <div className=''>
      <div className='question-box'>
        <div className='question-box-header mt-3'>
          <h1 className='mb-0'>Question:</h1>
          <h2 className='mb-0 d-flex ms-3 text-left'>
            Think about yourself, which of these personality colors describe
            you? Why do you think so?
          </h2>
        </div>
        <div className='personality-type mt-5'>
          <div
            className={`personality-option ${
              selectedPersonality === 'Emotional' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Emotional')}
          >
            <img src={emotionalHand} alt='emotionalHand image' className='' />
            <p>Emotional</p>
          </div>
          <div
            className={`personality-option ${
              selectedPersonality === 'Analytic' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Analytic')}
          >
            <img src={analyticHand} alt='analyticHand image' className='' />
            <p>Analytic</p>
          </div>
          <div
            className={`personality-option ${
              selectedPersonality === 'Friendship' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Friendship')}
          >
            <img src={friendshipHand} alt='friendshipHand image' className='' />
            <p>Friendship</p>
          </div>
          <div
            className={`personality-option ${
              selectedPersonality === 'Action' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Action')}
          >
            <img src={actionHand} alt='actionHand image' className='' />
            <p>Action</p>
          </div>
        </div>
        <div className='text-area-box px-4 mt-4'>
          <textarea
            rows='6'
            placeholder='Type your answer here...'
            value={explanation}
            onChange={handleExplanationChange}
          ></textarea>
        </div>
      </div>

      <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
        <button className='btn progress-btn btn-light' onClick={onBack}>
          {'<<<'} Back
        </button>
        <button className='btn progress-btn btn-dark' onClick={handleNext}>
          Next {'>>>'}
        </button>
      </div>
    </div>
  )
}

export default PersonalityDescriptionComponent
