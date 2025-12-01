import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './enrolled-course-student.css'
import { Icon } from '@iconify/react'
import CourseDetailModal from '../../../../modals/courses/CourseDetailModal'
import SchoolCourseCardEnrolled from '../../school-course-card/SchoolCourseCardEnrolled'
import { useQuery } from '@tanstack/react-query'
import schoolService from '../../../../../../services/api/school'
import { useSelector } from 'react-redux'
import Loading from '../../../../../loader/Loader'

Modal.setAppElement('#root') // This is to avoid screen readers issues with React Modal

const SchoolEnrolledCourseStudents = () => {
  const { user } = useSelector((state) => state.user)
  const [courses, setCourses] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [searchQuery, setSearchQuery] = useState('') // State for Search Query
  const [sortOption, setSortOption] = useState('') // State for Sort Option
  const [filterOption, setFilterOption] = useState('') // State for Filter Option
  let schoolId

  // ToDO: Do a check if its a school or a user
  if (user?.isSchool) {
    schoolId = user?._id
  }else {
    schoolId = user?.school
  }


  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-enrolled-courses'],
    queryFn: () => schoolService.getCourses(schoolId, 'Enrolled'),
    enabled: !!schoolId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!data) return

    setCourses(data?.courses)
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

  const handleSort = (a, b) => {
    if (sortOption === 'az') {
      return a?.course.title.localeCompare(b.title)
    } else if (sortOption === 'za') {
      return b?.course.title.localeCompare(a.title)
    }
    return 0
  }

  const filteredCourses = courses
    ?.filter((course) => {
      const searchValue = searchQuery.toLowerCase()
      return (
        course?.course?.title?.toLowerCase().includes(searchValue) ||
        course?.course?.description?.toLowerCase().includes(searchValue) ||
        course?.course?.email?.toLowerCase().includes(searchValue) ||
        course?.phone?.course.toLowerCase().includes(searchValue)
      )
    })
    .filter((course) => {
      if (filterOption === 'Individual') {
        return course?.course.access === 'Individual'
      } else if (filterOption === 'Educator') {
        return course?.course.access === 'Educator'
      } else if (filterOption === 'General') {
        return course?.course.access === 'General'
      }
      return true // Return all courses if no filter is applied
    })
    .sort(handleSort)

  return (
    <div className='my-container'>
      <div className='category-desc'>
        <p>Browse through all the courses currently available on FLOW.</p>
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
              value={searchQuery} // Bind the search input to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
            />
          </div>

          <div className='filter-sort'>
            <label>
              <Icon icon='gridicons:filter' style={{ color: '#4d4d4d' }} />
              <select
                name='filter'
                id='filter'
                className='filter'
                value={filterOption} // Bind filter option to state
                onChange={(e) => setFilterOption(e.target.value)} // Update state on filter change
              >
                <option value='' disabled>
                  Filter by
                </option>
                <option value=''>All</option>
                <option value='Individual'>Students</option>
                <option value='General'>General</option>
                <option value='Educator'>Teachers</option>
              </select>
            </label>

            <label>
              <Icon
                icon='ic:outline-sort-by-alpha'
                style={{ color: '#4d4d4d' }}
              />
              <select
                name='sort'
                id='sort'
                className='sort'
                value={sortOption} // Bind sort option to state
                onChange={(e) => setSortOption(e.target.value)} // Update state on sort change
              >
                <option value=''>Sort by</option>
                <option value='az'>A-Z</option>
                <option value='za'>Z-A</option>
              </select>
            </label>
          </div>
        </form>
      </div>
      {isLoading && <Loading />}
      <div className='course-list'>
        {filteredCourses?.map((course) => (
          <SchoolCourseCardEnrolled
            key={course._id}
            courseData={course}
            openModal={openModal}
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
        <CourseDetailModal course={selectedCourse} closeModal={closeModal} />
      </Modal>
    </div>
  )
}

export default SchoolEnrolledCourseStudents
