import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import course_image from '../../../assets/course-image.png'
import dot from '../../../assets/radix-icons--dot-filled.svg'
import CourseReviewModalInfo from './CourseReviewModalInfo'

export default function ReviewCourseInfoModal({ course, onClose }) {

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
    onClose?.()
  }
  // console.log(course?.image)

  return (
    <div className='course-info-modal overflow-y-modal '>

      <CourseReviewModalInfo
        course={course}
        closeModal={closeModal}
      />
    </div>
  )
}
