import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userService from '../../../services/api/user'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../redux/reducers/jwtReducer'
import { loginSuccess } from '../../../redux/reducers/userReducer'
import { loginData } from '../../../redux/reducers/userReducer'

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordError, setShowPasswordError] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const schema = yup.object().shape({
    usernameOrEmail: yup
      .string()
      .required('Email address/Student ID is required!'),
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

  const onSubmit = (data) => {
    // Call the mutate function to trigger the login mutation
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: userService.login, // Assuming userService.login is your API call function
    onSuccess: (data) => {
      toast.success(data.message)
      dispatch(setToken(data?.token))
      dispatch(loginSuccess(data?.user))
      dispatch(loginData(data))
      localStorage.setItem('Flow-Auth-Token', data?.token)
      if (data.accountType === 'School') {
        navigate('/school-dashboard', { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    },
    onError: (error) => {
      console.error('Login error:', error)
      toast.dismiss()
      toast.error(error?.message)
      toast.error('Login failed')
    },
  })

  return (
    <div>
      <div className='sign-in registration-page overflow-hidden'>
        <h2 className='text-center'>Sign In</h2>
        <p className='text-center'>
          Enter your details to explore our offerings.
        </p>
        <p className='text-center'>
          <span className='span-role'>Students</span> - Use Student ID
        </p>
        <p className='text-center mb-3'>
          <span className='span-role'>Administrators & Educators </span> - Use
          Email
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{ marginTop: '0' }}
            className='form-section d-flex flex-column align-items-center individual-signup'
          >
            <div className='form-group'>
              <label style={{ border: 'none' }}>Email address/Student ID</label>
              <input
                id={errors.usernameOrEmail && 'border-red'}
                style={{ width: '100%', padding: '1rem .7rem' }}
                type='text'
                {...register('usernameOrEmail', { required: true })}
                placeholder='Enter email address/Student ID'
              />
              {errors.usernameOrEmail && (
                <p className='error-message text-end'>
                  {errors.usernameOrEmail.message}
                </p>
              )}
            </div>
            <div className='form-group'>
              <div className='d-flex align-items-center justify-content-between'>
                <label style={{ border: 'none' }}>Password *</label>
                <Link to='/forgot-password' className='forgot-password'>
                  Forgot Password?
                </Link>
              </div>

              <div
                style={{ width: '100%' }}
                id={errors.password && 'border-red'}
                className='d-flex align-items-center input-with-icon'
              >
                <input
                  style={{ width: '100%', padding: '1rem .7rem' }}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  {...register('password', { required: true })}
                />
                <div
                  className='password-toggle float-right'
                  onClick={togglePasswordVisibility}
                >
                  <Icon
                    icon={showPassword ? 'oui:eye-closed' : 'ph:eye-light'}
                    className='eye-icon'
                    width={24}
                  />
                </div>
              </div>
              {errors.password && (
                <p className='error-message text-end'>
                  {errors.password.message}
                </p>
              )}
              {showPasswordError && (
                <p className='error-message '>Incorrect email or password</p>
              )}
            </div>
            <div
              style={{ marginLeft: '0' }}
              className='d-flex align-items-center mb-2 me-auto rember-me'
            >
              <input className='checkbox' type='checkbox' />
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
          Don’t have an account? <Link to='/sign-up'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
