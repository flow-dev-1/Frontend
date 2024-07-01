import React from 'react'
import './support.css'

const Support = () => {
  return (
    <div className='support-page'>
      <h2>Welcome to Support Page!</h2>
      <p>
        We're here to assist you with any questions, concerns, or issues you may
        have. Whether you're a customer, user, or visitor, we're dedicated to
        providing you with the help you need.
      </p>
      <div className='contact-info'>
        <p>
          If you need immediate assistance, please don't hesitate to contact us:
        </p>
        <ul>
          <li>
            <strong>Email:</strong> support@flow.ng
          </li>
          <li>
            <strong>Phone:</strong> +1 (800) 123-4567
          </li>
          <li>
            <strong>WhatsApp Chat:</strong> +234-8976545
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Support
