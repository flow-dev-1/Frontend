import React, { useState, useEffect } from 'react'
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

// Schema definition
const studentSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  grade: yup.string().required('School Grade is required'),
  gender: yup.string().required('Gender is required'),
  DOB: yup.date().required('Date of Birth is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

export default function StudentDetailsForm({
  onSubmit,
  setStep,
  parentFormData,
}) {
  const [students, setStudents] = useState([]) // State to track added students
  const [currentStudentId, setCurrentStudentId] = useState('') // State to track current student ID
  const [isLoading, setIsLoading] = useState(true) // Loading state for fetching user ID
  const [modalIsOpen, setIsOpen] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentSchema),
  })

  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch new user ID on component mount
    const fetchUserId = async () => {
      setIsLoading(true)
      try {
        const userId = await userService.getUserId()
        setCurrentStudentId(userId?.userId || 'N/A')
      } catch (error) {
        console.error('Error fetching user ID:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserId()
  }, [])

  // Define mutation to post the form data
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
      console.log('Error submitting form', error)
    },
  })

  // Date format function (MM/DD/YYYY)
  const formatDate = (date) => {
    const d = new Date(date)
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const year = d.getFullYear()

    return `${month}/${day}/${year}`
  }

  const addStudentHandler = async (studentData) => {
    // Fetch new user ID for the student
    const userId = await userService.getUserId()

    const newStudent = {
      userId: userId?.userId || 'N/A',
      ...studentData,
      DOB: formatDate(studentData.DOB),
    }

    setStudents((prevStudents) => [...prevStudents, newStudent]) // Add new student to array
    setCurrentStudentId(userId?.userId || 'N/A') // Set the current student ID
    reset() // Reset form for new student input
  }

  const submitHandler = async () => {
    // Handle the addition of the last student
    await handleSubmit(addStudentHandler)()

    // Ensure the students array is not empty before submitting
    if (students.length === 0) {
      console.log('No students to submit')
      return
    }

    const completeFormData = {
      ...parentFormData,
      student: [...students], // Make sure this key matches what the backend expects
    }

    console.log('Submitting form data:', completeFormData)
    mutation.mutate(completeFormData)
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
      {isLoading && (
        <div className='loading-overlay'>
          <RotatingLines
            type='Oval'
            style={{ color: '#FFF' }}
            height={50}
            width={50}
          />
        </div>
      )}

      <div className={`form-container ${isLoading ? 'disabled' : ''}`}>
        <div className='top-section mt-2'>
          <h2 className='d-flex justify-content-between align-center'>
            Student Details {students.length + 1} {/* Display student number */}
            <Icon icon='radix-icons:cross-1' width={24} />
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
        <form onSubmit={handleSubmit(addStudentHandler)}>
          <div className='form-section'>
            <div className='form-group'>
              <label>Student's Full Name *</label>
              <input
                type='text'
                placeholder='Type here...'
                {...register('fullName')}
                disabled={isLoading}
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
                  value={currentStudentId}
                  readOnly
                  placeholder='CIS442'
                />
                <Icon
                  icon={'cil:copy'}
                  className='eye-icon'
                  width={20}
                  onClick={() => copyToClipboard(currentStudentId)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
            <div className='form-group'>
              <label>School Grade *</label>
              <select {...register('grade')} disabled={isLoading}>
                <option value='Primary'>Primary</option>
                <option value='Secondary'>Secondary</option>
              </select>
              {errors.grade && (
                <p className='error-message'>{errors.grade.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Gender *</label>
              <select {...register('gender')} disabled={isLoading}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              {errors.gender && (
                <p className='error-message'>{errors.gender.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>D.O.B *</label>
              <input type='date' {...register('DOB')} disabled={isLoading} />
              {errors.DOB && (
                <p className='error-message'>{errors.DOB.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Password *</label>
              <div className='d-flex align-items-center input-with-icon'>
                <input
                  type='password'
                  {...register('password')}
                  disabled={isLoading}
                />
                <Icon icon={'ph:eye-light'} className='eye-icon' width={20} />
              </div>
              {errors.password && (
                <p className='error-message'>{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className='add-more-student'>
            <button
              type='button'
              onClick={handleSubmit(addStudentHandler)}
              disabled={isLoading}
            >
              Add Student
              <span>
                <Icon width={20} icon='majesticons:plus-line' />
              </span>
            </button>
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
              disabled={isLoading}
            >
              Back
            </button>
            <button
              style={{
                backgroundColor: '#275DAD',
                color: '#fff',
                borderRadius: '5px',
              }}
              type='button'
              onClick={submitHandler}
              disabled={isLoading}
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Registration Modal'
          className='custom-modal-otp'
          overlayClassName='custom-overlay'
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

      {/* Loading Overlay */}
      {isLoading && (
        <div className='loading-overlay'>
          <RotatingLines
            type='Oval'
            style={{ color: '#FFF' }}
            height={50}
            strokeColor='#275DAD'
            strokeWidth='5'
            width={50}
          />
        </div>
      )}
    </div>
  )
}
