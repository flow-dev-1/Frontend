// src/components/AssessmentForm.js
import React from 'react'
import WeekOneAssessmentForm from './WeekOneAssessmentForm'

const AssessmentForm = ({ setCurrentStep }) => {
  return (
    <div className='assessment-page'>
      <WeekOneAssessmentForm
        previous={() => setCurrentStep(13)}
        onSubmit={() => setCurrentStep(15)}
      />
    </div>
  )
}

export default AssessmentForm
