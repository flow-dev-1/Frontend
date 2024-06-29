import { Icon } from '@iconify/react'
import { useState } from 'react'

const SchoolCourseCard = ({ openModal, course }) => {
  const [isOn, setIsOn] = useState(false)

  const handleToggle = () => {
    setIsOn(!isOn)
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

  console.log(course)

  if (course.status.enrolled) {
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

  console.log(course)

  return (
    <div>
      <div className='course-card'>
        <div className='course-card-img'>
          <img src={course.image} alt='' />
          <div className='course-card-category'>
            {course.grade !== 'Educators' ? 'Students' : 'Educators'}
          </div>
        </div>
        <div className='course-card-title'>
          <h3>{course.title}:</h3>
          {/* <h3>{course.subtitle}</h3> */}
        </div>
        {truncateText(course.description, 100)}
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
          {course.status === 'published' ? (
            <div
              className={`toggle-switch ${isOn ? 'on' : 'off'}`}
              onClick={handleToggle}
            >
              <div className='toggle-knob'></div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='course-card-buttons'>
          <div className='course-card-buttons-main'>
            <button
              style={
                course.status === 'published'
                  ? { backgroundColor: '#F8F8F8', color: '#329BD6' }
                  : { backgroundColor: '#D4FFBE', color: '#4B7E31' }
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
              className={`detailsBtn ${detailsBtnClass}`}
              onClick={() => openModal(course)}
              style={
                course.status === 'published'
                  ? { backgroundColor: darkEducator, color: '#5CE1E6' }
                  : { backgroundColor: darkGreen, color: 'ffff' }
              }
            >
              <span>
                <Icon
                  icon='tabler:list-details'
                  style={{ color: detailsBtnColor }}
                />
              </span>{' '}
              View Details
            </button>
            {course.status === 'published' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: darkGreen }}>0 %</span> <span>Done</span>
              </div>
            ) : (
              ''
            )}
          </div>
          {course.status.enrolled ? (
            <div className='course-card-progress'>
              {course.status.progress}% done
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
export default SchoolCourseCard
