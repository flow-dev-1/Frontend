import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
import '../onboarding.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQuery } from '@tanstack/react-query'
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
import EmailVerificationSuccessful from '../../modals-pages/onboarding-modals/EmailVerificationSuccessful'

Modal.setAppElement('#root') // Set the root element for the modal

export default function InvitedUserRegistration() {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordError, setShowPasswordError] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(null)
  const [countryCode, setCountryCode] = useState(getCountryCallingCode('NG'))
  const [countries, setCountries] = useState([])
  const [isNigeria, setIsNigeria] = useState(true) // State to track if the selected country is Nigeria
  const [step, setStep] = useState(0)
  const [schGrade, setGrade] = useState('')
  const [token, setJWTToken] = useState('')
  const navigate = useNavigate()

  const schema = yup.object().shape({
    childFirstName: yup.string().required('First Name is required'),
    childLastName: yup.string().required('Last Name is required'),
    guardianEmail: yup
      .string()
      .email('Invalid Email')
      .required('Email Address is required'),
    guardianPhone: yup
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
    schoolGrade: yup.string().required('School Grade is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .nullable() // Make it nullable
      .transform((value, originalValue) =>
        originalValue === '' ? null : value
      ), // Convert empty string to null
    confirmPassword: yup
      .string()
      .nullable()
      // .oneOf([yup.ref('password'), null], 'Passwords must match')
      .when('password', {
        is: (val) => val && val.length > 0,
        then: (schema) =>
          schema.required(
            'Confirm Password is required if Password is provided'
          ),
      }),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country: 'Nigeria',
    },
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-invited-user'],
    queryFn: () => userService.getInvitedUser(token),
    enabled: !!token,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!data) return
    let userData = data.user
    if (userData?.isVerified) {
      setValue('country', userData.country)
      setValue('childFirstName', userData.first_name)
      setValue('childLastName', userData.last_name)
      setValue('guardianEmail', userData.email)
      const phone = userData.phone ? userData.phone.trim() : ''
      setValue('guardianPhone', phone)
      setValue('state', userData.state)
      setValue('lga', userData.lga)
      setValue('gender', userData.gender)
      const dob = userData.DOB ? new Date(userData.DOB) : null
      if (dob instanceof Date && !isNaN(dob)) {
        setValue('dob', dob.toISOString().split('T')[0]) // Format to YYYY-MM-DD
      }
    }
    return () => {}
  }, [data])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    // Extract parameters from the URL
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('t')
    const school = urlParams.get('s')
    const email = urlParams.get('email')
    const grade = urlParams.get('grade')
    const schoolName = urlParams.get('schoolName')
    const coursName = urlParams.get('coursName')
    setGrade(grade)
    setJWTToken(token)
    setValue('schoolGrade', grade)
    setValue('guardianEmail', email)

    if (token && email) {
      setStep(1)
      // mutate({ code: queryCode })
    } else {
      return navigate('/sign-in', { replace: true })
    }

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
    mutationFn: (params) => userService.registerInvitedUser(token, params),
    onSuccess: (res) => {
      console.log('Registration successful:', res)
      toast.success(res.message)
      openModal()
    },
    onError: (error) => {
      console.error('Registration error:', error)
      toast.dismiss()
      toast.error(error?.message)
      toast.error(error?.error)
      toast.error(error || 'Registration failed')
    },
  })

  const onSubmit = (data) => {
    console.log(data, 'Data here')
    const formData = {
      first_name: data.childFirstName.trim(),
      last_name: data.childLastName.trim(),
      email: data.guardianEmail,
      phone: data.guardianPhone,
      country: data.country,
      state: data.state,
      lga: data.lga,
      gender: data.gender,
      DOB: data.dob,
      grade: data.schoolGrade,
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
    <>
      {step === 1 && (
        <div>
          <div className='registration-page'>
            <div className='top-section'>
              <h2>
                Register as{' '}
                {schGrade !== 'Educator' ? 'a Student' : 'an Educator'}
              </h2>
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
                    {...register('childFirstName')}
                  />
                  {errors.childFirstName && (
                    <p className='error-message'>
                      {errors.childFirstName.message}
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label>Last Name *</label>
                  <input
                    type='text'
                    placeholder='Type here...'
                    {...register('childLastName')}
                  />
                  {errors.childLastName && (
                    <p className='error-message'>
                      {errors.childLastName.message}
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label>Guardian's Email Address *</label>
                  <input
                    type='email'
                    placeholder='Type here...'
                    {...register('guardianEmail')}
                    disabled
                  />
                  {errors.guardianEmail && (
                    <p className='error-message'>
                      {errors.guardianEmail.message}
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label>Guardian's Phone Number *</label>
                  <div className='flex-code-input'>
                    <PhoneInput
                      placeholder='Enter phone number'
                      value={watch('guardianPhone')}
                      onChange={(val) => setValue('guardianPhone', val)}
                      onCountryChange={(country) => {
                        if (country) {
                          setCountryCode(getCountryCallingCode(country))
                        }
                      }}
                      defaultCountry='NG' // Set the default country (change as needed)
                      style={{
                        border: '1px solid #ccc', // Add border to the input
                        borderRadius: '5px', // Add border-radius for rounded corners
                        padding: '1px', // Add padding for better visual appearance
                      }}
                    />
                    {countryCode && (
                      <span
                        style={{ color: '#5b616a' }}
                        className='country-code'
                      >
                        +{countryCode}
                      </span>
                    )}
                  </div>
                  {errors.guardianPhone && (
                    <p className='error-message'>
                      {errors.guardianPhone.message}
                    </p>
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

                  <select {...register('schoolGrade')} disabled>
                    <option value=''>Select Grade</option>
                    {['Primary', 'Secondary'].map((grade, i) => (
                      <option key={i} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                  {errors.schoolGrade && (
                    <p className='error-message'>
                      {errors.schoolGrade.message}
                    </p>
                  )}
                </div>
                <div className='form-group'>
                  <label>Password *</label>
                  <div className='d-flex align-items-center input-with-icon'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='********'
                      {...register('password')}
                      onChange={(e) => {
                        const value = e.target.value
                        setShowPasswordError(value.length < 8)
                      }}
                      disabled={data?.user?.isVerified}
                    />

                    <Icon
                      icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                      width={24}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                  {/* {showPasswordError && (
                                        <p className='error-message'>
                                            Password must be at least 8 characters
                                        </p>
                                    )} */}
                  {errors.password && (
                    <p className='error-message'>{errors.password.message}</p>
                  )}
                </div>
                <div className='form-group'>
                  <label>Confirm Password *</label>
                  <div className='d-flex align-items-center input-with-icon'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='********'
                      {...register('confirmPassword')}
                      disabled={data?.user?.isVerified}
                    />

                    <Icon
                      icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                      width={24}
                      onClick={togglePasswordVisibility}
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
            contentLabel='OTP Modal'
            className='custom-modal-otp'
            overlayClassName='custom-overlay'
          >
            <EmailVerificationSuccessful from='otp' />
          </Modal>
        </div>
      )}
    </>
  )
}
