import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import EmailVerificationSuccessful from '../../modals-pages/onboarding-modals/EmailVerificationSuccessful'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import '../onboarding.css'
import userService from '../../../services/api/user' // Adjust the import path as per your project structure
import { setToken } from '../../../redux/reducers/jwtReducer'
import { useDispatch } from 'react-redux'


export default function ForgotPassword() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const { id } = useParams()

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const resetToken = urlParams.get('t')
    const queryCode = urlParams.get('c')

    if (resetToken && queryCode) {
      verifyTokenMutation.mutate({ code: queryCode })
      console.log(resetToken)
      dispatch(setToken(resetToken))
      localStorage.setItem('Flow-Auth-Token', resetToken)
    }
  }, [location.search])

  const schema = yup.object().shape({
    usernameOrEmail: yup
      .string()
      .required('Enter a valid email or Student ID')
      .test(
        'valid-email-or-id',
        'Enter a valid email address or Student ID',
        (value) =>
          yup.string().email().isValidSync(value) || // Check if it's a valid email
          /^[A-Za-z]{3}\d{4}$/.test(value) // Check if it's a valid student ID (e.g., FLS4674)
      ),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const passwordResetMutation = useMutation({
    mutationFn: userService.forgotPassword,
    onSuccess: () => {
      toast.success('An email has been sent to your account')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const verifyTokenMutation = useMutation({
    mutationFn: userService.verifyAccount,
    onSuccess: (data) => {
      toast.success(data?.message)
      navigate('/reset-password')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    setEmail(data.usernameOrEmail)
    passwordResetMutation.mutate(data)
  }

  return (
    <div
      className='registration-page two overflow-hidden'
      style={{ width: '450px', height: '450px', paddingTop: '3rem' }}
    >
      <h2 className='head-text text-center my-1'>Forgot Password?</h2>
      <p className='head-p text-center'>
        Enter your email address you registered with.
      </p>
      <p className='text-center'>
        <span className='span-role'>Students</span> - Use Student ID
      </p>
      <p className='text-center'>
        <span className='span-role'>Administrators & Educators </span> - Use
        Email
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group my-4'>
          <label style={{ border: 'none' }}>Email address/Student ID</label>
          <input
            type='text'
            style={{ padding: '1.1rem 2rem' }}
            {...register('usernameOrEmail', { required: true })}
            placeholder='Enter email address or Student ID'
          />
          {errors.usernameOrEmail && (
            <p className='error-message'>{errors.usernameOrEmail.message}</p>
          )}
        </div>
        <button
          className='btn submit-btn forgot'
          type='submit'
          style={{ borderRadius: '5px', marginBottom: '1rem' }}
          disabled={passwordResetMutation.isPending}
        >
          {passwordResetMutation.isPending ? (
            <RotatingLines
              strokeColor='#4B7E31'
              strokeWidth='5'
              animationDuration='0.75'
              width='20'
              visible={true}
            />
          ) : (
            'Submit'
          )}
        </button>
      </form>

      <p className='remember-details text-center'>
        Remember your details? <Link to='/sign-in'>Sign in</Link>
      </p>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Email Verification Successful'
        className='custom-modal-success-email'
        overlayClassName='custom-overlay'
        shouldCloseOnOverlayClick={true}
      >
        <EmailVerificationSuccessful from='resetPassword' email={email} />
      </Modal>
    </div>
  )
}
