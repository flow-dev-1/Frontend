import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import 'react-phone-number-input/style.css'
import { yupResolver } from '@hookform/resolvers/yup'
import PhoneInput, {
  getCountryCallingCode,
  isValidPhoneNumber,
} from 'react-phone-number-input'
import { states } from '../../../states'
import { lgas } from '../../../states/lgas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import userService from '../../../../services/api/user'
import { RotatingLines } from 'react-loader-spinner'

export default function EducatorProfileModal({ user, onClose }) {
  const [countryCode, setCountryCode] = useState(getCountryCallingCode('NG'))
  const [countries, setCountries] = useState([])
  const [isNigeria, setIsNigeria] = useState(true)
  const [availableLGAs, setAvailableLGAs] = useState([])
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [email, setEmail] = useState(user?.email || '')

  const schema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    email: yup
      .string()
      .email('Invalid Email')
      .required('Email Address is required'),
    phone: yup
      .string()
      .required('Phone Number is required')
      .test('isValidPhoneNumber', 'Invalid phone number', (value) =>
        isValidPhoneNumber(value)
      ),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    lga: yup.string().required('LGA is required'),
    gender: yup.string().required('Gender is required'),
    DOB: yup.date().required('Date of Birth is required'),
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email || '',
      gender: user?.gender || '',
      phone: user?.phone || '',
      state: user?.state || '',
      country: user?.country || '',
      lga: user?.lga || '',
      DOB: new Date(user.DOB).toISOString().split('T')[0],
    },
  })

  const selectedCountry = watch('country')
  const selectedState = watch('state')

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        const sortedData = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )
        setCountries(sortedData)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }
    fetchCountries()
  }, [])

  useEffect(() => {
    if (selectedCountry === 'Nigeria') {
      setAvailableLGAs(lgas[selectedState] || [])
      setIsNigeria(true)
    } else {
      setAvailableLGAs([])
      setIsNigeria(false)
    }
  }, [selectedCountry, selectedState])

  const onSubmit = (data) => {
    console.log('Form Data:', data)
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: userService.updateProfileEducator,
    onSuccess: (data) => {
      toast.success('Profile updated successfully')
      onClose()
      queryClient.invalidateQueries('individual-profile')
    },
    onError: (error) => {
      console.log(error)
      toast.error(error?.message || 'Profile update failed')
    },
  })

  return (
    <div className='registration-page overflow-hidden'>
      <div className='top-section mt-2'>
        <h2 className='d-flex justify-content-between align-center'>
          Edit Profile
          <Icon icon='radix-icons:cross-1' width={24} />
        </h2>
        <hr />
        <span>*Indicates Required</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-section'>
          {/* Full Name */}
          <div className='form-group'>
            <label>Full Name *</label>
            <input
              type='text'
              placeholder='Type here...'
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className='error-message'>{errors.fullName.message}</p>
            )}
          </div>

          {/* Email Address */}
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

          {/* Phone Number */}
          <div className='form-group'>
            <label>Phone Number *</label>
            <div className='flex-code-input'>
              <Controller
                name='phone'
                control={control}
                defaultValue={user?.phone || ''}
                render={({ field }) => (
                  <PhoneInput
                    placeholder='Enter phone number'
                    {...field}
                    onCountryChange={(country) => {
                      field.onChange('')
                      if (country) {
                        setCountryCode(getCountryCallingCode(country))
                      }
                    }}
                    defaultCountry='NG'
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      padding: '1px',
                    }}
                  />
                )}
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

          {/* Country */}
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

          {/* State */}
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

          {/* LGA */}
          <div className='form-group'>
            <label>LGA *</label>
            {isNigeria && availableLGAs.length > 0 ? (
              <select {...register('lga')}>
                <option value=''>Select LGA</option>
                {availableLGAs.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type='text'
                placeholder='Type here...'
                {...register('lga')}
              />
            )}
            {errors.lga && (
              <p className='error-message'>{errors.lga.message}</p>
            )}
          </div>

          {/* Gender */}
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

          {/* D.O.B */}
          <div className='form-group'>
            <label>D.O.B *</label>
            <input
              type='date'
              placeholder='Type here...'
              {...register('DOB')}
            />
            {errors.DOB && (
              <p className='error-message'>{errors.DOB.message}</p>
            )}
          </div>
        </div>

        <hr className='my-4' />
        <div className='bottom-section mb-0'>
          <p style={{ width: '80%', textAlign: 'center' }}>
            Already have an account? <Link to='/sign-in'>Sign In</Link>
          </p>
          <button
            className='btn submit-btn'
            type='submit'
            style={{ borderRadius: '5px', padding: '.3rem ' }}
          >
            {mutation.isPending ? (
              <RotatingLines
                strokeColor='#275dad'
                type='Oval'
                style={{ color: '#FFF', backgroundColor: '#FFF' }}
                height={20}
                width={20}
              />
            ) : (
              'Update'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
