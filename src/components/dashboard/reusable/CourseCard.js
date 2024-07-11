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
      {/* <div  > */}

      <div className='course-card' style={{ height: '100%', width: '100%' }}>
        <div className='course-details'>
          {/* <img src={course.image} alt="" className='' /> */}
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
            <h3>{course.title}</h3>
            {course.subtitle && <h4>{course.subtitle}</h4>}
            <p>{course.description}</p>
            <div className='d-flex icons'>
              <span>
                <Icon icon='fluent:people-24-regular' /> {course.viewed}
              </span>
              <span>
                <Icon icon='mingcute:thumb-up-line' /> {course.likes}
              </span>
            </div>
          </div>
        </div>
        <div className='course-card-btn d-flex'>
          {enrolled ? (
            <>
              <button
                style={
                  enrolled
                    ? {
                        backgroundColor: '#d4ffbe',
                        color: '#8eae7e',
                        display: 'flex',
                        padding: '.2rem 8px',
                      }
                    : {
                        backgroundColor: '#5CE1E6',
                        color: '#275DAD',
                        display: 'flex',
                        padding: '.2rem 8px',
                      }
                }
                className='btn card-btn  preview'
                onClick={() => openModal('course')}
              >
                <Icon icon='prime:eye' /> Review
              </button>
              <button
                className='btn card-btn cart'
                onClick={() => openModal('payment')}
              >
                ₦{course.amount}
              </button>
            </>
          ) : (
            <>
              <button
                className='btn card-btn enrolled preview'
                onClick={() => openModal('course')}
                style={
                  enrolled
                    ? {
                        backgroundColor: '#d4ffbe',
                        color: '#8eae7e',
                        padding: '5px 3px',
                      }
                    : {
                        backgroundColor: '#5CE1E6',
                        color: '#fff',
                        padding: '5px 3px',
                      }
                }
              >
                <Icon icon='prime:eye' /> Review
              </button>
              <button
                className='btn card-btn enrolled cart'
                onClick={() => openPage(course)}
              >
                <Icon icon='prime:play-circle' />
                {/* <Icon
                  icon='vaadin:cart-o'
                  width={20}
                  style={{ color: 'ffff' }}
                />
                N 1200 */}
                Start
              </button>
              {/* <p className='mb-0'> 0% {<br />} Done</p> */}
              <p className='mb-0'>
                <span className='percentage'>0%</span> Done
              </p>
            </>
          )}
          {/* <button
              className='btn card-btn cart'
              onClick={() => openModal('payment')}>
              <Icon icon="f7:cart" /> N{course.amount}
            </button> */}
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
