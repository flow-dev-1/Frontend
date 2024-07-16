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
        <h2
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          className='modal-title'
        >
          Growth Mindset Course Guide{' '}
          <button
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              color: '#5B616A',
            }}
            onClick={closeModal}
          >
            <Icon icon='mdi:close' width={24} />
          </button>
        </h2>
        <p style={{ fontSize: '16px', color: '#4b7e31' }}>Course Overview</p>
        <p style={{ fontSize: '12px', marginBottom: '1rem' }}>
          {course.description}
        </p>
        <p style={{ fontSize: '16px', color: '#4b7e31' }}>Course Objectives</p>

        <ul className='ul'>
          <p>
            Upon completion of the Growth Mindset Course, students will be able
            to:
          </p>

          <li>
            <span style={{ color: '#4b7e31' }}>
              Understanding the Growth Mindset:
            </span>
            Students will develop a deep understanding of the growth mindset and
            how it contrasts with a fixed mindset. They will learn to identify
            characteristics and examples of each mindset in various contexts.
          </li>
          <li>
            <span style={{ color: '#4b7e31' }}>
              Applying the Growth Mindset:
            </span>
            Students will learn to apply the principles of a growth mindset in
            real-life situations and understand the importance of embracing
            challenges, persevering in the face of setbacks, and viewing effort
            as a path to mastery.
          </li>
          <li>
            <span style={{ color: '#4b7e31' }}>Exploring the Human Brain:</span>
            Students will gain a basic understanding of the human brain, its
            capacity for growth and change (neuroplasticity), and how this ties
            in with the growth mindset concept.
          </li>
          <li>
            <span style={{ color: '#4b7e31' }}>Developing Self-awareness:</span>
            Students will reflect on their personal strengths, interests, and
            aspirations, recognize their potential for growth, and understand
            they can and cannot control.
          </li>
          <li>
            <span style={{ color: '#4b7e31' }}>Encouraging Collaboration:</span>
            Through group activities, students will develop their teamwork,
            communication, and problem-solving skills, reinforcing the social
            aspects of a growth mindset.
          </li>
        </ul>

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
            backgroundColor: '#275DAD',
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
              backgroundColor: '#5CE1E6',
              color: '#275DAD',
              borderRadius: '30px',
            }}
            className='purchase-button'
          >
            <Icon icon='mdi:cart' width={24} /> {course.currency} {course.cost}
          </button>
        </div>
      )}
    </div>
  )
}

export default CourseDetailModal
