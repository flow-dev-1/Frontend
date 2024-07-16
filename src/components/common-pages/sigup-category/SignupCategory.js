import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

import './category.css'
import individualImage from '../../../assets/onboarding-individual.png'
import schoolImage from '../../../assets/onboarding-school.png'

export default function SignupCategory() {
  const navigate = useNavigate()

  return (
    <div className='signup-category '>
      {/* <div > */}

      <div className='back-btn'>
        <Link to='/'>
          <Icon icon='fa6-solid:arrow-left' className='back-icon' width={30} />
        </Link>
        <h2>Back to Home</h2>
      </div>

      <div className='signup-options'>
        <div className='signup-option'>
          <img src={schoolImage} alt='School' className='card-image' />
          <div className='card-content'>
            <h2> For Schools</h2>
            <button
              className='btn signup-button'
              onClick={() => {
                navigate('/school/sign-up/registration')
              }}
            >
              <Link to={'/school/sign-up/registration'}>Register Now</Link>
            </button>
          </div>
        </div>

        <div className='signup-option'>
          <img src={individualImage} alt='School' className='card-image' />
          <div className='card-content'>
            <h2> For Individuals</h2>
            <button
              className='btn signup-button'
              onClick={() => {
                navigate('/individual/sign-up')
              }}
            >
              <Link to={'/individual/sign-up'}> Register Now</Link>
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}
