// src/components/EndOfCourseComponent.js
import React from 'react'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'

const EndOfCourseComponent = ({ currentWeekIndex, handleNextWeekCourse }) => {
  currentWeekIndex = 0
  console.log(currentWeekIndex)
  return (
    <div className='end-of-course-page'>
      <div className='congrats'>
        <img src={celebrate} alt='celebrate' />
        <h1>Hurray!</h1>
        <p className='text-center fs-5'>
          You have made it to the end of <br /> Week {currentWeekIndex + 1}
        </p>
      </div>
      <MyFireWorks />
      <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
        <button
          className='btn progress-btn btn-dark'
          onClick={handleNextWeekCourse}
        >
          Proceed to {currentWeekIndex + 1 + 1}
        </button>
      </div>
    </div>
  )
}

export default EndOfCourseComponent
