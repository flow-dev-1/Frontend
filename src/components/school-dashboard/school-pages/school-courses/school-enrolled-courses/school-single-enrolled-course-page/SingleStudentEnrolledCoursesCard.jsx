import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import schoolService from '../../../../../../services/api/school'
import { decryptId, encryptURI } from '../../../../../../utils/encryption'

const SingleStudentEnrolledCoursesCard = ({
  openModal,
  course,
  enrolled,
  coursesArray,
  enrolledData,
}) => {
  const navigate = useNavigate()

  const [courseStatus, setCourseStatus] = useState('')

  const { id } = useParams()
  const { userId } = useParams()


  // enrolled color
  const lightGreen = '#D4FFBE'
  const darkGreen = '#4B7E31'


  let reviewBtnColor
  let detailsBtnColor

  let reviewBtnClass
  let detailsBtnClass

  // Check if the course is in the enrolled array
  const isEnrolled = enrolled.includes(course._id)


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


  const likesPercent = (likes, courseEnrollment) => {
    if (likes === 0) return 0
    return ((likes / courseEnrollment) * 100).toFixed(1)
  }


  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  }

  const getStatus = (progress) => {
    if (progress === 0) {
      return 'Not Started'
    } else if (progress > 0 && progress < 100) {
      return 'Ongoing'
    } else if (progress === 100) {
      return 'Completed'
    } else if (progress === undefined) {
      return 'Not Started'
    }
  }

  useEffect(() => {
    // Assuming course has a status field that tells us the course state
    const status = getStatus(course?.progress) // You can change this based on your data
    setCourseStatus(status)

    return () => { }
  }, [course])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Started':
        return { color: 'red', icon: 'et:caution' }
      case 'Ongoing':
        return { color: '#FFB800', icon: 'bi:book' }
      case 'Completed':
        return { color: 'green', icon: 'ph:seal-check-light' }
      default:
        return { color: 'grey', icon: 'fluent:error-circle-24-regular' }
    }
  }

  const handleFeedbackNavigation = (course) => {
    console.log("DEBUG: Full Course Object:", course)
    console.log("DEBUG: Enrollment ID (_id):", course?._id)
    console.log("DEBUG: Course ID (course._id):", course?.course?._id)
    if (course?.course.title === "Self Awareness") {
      navigate(
        `/school-dashboard/courses/feedback/${encryptURI(userId)}`,
        { state: { enrollmentData: course } }
      )
    } else if (course?.course.title === "Resilience & Grit") {
      navigate(
        `/school-dashboard/courses/feedback/resilience_grit/${encryptURI(userId)}`,
        { state: { enrollmentData: course } }
      )
    } else if (course?.course.title === "Compassion") {
      navigate(
        `/school-dashboard/courses/feedback/compassion/${encryptURI(userId)}`,
        { state: { enrollmentData: course } }
      )
    } else if (course?.course.title === "Transition 2") {
      navigate(
        `/school-dashboard/courses/feedback/transition_2/${encryptURI(userId)}`,
        { state: { enrollmentData: course } }
      )
    } else if (course?.course.title === "Transition") {
      navigate(
        `/school-dashboard/courses/feedback/transition/${encryptURI(userId)}`,
        { state: { enrollmentData: course } }
      )
    } else if (course?.course.title === "Emotional Regulation") {
      navigate(
        `/school-dashboard/courses/feedback/emotional_regulation/${encryptURI(userId)}`,
        { state: { enrollmentData: course } }
      )
    } else {
      navigate(`/dashboard/${course?.course.title}/feedback`, { state: { enrollmentData: course } })
    }

  }

  const renderStatusButton = (status) => {
    const { color, icon } = getStatusColor(status)

    return (
      <button
        style={{
          border: `1px solid ${color}`,
          color: color,
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        <Icon icon={icon} width={20} style={{ color: color }} />
        <span>{status}</span>
      </button>
    )
  }


  return (
    <div>
      <div className='course-card' style={{ height: '480px' }}>
        <div className='course-card-img' style={{ height: '230px' }}>
          <img src={course.course.image} alt='' />
          <div className='course-card-category'>
            {course.course.grade !== 'Educators' ? 'Students' : 'Educators'}
          </div>
        </div>
        <div className='course-card-title' style={{ marginBottom: '0' }}>
          <h3 style={{ color: '#329BD6', fontSize: '24px' }}>
            {course?.course?.topic}
          </h3>
          <h3 style={isEnrolled ? { color: '#555' } : { color: '#329BD6' }}>
            {course?.course?.title}
          </h3>
          {/* <h3>{course.subtitle}</h3> */}
        </div>
        <p style={{ fontSize: '12px', height: '60px' }}>
          {truncateText(course?.course?.description, 100)}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{ margin: '1rem 0', width: '50%' }}
            className='users-review'
          >
            <div style={{ color: '#329BD6' }} className='users-count'>
              <span>
                <Icon icon='heroicons:user' width={20} />{' '}
              </span>
              {course?.course.courseEnrollment?.length}
            </div>
            <div
              style={{
                color: '#329BD6',
                display: 'flex',
                alignItems: 'center',
              }}
              className='likes-count'
            >
              <span>
                <Icon width={17} icon='mingcute:thumb-up-line' />{' '}
              </span>
              {likesPercent(
                course?.course.likes?.length,
                course?.course.courseEnrollment?.length
              )}
              %
            </div>
            <div
              style={{
                color: '#329BD6',
                display: 'flex',
                alignItems: 'center',
              }}
              className='likes-count'
            >
              <span>
                <Icon width={17} icon='bi:book' />{' '}
              </span>
              {course?.progress}%
            </div>
          </div>
        </div>
        <div className='course-card-buttons'>
          <div className='course-card-buttons-main'>
            <button
              style={{
                backgroundColor: '#fff',
                display: 'flex',
                gap: '.4rem',
                color:
                  course?.progress === 0 || course?.progress === undefined
                    ? '#A6A6A6'
                    : '#329BD6',
                border: `1px solid ${course?.progress === 0 || course?.progress === undefined
                  ? '#D6D6D6'
                  : '#329bd6'
                  }`,
                padding: '5px 10px',
                cursor:
                  course?.progress === 0 || course?.progress === undefined
                    ? 'not-allowed'
                    : 'pointer',
              }}
              onClick={() => {
                if (course?.progress !== 0 || undefined) {
                  handleFeedbackNavigation(course)
                }
              }}
              disabled={
                course?.progress === 0 || course?.progress === undefined
              } // This disables the button if progress is 0
            >
              <Icon
                icon='hugeicons:comment-01'
                style={{ display: 'inline-block', marginLeft: '1rem' }}
                width={25}
              />
              Feedback
            </button>

            <div style={{ margin: '10px 0' }}>
              {renderStatusButton(courseStatus)}
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  )
}

export default SingleStudentEnrolledCoursesCard
