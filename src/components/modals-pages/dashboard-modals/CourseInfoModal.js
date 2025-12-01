import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
import PaymentModal from './PaymentModal'
import dot from '../../../assets/radix-icons--dot-filled.svg'
import CourseReviewModalInfo from './CourseReviewModalInfo'

export default function CourseInfoModal({ course, onClose }) {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div className='course-info-modal overflow-y-modal '>

      <CourseReviewModalInfo
        course={course}
        closeModal={closeModal}
      />

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
