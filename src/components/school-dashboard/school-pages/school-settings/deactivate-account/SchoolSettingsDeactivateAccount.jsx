import React, { useState } from 'react'
import './deactivate-account.css'

const SchoolSettingsDeactivateAccount = () => {
  const [feedback, setFeedback] = useState('')

  const handleInputChange = (event) => {
    setFeedback(event.target.value)
  }

  const handleDeactivate = () => {
    console.log('Account deactivated for reason:', feedback)
    // Here you can add the logic to actually deactivate the account
  }

  return (
    <div className='deactivate-container'>
      <h2>Deactivate Account</h2>
      <p>
        We will hate to see you go. Notwithstanding, kindly fill in the
        information below to complete this action. Be as honest as possible with
        your reason(s).
      </p>
      <p>Thank you.</p>
      <div className='feedback-form'>
        <textarea
          placeholder='Help us understand why you want to leave. We will use your feedback to get better.'
          value={feedback}
          onChange={handleInputChange}
        />
        <button onClick={handleDeactivate} className='deactivate-button'>
          Deactivate Account
        </button>
      </div>
    </div>
  )
}

export default SchoolSettingsDeactivateAccount
