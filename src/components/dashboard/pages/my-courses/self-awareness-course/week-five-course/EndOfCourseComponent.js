// src/components/EndOfCourseComponent.js
import React, { useState, useEffect } from 'react'
import MyFireWorks from '../Fireworks'
import celebrate from '../../../../../../assets/celebrate.png'
import { useNavigate } from 'react-router-dom'
import ReviewPopUpModal from '../ReviewPopUpModal'

const EndOfCourseComponent = ({ currentWeekIndex, handleNextWeekCourse }) => {
  currentWeekIndex = 1
  const navigate = useNavigate()
    const [showFireWork, setShowFireWork] = useState(true)

  // State to handle modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false)

  // Show the modal after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalVisible(true)
    }, 2000)

    return () => clearTimeout(timer) // Clean up timer when component unmounts
  }, [])

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false)
  }

  // Function to handle click outside the modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  // Inline styles for the modal and overlay
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 16px',
    overflowY: 'auto',
    zIndex: 9999,
  }

  // Add keyframes for modal animation
  const keyframesStyle = `
    @keyframes slideDown {
      from {
        transform: translateY(-50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `

  return (
    <div className='end-of-course-page'>
      {/* Inject keyframes for modal animation */}
      <style>{keyframesStyle}</style>

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

			<div className="progression-btns mt-3">
				<button className="btn next dark" 
          onClick={() => navigate('/dashboard/my-courses')}>
           {'Go to My Courses >>>>'}
				</button>
			</div>

      {/* Custom Modal */}
      {isModalVisible && (
        <div style={modalOverlayStyle} onClick={handleOverlayClick}>
          <ReviewPopUpModal closeModal={closeModal} />
        </div>
      )}
    </div>
  )
}

export default EndOfCourseComponent
