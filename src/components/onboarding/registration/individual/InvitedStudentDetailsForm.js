import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Icon } from '@iconify/react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'


// Schema definition
const studentSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Full Name is required')
    .test(
      'is-two-words',
      'Full Name must contain at least two words separated by a space',
      (value) => value && value.trim().split(/\s+/).length >= 2
    )
    .test('not-na', 'Full Name cannot be "N/A"', (value) => value !== 'N/A')
    .trim(),
  grade: yup
    .string()
    .required('School Grade is required')
    .test('not-na', 'School Grade cannot be "N/A"', (value) => value !== 'N/A'),
  gender: yup
    .string()
    .required('Gender is required')
    .test('not-na', 'Gender cannot be "N/A"', (value) => value !== 'N/A'),
  DOB: yup
    .date()
    .required('Date of Birth is required')
    .test(
      'not-na',
      'Date of Birth cannot be "N/A"',
      (value) => value !== 'N/A'
    ),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .test('not-na', 'Password cannot be "N/A"', (value) => value !== 'N/A'),
})

export default function InvitedStudentDetailsForm({
  onSubmit,
  setStep,
  students,
  isPending,
  setStudentFormData

}) {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      ...students,
      DOB: students.DOB
        ? new Date(students.DOB).toISOString().split('T')[0]
        : '', // Format the DOB to 'YYYY-MM-DD'
      userId: students.userId, // Ensure userId is not part of the default values
    },
  })

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Student ID copied to clipboard!')
  }

  // Handle change event for DOB field
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the value in react-hook-form
    setValue(name, value);

    // Update the value in the parent form data (if needed)
    setStudentFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      className='registration-page add-student overflow-hidden'
      style={{ height: '450px', position: 'relative' }}
    >
      <div className='form-container'>
        <div className='top-section mt-2'>
          <h2 className='d-flex justify-content-between align-center'>
            Student Details
            <Icon
              icon='radix-icons:cross-1'
              onClick={() => navigate('/', { replace: true })}
              width={24}
            />
          </h2>
          <hr />
          <span>*Indicates Required</span>
          <p>
            <span>
              Kindly take note of the Student ID and Password created as it will
              be used as sign-In details.
            </span>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-section'>
            <div className='form-group'>
              <label>Student's Full Name *</label>
              <input
                type='text'
                placeholder='Type here...'
                {...register('fullName')}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className='error-message'>{errors.fullName.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Student ID *</label>
              <div className='d-flex align-items-center input-with-icon'>
                <input
                  type='text'
                  value={students.userId || 'N/A'}
                  readOnly
                  placeholder='CIS442'
                />
                <Icon
                  icon={'cil:copy'}
                  className='eye-icon'
                  width={20}
                  onClick={() => copyToClipboard(students.userId)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
            <div className='form-group'>
              <label>School Grade *</label>
              <select {...register('grade')} onChange={handleChange} >
                <option value=''>Select grade</option>
                <option value='Primary'>Primary</option>
                <option value='Secondary'>Secondary</option>
              </select>
              {errors.grade && (
                <p className='error-message'>{errors.grade.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Gender *</label>
              <select {...register('gender')} onChange={handleChange}>
                <option value=''>Select gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              {errors.gender && (
                <p className='error-message'>{errors.gender.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>D.O.B *</label>
              <input type='date' {...register('DOB')} onChange={handleChange} />
              {errors.DOB && (
                <p className='error-message'>{errors.DOB.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Password *</label>
              <div className='d-flex align-items-center input-with-icon'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={
                    students.isVerified === true ? '************' : 'Type here...'
                  }
                  {...register('password')}
                  onChange={handleChange}
                  disabled={
                    students.isVerified === true ? true : false
                  } // Disable if verified
                />

                {students.isVerified === true ? (
                  ''
                ) : (
                  <Icon
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? 'oui:eye-closed' : 'ph:eye-light'}
                    width={20}
                  />
                )}
              </div>
              {errors.password && (
                <p className='error-message'>{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className='action-btns'>
            <button
              style={{
                backgroundColor: '#fff',
                color: '#275DAD',
                border: '1px solid #275DAD',
                borderRadius: '5px',
              }}
              onClick={() => setStep(1)}
              disabled={isPending}
            >
              Back
            </button>
            <button
              disabled={isPending}
              style={{
                backgroundColor: '#275DAD',
                color: '#fff',
                borderRadius: '5px',
              }}
              type='submit'
            >
              {isPending ? (
                <RotatingLines
                  type='Oval'
                  style={{ color: '#FFF' }}
                  height={20}
                  width={20}
                />
              ) :
                'Submit'
              }
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
