import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../onboarding.css'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../redux/reducers/jwtReducer'
import userService from '../../../services/api/user'
import { useMutation, useQuery } from '@tanstack/react-query'
import InivtedParentGuardianForm from './individual/InvitedParentGaudianForm'
import InvitedStudentDetailsForm from './individual/InvitedStudentDetailsForm'
import { toast } from 'react-toastify'
import EmailVerificationSuccessful from '../../modals-pages/onboarding-modals/EmailVerificationSuccessful'
import StudentOtpModal from '../../modals-pages/onboarding-modals/StudentOtpModal'
import Modal from 'react-modal'
import { logoutSuccess } from '../../../redux/reducers/userReducer'

export default function InvitedStudentRegistrationForm() {
  const [step, setStep] = useState(0) // Step 1 for Parent/Guardian Info, Step 2 for Student Details
  const [parentFormData, setParentFormData] = useState({}) // State to store form data
  const [studentFormData, setStudentFormData] = useState({})
  const [modalIsOpen, setIsOpen] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getQueryParams = (search) => {
    const params = new URLSearchParams(search)
    return {
      email: params.get('email'),
      t: params.get('t'),
      s: params.get('schoolName'),
      enrollmentId: params.get('s'),
      courseName: params.get('coursName')
    }
  }

  const { email, t, s, enrollmentId, courseName } = getQueryParams(location.search)


  dispatch(setToken(t))
  localStorage.setItem('Flow-Auth-Token', t)
  // Fetch parent details using the token
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['parent-detail'], // Add token to queryKey to refetch on token change
    queryFn: () => userService.getParentDetails(t, enrollmentId),
    enabled: !!t, // Only run the query if token is present
  })


  const mutation = useMutation({
    mutationFn: (data) => userService.registerInvitedUser(t, data),
    onSuccess: (data) => {
      toast.success(data.message)
      dispatch(setToken(data?.token))
      localStorage.setItem('Flow-Auth-Token', data?.token)
      dispatch(logoutSuccess())

      if(data?.status === 'redirect'){
        return navigate('/sign-in')
      }
      openModal()
      setStep(2)
     
    },
    onError: (error) => {
      toast.error(error.message || error.error || error)
      console.log('Error submitting form', error)
    },
  })

  useEffect(() => {
    if (!data) return
    if (data?.status === 'success') {

      setParentFormData({
        guardianFullName: data?.data?.fullName,
        email: data?.data?.email, // Pre-fill email but it will be non-editable
        phone: data?.data?.phone,
        country: data?.data?.country || 'Nigeria',
        state: data?.data?.state,
        lga: data?.data?.lga,
      })

      if (data?.data?.students?.length > 0) {
        const { fullName, email, userId, grade, gender, DOB, isVerified } = data.data.students[0]; // There's only one student
        setStudentFormData({ fullName, userId, grade, gender, DOB, isVerified });
        if (isVerified) {
          // If verified, submit data automatically
          const dataToSubmit = {
            guardianFullName: data?.data?.fullName,
            email: data?.data?.email, // Pre-fill email but it will be non-editable
            phone: data?.data?.phone,
            country: data?.data?.country || 'Nigeria',
            state: data?.data?.state,
            lga: data?.data?.lga,
            enrollmentId,
            students: {
              fullName,
              userId,
              grade,
              gender,
              DOB,
              isVerified
            }
          }
          mutation.mutate(dataToSubmit)
        } else {
          setStep(1)
        }
      }
    }
  }, [data])


  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const handleParentFormSubmit = (formData) => {
    setParentFormData(formData) // Save form data when continue is clicked
    setStep(2) // Move to the next step
  }

  const onSubmit = (formData) => {
    const dataToSubmit = {
      ...parentFormData,
      enrollmentId,
      students: formData
    }

    mutation.mutate(dataToSubmit)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    console.error('Error fetching parent details:', error)
    return <div>{error.message ? error.message : 'Something went wrong, please contact flow admin for support.'}</div>
  }

  if (mutation.isPending) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '20px'
      }}>
        <div style={{
          width: '200px',
          height: '6px',
          background: '#f0f0f0',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: '40%',
            height: '100%',
            background: '#329BD6',
            position: 'absolute',
            animation: 'loading 1s infinite linear',
            borderRadius: '4px'
          }} />
        </div>
        <p style={{
          color: '#666',
          fontSize: '16px',
          textAlign: 'center'
        }}>
          Please wait while we set things up for you...
        </p>
        <style>{`
          @keyframes loading {
            0% { left: -40% }
            100% { left: 100% }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div>
      {step === 1 && (
        <InivtedParentGuardianForm
          onSubmit={handleParentFormSubmit}
          setStep={setStep}
          initialData={parentFormData} // Pass the form data as initial values
          email={email} // Pass email as a prop
          t={t} // Pass t as a prop
          s={s} //temporal data for CIS school
        />
      )}
      {step === 2 && (
        <InvitedStudentDetailsForm
          onSubmit={onSubmit}
          setStep={setStep}
          students={studentFormData} // Pass students array to the component
          setStudentFormData={setStudentFormData}
          email={email} // Pass email as a prop
          isPending={mutation?.isPending}
        />
      )}


      <Modal
        isOpen={modalIsOpen}
        contentLabel='Registration Modal'
        className='custom-modal-otp'
        overlayClassName='custom-overlay'
        shouldCloseOnOverlayClick={false}
      >
        <StudentOtpModal
          // resendOTP={handleSubmit(onSubmit)}
          enrollmentId={enrollmentId}
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
  )
}
