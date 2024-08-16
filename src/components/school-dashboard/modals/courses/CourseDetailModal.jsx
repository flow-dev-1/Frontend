import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import './course-detail-modal.css'
import EnrollmentModal from '../Enrollment/EnrollmentModal'

const CourseDetailModal = ({ course, enrolled, closeModal }) => {
  const [openEnrollModal, setOpenEnrollModal] = useState(false)
  const openEnrollementModal = () => {
    setOpenEnrollModal(true)
  }

  const closeEnrollementModal = () => {
    setOpenEnrollModal(false)
  }

  if (!course) return null

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const timeOptions = Array.from(
    { length: 10 },
    (_, i) => `${String(i + 8).padStart(2, '0')}:00`
  )

  return (
    <div>
      <div style={{ padding: '20px 50px' }}>
        <div>
          <div className='course-info-modal-header'>
            <h2
              className='mb-0'
              style={{ fontFamily: 'Caveat, cursive', fontSize: '24px' }}
            >
              Growth Mindset
            </h2>
            <button
              className='close-btn'
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
            <p style={{ fontSize: '20px', color: '#275DAD' }}>
              Course Overview
            </p>
            <p style={{ paddingLeft: '.5rem' }}>{course.description}</p>
            <div className='mt-4'>
              <p style={{ fontSize: '20px', color: '#275DAD' }}>
                Course Objectives
              </p>
            </div>
          </div>
        </div>

        <EnrollmentModal
          isOpen={openEnrollModal}
          onRequestClose={closeEnrollementModal}
          daysOfWeek={daysOfWeek}
          timeOptions={timeOptions}
          course={course}
        />
      </div>
      {enrolled && !enrolled.includes(course._id) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4rem',
            width: '100%',
            backgroundColor: '#329BD6',
            padding: '1rem',
          }}
          className='modal-footer'
        >
          <p style={{ color: '#fff' }}>
            To get full access to this course, kindly purchase!
          </p>
          <button
            onClick={openEnrollementModal}
            style={{
              backgroundColor: '#fff',
              color: '#329BD6',
              padding: '8px 32px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
            className='purchase-button'
          >
            <Icon icon='mdi:cart' style={{ color: '#329BD6' }} width={24} />{' '}
            {course.currency} {course.cost}
          </button>
        </div>
      )}
    </div>
  )
}

export default CourseDetailModal
