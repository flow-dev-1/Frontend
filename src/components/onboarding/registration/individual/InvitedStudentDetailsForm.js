import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Icon } from '@iconify/react'
import { useMutation } from '@tanstack/react-query'
import userService from '../../../../services/api/user'
import { RotatingLines } from 'react-loader-spinner'
import EmailVerificationSuccessful from '../../../modals-pages/onboarding-modals/EmailVerificationSuccessful'
import StudentOtpModal from '../../../modals-pages/onboarding-modals/StudentOtpModal'
import Modal from 'react-modal'
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
      'is-two-words',
      'Full Name must contain at least two words separated by a space',
      (value) => value && value.trim().split(/\s+/).length >= 2
    )
    .trim(),
  grade: yup.string().required('School Grade is required'),
  gender: yup.string().required('Gender is required'),
  DOB: yup.date().required('Date of Birth is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

export default function InvitedStudentDetailsForm({
  onSubmit,
  setStep,
  parentFormData,
  students,
}) {
  const [formCount, setFormCount] = useState(0) // Start with the first student
  const [modalIsOpen, setIsOpen] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
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
    defaultValues: students[formCount], // Pre-fill with student data
  })

  const dispatch = useDispatch()

  const mutation = useMutation({
    mutationFn: (data) => userService.individualRegister(data),
    onSuccess: (data) => {
      console.log('Form submitted successfully', data)
      toast.success(data.message)
      dispatch(setToken(data?.token))
      localStorage.setItem('Flow-Auth-Token', data?.token)
      openModal()
      setStep(2)
    },
    onError: (error) => {
      toast.error(error.message)
      console.log('Error submitting form', error)
    },
  })

  const continueHandler = async (studentData) => {
    try {
      // Create a new student object with only the required fields and exclude `isVerified`
      const newStudent = {
        userId: students[formCount].userId,
        fullName: studentData.fullName,
        grade: studentData.grade,
        gender: studentData.gender,
        DOB: studentData.DOB,
        password: studentData.password,
      }

      console.log(newStudent)

      // Exclude `isVerified` field from each student object
      const updatedStudents = students.map(
        (student, index) =>
          index === formCount
            ? newStudent
            : { ...student, isVerified: undefined } // Ensure `isVerified` is excluded
      )

      if (formCount < students.length - 1) {
        // If not the last form, move to the next form
        setFormCount((prevCount) => prevCount + 1)
        reset(updatedStudents[formCount + 1]) // Reset form with the next student's data
      } else {
        // If this is the last form, submit all data
        const completeFormData = {
          ...parentFormData,
          student: updatedStudents, // Include all students with only required fields
        }
        console.log('Submitting form data:', completeFormData)
        mutation.mutate(completeFormData)
      }
    } catch (error) {
      console.error('Error adding student:', error)
      toast.error('Failed to add student. Please try again.')
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

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
            Student Details {formCount + 1} {/* Display form number */}
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
        <form onSubmit={handleSubmit(continueHandler)}>
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
              <label>Student ID *</label>
              <div className='d-flex align-items-center input-with-icon'>
                <input
                  type='text'
                  value={students[formCount].userId || 'N/A'}
                  readOnly
                  placeholder='CIS442'
                />
                <Icon
                  icon={'cil:copy'}
                  className='eye-icon'
                  width={20}
                  onClick={() => copyToClipboard(students[formCount].userId)}
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
            <div className='form-group'>
              <label>Password *</label>
              <div className='d-flex align-items-center input-with-icon'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Type here...'
                  {...register('password')}
                  disabled={students[formCount].isVerified} // Disable if verified
                />
                <Icon
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? 'oui:eye-closed' : 'ph:eye-light'}
                  width={20}
                />
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
            >
              {mutation.isPending ? (
                <RotatingLines
                  type='Oval'
                  style={{ color: '#FFF' }}
                  height={20}
                  width={20}
                />
              ) : formCount < students.length - 1 ? (
                'Continue'
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>

        <Modal
          isOpen={modalIsOpen}
          contentLabel='Registration Modal'
          className='custom-modal-otp'
          overlayClassName='custom-overlay'
          shouldCloseOnOverlayClick={false}
        >
          <StudentOtpModal
            resendOTP={handleSubmit(onSubmit)}
            email={parentFormData.email}
            setOpenSuccessModal={setOpenSuccessModal}
            closeModal={closeModal}
          />
        </Modal>

        <Modal
          isOpen={openSuccessModal}
          contentLabel='Example Modal'
          className='custom-modal-success-two'
          overlayClassName='custom-overlay'
          shouldCloseOnOverlayClick={false}
        >
          <EmailVerificationSuccessful from='otp' />
        </Modal>
      </div>
    </div>
  )
}
