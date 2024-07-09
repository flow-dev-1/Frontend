import { useState, useEffect } from 'react'
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
const SettingsEditProfileModal = ({ closeModal }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [status, setStatus] = useState('')
  const [access, setAccess] = useState('')
  const [image, setImage] = useState('')
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
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country: 'Nigeria',
    },
  })

  const handleUpdate = () => {
    console.log('Updated course details:', {
      title,
      description,
      cost,
      status,
      access,
      image,
    })
    closeModal()
  }

  return (
    <div className='edit-course-container'>
      <div className='header' style={{ border: 'none' }}>
        <h2>Edit Profile</h2>
        <span onClick={closeModal}>
          <Icon icon='bitcoin-icons:cross-outline' width={30} />
        </span>
      </div>
      <hr />
      <p className='required'>* Indicates required</p>
      <div className='flex-row'>
        <div>
          <label>Name of School *</label>
          <input
            placeholder='Type here...'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>School Address *</label>
          <input
            type='text'
            placeholder='Type here...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className='flex-row'>
        <div>
          <label>Contact Name *</label>
          <input
            type='text'
            value={cost}
            placeholder='Type here...'
            onChange={(e) => setCost(e.target.value)}
          />
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
      </div>
      <div className='flex-row'>
        <div>
          <label>Contact Email Address *</label>
          <input type='text' placeholder='Type here...' />
        </div>
        <div className='upload'>
          <label htmlFor=''>School Logo</label>
          <div
            className='file-upload-wrapper'
            style={{
              backgroundColor: '#f8f8f8',
              margin: '0',
            }}
          >
            <input type='file' id='file-upload' className='file-upload-input' />
            <label
              style={{ border: 'none', color: '#D6D6D6' }}
              htmlFor='file-upload'
              className='file-upload-label'
            >
              Choose file
              <Icon icon='ant-design:upload-outlined' width='24' height='24' />
            </label>
          </div>
        </div>
      </div>
      <hr />

      <button className='update fix' onClick={handleUpdate}>
        Update
      </button>
    </div>
  )
}

export default SettingsEditProfileModal
