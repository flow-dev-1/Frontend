import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import SchoolEmailVerificationSuccessful from './SchoolEmailVerificationSuccessful'
import { useMutation } from '@tanstack/react-query'
import schoolService from '../../../../services/api/school'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../redux/reducers/jwtReducer'
import { RotatingLines } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

export default function SchoolOTP({
  email,
  resendOTP,
  onRequestClose,
  openSuccessModal,
}) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const dispatch = useDispatch()

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

  const mutation = useMutation({
    mutationFn: schoolService.schoolVerifyAccount, // Assuming this is your API call function for verifying OTP
    onSuccess: (data) => {
      console.log('OTP verification successful:', data)
      toast.success(data.message)
      dispatch(setToken(data?.token))
      onRequestClose()
      openSuccessModal()
      // Open the modal on successful OTP verification
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
  const handleResendOTP = (e) => {
    e.preventDefault()
    setCountdown(600)
    resendOTP()
  }

  return (
    <div className='otp-modal modal-content'>
      <div className='d-flex flex-column align-items-center '>
        <h2> Verify your email account!</h2>
        <p className='my-2'>
          Kindly enter the OTP sent to <span>{email}</span>
        </p>
        <div className='otp-input my-1'>
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
        <button
          style={{ borderRadius: '5px' }}
          onClick={handleSubmit}
          className='btn submit-btn '
        >
          {mutation.isPending ? (
            <RotatingLines
              strokeColor='#275dad'
              type='Oval'
              style={{ color: '#fff', backgroundColor: '#275dad' }}
              height={20}
              width={20}
            />
          ) : (
            'Submit'
          )}
        </button>
        <form onSubmit={handleResendOTP}>
          <p className='mt-3'>
            Didn’t receive email?
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
                style={{
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#275DAD',
                  marginLeft: '0.5rem',
                }}
                onclidk={handleResendOTP}
              >
                Resend
              </button>
            )}
          </p>
        </form>
      </div>
    </div>
  )
}
