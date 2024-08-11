import React, { useState } from 'react'
import { Icon } from '@iconify/react'

export default function ReviewCourseInfoModal({ course, onClose }) {
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
            {course.title}
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
          <p style={{ paddingLeft: '.5rem' }}>
            Values and Goals is a comprehensive 10-week program designed for
            students in Years 3-6, building on the foundation laid in the
            previous term. This course delves deeper into the exploration of
            personal values, goal setting, and the practical steps necessary to
            align actions with one's core principles. Through interactive
            activities, engaging discussions, and introspective exercises,
            students will gain a clearer understanding of their values, identify
            and set meaningful goals, and develop actionable plans to achieve
            them. The course emphasizes the importance of self-reflection,
            resilience, and adaptability in the face of challenges while
            maintaining a supportive and collaborative learning environment.
          </p>
          <div className='mt-4'>
            <p style={{ fontSize: '20px', color: '#275DAD' }}>
              Course Objectives
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
