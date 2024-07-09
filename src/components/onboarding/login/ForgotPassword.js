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
import userService from '../../../services/api/user' // Adjust import path as per your project structure
import { setToken } from '../../../redux/reducers/userReducer'
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
      mutate({ code: queryCode })
      localStorage.setItem('Flow-Auth-Token', resetToken)
    }
  }, [location.search])

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Enter a valid email')
      .email('Enter a valid email address'),
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
    onSuccess: (data) => {
      openModal()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: userService.verifyToken,
    onSuccess: (data) => {
      toast.success(data?.message)
      navigate('/individual/reset-password')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    setEmail(data.email)
    passwordResetMutation.mutate(data)
  }

  return (
    <div
      className='registration-page two overflow-hidden'
      style={{ width: '450px', height: '450px' }}
    >
      <h2 className='head-text text-center'>Forgot Password?</h2>
      <p className='head-p text-center'>
        Enter your email address you registered with.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group my-4'>
          <label>Email address</label>
          <input
            type='email'
            {...register('email', { required: true })}
            placeholder='Enter email address'
          />
          {errors.email && <p className='error-message'>Email is required</p>}
        </div>
        <button
          className='btn submit-btn forgot'
          type='submit'
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
        Remember your details? <Link to='/'>Sign in</Link>
      </p>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Email Verification Successful'
        className='custom-modal-otp'
        overlayClassName='custom-overlay'
        shouldCloseOnOverlayClick={true}
      >
        <EmailVerificationSuccessful from='restPassword' email={email} />
      </Modal>
    </div>
  )
}
