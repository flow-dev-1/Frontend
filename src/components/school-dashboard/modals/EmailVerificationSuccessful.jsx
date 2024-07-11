import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function EmailVerificationSuccessful({ from, email }) {
  const navigate = useNavigate()

  return (
    <div className='success-modal '>
      <div className='d-flex flex-column align-items-center'>
        <div className='success-icon'>
          <div
            className='success-icon icon-with-bg'
            style={{ marginBottom: '.5rem' }}
          >
            <Icon
              icon='octicon:check-circle-fill-16'
              className='rounded-icon'
            />
          </div>
        </div>

        {from === 'otp' || from === 'resetPassword' ? (
          <h2 style={{ color: '#5B616A', fontSize: '40px' }}>Successful!</h2>
        ) : (
          <h2 style={{ color: '#5B616A', fontSize: '40px' }}>Email Sent!</h2>
        )}

        {from === 'otp' ? (
          <p className='head-p' style={{ color: '#5B616A' }}>
            You have successfully created your account.
          </p>
        ) : from === 'resetPassword' ? (
          <p className='head-p' style={{ color: '#5B616A' }}>
            You have successfully changed your password.
          </p>
        ) : (
          <p className='head-p' style={{ color: '#5B616A' }}>
            A password reset link has been sent to <span>{email && email}</span>
          </p>
        )}

        {from === 'otp' ? (
          <button
            onClick={() => {
              navigate('/sign-in')
            }}
            className='btn submit-btn success'
            style={{
              borderRadius: '5px',
              marginBottom: '1rem',
              marginTop: '0rem',
            }}
          >
            Proceed to Sign In
          </button>
        ) : from === 'resetPassword' ? (
          <button
            style={{
              borderRadius: '5px',
              marginBottom: '1rem',
              marginTop: '.5rem',
              padding: '.5rem 0',
              width: '110%',
            }}
            onClick={() => {
              navigate('/sign-in')
            }}
            className='btn submit-btn success'
          >
            Sign In
          </button>
        ) : null}
      </div>
    </div>
  )
}
