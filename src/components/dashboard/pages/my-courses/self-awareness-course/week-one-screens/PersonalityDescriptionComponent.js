import React, { useState } from 'react'
import { toast } from 'react-toastify'

const PersonalityDescriptionComponent = ({
  onBack,
  onNext,
  emotionalHand,
  friendshipHand,
  analyticHand,
  formData,
  actionHand,
}) => {
  // Find the form data for activity 8 (or whichever activity this is)
  const activityData =
    formData?.activities?.find((act) => act.activity === 8) || {}
  console.log(activityData)

  const initialPersonality = activityData?.answer?.selectedPersonality || ''
  const initialExplanation = activityData?.answer?.explanation || ''

  const [selectedPersonality, setSelectedPersonality] =
    useState(initialPersonality)
  const [explanation, setExplanation] = useState(initialExplanation) // Initialize with initialExplanation

  const handlePersonalitySelect = (type) => {
    setSelectedPersonality(type)
  }

  const handleExplanationChange = (event) => {
    setExplanation(event.target.value)
  }

  const handleNext = () => {
    if (explanation.trim()) {
      onNext({ selectedPersonality, explanation })
    } else {
      toast.error('Please provide an explanation.')
    }
  }

  return (
    <div className=''>
      <div className='question-box'>
        <div className='question-box-header mt-1'>
          <h1>Question:</h1>
          <h2 className='mb-0 d-flex ms-2 text-left'>
            Think about yourself, which of these personality colors describe
            you? Why do you think so?
          </h2>
        </div>
        <div className='personality-type mt-2'>
          <div
            className={`personality-option ${
              selectedPersonality === 'Emotional' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Emotional')}
          >
            <img src={emotionalHand} alt='Emotional' className='' />
            <p style={{ color: '#026AB7' }}>Blue -</p>
            <p>Emotional</p>
          </div>
          <div
            className={`personality-option ${
              selectedPersonality === 'Analytic' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Analytic')}
          >
            <img src={analyticHand} alt='Analytic' className='' />
            <p style={{ color: '#008B1E' }}>Green -</p>
            <p>Analytic</p>
          </div>
          <div
            className={`personality-option ${
              selectedPersonality === 'Friendship' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Friendship')}
          >
            <img src={friendshipHand} alt='Friendship' className='' />
            <p style={{ color: '#FEF900' }}>Yellow -</p>
            <p>Friendship</p>
          </div>
          <div
            className={`personality-option ${
              selectedPersonality === 'Action' ? 'selected' : ''
            }`}
            onClick={() => handlePersonalitySelect('Action')}
          >
            <img src={actionHand} alt='Action' className='' />
            <p style={{ color: '#B12623' }}>Red -</p>
            <p>Action</p>
          </div>
        </div>
        <div className="text-area-box px-5  mr-5">
          <textarea
            rows="6"
            placeholder="Type your answer here..."
            value={explanation} // Use explanation state variable here
            onChange={handleExplanationChange}
            style={{
              width: '100%', // Ensure the textarea takes full width of the parent
              padding: '20px', // Add some padding for better spacing
              boxSizing: 'border-box',
            }}
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
