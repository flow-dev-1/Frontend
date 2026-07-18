// src/components/CourseCard.js

import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import './reusable.css'
import Modal from 'react-modal'
import CourseInfoModal from '../../modals-pages/dashboard-modals/CourseInfoModal'
import PaymentModal from '../../modals-pages/dashboard-modals/PaymentModal'
import { useNavigate } from 'react-router-dom'
import ReviewCourseInfoModal from '../../modals-pages/dashboard-modals/ReviewCourseInfoModal'


const CourseCard = ({
  course,
  enrolledData
}) => {

  const navigate = useNavigate()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const isEnrolled = enrolledData?.courses?.find(enrolledCourse => enrolledCourse?.course?._id === course?._id) || null

  const openModal = (modalType, course) => {
    setIsOpen(true)
    setModalType(modalType)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const likesPercent = (likes, courseEnrollment) => {
    if (likes === 0) return 0.0
    return ((likes / courseEnrollment) * 100).toFixed(1)
  }



  const handleFeedbackNavigation = (course) => {
    const courseTitle = course?.title || ""

    if(courseTitle === "Self Awareness"){
      navigate(`/dashboard/feedback/self-awareness`, { state: { enrollmentData: isEnrolled } })
    }else if(courseTitle === "Resilience & Grit"){
      navigate(`/dashboard/resilience_grit/feedback`, { state: { enrollmentData: isEnrolled } })
    }else if(courseTitle === "Emotional Regulation"){
      navigate(`/dashboard/emotional_regulation/feedback`, { state: { enrollmentData: isEnrolled } })
    }else if(courseTitle === "Transition 2"){
      navigate(`/dashboard/transition_2/feedback`, { state: { enrollmentData: isEnrolled } })
    }else if(courseTitle === "TOT Course 1" || courseTitle.includes("Feel It. Teach It. Transform Lives")){
      navigate(`/dashboard/tot/feedback`, { state: { enrollmentData: isEnrolled } })
    }else if(courseTitle === "TOT Course 2" || courseTitle.includes("Leaving No Learner Behind")){
      navigate(`/dashboard/tot_2/feedback`, { state: { enrollmentData: isEnrolled } })
    }else{
      navigate(`/dashboard/${courseTitle}/feedback`, { state: { enrollmentData: isEnrolled } })
    }

  }

  const handleCourseNavigation = (course) => {
    const courseTitle = course?.title || ""

    if(courseTitle === "Self Awareness"){
      navigate(`/dashboard/self-awareness-course`, { state: { enrollmentData: isEnrolled } })
    }else if(courseTitle === "Resilience & Grit") {
      navigate(`/dashboard/resilience_grit`, { state: { enrollmentData: isEnrolled } })
    }else if(courseTitle === "Emotional Regulation") {
      navigate(`/dashboard/emotional_regulation`, { state: { enrollmentData: isEnrolled } })
    }else if(courseTitle === "Transition 2") {
      navigate(`/dashboard/transition_2`, { state: { enrollmentData: isEnrolled } })
    }else if(courseTitle === "TOT Course 1" || courseTitle.includes("Feel It. Teach It. Transform Lives")){
      navigate(`/dashboard/tot`, { state: { enrollmentData: isEnrolled } })
    }else if(courseTitle === "TOT Course 2" || courseTitle.includes("Leaving No Learner Behind")){
      navigate(`/dashboard/tot_2`, { state: { enrollmentData: isEnrolled } })
    }else {
      navigate(`/dashboard/${courseTitle}`, { state: { enrollmentData: isEnrolled } })
    }

  }

  return (
    <div className='reusable-course-card'>
      <div className='course-card' style={{ height: '100%', width: '100%' }}>
        <div style={{ height: '400px' }} className='course-details'>
          <div style={{ height: '250px', display: 'block', width: '100%' }}>
            <img
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={course?.image}
              alt=''
              className='growth-mindset'
            // className={
            //   course?.description.toLowerCase() === 'growth mindset'
            //     ? 'growth-mindset'
            //     : ''
            // }
            />
          </div>

          <div className='px-3 py-2'>
            <h3 style={{ color: '#329BD6', fontSize: '24px' }}>
              {course?.topic}
            </h3>
            <h3 style={{ color: '#555', fontSize: '24px' }}>{course?.title}</h3>
            <p style={{ height: '50px' }}>
              {course?.description}
            </p>
            <div className='d-flex icons'>
              {/* <span>
                <Icon icon='solar:user-linear' />
                {course?.courseEnrollment.length}
              </span> */}
              <span>
                <Icon icon='mingcute:thumb-up-line' />{' '}
                {likesPercent(
                  course?.likes?.length,
                  course?.courseEnrollment?.length
                )}{' '}
                %
              </span>
            </div>
          </div>
        </div>

        {isEnrolled ? (
          <div className='course-card-btn d-flex'>
            {/* Review/Feedback Button */}
            {isEnrolled?.progress === 100 ? (
              <button
                style={{
                  backgroundColor: '#fff',
                  color: '#329BD6',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '.4rem',
                  padding: '.5rem 8px',
                  border: '1px solid #329bd6',
                }}
                className='btn card-btn feedback'
                onClick={() => handleFeedbackNavigation(course)}
              >
                <Icon icon='hugeicons:comment-01' /> Feedback
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #329BD6',
                  color: '#329BD6',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '.4rem',
                  width: '120px',
                  padding: '.5rem 8px',
                }}
                className='btn card-btn preview'
                onClick={() => openModal('review')}
              >
                <Icon icon='prime:eye' /> Review
              </button>
            )}

            {/* Start/Resume/Completed Button */}
            <button
              style={{
                backgroundColor: isEnrolled?.progress === 100 ? '#fff' : '#329BD6',
                color: isEnrolled?.progress === 100 ? '#50AA50' : '#fff',
                display: 'flex',
                justifyContent: 'center',
                gap: '.4rem',
                width: '120px',
                padding: '.5rem 8px',
              }}
              className='btn card-btn start-resume'
              onClick={() =>  handleCourseNavigation(course)
              }
            >
              {isEnrolled?.progress === 100 ? (
                <Icon width={25} icon='ph:seal-check-thin' />
              ) : (
                <Icon icon='pepicons-print:play-circle' />
              )}
              {isEnrolled?.progress === 100
                ? 'Completed'
                : isEnrolled?.progress === 0
                  ? 'Start'
                  : 'Resume'}
            </button>
            {isEnrolled?.progress > 0 && isEnrolled?.progress < 100 && (
              <Icon
                onClick={() => handleFeedbackNavigation(course)}
                style={{ color: '#329BD6' }}
                width={40}
                icon='hugeicons:comment-01'
              />
            )}
          </div>
        ) : (
          <div className='course-card-btn d-flex' style={{ width: '90%' }}>
            <button
              style={{
                backgroundColor: '#fff',
                border: '1px solid #329BD6',
                color: '#329BD6',
                display: 'flex',
                justifyContent: 'center',
                gap: '.4rem',
                padding: '.5rem 8px',
              }}
              className='btn card-btn preview'
              onClick={() => openModal('course')}
            >
              <Icon icon='prime:eye' /> Review
            </button>

            <button
              style={{
                backgroundColor: '#329BD6',
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                gap: '.4rem',
                padding: '.5rem 8px',
              }}
              className='btn card-btn cart'
              onClick={() => openModal('payment')}
            >
              <Icon icon='mdi:cart-outline' />
              {course?.currency}
              {course?.cost?.toLocaleString()}
            </button>
          </div>
        )}
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

        {modalType === 'review' && (
          <ReviewCourseInfoModal course={course} onClose={closeModal} />
        )}

        {modalType === 'payment' && (
          <PaymentModal course={course} onClose={closeModal} />
        )}
      </Modal>
    </div>
  )
}

export default CourseCard
