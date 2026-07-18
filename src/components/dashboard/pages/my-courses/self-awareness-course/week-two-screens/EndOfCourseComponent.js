// src/components/EndOfCourseComponent.js
import React, { useState } from 'react'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'

const EndOfCourseComponent = ({
  currentWeekIndex,
  handleNextWeekCourse,
  handleLinkClick,
  setCurrentActivity,
}) => {
  currentWeekIndex = 2
  const [showFireWork, setShowFireWork] = useState(true)
  return (
    <div className="end-of-course-page">
      <div className="congrats">
        <img src={celebrate} alt="celebrate" />
        <h1>Hurray!</h1>
        <p className="text-center fs-5">
          You have made it to the end of <br /> Week {currentWeekIndex}
        </p>
      </div>
      {
        showFireWork && <MyFireWorks
          setFirework={setShowFireWork}
        />
      }

      <div className="progression-btns mt-3">
        {/* <button
          className='btn prev ight'
          onClick={() => setCurrentActivity(1)}
        >
          {'<<<'} Retake Lesson
        </button> */}
        <button
          className="btn next dark"
          onClick={() => handleLinkClick(2)}
        >
          Proceed to Week {currentWeekIndex + 1} {">>>"}
        </button>
      </div>
    </div>
  );
}

export default EndOfCourseComponent
