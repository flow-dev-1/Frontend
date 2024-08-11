import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import ParentGuardianProfile from './ParentGaudianProfile'
import StudentDetailsProfile from './StudentDetailsProfile'

const schema = yup.object().shape({
  // Validation schema...
})

export default function StudentRegistrationProfile({ onClose }) {
  const [step, setStep] = useState(2) // Step 1 for Parent/Guardian Info, Step 2 for Student Details
  const [countryCode, setCountryCode] = useState(getCountryCallingCode('NG'))
  const [countries, setCountries] = useState([])
  const [isNigeria, setIsNigeria] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country: 'Nigeria',
    },
  })

  useEffect(() => {
    // Fetch countries as before
  }, [])

  const onSubmit = (data) => {
    if (step === 1) {
      // Move to the next step
      setStep(2)
    } else {
      // Final submission
      // Handle form submission
    }
  }

  return (
    <div>
      {step === 1 && (
        <ParentGuardianProfile
          errors={errors}
          onClose={onClose}
          register={register}
          setValue={setValue}
          watch={watch}
          setCountryCode={setCountryCode}
          countryCode={countryCode}
          countries={countries}
          isNigeria={isNigeria}
          setIsNigeria={setIsNigeria}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
      {step === 2 && (
        <StudentDetailsProfile
          errors={errors}
          onClose={onClose}
          register={register}
          watch={watch}
          onSubmit={handleSubmit(onSubmit)}
          setStep={setStep}
        />
      )}
    </div>
  )
}
