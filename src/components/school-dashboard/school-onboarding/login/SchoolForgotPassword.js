import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Modal from 'react-modal'
import EmailVerificationSuccessful from '../../modals/EmailVerificationSuccessful'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import '../onboarding.css'
import schoolService from '../../../../services/api/school' // Adjust import path as per your project structure
import { setToken } from '../../../../redux/reducers/jwtReducer'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const { id } = useParams()

  console.log(id, "Id o")

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  // Function to open the modal
  const openModal = () => {
    setModalIsOpen(true)
  }

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false)
  }
  useEffect(() => {
    // Extract parameters from the URL
    const urlParams = new URLSearchParams(location.search)
    const resetToken = urlParams.get('t')
    const queryCode = urlParams.get('c')

    if (resetToken && queryCode) {
      mutate({ code: queryCode })
      dispatch(setToken(resetToken))
    } else {
    }
  }, [])

  const schema = yup.object().shape({
    email: yup.string().required('Enter a valid email'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: schoolService.schoolForgotPassword,
    onSuccess: (data) => {
      // Handle successful login
      openModal()
    },
    onError: (error) => {
      // Handle login error

      toast.error(error)
      toast.error(error?.message)
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: schoolService.schoolForgotPasswordOtp,
    onSuccess: (data) => {
      // Handle successful login
      navigate('/school/reset-password', { replace: true })
      toast.success(data?.message)

      // const newUrl = window.location.origin + window.location.pathname
      // window.history.replaceState({}, document.title, newUrl)
    },
    onError: (error) => {
      // Handle login error
      navigate('/school/sign-in', { replace: true })
      toast.error(error)
    },
  })

  const onSubmit = (data) => {
    // Call the mutate function to trigger the login mutation
    mutation.mutate(data)
    //
  }

  return (
    <div className='registration-page two  overflow-hidden'>
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
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <RotatingLines
              strokeColor='#FFF'
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
        className='custom-modal-success'
        overlayClassName='custom-overlay'
        shouldCloseOnOverlayClick={true}
      >
        <EmailVerificationSuccessful from='restPassword' email={email} />
      </Modal>
    </div>
  )
}
