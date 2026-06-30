import React from 'react'
import CourseReviewModalInfo from './CourseReviewModalInfo'

export default function ReviewCourseInfoModal({ course, onClose }) {
  return (
    <div className='course-info-modal overflow-y-modal '>
      <CourseReviewModalInfo
        course={course}
        closeModal={onClose}
      />
    </div>
  )
}
