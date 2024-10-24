import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Icon } from '@iconify/react'
import SingleStudentEnrolledCoursesCard from './SingleStudentEnrolledCoursesCard'
import { useQuery } from '@tanstack/react-query'
import schoolService from '../../../../../../services/api/school'
import { useSelector } from 'react-redux'
import Loading from '../../../../../loader/Loader'
import { useParams } from 'react-router-dom'
import { decryptId } from '../../../../../../utils/encryption'

Modal.setAppElement('#root') // This is to avoid screen readers issues with React Modal

const SingleStudentEnrolledCourses = () => {
  const { user } = useSelector((state) => state.user)
  const [courses, setCourses] = useState([])
  const [courseDetailModalIsOpen, setCourseDetailModalIsOpen] = useState(false)
  const [viewDetailsModalIsOpen, setViewDetailsModalIsOpen] = useState(false) // New state for ViewDetailsModal
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [searchQuery, setSearchQuery] = useState('') // State for Search Query
  const [sortOption, setSortOption] = useState('') // State for Sort Option
  const [filterOption, setFilterOption] = useState('') // State for Filter Option
  let schoolId

  const { userId } = useParams()

  // ToDO: Do a check if its a school or a user
  if (user?.isSchool) {
    schoolId = user?._id
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-courses'],
    queryFn: () => schoolService.getIndividualCoursesEnrolled(userId),
    enabled: !!userId,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const { data: enrolledData } = useQuery({
    queryKey: ['school-enrolled-courses'],
    queryFn: () => schoolService.getCourses(schoolId, 'Enrolled'),
    enabled: !!schoolId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const enrolledDataArray =
    enrolledData?.courses?.map((item) => item?.course?._id) || []

  useEffect(() => {
    if (!data) return
    setCourses(data)
  }, [data])

  // Open CourseDetailModal
  const openCourseDetailModal = (course) => {
    setSelectedCourse(course)
    setCourseDetailModalIsOpen(true)
  }

  // Close CourseDetailModal
  const closeCourseDetailModal = () => {
    setCourseDetailModalIsOpen(false)
    setSelectedCourse(null)
  }

  // Open ViewDetailsModal
  const openViewDetailsModal = () => {
    setViewDetailsModalIsOpen(true)
  }

  // Close ViewDetailsModal
  const closeViewDetailsModal = () => {
    setViewDetailsModalIsOpen(false)
  }

  const handleSort = (a, b) => {
    if (sortOption === 'az') {
      return a.title.localeCompare(b.title)
    } else if (sortOption === 'za') {
      return b.title.localeCompare(a.title)
    }
    return 0
  }

  const filteredCourses = courses?.courses
  console.log(courses.courses)

  return (
    <div className='my-container'>
      <div className='category-desc'>
        <p> Browse through all the courses currently available on FLOW.</p>
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

          <div className='d-flex'>
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
                  <option value='School'>Teachers</option>
                  <option value='General'>General</option>
                </select>
              </label>
            </div>
            <div className='filter-sort'>
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
          </div>
        </form>
      </div>
      {isLoading && <Loading />}
      <div className='course-list'>
        {filteredCourses?.map((course) => (
          <SingleStudentEnrolledCoursesCard
            key={course?._id}
            course={course}
            openModal={openCourseDetailModal} // Trigger the CourseDetailModal
            enrolled={enrolledDataArray}
            enrolledData={enrolledData}
            coursesArray={data}
          />
        ))}
      </div>
    </div>
  )
}

export default SingleStudentEnrolledCourses
