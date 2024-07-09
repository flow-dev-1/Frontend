import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './school-all-courses.css'
import courseImg1 from '../../../../assets/course1.png'
import courseImg2 from '../../../../assets/course2.png'
import courseImg3 from '../../../../assets/course3.png'
import { Icon } from '@iconify/react'
import CourseDetailModal from '../../modals/courses/CourseDetailModal'
import SchoolCourseCard from './school-course-card/SchoolCourseCard'
import { useQuery } from '@tanstack/react-query'
import schoolService from '../../../../services/api/school'
import { useSelector } from 'react-redux'
import { RotatingSquare } from 'react-loader-spinner'
import Loading from '../../../loader/Loader'

Modal.setAppElement('#root') // This is to avoid screen readers issues with React Modal

const SchoolAllCourses = () => {
  const { user } = useSelector((state) => state.user)
  const [courses, setCourses] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  let schoolId

  // ToDO: Do a check if its a school or a user
  if (user.isSchool) {
    schoolId = user._id
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['courses'],
    queryFn: () => schoolService.getCourses(schoolId, 'All'),
    enabled: !!schoolId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const { data: enrolledData, } = useQuery({
    queryKey: ['school-enrolled-courses'],
    queryFn: () => schoolService.getCourses(schoolId, 'Enrolled'),
    enabled: !!schoolId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  // console.log(enrolledData, "enrolled")
  const enrolledDataArray = enrolledData?.courses?.map(item => item.course._id) || []

  useEffect(() => {
    if (!data) return
    setCourses(data.courses)
    return () => { }
  }, [data])

  const openModal = (course) => {
    setSelectedCourse(course)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedCourse(null)
  }

  return (
    <div className='my-container'>
      <div className='category-desc'>
        Browse through all the courses currently available on FLOW.
      </div>

      <div className='search-bar'>
        <form action='' className='search'>
          <div className='search-wrapper'>
            <span className='search-icon'>
              <Icon icon='lets-icons:search' style={{ color: '#4d4d4d' }} />
            </span>
            <input
              type='text'
              id='search-input'
              placeholder='Search by Name, Age, Email, Phone Number'
            />
          </div>

          <div className='filter-sort'>
            <label>
              <Icon icon='gridicons:filter' style={{ color: '#4d4d4d' }} />
              <select name='' id='' className='filter'>
                <option value='' selected disabled>
                  Filter by
                </option>
                <option value=''>All</option>
                <option value=''>Students</option>
                <option value=''>Teachers</option>
              </select>
            </label>

            <label>
              <Icon
                icon='ic:outline-sort-by-alpha'
                style={{ color: '#4d4d4d' }}
              />
              <select name='' id='' className='sort'>
                <option value='' selected>
                  Sort by
                </option>
                <option value=''>Sort by</option>
              </select>
            </label>
          </div>
        </form>
      </div>
      {isLoading && <Loading />}

      <div className='course-list'>
        {courses.map((course) => (
          <SchoolCourseCard
            key={course._id}
            course={course}
            openModal={openModal}
            enrolled={enrolledDataArray}
          />
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Course Detail Modal'
        className='custom-modal-otp-variant'
        overlayClassName='custom-overlay'
      >
        <CourseDetailModal course={selectedCourse}
          enrolled={enrolledDataArray}
        />
      </Modal>
    </div>
  )
}

export default SchoolAllCourses
