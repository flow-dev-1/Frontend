import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
import PaymentModal from './PaymentModal'
import dot from '../../../assets/radix-icons--dot-filled.svg'

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
      <div className='py-2 px-4 overflow-y-modal'>
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
        <div>
          <img
            style={{
              width: '100%',
              height: '160px',
              objectFit: 'cover',
            }}
            src={course?.image}
            alt=''
          />
        </div>
        <div className='course-info-modal-body'>
          <p style={{ fontSize: '20px', color: '#275DAD' }}>Course Overview</p>
          <p style={{ paddingLeft: '.5rem' }}>
            Welcome to your journey of self-awareness and personal growth! Over
            the next several weeks, we’ll explore key concepts that will help
            you understand yourself better, and build meaningful relationships.
            Here’s what you can look forward to:
          </p>
          <div className='mt-4 course-objectives'>
            <p style={{ fontSize: '20px', color: '#275DAD' }}>
              Course Objectives
            </p>
            <div className='objectives-scroll'>
              <ul>
                <li>
                  <div className=' list'>
                    <img src={dot} />
                    <p style={{ fontSize: '15px', color: '#275DAD' }}>
                      Week 1: Introduction to Self-Awareness
                    </p>
                  </div>
                  <p style={{ paddingLeft: '.5rem' }}>
                    What We’ll Do: We’ll start by exploring what it means to be
                    self-aware. You’ll take a personality test to discover your
                    unique traits and identify whether you align with the colors
                    blue, green, red, or yellow. This will set the foundation
                    for understanding how your personality influences your
                    behavior.
                  </p>
                  <br />
                  <p>
                    Why It Matters: Knowing yourself is the first step in
                    personal growth. Understanding your personality will help
                    you be self-aware better.
                  </p>
                </li>
                <li>
                  <div className=' list'>
                    <img src={dot} />
                    <p style={{ fontSize: '15px', color: '#275DAD' }}>
                      Week 2: Identifying Strengths And Weaknesses
                    </p>
                  </div>

                  <p style={{ paddingLeft: '.5rem' }}>
                    We’ll focus on identifying your personal strengths and
                    weaknesses through scenario-based activities.
                  </p>
                </li>
                <li>
                  <div className=' list'>
                    <img src={dot} />
                    <p style={{ fontSize: '15px', color: '#275DAD' }}>
                      Week 3: Understanding Values
                    </p>
                  </div>
                  <p style={{ paddingLeft: '.5rem' }}>
                    We’ll dive into the importance of values, how they guide
                    your decisions, and how to identify your core values.
                  </p>
                </li>
                <li>
                  <div className=' list'>
                    <img src={dot} />
                    <p style={{ fontSize: '15px', color: '#275DAD' }}>
                      Week 4: Embracing A Growth Mindset
                    </p>
                  </div>
                  <p style={{ paddingLeft: '.5rem' }}>
                    We’ll explore the concept of a growth mindset and how to
                    shift from a fixed mindset to a growth mindset.
                  </p>
                </li>
                <li>
                  <div className=' list'>
                    <img src={dot} />
                    <p style={{ fontSize: '15px', color: '#275DAD' }}>
                      Week 5: Emotional Intelligence
                    </p>
                  </div>
                  <p style={{ paddingLeft: '.5rem', paddingBottom: '1rem' }}>
                    We’ll learn about emotional intelligence and how to manage
                    your emotions as well as recognize the emotions of others.
                  </p>
                </li>
              </ul>
            </div>
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
