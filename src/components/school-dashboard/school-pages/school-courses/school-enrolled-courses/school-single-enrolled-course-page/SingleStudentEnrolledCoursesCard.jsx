import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import schoolService from '../../../../../../services/api/school'

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


  const handleToggle = (courseId) => {
    setIsOn((prevIsOn) => {
      const newIsOn = !prevIsOn
      const data = { status: newIsOn ? 'Active' : 'Deactivated' }

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
    if (text.length > maxLength) {
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

  const getButtonText = (progress) => {
    if (progress === 0) {
      return 'Not started yet'
    } else if (progress > 0 && progress < 100) {
      return 'Ongoing'
    } else if (progress === 100) {
      return 'Completed'
    }
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
          <h3 style={{ color: '#329BD6', fontSize: '24px' }}>
            Knowing Yourself Better
          </h3>
          <h3 style={isEnrolled ? { color: '#555' } : { color: '#329BD6' }}>
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
            style={{ margin: '1rem 0', width: '50%' }}
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
                <Icon icon='heroicons:user' width={20} />{' '}
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
            <div
              style={
                course.status === 'published'
                  ? { color: '#329BD6', display: 'flex', alignItems: 'center' }
                  : { color: '#4B7E31', display: 'flex', alignItems: 'center' }
              }
              className='likes-count'
            >
              <span>
                <Icon width={17} icon='bi:book' />{' '}
              </span>
              {likesPercent(
                course?.likes?.length,
                course?.courseEnrollment?.length
              )}
              %
            </div>
          </div>
        </div>
        <div className='course-card-buttons'>
          <div className='course-card-buttons-main'>
            <button
              onClick={() => navigate('/school-dashboard/courses/feedback')}
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
                  icon='hugeicons:comment-01'
                  style={{ color: '#329BD6' }}
                  width={20}
                />
              </span>{' '}
              Feedback
            </button>
            {isEnrolled ? (
              <>
                {/* View Details Button */}
                <button
                  id='viewDetailsBtn'
                  onClick={handleDetailsClick}
                  style={getButtonStyle(progress)}
                >
                  <span>{getIcon(progress)}</span> {getButtonText(progress)}
                </button>
              </>
            ) : (
              <button
                id='reviewBtn'
                onClick={handleDetailsClick}
                style={
                  course.grade !== 'Educators'
                    ? { backgroundColor: darkTertiary, color: 'white' }
                    : { backgroundColor: darkEducator, color: lightEducator }
                }
              >
                <span>
                  <Icon
                    icon='vaadin:cart-o'
                    width={20}
                    style={{ color: 'white' }}
                  />
                </span>{' '}
                {`${course.currency} ${course.cost}`}
              </button>
            )}

            {isEnrolled ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}
              >
                {/* <span style={{ color: "#50AA50", fontWeight: "400" }}>0 %</span>{" "}
                <span>Done</span> */}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>{' '}
    </div>
  )
}

export default SingleStudentEnrolledCoursesCard
