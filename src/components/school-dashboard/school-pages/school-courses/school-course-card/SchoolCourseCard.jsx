import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { encryptURI } from '../../../../../utils/encryption'
import EnrollmentModal from '../../../modals/Enrollment/EnrollmentModal'

const SchoolCourseCard = ({ openModal, course, enrolled }) => {
  const [isOn, setIsOn] = useState(false)
  const [openEnrollModal, setOpenEnrollModal] = useState(false)
  const openEnrollementModal = () => {
    setOpenEnrollModal(true)
  }

  const closeEnrollementModal = () => {
    setOpenEnrollModal(false)
  }

  const handleToggle = () => {
    setIsOn(!isOn)
  }

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

  if (enrolled.includes(course._id)) {
    reviewBtnColor = darkGreen
    detailsBtnColor = lightGreen
    reviewBtnClass = 'enrolled'
    detailsBtnClass = 'enrolled'
  } else {
    // reviewBtnColor =
    //   course.category.toLowerCase() == 'students' ? darkTertiary : darkEducator
    // detailsBtnColor =
    //   course.category.toLowerCase() == 'students'
    //     ? lightTertiary
    //     : lightEducator
    // reviewBtnClass =
    //   course.category.toLowerCase() == 'students' ? 'not-enrolled' : 'educator'
    // detailsBtnClass =
    //   course.category.toLowerCase() == 'students' ? 'not-enrolled' : 'educator'
  }

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
    <div>
      <div className='course-card' style={{ height: '480px' }}>
        <div className='course-card-img' style={{ height: '230px' }}>
          <img src={course.image} alt='' />
          <div className='course-card-category'>
            {course.grade !== 'Educators' ? 'Students' : 'Educators'}
          </div>
        </div>
        <div className='course-card-title' style={{ marginBottom: '0' }}>
          <h3>{course.title}:</h3>
          {/* <h3>{course.subtitle}</h3> */}
        </div>
        <p style={{ fontSize: '14px', height: '60px' }}>
          {truncateText(course.description, 100)}
        </p>

        <div style={{ margin: '1rem 0' }} className='users-review'>
          <div
            style={
              course.status === 'published'
                ? { color: '#329BD6' }
                : { color: '#4B7E31' }
            }
            className='users-count'
          >
            <span>
              <Icon icon='fluent:people-24-regular' />{' '}
            </span>
            {course?.courseEnrollment?.length} Students
          </div>
          <div
            style={
              course.status === 'published'
                ? { color: '#329BD6' }
                : { color: '#4B7E31' }
            }
            className='likes-count'
          >
            <span>
              <Icon icon='mingcute:thumb-up-line' />{' '}
            </span>
            {likesPercent(
              course?.likes?.length,
              course?.courseEnrollment?.length
            )}
            %
          </div>
          {enrolled.includes(course._id) ? (
            <div
              className={`toggle-switch ${isOn ? 'on' : 'off'}`}
              onClick={handleToggle}
            >
              <div className={isOn ? 'onKnob' : 'offKnob'}></div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='course-card-buttons'>
          <div className='course-card-buttons-main'>
            <button
              onClick={() => openModal(course)}
              style={
                enrolled.includes(course._id)
                  ? { backgroundColor: '#D4FFBE', color: '#4B7E31' }
                  : course.grade !== 'Educators'
                  ? { backgroundColor: lightTertiary, color: '#329BD6' }
                  : { backgroundColor: lightEducator, color: darkEducator }
              }
              className={`reviewBtn ${reviewBtnClass}`}
            >
              <span>
                <Icon
                  icon='solar:eye-linear'
                  style={{ color: reviewBtnColor }}
                />
              </span>{' '}
              Review
            </button>
            <button
              onClick={!enrolled.includes(course._id) ? openEnrollementModal : null}
              style={
                enrolled.includes(course._id)
                  ? { backgroundColor: darkGreen, color: lightGreen }
                  : course.grade !== 'Educators'
                  ? { backgroundColor: darkTertiary, color: 'white' }
                  : { backgroundColor: darkEducator, color: lightEducator }
              }
            >
              <span>
                {enrolled.includes(course._id) ? (
                  <Icon icon='tabler:list-details' />
                ) : (
                  <Icon icon='mdi:cart' width={24} style={{ color: 'ffff' }} />
                )}
              </span>{' '}
              {enrolled.includes(course._id)
                ? '  View Details'
                : `${course.currency} ${course.cost}`}
            </button>
            {enrolled.includes(course._id) ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: darkGreen, fontWeight: 'bold' }}>
                  0 %
                </span>{' '}
                <span>Done</span>
              </div>
            ) : (
              ''
            )}
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
    </div>
  )
}
export default SchoolCourseCard
