import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import './reusable.css'
import Modal from 'react-modal'
import ReviewCourseInfoModal from '../../modals-pages/dashboard-modals/ReviewCourseInfoModal'
import { useNavigate } from 'react-router-dom'

const MyCourseCard = ({ course }) => {
  const navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const openModal = (modalType) => {
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
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  }

  const handleButtonClick = () => {
    if (course?.progress === 100) {
      openModal('feedback')
    } else if (course?.progress > 0 && course?.progress < 100) {
      // Code to resume the course
    } else {
      // Code to start the course
      navigate(`/dashboard/my-courses/${course.id}`, { state: { course } })
    }

    console.log(course)

    if (course?.course.title === 'Self Awareness') {
      navigate(`/dashboard/self-awareness-course/${course?.course._id}`, {
        state: { course },
      })
      localStorage.setItem(`${course._id}-can-see`, true)
    }
  }

  return (
    <div style={{ backgroundColor: '#fff' }} className='reusable-course-card'>
      <div className='course-card' style={{ height: '100%', width: '100%' }}>
        <div className='course-details'>
          <div style={{ height: '250px', display: 'block', width: '100%' }}>
            <img
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={course?.course.image}
              alt=''
              className={
                course?.course.description?.toLowerCase() === 'growth mindset'
                  ? 'growth-mindset'
                  : ''
              }
            />
          </div>

          <div className='px-3 py-2'>
            <h3 style={{ color: '#329BD6', fontSize: '24px' }}>
              {course?.course.title}
            </h3>
            <p style={{ height: '70px' }}>
              {truncateText(course?.course.description, 100)}
            </p>
            <div className='d-flex icons'>
              <span>
                <Icon icon='solar:user-linear' />
                {course?.course.courseEnrollment?.length}
              </span>
              <span>
                <Icon icon='mingcute:thumb-up-line' />{' '}
                {likesPercent(
                  course?.course.likes?.length,
                  course?.course.courseEnrollment?.length
                )}{' '}
                %
              </span>
              <span>
                <Icon icon='bi:book' />
                {course?.progress} %
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
              backgroundColor: course?.progress === 100 ? '#fff' : '#329BD6',
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
