// src/components/CourseCard.js

import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import './reusable.css'
import Modal from 'react-modal'
import CourseInfoModal from '../../modals-pages/dashboard-modals/CourseInfoModal'
import PaymentModal from '../../modals-pages/dashboard-modals/PaymentModal'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const navigate = useNavigate()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    openModal()
  }

  function openPage(course) {
    navigate(`/dashboard/my-courses/${course.courseEnrollment[0]}`, { state: { course } })
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

  const enrolled = false

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
            {/* <h3 style={{ color: '#329BD6', fontSize: '24px' }}>
              Max the Explorer Monkey:{' '}
            </h3> */}
            <h3 style={{ color: '#329BD6', fontSize: '24px' }}>
              {course?.title}
            </h3>
            {/* {course.subtitle && <h4>{course.subtitle}</h4>} */}
            <p style={{ height: '70px' }}>
              {' '}
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
