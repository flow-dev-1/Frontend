import { Icon } from '@iconify/react'
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from 'react-phone-number-input'
export default function ParentGuardianProfile({
  errors,
  register,
  setValue,
  watch,
  setCountryCode,
  countryCode,
  countries,
  onClose,
  isNigeria,
  setIsNigeria,
  onSubmit,
}) {
  return (
    <div
      className='registration-page overflow-hidden '
      style={{ height: '400px' }}
    >
      <div className='top-section mt-2'>
        <h2 className='d-flex justify-content-between align-center'>
          Parent/Guardian Information
          <>
            <Icon icon='radix-icons:cross-1' onClick={onClose} width={24} />
          </>
        </h2>
        <hr />
        <span>*Indicates Required</span>
      </div>
      <form onSubmit={onSubmit}>
        <div className='form-section'>
          <div className='form-group'>
            <label>Full Name *</label>
            <input
              type='text'
              placeholder='Type here...'
              {...register('guardianName')}
            />
            {errors.guardianName && (
              <p className='error-message'>{errors.guardianName.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Email Address *</label>
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
            <label>Phone Number *</label>
            <div className='flex-code-input'>
              <PhoneInput
                placeholder='Enter phone number'
                onChange={(val) => setValue('guardianPhone', val)}
                defaultCountry='NG'
                style={{
                  // Full width
                  border: '1px solid #ccc', // Add border to the input
                  borderRadius: '5px', // Add border-radius for rounded corners
                  padding: '1px', // Add padding for better visual appearance
                }}
              />
              {countryCode && (
                <span
                  style={{ color: '#5b616a' }}
                  className='country-code register'
                >
                  +{countryCode}
                </span>
              )}
              {errors.guardianPhone && (
                <p className='error-message'>{errors.guardianPhone.message}</p>
              )}
            </div>
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
                {/* Map states here */}
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
        </div>
        <div style={{ width: '30%', margin: '1.2rem auto', marginTop: '3rem' }}>
          <button
            style={{
              borderRadius: '5px',
              padding: '.3rem ',
              display: 'block',
              width: '100%',
              border: 'none',
              backgroundColor: '#329BD6',
            }}
            type='submit'
            className='btn submit-btn'
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}
