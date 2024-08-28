import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    // Load persisted state from localStorage
    const savedExplanation = localStorage.getItem('personalityExplanation')
    const savedPersonality = localStorage.getItem('selectedPersonality')
    if (savedExplanation) {
      setExplanation(savedExplanation)
    }
    if (savedPersonality) {
      setSelectedPersonality(savedPersonality)
    }
  }, [])

  useEffect(() => {
    // Persist explanation and selected personality to localStorage whenever they change
    localStorage.setItem('personalityExplanation', explanation)
    localStorage.setItem('selectedPersonality', selectedPersonality)
  }, [explanation, selectedPersonality])

  const handlePersonalitySelect = (type) => {
    setSelectedPersonality(type)
    setExplanation(type) // Set the text area with the selected personality type
  }

  const handleExplanationChange = (event) => {
    setExplanation(event.target.value)
  }

  const handleNext = () => {
    if (explanation.trim()) {
      onNext({ answer: explanation })
    } else {
      toast.error('Please provide an explanation.')
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
            <img src={emotionalHand} alt='Emotional' className='' />
            <p>Emotional</p>
          </div>
          <div
            className={`personality-option ${
              selectedPersonality === 'Analytic' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Analytic')}
          >
            <img src={analyticHand} alt='Analytic' className='' />
            <p>Analytic</p>
          </div>
          <div
            className={`personality-option ${
              selectedPersonality === 'Friendship' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Friendship')}
          >
            <img src={friendshipHand} alt='Friendship' className='' />
            <p>Friendship</p>
          </div>
          <div
            className={`personality-option ${
              selectedPersonality === 'Action' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Action')}
          >
            <img src={actionHand} alt='Action' className='' />
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
