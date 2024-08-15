import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Icon } from '@iconify/react'
import { useMutation } from '@tanstack/react-query'
import userService from '../../../../services/api/user'
import { RotatingLines } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../redux/reducers/jwtReducer'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// Schema definition
const studentSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Full Name is required')
    .test(
      'is-three-words-or-less',
      'Full Name must contain between 1 and 3 words',
      (value) => value && value.trim().split(/\s+/).length <= 3
    )
    .trim(),
  grade: yup.string().required('School Grade is required'),
  gender: yup.string().required('Gender is required'),
  DOB: yup.date().required('Date of Birth is required'),
})

export default function StudentDetailsFormModal({
  setStep,
  parentFormData,
  user,
  onClose,
}) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      fullName: user.fullName,
      grade: user.grade,
      gender: user.gender,
      DOB: new Date(user.DOB).toISOString().split('T')[0], // Convert to YYYY-MM-DD format
    },
  })

  const dispatch = useDispatch()

  const mutation = useMutation({
    mutationFn: (data) => userService.updateProfileIndividual(data),
    onSuccess: (data) => {
      console.log('Form submitted successfully', data)
      toast.success(data.message)
      dispatch(setToken(data?.token))
      localStorage.setItem('Flow-Auth-Token', data?.token)
      setStep(2)
    },
    onError: (error) => {
      console.log('Error submitting form', error)
    },
  })

  const formatDate = (date) => {
    const d = new Date(date)
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const year = d.getFullYear()
    return `${month}/${day}/${year}`
  }

  const submitHandler = handleSubmit((studentData) => {
    const formattedStudentData = {
      ...studentData,
      DOB: formatDate(studentData.DOB),
    }

    // Destructure to remove unwanted properties
    const {
      updatedAt,
      deletedAt,
      createdAt,
      isVerified,
      isSchoolAdmin,
      userId,
      userType,
      __v,
      _id,
      ...sanitizedParentFormData
    } = parentFormData

    const completeFormData = {
      ...sanitizedParentFormData,
      student: [formattedStudentData],
    }

    console.log('Submitting form data:', completeFormData)
    mutation.mutate(completeFormData)
  })

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Student ID copied to clipboard!')
  }

  return (
    <div
      className='registration-page add-student overflow-hidden'
      style={{ height: '450px', position: 'relative' }}
    >
      <div className='form-container'>
        <div className='top-section mt-2'>
          <h2 className='d-flex justify-content-between align-center'>
            Student Details
            <Icon icon='radix-icons:cross-1' onClick={onClose} width={24} />
          </h2>
          <hr />
          <span>*Indicates Required</span>
          <p>
            <span>
              Your Student ID is shown below. Please take note of it as it will
              be used for sign-in.
            </span>
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className='form-section'>
            <div className='form-group'>
              <label>Student's Full Name *</label>
              <input
                type='text'
                placeholder='Type here...'
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className='error-message'>{errors.fullName.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Student ID</label>
              <div className='d-flex align-items-center input-with-icon'>
                <input type='text' value={user.userId} readOnly />
                <Icon
                  icon={'cil:copy'}
                  className='eye-icon'
                  width={20}
                  onClick={() => copyToClipboard(user.userId)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
            <div className='form-group'>
              <label>School Grade *</label>
              <select {...register('grade')}>
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
              <select {...register('gender')}>
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
              <input type='date' {...register('DOB')} />
              {errors.DOB && (
                <p className='error-message'>{errors.DOB.message}</p>
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
              type='button'
            >
              Back
            </button>
            <button
              style={{
                backgroundColor: '#275DAD',
                color: '#fff',
                borderRadius: '5px',
              }}
              type='submit'
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <RotatingLines
                  type='Oval'
                  style={{ color: '#FFF' }}
                  height={20}
                  width={20}
                />
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
