import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function EmailVerificationSuccessful({ from, email }) {
  const navigate = useNavigate()

  return (
    <div className='success-modal '>
      <div className='d-flex flex-column align-items-center'>
        <div className='success-icon'>
          <div className='success-icon icon-with-bg'>
            <Icon
              icon='octicon:check-circle-fill-16'
              className='rounded-icon'
            />
          </div>
        </div>

        {from === 'otp' || from === 'resetPassword' ? (
          <h2>Successful!</h2>
        ) : (
          <h2>Email Sent!</h2>
        )}

        {from === 'otp' ? (
          <p className='head-p'>You have successfully created your account.</p>
        ) : from === 'resetPassword' ? (
          <p className='head-p'>You have successfully changed your password.</p>
        ) : (
          <p className='head-p'>
            A password reset link has been sent to <span>{email && email}</span>
          </p>
        )}

        {from === 'otp' ? (
          <button
            onClick={() => {
              navigate('/sign-in')
            }}
            className='btn submit-btn success mt-5'
          >
            Proceed to Sign In
          </button>
        ) : from === 'resetPassword' ? (
          <button
            onClick={() => {
              navigate('/sign-in')
            }}
            className='btn submit-btn success mt-5'
          >
            Sign In
          </button>
        ) : null}
      </div>
    </div>
  )
}
