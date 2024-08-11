import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import './reusable.css'
import Modal from 'react-modal'
import ReviewCourseInfoModal from '../../modals-pages/dashboard-modals/ReviewCourseInfoModal'

const MyCourseCard = ({ course }) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const openModal = (modalType) => {
    setIsOpen(true)
    setModalType(modalType)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const handleButtonClick = () => {
    if (course.progress === 100) {
      openModal('feedback')
    } else if (course.progress > 0 && course.progress < 100) {
      // Code to resume the course
    } else {
      // Code to start the course
    }
  }

  return (
    <div style={{ backgroundColor: '#fff' }} className='reusable-course-card'>
      <div className='course-card' style={{ height: '100%', width: '100%' }}>
        <div className='course-details'>
          <img src={course.image} alt='' className='course-image' />
          <div className='px-3 py-2'>
            <h3 style={{ color: '#329BD6', fontSize: '24px' }}>
              Max the Explorer Monkey:
            </h3>
            <h3 style={{ fontSize: '24px' }}>{course.title}</h3>
            {course.subtitle && <h4>{course.subtitle}</h4>}
            <p>{course.description}</p>
            <div className='d-flex icons'>
              <span>
                <Icon icon='solar:user-linear' />
                {course.viewed}
              </span>
              <span>
                <Icon icon='mingcute:thumb-up-line' /> {course.likes}%
              </span>
              <span>
                <Icon icon='bytesize:book' /> {course.progress}%
              </span>
            </div>
          </div>
        </div>
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
              backgroundColor: course.progress === 100 ? '#fff' : '#329BD6',
              color: course.progress === 100 ? '#50AA50' : '#fff',
              display: 'flex',
              justifyContent: 'center',
              gap: '.4rem',
              width: '120px',
              padding: '.5rem 8px',
            }}
            className='btn card-btn start-resume'
            onClick={handleButtonClick}
          >
            {course.progress === 100 ? (
              <Icon width={25} icon='ph:seal-check-thin' />
            ) : (
              <Icon icon='pepicons-print:play-circle' />
            )}
            {course.progress === 100
              ? 'Completed'
              : course.progress === 0
              ? 'Start'
              : 'Resume'}
          </button>
          {/* Comment Icon - Only appears when resuming */}
          {course.progress > 0 && course.progress < 100 && (
            <Icon
              style={{ color: '#329BD6' }}
              width={40}
              icon='hugeicons:comment-01'
            />
          )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='custom-modal'
        overlayClassName='custom-overlay'
        contentLabel='Example Modal'
        shouldCloseOnOverlayClick={true}
      >
        {modalType === 'review' && (
          <ReviewCourseInfoModal course={course} onClose={closeModal} />
        )}
        {modalType === 'feedback' && (
          <div>
            <h2>Course Feedback</h2>
            {/* Insert feedback form or content */}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default MyCourseCard
