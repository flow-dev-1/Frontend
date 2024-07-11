import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { encryptURI } from '../../../../../utils/encryption'

const SchoolCourseCardEnrolled = ({ openModal, courseData }) => {
  const [isOn, setIsOn] = useState(false)
  const [course] = useState(courseData.course)
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsOn(!isOn)
  }

  const navigateToCourse = () => {
    navigate(`/school-dashboard/courses/enrolled/${encryptURI(courseData._id)}`)
  }

  // enrolled color
  const lightGreen = '#D4FFBE'
  const darkGreen = '#4B7E31'

  // not-enrolled
  // studentimp
  const lightTertiary = '#FAFAFA'
  const darkTertiary = '#329BD6'

  // educator
  const lightEducator = '#5CE1E6'
  const darkEducator = '#275DAD'

  let reviewBtnColor
  let detailsBtnColor

  let reviewBtnClass
  let detailsBtnClass

  // if (course.status.enrolled) {
  //   reviewBtnColor = darkGreen
  //   detailsBtnColor = lightGreen
  //   reviewBtnClass = 'enrolled'
  //   detailsBtnClass = 'enrolled'
  // } else {
  //   reviewBtnColor =
  //     course.category.toLowerCase() === 'students' ? darkTertiary : darkEducator
  //   detailsBtnColor =
  //     course.category.toLowerCase() === 'students'
  //       ? lightTertiary
  //       : lightEducator

  //   reviewBtnClass =
  //     course.category.toLowerCase() === 'students' ? 'not-enrolled' : 'educator'
  //   detailsBtnClass =
  //     course.category.toLowerCase() === 'students' ? 'not-enrolled' : 'educator'
  // }

  const likesPercent = (likes, courseEnrollment) => {
    if (likes === 0) return 0
    return (likes / courseEnrollment) * 100
  }

  const viewSingleCourse = (url) => {
    window.open(url, '_blank')
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  }

  return (
    <div style={{ cursor: 'pointer' }}>
      <div className='course-card' style={{ height: '480px' }}>
        <div className='course-card-img' style={{ height: '230px' }}>
          <img src={course.image} alt='' />
          <div className='course-card-category'>
            {course.grade !== 'Educators' ? 'Students' : 'Educators'}
          </div>
        </div>
        <div className='course-card-title' style={{ margin: '0' }}>
          <h3 style={{ color: '#4B7E31' }}>{course.title}:</h3>
          <h3>{course.subtitle}</h3>
        </div>
        <p style={{ fontSize: '12px', height: '60px', marginBottom: '1rem' }}>
          {' '}
          {truncateText(course.description, 100)}
        </p>

        <div className='users-review'>
          <div className='users-count'>
            <span>
              <Icon
                icon='fluent:people-24-regular'
                style={{ color: reviewBtnColor }}
              />{' '}
            </span>
            {course?.courseEnrollment?.length} Students
          </div>
          <div className='likes-count'>
            <span>
              <Icon
                icon='mingcute:thumb-up-line'
                style={{ color: reviewBtnColor }}
              />{' '}
            </span>
            {likesPercent(
              course?.likes?.length,
              course?.courseEnrollment?.length
            )}
            %
          </div>
          <div
            className={`toggle-switch ${isOn ? 'on' : 'off'}`}
            onClick={handleToggle}
          >
            <div className={isOn ? 'onKnob' : 'offKnob'}></div>
          </div>
        </div>
        <div className='course-card-buttons'>
          <div className='course-card-buttons-main'>
            <button
              className={`reviewBtn ${reviewBtnClass}`}
              onClick={(e) => {
                e.stopPropagation()
                openModal(course)
              }}
              style={{ backgroundColor: '#D4FFBE', color: '#4B7E31' }}
            >
              <span>
                <Icon
                  icon='solar:eye-linear'
                  style={{ color: reviewBtnColor }}
                  width={20}
                />
              </span>{' '}
              Review
            </button>
            <button
              className={`detailsBtn ${detailsBtnClass}`}
              onClick={(e) => {
                e.stopPropagation()
                navigateToCourse()
              }}
              style={{ backgroundColor: darkGreen, color: lightGreen }}
            >
              <span>
                <Icon icon='vaadin:cart-o' style={{ color: detailsBtnColor }} />
              </span>{' '}
              View Details
            </button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
              <span style={{ color: '#50AA50', fontWeight: '400' }}>0 %</span>{' '}
              <span>Done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolCourseCardEnrolled
