import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

import './category.css'
import educatorImage from '../../../assets/Educators.jpg'
import studentImage from '../../../assets/Students.jpg'

export default function IndividualCategory() {
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
                    <img src={educatorImage} alt='School' className='card-image' />
                    <div className='card-content'>
                        <h2> For Educators</h2>
                        <button
                            className='btn signup-button'
                            onClick={() => {
                                const state = {
                                    type: 'Educator',
                                };
                                navigate('/individual/sign-up/educators')
                            }}
                        >
                            Register Now
                        </button>
                    </div>
                </div>

                <div className='signup-option'>
                    <img src={studentImage} alt='School' className='card-image' />
                    <div className='card-content'>
                        <h2> For Students</h2>
                        <button
                            className='btn signup-button'
                            onClick={() => {
                                const state = {
                                    type: 'Student',
                                };
                                navigate(
                                    '/individual/sign-up/student-registration'
                                )
                            }}
                        >
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}
