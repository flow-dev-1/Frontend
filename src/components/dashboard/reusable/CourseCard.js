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
    navigate(`/dashboard/my-courses/${course.id}`, { state: { course } })
  }

  const openModal = (modalType, course) => {
    setIsOpen(true)
    setModalType(modalType)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const enrolled = false

  return (
    <div className='reusable-course-card'>
      <div className='course-card' style={{ height: '100%', width: '100%' }}>
        <div className='course-details'>
          <img
            src={course.image}
            alt=''
            className={
              course.subtitle.toLowerCase() === 'growth mindset'
                ? 'growth-mindset'
                : ''
            }
          />
          <div className='px-3 py-2'>
            <h3 style={{ color: '#329BD6', fontSize: '24px' }}>
              Max the Explorer Monkey:{' '}
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
                <Icon icon='mingcute:thumb-up-line' /> {course.likes} %
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
            {course.amount}
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
