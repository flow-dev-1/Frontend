import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import schoolService from '../../../../services/api/school'
import { states } from '../../../states'
import { RotatingLines } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../../redux/reducers/jwtReducer'
import 'react-phone-number-input/style.css'
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input'
import SchoolOTP from '../../modals/school-onboarding-modals/SchoolOTP'
Modal.setAppElement('#root') // Set the root element for the modal

export default function SchoolRegistrationForm() {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setConfirmShowPassword] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const [countryCode, setCountryCode] = useState(getCountryCallingCode('NG'))
  const [countries, setCountries] = useState([])
  const [isNigeria, setIsNigeria] = useState(true) // State to track if the selected country is Nigeria
  const [email, setEmail] = useState('')

  const schema = yup.object().shape({
    school_name: yup.string().required('Name of School is required'),
    contact_name: yup.string().required('Contact Name is required'),
    email: yup
      .string()
      .email('Invalid Email')
      .required('Contact Email Address is required'),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    lga: yup.string().required('LGA is required'),
    address: yup.string().required('School Address is required'),
    phone: yup
      .string()
      .required('Phone number is required')
      .test('isValidPhoneNumber', 'Invalid phone number', (value) =>
        isValidPhoneNumber(value)
      ),
    grade: yup.string().required('School Grade is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
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
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const email = params.get('email')
    const token = params.get('t')
    if (token) {
      dispatch(setToken(token))
    }
  }, [location, dispatch])

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
    mutationFn: schoolService.register, // Assuming userService.register is your API call function
    onSuccess: (data) => {
      dispatch(setToken(data?.token))
      localStorage.setItem('Flow-Auth-Token', data?.token)
      console.log('Registration successful:', data)
      toast.success(data.message)
      openModal()
    },
    onError: (error) => {
      console.error('Registration error:', error)
      toast.error(error?.message)
      toast.error(error || 'Registration failed')
    },
  })

  const onSubmit = (data) => {
    const { confirmPassword, ...formData } = data
    mutation.mutate(formData)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div className='registration-page'>
      <div className='top-section'>
        <h2>Register as a school</h2>
        <hr />
        <span>*Indicates Required</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-section'>
          <div className='form-group'>
            <label>Name of School *</label>
            <input
              type='text'
              placeholder='Type here...'
              {...register('school_name')}
            />
            {errors.school_name && (
              <p className='error-message'>{errors.school_name.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Contact Name *</label>
            <input
              type='text'
              placeholder='Type here...'
              {...register('contact_name')}
            />
            {errors.contact_name && (
              <p className='error-message'>{errors.contact_name.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Contact Email Address *</label>
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
            <label>School Address *</label>
            <input
              type='text'
              placeholder='Type here...'
              {...register('address')}
            />
            {errors.address && (
              <p className='error-message'>{errors.address.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Contact Phone Number *</label>
            <div className='flex-code-input'>
              <PhoneInput
                placeholder='Enter phone number'
                onChange={(val) => setValue('phone', val)}
                onCountryChange={(country) => {
                  if (country) {
                    setCountryCode(getCountryCallingCode(country))
                  }
                }}
                defaultCountry='NG' // Set the default country (change as needed)
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

            {errors.phone && (
              <p className='error-message'>{errors.phone.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>School Grade *</label>
            <select {...register('grade')}>
              <option value=''>Select Grade</option>
              <option value='Primary'>Primary</option>
              <option value='Secondary'>Secondary</option>
            </select>
            {errors.grade && (
              <p className='error-message'>{errors.grade.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Create Password *</label>
            <div className='input-with-icon'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Type here...'
                autoComplete='new-password'
                {...register('password')}
              />
              <div
                className='password-toggle'
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
              <p className='error-message'>{errors.password.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Confirm Password *</label>
            <div className='input-with-icon'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Type here...'
                autoComplete='new-password'
                {...register('confirmPassword')}
              />
              <div
                className='password-toggle'
                onClick={toggleConfirmPasswordVisibility}
              >
                <Icon
                  icon={showConfirmPassword ? 'oui:eye-closed' : 'ph:eye-light'}
                  width={20}
                  className='eye-icon'
                />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className='error-message'>{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className='bottom-section'>
          <p className='terms-and-conditions'>
            <input className='checkbox' type='checkbox' required width={40} />
            By ticking this box, you agree with our{'      '}{' '}
            <Link className='a' to='#'>
              Terms & Conditions
            </Link>
          </p>
        </div>
        <hr className='my-0' />
        <div className='flex-submit'>
          <p className='have-account'>
            Already have an account?{' '}
            <span id='span'>
              <Link to='/school/sign-in'>Sign In</Link>
            </span>
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
      <Modal
        isOpen={modalIsOpen}
        contentLabel='Example Modal'
        className='custom-modal-otp'
        overlayClassName='custom-overlay'
        shouldCloseOnOverlayClick={false}
      >
        <SchoolOTP
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          resendOTP={handleSubmit(onSubmit)}
          email={new URLSearchParams(location.search).get('email') || email}
        />
      </Modal>
    </div>
  )
}
