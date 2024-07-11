import React from 'react'
import './support.css'

const SchoolSupport = () => {
  return (
    <div className='support-page'>
      <h2 style={{ color: '#18181B' }}>Welcome to Support Page!</h2>

      <p style={{ fontSize: '12px', width: '60%' }}>
        We're here to assist you with any questions, concerns, or issues you may
        have. <br /> Whether you're a customer, user, or visitor, we're
        dedicated to providing you with the help you need.
      </p>
      <hr style={{ margin: '2rem 0' }} />
      <div className='contact-info'>
        <p style={{ fontSize: '12px' }}>
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

export default SchoolSupport
