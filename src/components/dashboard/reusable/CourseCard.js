// src/components/CourseCard.js

import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import './reusable.css'
import Modal from 'react-modal'
import CourseInfoModal from '../../modals-pages/dashboard-modals/CourseInfoModal'
import PaymentModal from '../../modals-pages/dashboard-modals/PaymentModal'
import { useNavigate } from 'react-router-dom'
import { encryptURI } from '../../../utils/encryption'

const CourseCard = ({ course, coursesArray, enrolled, enrolledData }) => {
  const navigate = useNavigate()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  console.log(coursesArray)
  console.log(enrolledData)
  const courseIndex = coursesArray?.courses.findIndex(
    (c) => c._id === course._id
  )

  const isEnrolled = enrolled.includes(course._id)
  console.log(isEnrolled)
  console.log(courseIndex)
  const handleCourseClick = () => {
    // Find the index of the current course in the coursesArray
    const courseIndex = coursesArray?.courses.findIndex(
      (c) => c._id === course._id
    )
    console.log(courseIndex)

    // Use this index to get the corresponding enrolledData course
    if (isEnrolled && enrolledData?.courses[courseIndex]) {
      navigate(
        `/dashboard/self-awareness-course/${encryptURI(
          enrolledData.courses[courseIndex]._id
        )}`
      )
    } else {
      // Handle the case when the course is not enrolled or data is not available
    }
  }

  const openModal = (modalType, course) => {
    setIsOpen(true)
    setModalType(modalType)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const likesPercent = (likes, courseEnrollment) => {
    if (likes === 0) return 0
    return (likes / courseEnrollment) * 100
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  }

  return (
    <div className='reusable-course-card'>
      <div className='course-card' style={{ height: '100%', width: '100%' }}>
        <div style={{ height: '400px' }} className='course-details'>
          <div style={{ height: '250px', display: 'block', width: '100%' }}>
            <img
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={course?.image}
              alt=''
              className={
                course?.description.toLowerCase() === 'growth mindset'
                  ? 'growth-mindset'
                  : ''
              }
            />
          </div>

          <div className='px-3 py-2'>
            <h3 style={{ color: '#329BD6', fontSize: '24px' }}>
              {course?.title}
            </h3>
            <p style={{ height: '70px' }}>
              {truncateText(course?.description, 100)}
            </p>
            <div className='d-flex icons'>
              <span>
                <Icon icon='solar:user-linear' />
                {course?.courseEnrollment.length}
              </span>
              <span>
                <Icon icon='mingcute:thumb-up-line' />{' '}
                {likesPercent(
                  course?.likes?.length,
                  course?.courseEnrollment?.length
                )}{' '}
                %
              </span>
            </div>
          </div>
        </div>

        {enrolled ? (
          <div className='course-card-btn d-flex'>
            {/* Review/Feedback Button */}
            {course.progress === 100 ? (
              <button
                style={{
                  backgroundColor: '#fff',
                  color: '#329BD6',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '.4rem',
                  padding: '.5rem 8px',
                  border: '1px solid #329bd6',
                }}
                className='btn card-btn feedback'
                onClick={() => openModal('feedback')}
              >
                <Icon icon='hugeicons:comment-01' /> Feedback
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #329BD6',
                  color: '#329BD6',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '.4rem',
                  width: '120px',
                  padding: '.5rem 8px',
                }}
                className='btn card-btn preview'
                onClick={() => openModal('review')}
              >
                <Icon icon='prime:eye' /> Review
              </button>
            )}

            {/* Start/Resume/Completed Button */}
            <button
              style={{
                backgroundColor: course?.progress === 100 ? '#fff' : '#329BD6',
                color: course.progress === 100 ? '#50AA50' : '#fff',
                display: 'flex',
                justifyContent: 'center',
                gap: '.4rem',
                width: '120px',
                padding: '.5rem 8px',
              }}
              className='btn card-btn start-resume'
              onClick={handleCourseClick}
            >
              {course?.progress === 100 ? (
                <Icon width={25} icon='ph:seal-check-thin' />
              ) : (
                <Icon icon='pepicons-print:play-circle' />
              )}
              {course?.progress === 100
                ? 'Completed'
                : course.progress === 0
                ? 'Start'
                : 'Resume'}
            </button>
            {course?.progress > 0 && course?.progress < 100 && (
              <Icon
                onClick={() => navigate(`/dashboard/feedback/self-awareness`)}
                style={{ color: '#329BD6' }}
                width={40}
                icon='hugeicons:comment-01'
              />
            )}
          </div>
        ) : (
          <div className='course-card-btn d-flex' style={{ width: '90%' }}>
            <button
              style={{
                backgroundColor: '#fff',
                border: '1px solid #329BD6',
                color: '#329BD6',
                display: 'flex',
                justifyContent: 'center',
                gap: '.4rem',
                padding: '.5rem 8px',
              }}
              className='btn card-btn preview'
              onClick={() => openModal('course')}
            >
              <Icon icon='prime:eye' /> Review
            </button>
            <button
              style={{
                backgroundColor: '#329BD6',
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                gap: '.4rem',
                padding: '.5rem 8px',
              }}
              className='btn card-btn cart'
              onClick={() => openModal('payment')}
            >
              <Icon icon='mdi:cart-outline' />
              {course?.currency}
              {course?.cost?.toLocaleString()}
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='custom-modal'
        overlayClassName='custom-overlay'
        contentLabel='Example Modal'
        shouldCloseOnOverlayClick={true}
      >
        {modalType === 'course' && (
          <CourseInfoModal course={course} onClose={closeModal} />
        )}

        {modalType === 'payment' && (
          <PaymentModal course={course} onClose={closeModal} />
        )}
      </Modal>
    </div>
  )
}

export default CourseCard
