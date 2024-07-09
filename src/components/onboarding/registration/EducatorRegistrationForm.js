import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
import '../onboarding.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import userService from '../../../services/api/user'
import { states } from '../../states'
import { RotatingLines } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../redux/reducers/jwtReducer'
import 'react-phone-number-input/style.css'
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input'
import EducatorOtpModal from '../../modals-pages/onboarding-modals/EducatorOtpModal'
import StudentOtpModal from '../../modals-pages/onboarding-modals/StudentOtpModal'

Modal.setAppElement('#root') // Set the root element for the modal

export default function EducatorRegistrationForm() {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(null)
  const [countryCode, setCountryCode] = useState(getCountryCallingCode('NG'))
  const [countries, setCountries] = useState([])
  const [isNigeria, setIsNigeria] = useState(true)
  // State to track if the selected country is Nigeria
  const [email, setEmail] = useState('')

  const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup
      .string()
      .email('Invalid Email')
      .required('Email Address is required'),
    phoneNumber: yup
      .string()
      .required('Phone Number is required')
      .test('isValidPhoneNumber', 'Invalid phone number', (value) =>
        isValidPhoneNumber(value)
      ),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    lga: yup.string().required('LGA is required'),
    gender: yup.string().required('Gender is required'),
    dob: yup.date().required('Date of Birth is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    // confirmPassword: yup
    //   .string()
    //   .oneOf([yup.ref('password'), null], 'Passwords must match')
    //   .required('Confirm Password is required'),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country: 'Nigeria',
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        // Sort the countries alphabetically by their common name
        const sortedData = data.sort((a, b) => {
          const nameA = a.name.common.toUpperCase() // ignore upper and lowercase
          const nameB = b.name.common.toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          // names must be equal
          return 0
        })
        setCountries(sortedData)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchCountries()
  }, [])

  // Watch for changes in the country field
  const selectedCountry = watch('country')
  useEffect(() => {
    setIsNigeria(selectedCountry === 'Nigeria')
  }, [selectedCountry])

  const mutation = useMutation({
    mutationFn: (data) => userService.register('Educator', data),
    onSuccess: (data) => {
      console.log('Registration successful:', data)
      toast.success(data.message)
      dispatch(setToken(data?.token))
      localStorage.setItem("Flow-Auth-Token", data?.token)
      openModal()
    },
    onError: (error) => {
      console.error('Registration error:', error)
      toast.dismiss()
      toast.error(error?.message)
      toast.error(error || 'Registration failed')
    },
  })

  const onSubmit = (data) => {
    console.log('data')
    const formData = {
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      email: data.email,
      phone: data.phoneNumber,
      country: data.country,
      state: data.state,
      lga: data.lga,
      gender: data.gender,
      // age: new Date().getFullYear() - new Date(data.dob).getFullYear(),
      DOB: data.dob,
      grade: 'Educator',
      password: data.password,
    }
    setFormData(formData)
    mutation.mutate(formData)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div>
      <div className='registration-page'>
        <div className='top-section'>
          <h2>Register as an Educator</h2>
          <hr />
          <span>*Indicates Required</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-section'>
            <div className='form-group'>
              <label>First Name *</label>
              <input
                type='text'
                placeholder='Type here...'
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className='error-message'>{errors.firstName.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Last Name *</label>
              <input
                type='text'
                placeholder='Type here...'
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className='error-message'>{errors.lastName.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Email Address *</label>
              <input
                type='email'
                placeholder='Type here...'
                {...register('email')}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className='error-message'>{errors.email.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Phone Number *</label>
              <div className='flex-code-input'>
                <PhoneInput
                  placeholder='Enter phone number'
                  onChange={(val) => setValue('phoneNumber', val)}
                  defaultCountry='NG' // Set the default country (change as needed)
                  onCountryChange={(country) => {
                    if (country) {
                      setCountryCode(getCountryCallingCode(country))
                    }
                  }}
                  style={{
                    // Full width
                    border: '1px solid #ccc', // Add border to the input
                    borderRadius: '5px', // Add border-radius for rounded corners
                    padding: '1px', // Add padding for better visual appearance
                  }}
                />
                {countryCode && (
                  <span style={{ color: '#5b616a' }} className='country-code'>
                    +{countryCode}
                  </span>
                )}
              </div>
              {errors.phoneNumber && (
                <p className='error-message'>{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Country *</label>
              <select {...register('country')}>
                <option value='Nigeria'>Nigeria</option>
                {countries.map((country) => (
                  <option key={country.cca2} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className='error-message'>{errors.country.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>State *</label>
              {isNigeria ? (
                <select {...register('state')}>
                  <option value=''>Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type='text'
                  placeholder='Type here...'
                  {...register('state')}
                />
              )}
              {errors.state && (
                <p className='error-message'>{errors.state.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>LGA *</label>
              <input
                type='text'
                placeholder='Type here...'
                {...register('lga')}
              />
              {errors.lga && (
                <p className='error-message'>{errors.lga.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Gender *</label>
              <select {...register('gender')}>
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              {errors.gender && (
                <p className='error-message'>{errors.gender.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>D.O.B *</label>
              <input
                type='date'
                placeholder='Type here...'
                {...register('dob')}
              />
              {errors.dob && (
                <p className='error-message'>{errors.dob.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Create Password *</label>
              <div className='d-flex align-items-center input-with-icon'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Type here...'
                  autoComplete='new-password'
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
          </div>

          <hr className='my-4' />
          <div className='bottom-section'>
            <p style={{ width: '80%', textAlign: 'center' }}>
              Already have an account?{' '}
              <Link to='/individual/sign-in'>Sign In</Link>
            </p>

            <button
              className='btn submit-btn'
              type='submit'
              disabled={mutation.isPending}
            >
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
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Registration Modal'
        className='custom-modal-otp'
        overlayClassName='custom-overlay'
      >
        <StudentOtpModal
          resendOTP={handleSubmit(onSubmit)}
          email={email}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  )
}
