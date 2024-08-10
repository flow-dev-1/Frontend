import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RotatingLines } from 'react-loader-spinner'
import ParentGuardianForm from './ParentGaudianForm'
import StudentDetailsForm from './StudentDetailsForm'
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import '../onboarding.css'

const schema = yup.object().shape({
  // Validation schema...
})

export default function StudentRegistrationForm() {
  const [step, setStep] = useState(1) // Step 1 for Parent/Guardian Info, Step 2 for Student Details
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
    <div >
      {step === 1 && (
        <ParentGuardianForm
          errors={errors}
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
        <StudentDetailsForm
          errors={errors}
          register={register}
          watch={watch}
          onSubmit={handleSubmit(onSubmit)}
          setStep={setStep}
        />
      )}
    </div>
  )
}
