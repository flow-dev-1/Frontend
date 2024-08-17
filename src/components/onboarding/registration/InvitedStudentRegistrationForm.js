import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ParentGuardianForm from './individual/InvitedParentGaudianForm'
import StudentDetailsForm from './individual/InvitedStudentDetailsForm'
import '../onboarding.css'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../redux/reducers/jwtReducer'
import userService from '../../../services/api/user'
import { useQuery } from '@tanstack/react-query'

export default function InvitedStudentRegistrationForm() {
  const [step, setStep] = useState(1) // Step 1 for Parent/Guardian Info, Step 2 for Student Details
  const [parentFormData, setParentFormData] = useState({}) // State to store form data

  const location = useLocation()
  const dispatch = useDispatch()

  const getQueryParams = (search) => {
    const params = new URLSearchParams(search)
    return {
      email: params.get('email'),
      t: params.get('t'),
    }
  }

  const { email, t } = getQueryParams(location.search)
  dispatch(setToken(t))

  // Fetch parent details using the token
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['parent-detail', t], // Add token to queryKey to refetch on token change
    queryFn: () => userService.getParentDetails(t),
    enabled: !!t, // Only run the query if token is present
  })

  console.log(data?.data)
  useEffect(() => {
    if (data?.status === 'success') {
      setParentFormData({
        fullName: data?.data?.fullName,
        email: data?.data?.email, // Pre-fill email but it will be non-editable
        phone: data?.data?.phone,
        country: data?.data?.country,
        state: data?.data?.state,
        lga: data?.data?.lga,
      })
    }
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    console.error('Error fetching parent details:', error)
    return <div>Error loading parent details.</div>
  }

  const handleParentFormSubmit = (formData) => {
    console.log(formData)
    setParentFormData(formData) // Save form data when continue is clicked
    setStep(2) // Move to the next step
  }

  const onSubmit = () => {
    if (step === 1) {
      setStep(2)
    } else {
      // Final submission
      console.log('Final submission data', { ...parentFormData, email, t })
    }
  }

  return (
    <div>
      {step === 1 && (
        <ParentGuardianForm
          onSubmit={handleParentFormSubmit}
          setStep={setStep}
          initialData={parentFormData} // Pass the form data as initial values
          email={email} // Pass email as a prop
          t={t} // Pass t as a prop
        />
      )}
      {step === 2 && (
        <StudentDetailsForm
          onSubmit={onSubmit}
          setStep={setStep}
          parentFormData={parentFormData}
          students={data?.data?.students} // Pass students array to the component
          email={email} // Pass email as a prop
          t={t} // Pass t as a prop
        />
      )}
    </div>
  )
}
