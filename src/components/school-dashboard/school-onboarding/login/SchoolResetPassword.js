import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
import EmailVerificationSuccessful from '../../modals/EmailVerificationSuccessful'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../redux/reducers/jwtReducer'
import schoolService from '../../../../services/api/school'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'

export default function SchoolResetPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must not exceed 20 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: schoolService.schoolResetPassword,
    onSuccess: () => {
      openModal()
    },
    onError: (error) => {
      console.error('Error resetting password:', error)
      toast.error(error.message || 'Failed to reset password')
    },
  })

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    navigate('/sign-in')
  }

  const onSubmit = ({ password }) => {
    mutation.mutate({ password })
  }

  return (
    <div className='registration-page two  overflow-hidden'>
      <h2 className='head-text text-center'>Reset Password</h2>
      <p className='head-p'>Create a New Password</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='form-group my-3'>
            <label>Enter New Password</label>
            <div className='create-password input-with-icon'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Type here...'
                {...register('password')}
              />
              <div
                className='password-toggle float-right'
                onClick={togglePasswordVisibility}
              >
                <Icon
                  icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                  className='eye-icon'
                />
              </div>
            </div>
            {errors.password && (
              <p className='error-message'>{errors.password.message}</p>
            )}
          </div>

          <div className='form-group my-3'>
            <label>Confirm Password</label>
            <div className='create-password input-with-icon'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Type here...'
                {...register('confirmPassword')}
              />
              <div
                className='password-toggle float-right'
                onClick={toggleConfirmPasswordVisibility}
              >
                <Icon
                  icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'}
                  className='eye-icon'
                />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className='error-message'>{errors.confirmPassword.message}</p>
            )}
          </div>

          <button className='btn submit-btn forgot' type='submit'>
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
        contentLabel='Email Verification Modal'
        className='custom-modal-success'
        overlayClassName='custom-overlay'
        shouldCloseOnOverlayClick={false}
      >
        <EmailVerificationSuccessful from='resetPassword' />
      </Modal>
    </div>
  )
}
