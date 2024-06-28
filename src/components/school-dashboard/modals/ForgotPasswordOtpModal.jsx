import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import EmailVerificationSuccessful from './EmailVerificationSuccessful'
import { useMutation } from '@tanstack/react-query'
import adminService from '../../services/api/admin'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ForgotPasswordOtpModal({ email, resendOTP }) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e, index) => {
    const value = e.target.value
    setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)])
    if (e.target.nextSibling) {
      e.target.nextSibling.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const value = e.clipboardData.getData('Text')
    const otpArray = value.split('').slice(0, 6)
    setOtp([...otpArray, ...otp.slice(otpArray.length)])
  }

  function openModal() {
    setIsOpen(true)
  }

  const mutation = useMutation({
    mutationFn: adminService.adminForgotPasswordOtp, // Assuming this is your API call function for verifying OTP
    onSuccess: (data) => {
      console.log('OTP verification successful:', data)
      toast.success(data.message)
      dispatch(setToken(data?.token))
      navigate('/reset-password', { replace: true }) // Open the modal on successful OTP verification
    },
    onError: (error) => {
      console.error('OTP verification error:', error)
      toast.dismiss()
      toast.error(error?.message || 'OTP verification failed')
    },
  })

  function handleSubmit() {
    const otpCode = otp.join('')
    console.log(otpCode, 'OTP')
    mutation.mutate({ code: otpCode })
  }

  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [countdown])

  const handleResendOTP = () => {
    setCountdown(600)
    resendOTP()
  }

  return (
    <div className='otp-modal modal-content'>
      <div className='d-flex flex-column align-items-center '>
        <h2>Verify your email account!</h2>
        <p className='my-2'>
          Kindly enter the OTP sent to <span>{email}</span>
        </p>
        <div className='otp-input my-4'>
          {otp.map((digit, index) => (
            <input
              type='text'
              key={index}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              maxLength='1'
            />
          ))}
        </div>
        <button onClick={handleSubmit} className='btn submit-btn success'>
          Submit
        </button>
        <form onSubmit={resendOTP}>
          <p className='mt-3'>
            Yet to receive OTP?
            {countdown > 0 ? (
              <span>
                {' '}
                Resend OTP (
                {Math.floor(countdown / 60)
                  .toString()
                  .padStart(2, '0')}
                :
                {Math.floor(countdown % 60)
                  .toString()
                  .padStart(2, '0')}
                )
              </span>
            ) : (
              <button
                className='resend-btn'
                type='submit'
                style={{ cursor: 'pointer' }}
              >
                Resend OTP
              </button>
            )}
          </p>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        contentLabel='Example Modal'
        className='custom-modal-success'
        overlayClassName='custom-overlay'
        shouldCloseOnOverlayClick={false}
      >
        <EmailVerificationSuccessful from='rest' />
      </Modal>
    </div>
  )
}
