import React, { useState, useEffect } from 'react'
import './settings-modal.css'
import { Icon } from '@iconify/react'
import 'react-phone-number-input/style.css'
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import schoolService from '../../../../services/api/school'
import { RotatingLines } from 'react-loader-spinner'

const SettingsEditProfileModal = ({ closeModal, school }) => {
  const [countries, setCountries] = useState([])
  const [countryCode, setCountryCode] = useState(getCountryCallingCode('NG'))

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

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countriesData = data.map((country) => ({
          name: country.name.common,
          flag: country.flags[0],
        }))
        setCountries(countriesData)
      })
      .catch((error) => console.error('Error fetching countries:', error))
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      school_name: school?.school_name || '',
      contact_name: school?.contact_name || '',
      email: school?.email || '',
      country: school?.country || 'Nigeria',
      state: school?.state || '',
      lga: school?.lga || '',
      address: school?.address || '',
      phone: school?.phone || '',
    },
  })

  const mutation = useMutation({
    // mutationFn: schoolService.updateProfile, // Define this API call in your service
    onSuccess: (data) => {
      console.log('Profile update successful:', data)
      toast.success('Profile updated successfully')
      closeModal()
    },
    onError: (error) => {
      console.error('Profile update error:', error)
      toast.dismiss()
      toast.error(error?.message || 'Profile update failed')
    },
  })

  const handleUpdate = (data) => {
    mutation.mutate(data)
  }

  return (
    <div className='edit-course-container'>
      <div className='header' style={{ border: 'none' }}>
        <h2>Edit Profile</h2>
        <span onClick={closeModal}>
          <Icon icon='bitcoin-icons:cross-outline' width={22} />
        </span>
      </div>
      <hr style={{ marginTop: '0' }} />
      <p className='required'>* Indicates required</p>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className='flex-row'>
          <div>
            <label>Name of School *</label>
            <input
              placeholder='Type here...'
              type='text'
              {...register('school_name')}
            />
            {errors.school_name && (
              <p className='error-message'>{errors.school_name.message}</p>
            )}
          </div>
          <div>
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
        </div>
        <div className='flex-row'>
          <div>
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
            <label>Contact Phone Number *</label>
            <div className='flex-code-input'>
              <PhoneInput
                placeholder='Enter phone number'
                {...register('phone')}
                onCountryChange={(country) => {
                  if (country) {
                    setCountryCode(getCountryCallingCode(country))
                  }
                }}
                defaultCountry='NG' // Set the default country (change as needed)
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '1px',
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
        </div>
        <div className='flex-row'>
          <div>
            <label>Contact Email Address *</label>
            <input
              type='text'
              placeholder='Type here...'
              {...register('email')}
            />
            {errors.email && (
              <p className='error-message'>{errors.email.message}</p>
            )}
          </div>
          <div className='upload'>
            <label htmlFor=''>School Logo</label>
            <div
              className='file-upload-wrapper enroll'
              style={{
                backgroundColor: '#f8f8f8',
                margin: '0',
              }}
            >
              <input
                type='file'
                id='file-upload'
                className='file-upload-input'
              />
              <label
                style={{ border: 'none', color: '#D6D6D6' }}
                htmlFor='file-upload'
                className='file-upload-label'
              >
                Choose file
                <Icon
                  icon='ant-design:upload-outlined'
                  width='24'
                  style={{ color: '#5B616A' }}
                  height='24'
                />
              </label>
            </div>
          </div>
        </div>
        <hr />
        <button
          className='update fix'
          style={{ padding: '.3rem 0' }}
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
            'Update'
          )}
        </button>
      </form>
    </div>
  )
}

export default SettingsEditProfileModal
