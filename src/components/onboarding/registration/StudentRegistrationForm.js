import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import StudentOtpModal from '../../modals-pages/onboarding-modals/StudentOtpModal'

Modal.setAppElement('#root') // Set the root element for the modal

export default function StudentRegistrationForm() {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordError, setShowPasswordError] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(null)
  const [countryCode, setCountryCode] = useState(getCountryCallingCode('NG'))
  const [countries, setCountries] = useState([])
  const [isNigeria, setIsNigeria] = useState(true) // State to track if the selected country is Nigeria

  const schema = yup.object().shape({
    childFullName: yup.string().required("Child's Full Name is required"),
    guardianEmail: yup
      .string()
      .email('Invalid Email')
      .required("Guardian's Email Address is required"),
    guardianPhone: yup
      .string()
      .required("Guardian's Phone Number is required")
      .test('isValidPhoneNumber', 'Invalid phone number', (value) =>
        isValidPhoneNumber(value)
      ),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    lga: yup.string().required('LGA is required'),
    gender: yup.string().required("Child's Gender is required"),
    dob: yup.date().required("Child's Date of Birth is required"),
    schoolGrade: yup.string().required('School Grade is required'),
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
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        setCountries(data)
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
    mutationFn: userService.register,
    onSuccess: (data) => {
      console.log('Registration successful:', data)
      toast.success(data.message)
      dispatch(setToken(data?.token))
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
    const formData = {
      child_full_name: data.childFullName.trim(),
      guardian_email: data.guardianEmail,
      guardian_phone: data.guardianPhone,
      country: data.country,
      state: data.state,
      lga: data.lga,
      gender: data.gender,
      dob: data.dob,
      school_grade: data.schoolGrade,
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
          <h2>Register as a Student</h2>
          <hr />
          <span>*Indicates Required</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-section'>
            <div className='form-group'>
              <label>Child's Full Name *</label>
              <input
                type='text'
                placeholder='Type here...'
                {...register('childFullName')}
              />
              {errors.childFullName && (
                <p className='error-message'>{errors.childFullName.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Guardian's Email Address *</label>
              <input
                type='email'
                placeholder='Type here...'
                {...register('guardianEmail')}
              />
              {errors.guardianEmail && (
                <p className='error-message'>{errors.guardianEmail.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Guardian's Phone Number *</label>
              <div className='flex-code-input'>
                <PhoneInput
                  placeholder='Enter phone number'
                  onChange={(val) => setValue('guardianPhone', val)}
                  defaultCountry='NG' // Set the default country (change as needed)
                  style={{
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
              {errors.guardianPhone && (
                <p className='error-message'>{errors.guardianPhone.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Country *</label>
              <select {...register('country')}>
                <option value=''>Select Country</option>
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
              <label>Child's Gender *</label>
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
              <label>Child's D.O.B *</label>
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
              <label>School Grade *</label>
              <input
                type='text'
                placeholder='Type here...'
                {...register('schoolGrade')}
              />
              {errors.schoolGrade && (
                <p className='error-message'>{errors.schoolGrade.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Password *</label>
              <div className='d-flex align-items-center input-with-icon'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Type here...'
                  {...register('password')}
                  onChange={(e) => {
                    const value = e.target.value
                    setShowPasswordError(value.length < 8)
                  }}
                />

                <Icon
                  icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                  width={24}
                />
              </div>
              {showPasswordError && (
                <p className='error-message'>
                  Password must be at least 8 characters
                </p>
              )}
              {errors.password && (
                <p className='error-message'>{errors.password.message}</p>
              )}
            </div>
            <div className='form-group'>
              <label>Confirm Password *</label>
              <div className='d-flex align-items-center input-with-icon'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Type here...'
                  {...register('confirmPassword')}
                />

                <Icon
                  icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                  width={24}
                />
              </div>
              {errors.confirmPassword && (
                <p className='error-message'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <hr className='my-4' />
          <div className='bottom-section'>
            <p>
              Already have an account? <Link to='/login'>Sign In</Link>
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
                ' Submit'
              )}
            </button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='OTP Modal'
        className='custom-modal'
        overlayClassName='custom-overlay'
      >
        <StudentOtpModal
          formData={formData}
          closeModal={closeModal}
          guardianPhone={watch('guardianPhone')}
        />
      </Modal>
    </div>
  )
}
