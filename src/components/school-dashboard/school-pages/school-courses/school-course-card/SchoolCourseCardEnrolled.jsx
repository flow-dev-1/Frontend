import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { encryptURI } from '../../../../../utils/encryption'
import { Link } from 'react-router-dom'

const SchoolCourseCardEnrolled = ({ openModal, courseData }) => {
  const [isOn, setIsOn] = useState(false)
  const [course] = useState(courseData.course)
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsOn(!isOn)
  }

  // Color definitions
  const lightGreen = '#D4FFBE'
  const darkGreen = '#4B7E31'
  const lightTertiary = '#FAFAFA'
  const darkTertiary = '#329BD6'
  const lightEducator = '#5CE1E6'
  const darkEducator = '#275DAD'

  const likesPercent = (likes, courseEnrollment) => {
    if (likes === 0) return 0
    return (likes / courseEnrollment) * 100
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  }

  // Determine the link path based on course grade
  const linkPath =
    course.grade === 'Educator'
      ? `/school-dashboard/courses/enrolled/educators/${encryptURI(
          courseData._id
        )}`
      : `/school-dashboard/courses/enrolled/${encryptURI(courseData._id)}`

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
          {truncateText(course.description, 100)}
        </p>

        <div className='users-review'>
          <div
            style={{
              width: '40%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ color: '#329bd6' }} className='users-count'>
              <span>
                <Icon icon='fluent:people-24-regular' width={20} />{' '}
              </span>
              {course?.courseEnrollment?.length}
            </div>
            <div style={{ color: '#329bd6' }} className='likes-count'>
              <span>
                <Icon icon='mingcute:thumb-up-line' width={18} />{' '}
              </span>
              {likesPercent(
                course?.likes?.length,
                course?.courseEnrollment?.length
              )}
              %
            </div>
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
              className={`reviewBtn`}
              onClick={(e) => {
                e.stopPropagation()
                openModal(course)
              }}
              style={{
                backgroundColor: '#fff',
                color: '#329BD6',
                border: '1px solid #329bd6',
              }}
            >
              <span>
                <Icon icon='solar:eye-linear' width={20} />
              </span>{' '}
              Review
            </button>
            <Link to={linkPath}>
              <button
                className={`detailsBtn`}
                style={{
                  backgroundColor: '#329BD6',
                  color: '#fff',
                  border: '1px solid #329bd6',
                }}
              >
                <span>
                  <Icon icon='ri:menu-2-fill' width={20} />
                </span>{' '}
                View Detail
              </button>
            </Link>

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
