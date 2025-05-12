import React, { useState } from 'react'
import ParentGuardianForm from './individual/ParentGaudianForm'
import StudentDetailsForm from './individual/StudentDetailsForm'
import '../onboarding.css'

export default function StudentRegistrationForm() {
  const [step, setStep] = useState(1) // Step 1 for Parent/Guardian Info, Step 2 for Student Details
  const [parentFormData, setParentFormData] = useState({}) // State to store form data

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
    }
  }

  return (
    <div>
      {step === 1 && (
        <ParentGuardianForm
          onSubmit={handleParentFormSubmit}
          setStep={setStep}
          initialData={parentFormData} // Pass the form data as initial values
        />
      )}
      {step === 2 && (
        <StudentDetailsForm
          onSubmit={onSubmit}
          setStep={setStep}
          parentFormData={parentFormData}
        />
      )}
    </div>
  )
}
