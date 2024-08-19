import React, { useState } from 'react'
import ParentGuardianFormModal from './ParentGuardianFormModal'
import StudentDetailsFormModal from './StudentDetailFormModal'
import './onboarding-profile.css'
import ParentGuardianFormUpdate from './parentProfileUpdate'
import StudentDetailsFormProfile from './studentProfileUpdate'

export default function StudentUpdateProfileModal({ user, onClose }) {
  const [step, setStep] = useState(1) // Step 1 for Parent/Guardian Info, Step 2 for Student Details
  const [parentFormData, setParentFormData] = useState(user) // State to store form data

  console.log(parentFormData)
  const handleParentFormSubmit = (data) => {
    setParentFormData(data) // Save form data when continue is clicked
    setStep(2) // Move to the next step
  }

  const onSubmit = () => {
    if (step === 1) {
      // Move to the next step
      setStep(2)
    } else {
      // Final submission
      console.log('Final submission data', parentFormData)
    }
  }

  return (
    <div>
      {step === 1 && (
        <ParentGuardianFormUpdate
          onSubmit={handleParentFormSubmit}
          setStep={setStep}
          user={user}
          onClose={onClose}
          initialData={parentFormData} // Pass the form data as initial values
        />
      )}
      {step === 2 && (
        <StudentDetailsFormProfile
          onSubmit={onSubmit}
          onClose={onClose}
          user={user}
          setStep={setStep}
          parentFormData={parentFormData}
        />
      )}
    </div>
  )
}
