// src/components/AssessmentForm.js
import React from 'react'
import WeekOneAssessmentForm from './WeekOneAssessmentForm'

const AssessmentForm = ({ onBack, setCurrentStep }) => {
  return (
    <div className='assessment-page'>
      <WeekOneAssessmentForm
        onBack={onBack}
        previous={() => setCurrentStep(13)}
        onSubmit={() => setCurrentStep(15)}
      />
    </div>
  )
}

export default AssessmentForm
