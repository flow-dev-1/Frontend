import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import schoolService from '../../../../../../services/api/school'
import { decryptId } from '../../../../../../utils/encryption'

const SingleStudentEnrolledCoursesCard = ({
  openModal,
  course,
  enrolled,
  coursesArray,
  enrolledData,
}) => {
  const [openEnrollModal, setOpenEnrollModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [openEnrollModalEducator, setOpenEnrollModalEducator] = useState(false)
  console.log(enrolledData)
  const [courseData] = useState(course)
  const navigate = useNavigate()
  const [isOn, setIsOn] = useState(() => {
    // Initialize state from localStorage if it exists, otherwise default to false
    const savedState = localStorage.getItem('toggleState')
    return savedState ? JSON.parse(savedState) : false
  })

  const [courseStatus, setCourseStatus] = useState('')

  const { id } = useParams()

  console.log(decryptId(id))
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

  console.log('Enrolled Array', course)

  const handleToggle = (courseId) => {
    setIsOn((prevIsOn) => {
      const newIsOn = !prevIsOn
      const data = { status: newIsOn ? 'Confirmed' : 'Deactivated' }

      // Save the new toggle state in localStorage
      localStorage.setItem('toggleState', JSON.stringify(newIsOn))

      // Call the service with the updated status
      schoolService.changeToggle(courseId, data)

      return newIsOn
    })
  }

  // const handleToggle = (courseId) => {
  //   setIsOn((prevIsOn) => {
  //     const newIsOn = !prevIsOn;
  //     const data = { status: newIsOn ? "Confirmed" : "Deactivated" };

  //     // Save the new toggle state in localStorage
  //     localStorage.setItem("toggleState", JSON.stringify(newIsOn));

  //     // Call the service with the updated status
  //     schoolService.changeToggle(courseId, data);

  //     return newIsOn;
  //   });
  // };

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
  const [coursedarta, setCourseDarta] = useState('')

  console.log(coursedarta)
  console.log(enrolledData)
  const courseIndex = coursesArray?.courses.findIndex(
    (c) => c._id === course._id
  )
  console.log(courseIndex)
  const handleDetailsClick = () => {
    // Find the index of the current course in the coursesArray
    const courseIndex = coursesArray?.courses.findIndex(
      (c) => c._id === course._id
    )
    console.log(courseIndex)

    // Use this index to get the corresponding enrolledData course
    if (isEnrolled && enrolledData?.courses[courseIndex]) {
      setOpenViewModal(true)
      setCourseDarta(enrolledData?.courses[courseIndex]._id)
      //  console.log(enrolledData?.courses[courseIndex]._id);
      // navigate(
      //   `/school-dashboard/courses/enrolled/${encryptURI(
      //     enrolledData.courses[courseIndex]._id
      //   )}`
      // )
      //  openEnrollementModal();
    } else {
      openEnrollementModal()
    }
  }

  const closeViewModal = () => {
    setOpenViewModal(false)
  }

  const likesPercent = (likes, courseEnrollment) => {
    if (likes === 0) return 0
    return (likes / courseEnrollment) * 100
  }

  const viewSingleCourse = (url) => {
    window.open(url, '_blank')
  }

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  }

  const progress = 0

  const getButtonStyle = (progress) => {
    if (progress === 0) {
      return {
        backgroundColor: '#fff',
        color: 'red',
        border: '1px solid red',
      }
    } else if (progress > 0 && progress < 100) {
      return {
        backgroundColor: '#fff',
        color: 'yellow',
        border: '1px solid yellow',
      }
    } else if (progress === 100) {
      return {
        backgroundColor: '#fff',
        color: 'green',
        border: '1px solid green',
      }
    }
  }

  const getIcon = (progress) => {
    if (progress === 0) {
      return <Icon icon='et:caution' width={20} />
    } else if (progress > 0 && progress < 100) {
      return <Icon icon='bi:book' width={20} />
    } else if (progress === 100) {
      return <Icon icon='ph:seal-check-light' width={20} />
    }
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

    return () => {}
  }, [course])
  const getButtonText = (progress) => {
    if (progress === 0) {
      return 'Not started yet'
    } else if (progress > 0 && progress < 100) {
      return 'Ongoing'
    } else if (progress === 100) {
      return 'Completed'
    }
  }

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

  console.log(course)

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
            Knowing Yourself Better
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
                border: `1px solid ${
                  course?.progress === 0 || course?.progress === undefined
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
                  navigate(`/school-dashboard/courses/feedback${id}`)
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
