import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import schoolService from '../../../../services/api/school'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../redux/reducers/jwtReducer'
import { loginSuccess } from '../../../../redux/reducers/userReducer'
import '../onboarding.css'

export default function SchoolSignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordError, setShowPasswordError] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters')
      .required('Password is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: schoolService.schoolLogin, // Assuming userService.login is your API call function
    onSuccess: (data) => {
      console.log('Login successful:', data)
      toast.success('Login successful')
      dispatch(setToken(data?.token))
      dispatch(loginSuccess(data?.user))
      localStorage.setItem('Flow-Auth-Token', data?.token)
      navigate('/school-dashboard', { replace: true })
    },
    onError: (error) => {
      console.error('Login error:', error)
      toast.dismiss()
      toast.error(error?.message || error || 'Login failed')
    },
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  return (
    <div>
      <div className='sign-in registration-page  overflow-hidden'>
        <h2 className='text-center'>Sign In</h2>
        <p className='text-center'>
          Enter your details to explore our offerings.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-section d-flex flex-column align-items-center '>
            <div className='form-group'>
              <label>Email *</label>
              <input
                style={{ width: '100%' }}
                type='email'
                {...register('email', { required: true })}
                placeholder='Enter email address'
              />
              {errors.email && (
                <p className='error-message text-end'>{errors.email.message}</p>
              )}
            </div>
            <div className='form-group my-3'>
              <div className='d-flex align-items-center justify-content-between'>
                <label>Password *</label>
                <Link to='/school/forgot-password' className='forgot-password'>
                  Forgot Password?
                </Link>
              </div>

              <div
                style={{ width: '100%' }}
                className='d-flex align-items-center input-with-icon'
              >
                <input
                  style={{ width: '100%' }}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Type here...'
                  {...register('password', { required: true })}
                />
                <div
                  className='password-toggle float-right'
                  onClick={togglePasswordVisibility}
                >
                  <Icon
                    icon={showPassword ? 'oui:eye-closed' : 'ph:eye-light'}
                    className='eye-icon'
                    width={20}
                  />
                </div>
              </div>
              {errors.password && (
                <p className='error-message text-end'>{errors.password.message}</p>
              )}
              {showPasswordError && (
                <p className='error-message'>Incorrect email or password</p>
              )}
            </div>
            <div className='d-flex align-items-center mb-2 me-auto rember-me'>
              <input type='checkbox' name='' id='checkbox' className='mx-2 ' />
              Remember Me
            </div>
            <button
              style={{ width: '100%', borderRadius: '10px', margin: '.5rem 0' }}
              className='btn submit-btn'
              type='submit'
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <RotatingLines
                  type='Oval'
                  style={{ color: '#FFF', backgroundColor: '#275DAD' }}
                  height={20}
                  width={20}
                />
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        <p className='text-center'>
          Don’t have an account? <Link to='/'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
