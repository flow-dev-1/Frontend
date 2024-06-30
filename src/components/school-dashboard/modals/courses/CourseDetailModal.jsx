import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import './course-detail-modal.css'
import EnrollmentModal from '../Enrollment/EnrollmentModal'

const CourseDetailModal = ({ course, enrolled }) => {
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
      <button className='modal-close-button'>
        <Icon icon='mdi:close' width={24} />
      </button>
      <h2 className='modal-title'>Growth Mindset Course Guide</h2>
      <h3>Course Overview</h3>
      <p>{course.description}</p>
      <h3>Course Objectives</h3>
      <ul>
        <li>
          Understanding the Growth Mindset: Students will develop a deep
          understanding of the growth mindset and how it contrasts with a fixed
          mindset. They will learn to identify characteristics and examples of
          each mindset in various contexts.
        </li>
        <li>
          Applying the Growth Mindset: Students will learn to apply the
          principles of a growth mindset in real-life situations and understand
          the importance of embracing challenges, persevering in the face of
          setbacks, and viewing effort as a path to mastery.
        </li>
        <li>
          Exploring the Human Brain: Students will gain a basic understanding of
          the human brain, its capacity for growth and change (neuroplasticity),
          and how this ties in with the growth mindset concept.
        </li>
        <li>
          Developing Self-awareness: Students will reflect on their personal
          strengths, interests, and aspirations, recognize their potential for
          growth, and understand what they can and cannot control.
        </li>
        <li>
          Encouraging Collaboration: Through group activities, students will
          develop their teamwork, communication, and problem-solving skills,
          reinforcing the social aspects of a growth mindset.
        </li>
      </ul>
      {
        (enrolled && !enrolled.includes(course._id)) &&
        <div className='modal-footer'>
          <button onClick={openEnrollementModal} className='purchase-button'>
            <Icon icon='mdi:cart' width={24} /> {course.currency} {course.cost}
          </button>
        </div>
      }


      <EnrollmentModal
        isOpen={openEnrollModal}
        onRequestClose={closeEnrollementModal}
        daysOfWeek={daysOfWeek}
        timeOptions={timeOptions}
        course={course}
      />
    </div>
  )
}

export default CourseDetailModal
