// src/components/EndOfCourseComponent.js
import React, { useState } from 'react'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'
import { useNavigate } from 'react-router-dom'

const EndOfCourseComponent = ({ currentWeekIndex, handleNextWeekCourse }) => {
  currentWeekIndex = 1
  const navigate = useNavigate()
    const [showFireWork, setShowFireWork] = useState(true)
  return (
    <div className='end-of-course-page'>
      <div className='congrats'>
        <img src={celebrate} alt='celebrate' />
        <h1>Congratulations!</h1>
        <p className='text-center fs-5'>
          We’re proud of the progress you’ve made, and we can’t wait to see how
          you apply these lessons in your life.
        </p>
      </div>
          {
        showFireWork && <MyFireWorks
          setFirework={setShowFireWork}
        />
      }

      <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
        <button
          className='btn progress-btn btn-dark rounded-3'
          onClick={() => navigate('/dashboard/my-courses')}
        >
          Go to My Courses {'>>>>'}
        </button>
      </div>
    </div>
  )
}

export default EndOfCourseComponent
