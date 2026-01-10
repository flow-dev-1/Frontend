import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { encryptURI } from '../../../../../utils/encryption'
import EnrollmentModal from '../../../modals/Enrollment/EnrollmentModal'
import { Navigate } from 'react-router-dom'
import AddEducator from './AddEducator'
import ViewDetailsModal from '../../../modals/vew details/ViewDetailsModal'
import schoolService from "../../../../../services/api/school";

const SchoolCourseCard = ({
  openModal,
  course,
  enrolled,
  coursesArray,
  enrolledData,
}) => {
  const [openEnrollModal, setOpenEnrollModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEnrollModalEducator, setOpenEnrollModalEducator] = useState(false)

  const [courseData] = useState(course)
  const navigate = useNavigate()
  const [isOn, setIsOn] = useState(() => {
    // Initialize state from localStorage if it exists, otherwise default to false
    const savedState = localStorage.getItem("toggleState");
    return savedState ? JSON.parse(savedState) : false;
  });

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
      const newIsOn = !prevIsOn;
      const data = { status: newIsOn ? "Active" : "Deactivated" };

      // Save the new toggle state in localStorage
      localStorage.setItem("toggleState", JSON.stringify(newIsOn));

      // Call the service with the updated status
      schoolService.changeToggle(courseId, data);

      return newIsOn;
    });
  };


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

  if (isEnrolled) {
    reviewBtnColor = darkGreen
    detailsBtnColor = lightGreen
    reviewBtnClass = 'enrolled'
    detailsBtnClass = 'enrolled'
  } else {

  }
  const [coursedarta, setCourseData] = useState("")

  const courseIndex = coursesArray?.courses.findIndex(
    (c) => c._id === course._id
  )

  const handleDetailsClick = () => {

    console.log(isEnrolled)
    // Use this index to get the corresponding enrolledData course
    if (isEnrolled) {
      setOpenViewModal(true);

    } else {
      openEnrollementModal()
    }
  }

  const closeViewModal = () => {
    setOpenViewModal(false);
  };

  const likesPercent = (likes, courseEnrollment) => {
    if (likes === 0) return 0
    return ((likes / courseEnrollment) * 100).toFixed(1)
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
      <div className="course-card" style={{ height: "480px" }}>
        <div className="course-card-img" style={{
          height: "230px",
          position: "relative",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}>
          <img
            src={course?.image}
            alt=""
            style={{
              height: "100%",  // Keep full height
              width: "auto",   // Maintain aspect ratio
              minWidth: "100%", // Prevent width from being too small
              objectFit: "cover"
            }}
          />
          <div className="course-card-category">
            {course.grade !== "Educator" ? "Students" : "Educators"}
          </div>
        </div>
        <div className="course-card-title" style={{ marginBottom: "0" }}>
          <h3 style={{ color: "#329BD6", fontSize: "24px" }}>
            {course?.course?.topic}
          </h3>
          <h3 style={isEnrolled ? { color: "#555" } : { color: "#329BD6" }}>
            {course.title}:
          </h3>
          {/* <h3>{course.subtitle}</h3> */}
        </div>
        <p style={{ fontSize: "12px", height: "60px" }}>
          {truncateText(course?.description, 100)}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{ margin: "1rem 0", width: "40%" }}
            className="users-review"
          >
            {/* <div
              style={
                course.status === "published"
                  ? { color: "#329BD6" }
                  : { color: "#4B7E31" }
              }
              className="users-count"
            >
              <span>
                <Icon icon="fluent:people-24-regular" width={20} />{" "}
              </span>
              {course?.courseEnrollment?.length}
            </div> */}
            <div
              style={
                course.status === "published"
                  ? { color: "#329BD6", display: "flex", alignItems: "center" }
                  : { color: "#4B7E31", display: "flex", alignItems: "center" }
              }
              className="likes-count"
            >
              <span>
                <Icon width={17} icon="mingcute:thumb-up-line" />{" "}
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
              className={`toggle-switch ${isOn ? "on" : "off"}`}
              onClick={() => handleToggle(course._id)}
            >
              <div className={isOn ? "onKnob" : "offKnob"}></div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="course-card-buttons">
          <div className="course-card-buttons-main">
            <button
              onClick={() => openModal(course)}
              style={
                isEnrolled
                  ? {
                    backgroundColor: "#fff",
                    color: "#329BD6",
                    border: "1px solid #329bd6"
                  }
                  : course.grade !== "Educators"
                    ? {
                      backgroundColor: "#fff",
                      color: "#329BD6",
                      border: "1px solid #329bd6"
                    }
                    : { backgroundColor: lightEducator, color: darkEducator }
              }
              className={`reviewBtn ${reviewBtnClass}`}
            >
              <span>
                <Icon
                  icon="solar:eye-linear"
                  style={{ color: "#329BD6" }}
                  width={20}
                />
              </span>{" "}
              Review
            </button>
            {isEnrolled ? (
              <>
                {/* View Details Button */}
                <button
                  id="viewDetailsBtn"
                  onClick={handleDetailsClick}
                  style={{
                    backgroundColor: "#329BD6",
                    color: "#fff",
                    border: "1px solid #329bd6"
                  }}
                >
                  <span>
                    <Icon icon="ri:menu-2-fill" width={20} />
                  </span>{" "}
                  View Details
                </button>
              </>
            ) : (
              <button
                id="reviewBtn"
                onClick={handleDetailsClick}
                style={
                  course.grade !== "Educators"
                    ? { backgroundColor: darkTertiary, color: "white" }
                    : { backgroundColor: darkEducator, color: lightEducator }
                }
              >
                <span>
                  <Icon
                    icon="vaadin:cart-o"
                    width={20}
                    style={{ color: "white" }}
                  />
                </span>{" "}
                {`${course.currency} ${course.cost}`}
              </button>
            )}

            {isEnrolled ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: "12px"
                }}
              >
                {/* <span style={{ color: "#50AA50", fontWeight: "400" }}>0 %</span>{" "}
                <span>Done</span> */}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>{" "}
      {openViewModal && (
        <ViewDetailsModal
          enrollmentData={enrolledData}
          enrolledData={enrolledData}
          encryptURI={encryptURI}
          courseIndex={courseIndex}
          enrollmentid={coursedarta}
          courseId={course._id}
          course={course}
          onClose={() => setOpenViewModal(false)}
        />
      )}

      <EnrollmentModal
        isOpen={openEnrollModal}
        onRequestClose={closeEnrollementModal}
        daysOfWeek={daysOfWeek}
        timeOptions={timeOptions}
        course={course}
      />

      <AddEducator
        isOpen={openEnrollModalEducator}
        course={course}
        onRequestClose={closeEnrollementModal}
        daysOfWeek={daysOfWeek}
      />
    </div>
  );
}

export default SchoolCourseCard
