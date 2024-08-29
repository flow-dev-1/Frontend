// src/components/AssessmentForm.js
import React from 'react'
import WeekOneAssessmentForm from './WeekOneAssessmentForm'

const AssessmentForm = ({ onBack, setCurrentStep, courseId }) => {
  return (
    <div className='assessment-page'>
      <WeekOneAssessmentForm
        courseId={courseId}
        onBack={onBack}
        previous={() => setCurrentStep(13)}
        onSubmit={() => setCurrentStep(15)}
      />
    </div>
  )
}

export default AssessmentForm
