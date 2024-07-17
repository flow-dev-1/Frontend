import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function EmailVerificationSuccessful({ from, email }) {
  const navigate = useNavigate()

  return (
    <div className='success-modal'>
      <div className='d-flex flex-column align-items-center'>
        <div className='icon-with-bg '>
          <Icon icon='octicon:check-circle-fill-16' className='rounded-icon' />
        </div>

        {from === 'otp' || from === 'resetPassword' ? (
          <h2>Successful!</h2>
        ) : (
          <h2>Email Sent!</h2>
        )}

        {from === 'otp' ? (
          <p className='head-p'>You have successfully created your account.</p>
        ) : from === 'resetPassword' ? (
          <p className=''>You have successfully changed your password.</p>
        ) : (
          <p className='my-3'>
            A password reset link has been sent to <span>{email && email}</span>
          </p>
        )}

        {from === 'otp' ? (
          <button
            onClick={() => {
              navigate('/sign-in')
            }}
            className='btn submit-btn '
            style={{ borderRadius: '5px', width: '110%', margin: '.5rem 0' }}
          >
            Proceed to Sign In
          </button>
        ) : from === 'resetPassword' ? (
          <button
            onClick={() => {
              navigate('/sign-in')
            }}
            className='btn submit-btn'
          >
            Sign In
          </button>
        ) : null}
      </div>
    </div>
  )
}
