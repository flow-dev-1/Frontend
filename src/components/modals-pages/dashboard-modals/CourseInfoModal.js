import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
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
        <div className='course-info-modal-header'>
          <h2
            className='mb-0'
            style={{ fontFamily: 'Caveat, cursive', fontSize: '24px' }}
          >
            {course?.title}
          </h2>
          <button
            className='close-btn'
            onClick={onClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <Icon icon='mingcute:close-fill' />
          </button>
        </div>
        <hr className='w-100 h-auto mb-2' />
        <div
          style={{
            width: '100%',
            height: '160px',
            backgroundColor: '#D9D9D9',
            paddingLeft: '1rem',
          }}
        ></div>
        <div className='course-info-modal-body'>
          <p style={{ fontSize: '20px', color: '#275DAD' }}>Course Overview</p>
          <p style={{ paddingLeft: '.5rem' }}>{course?.description}</p>
          <div className='mt-4'>
            <p style={{ fontSize: '20px', color: '#275DAD' }}>
              Course Objectives
            </p>
            {/* <div className='objectives'>
              <ul>
                {course.objectives.map((objective, index) => (
                  <li key={index}>
                    <p className='fw-bold'>
                      {objective.title
                        ? `${objective.title}:`
                        : objective.title}
                    </p>
                    {objective.description}
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      {!course?.enrolled && (
        <div
          className='course-info-modal-footer container-fluid py-2 px-4'
          style={{
            backgroundColor: '#329BD6',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p>To get full access to this course, kindly purchase!</p>
          <button
            className='btn modal-btn cart'
            onClick={openModal}
            style={{
              backgroundColor: '#fff',
              color: '#329BD6',
              padding: '8px 32px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Icon icon='f7:cart' width={20} /> N{course?.cost}
          </button>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='custom-modal'
        overlayClassName='custom-overlay'
        contentLabel='Payment Modal'
        shouldCloseOnOverlayClick={true}
      >
        <PaymentModal course={course} onClose={closeModal} />
      </Modal>
    </div>
  )
}
