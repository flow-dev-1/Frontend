import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { encryptURI } from '../../../../../utils/encryption'
import EnrollmentModal from '../../../modals/Enrollment/EnrollmentModal'
import { Navigate } from 'react-router-dom'
import AddEducator from './AddEducator'

const SchoolCourseCard = ({
  openModal,
  course,
  enrolled,
  coursesArray,
  enrolledData,
}) => {
  const [isOn, setIsOn] = useState(false)
  const [openEnrollModal, setOpenEnrollModal] = useState(false)
  const [openEnrollModalEducator, setOpenEnrollModalEducator] = useState(false)
  const [courseData] = useState(course)
  const navigate = useNavigate()

  const openEnrollementModal = () => {
    if (course.grade === 'Educator') {
      setOpenEnrollModalEducator(true)
    } else {
      setOpenEnrollModal(true)
    }
  }

  const closeEnrollementModal = () => {
    setOpenEnrollModal(false)
    setOpenEnrollModalEducator(false)
  }

  console.log('Enrolled Array', enrolledData)

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

  // Check if the course is in the enrolled array
  const isEnrolled = enrolled.includes(course._id)
  console.log(isEnrolled)

  if (isEnrolled) {
    reviewBtnColor = darkGreen
    detailsBtnColor = lightGreen
    reviewBtnClass = 'enrolled'
    detailsBtnClass = 'enrolled'
  } else {
    // Handle the case for non-enrolled courses
    // You can uncomment the logic below if necessary
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

  const handleDetailsClick = () => {
    if (isEnrolled) {
      navigate(
        `/school-dashboard/courses/enrolled/${encryptURI(enrolledData?.courses[0]?._id)}`
      )
    }
    openEnrollementModal()
  }

  console.log(enrolled)

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
          <h3 style={isEnrolled ? { color: '#4B7E31' } : { color: '#329BD6' }}>
            {course.title}:
          </h3>
          {/* <h3>{course.subtitle}</h3> */}
        </div>
        <p style={{ fontSize: '12px', height: '60px' }}>
          {truncateText(course?.description, 100)}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{ margin: '1rem 0', width: '40%' }}
            className='users-review'
          >
            <div
              style={
                course.status === 'published'
                  ? { color: '#329BD6' }
                  : { color: '#4B7E31' }
              }
              className='users-count'
            >
              <span>
                <Icon icon='fluent:people-24-regular' width={20} />{' '}
              </span>
              {course?.courseEnrollment?.length}
            </div>
            <div
              style={
                course.status === 'published'
                  ? { color: '#329BD6', display: 'flex', alignItems: 'center' }
                  : { color: '#4B7E31', display: 'flex', alignItems: 'center' }
              }
              className='likes-count'
            >
              <span>
                <Icon width={17} icon='mingcute:thumb-up-line' />{' '}
              </span>
              {likesPercent(
                course?.likes?.length,
                course?.courseEnrollment?.length
              )}
              %
            </div>
          </div>
          {isEnrolled ? (
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
                isEnrolled
                  ? {
                      backgroundColor: '#fff',
                      color: '#329BD6',
                      border: '1px solid #329bd6',
                    }
                  : course.grade !== 'Educators'
                  ? {
                      backgroundColor: '#fff',
                      color: '#329BD6',
                      border: '1px solid #329bd6',
                    }
                  : { backgroundColor: lightEducator, color: darkEducator }
              }
              className={`reviewBtn ${reviewBtnClass}`}
            >
              <span>
                <Icon
                  icon='solar:eye-linear'
                  style={{ color: '#329BD6' }}
                  width={20}
                />
              </span>{' '}
              Review
            </button>
            <button
              id='reviewBtn'
              onClick={handleDetailsClick}
              style={
                isEnrolled
                  ? {
                      backgroundColor: '#329BD6',
                      color: '#fff',
                      border: '1px solid #329bd6',
                    }
                  : course.grade !== 'Educators'
                  ? { backgroundColor: darkTertiary, color: 'white' }
                  : { backgroundColor: darkEducator, color: lightEducator }
              }
            >
              <span>
                {isEnrolled ? (
                  <Icon icon='ri:menu-2-fill' width={20} />
                ) : (
                  <Icon
                    icon='vaadin:cart-o'
                    width={20}
                    style={{ color: 'ffff' }}
                  />
                )}
              </span>{' '}
              {isEnrolled
                ? '  View Details'
                : `${course.currency} ${course.cost}`}
            </button>
            {isEnrolled ? (
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
            ) : (
              ''
            )}
          </div>
        </div>
      </div>{' '}
      <EnrollmentModal
        isOpen={openEnrollModal}
        onRequestClose={closeEnrollementModal}
        daysOfWeek={daysOfWeek}
        timeOptions={timeOptions}
        course={course}
      />
      <AddEducator
        isOpen={openEnrollModalEducator}
        onRequestClose={closeEnrollementModal}
      />
    </div>
  )
}

export default SchoolCourseCard
