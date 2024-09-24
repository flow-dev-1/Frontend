import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import './course-detail-modal.css'
import EnrollmentModal from '../Enrollment/EnrollmentModal'
import AddEducator from '../../school-pages/school-courses/school-course-card/AddEducator'

const CourseDetailModal = ({ course, enrolled, closeModal }) => {
  const [openEnrollModal, setOpenEnrollModal] = useState(false)
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const [openEnrollModalEducator, setOpenEnrollModalEducator] = useState(false)
  const openEnrollementModal = () => {
    if (course.grade === 'Educator') {
      setOpenEnrollModalEducator(true)
    } else {
      setOpenEnrollModal(true)
    }
  }

  const openVewModel  = () =>{
    setOpenDetailsModal(true);
  }

  const closeEnrollementModal = () => {
    setOpenEnrollModal(false)
    setOpenEnrollModalEducator(false)
  }

  if (!course) return null

  console.log(course)

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
    <div style={{ width: '100%' }}>
      <div style={{ padding: '20px 50px' }}>
        <div>
          <div className='course-info-modal-header'>
            <h2
              className='mb-0'
              style={{ fontFamily: 'Caveat, cursive', fontSize: '24px' }}
            >
              {course.title}
            </h2>
            <button
              onClick={closeModal}
              className='close-btn'
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              <Icon icon='material-symbols-light:close' width={22} />
            </button>
          </div>
          <hr className='w-100 h-auto mb-2' />
          <div>
            <img
              src={course.image}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
                display: 'block',
              }}
              alt=''
            />
          </div>
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
        <AddEducator
          isOpen={openEnrollModalEducator}
          onRequestClose={closeEnrollementModal}
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
