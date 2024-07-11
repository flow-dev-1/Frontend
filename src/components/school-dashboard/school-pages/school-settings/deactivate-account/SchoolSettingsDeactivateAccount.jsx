import React, { useState, useRef } from 'react'
import './deactivate-account.css'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import schoolService from '../../../../../services/api/school'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SchoolSettingsDeactivateAccount = () => {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')
  const toastId = useRef(null)

  const { user } = useSelector((state) => state.user)
  let schoolId

  if (user.isSchool) {
    schoolId = user._id
  }

  const handleInputChange = (event) => {
    setFeedback(event.target.value)
  }

  const mutation = useMutation({
    mutationFn: (data) => schoolService.deactivateAccount(data),
    onMutate: () => {
      toastId.current = toast.loading('Deactivating account...')
    },
    onSuccess: (data) => {
      toast.update(toastId.current, {
        render: 'Account deactivated successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      navigate('/sign-in', { replace: true })
      // Add any other necessary cleanup or redirection here
    },
    onError: (error) => {
      toast.update(toastId.current, {
        render: error?.message || 'Error deactivating account',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    },
  })

  const handleDeactivate = () => {
    if (!window.confirm('Are you sure you want to deactivate your account?'))
      return
    mutation.mutate({ reason: feedback })
  }

  return (
    <div className='deactivate-container'>
      <h2 style={{ fontSize: '24px' }}>Deactivate Account -</h2>
      <p>
        We will hate to see you go. Notwithstanding, kindly fill in the
        information below to complete this action. Be as honest as possible with
        your reason(s).
      </p>
      <p>Thank you.</p>
      <hr />
      <div className='feedback-form'>
        <p>
          *Help us understand why you want to leave. We will use your feedback
          to get better.
        </p>
        <textarea value={feedback} onChange={handleInputChange} />
        <button onClick={handleDeactivate} className='deactivate-button'>
          Deactivate Account
        </button>
      </div>
    </div>
  )
}

export default SchoolSettingsDeactivateAccount
