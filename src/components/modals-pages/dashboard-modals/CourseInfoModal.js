import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'

import '../modals.css'
import PaymentModal from './PaymentModal'

export default function CourseInfoModal({ course, onClose }) {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div className='course-info-modal'>
      <div className='py-2 px-4'>
        <div className='course-info-modal-header '>
          <h2 className='mb-0'>{course.title} Course Guide</h2>
          <button className='close-btn' onClick={onClose}>
            <Icon icon='mingcute:close-fill' />
          </button>
        </div>
        <hr className='w-100 h-auto my-0' />
        <div className='course-info-modal-body '>
          <h3>Course Overview</h3>
          <p>{course.description}</p>
          <div className='mt-4'>
            <h3>Course Objectives</h3>
            Upon completion of the Growth Mindset Course, students will be able
            to:
            <div className='objectives'>
              <ul>
                {course.objectives.map((objective, index) => (
                  <li key={index}>
                    {/* <p className='fw-bold'>{objective.title}:</p> {objective.description}</li> */}
                    <p className='fw-bold'>
                      {objective.title === ''
                        ? objective.title
                        : `${objective.title}:`}
                    </p>{' '}
                    {objective.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {!course.enrolled && (
        <div className='course-info-modal-footer container-fluid py-2 px-4'>
          <p>For more details, enroll in the course now!</p>
          <button className='btn modal-btn cart' onClick={openModal}>
            <Icon icon='f7:cart' /> N{course.amount}
          </button>
        </div>
      )}
      {/* <div className="course-info-modal-footer container-fluid py-2 px-4">
                <p>For more details, enroll in the course now!</p>
                <button className="btn modal-btn cart"  onClick={openModal}><Icon icon="f7:cart" /> N{course.amount}</button>
            </div> */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='custom-modal'
        overlayClassName='custom-overlay'
        contentLabel='Example Modal'
        shouldCloseOnOverlayClick={true}
      >
        {' '}
        <PaymentModal course={course} onClose={closeModal} />
      </Modal>
    </div>
  )
}
