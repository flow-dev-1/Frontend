import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import courses from '../../json-files/CoursesData'
import CourseCard from '../../reusable/CourseCard'
import { Icon } from '@iconify/react'
import femaleprofileImage from '../../../../assets/user-profile-image.png'
import maleprofileImage from '../../../../assets/male-profile-image.png'
import './overview.css'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../../loader/Loader'
import userService from '../../../../services/api/user'

import { useSelector } from 'react-redux'

export default function IndividualOverview() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const [searchQuery, setSearchQuery] = useState('') // State for Search Query
  const [sortOption, setSortOption] = useState('') // State for Sort Option
  const [filterOption, setFilterOption] = useState('') // State for Filter Option
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [displayCourses, setDisplayCourses] = useState([])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['individual-courses'],
    queryFn: () => userService.getIndividualCourses(), // Make sure to call the function
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false 
  })

  const { data: enrolledData } = useQuery({
    queryKey: ['individual-courses-enrolled'],
    queryFn: () => userService.getIndividualCoursesEnrolled(), // Make sure to call the function
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false
  })


  useEffect(() => {
    if (!data || !enrolledData) return

    if (user?.userType === "School") {
      const genralCourses = data.courses.filter(course => course.access !== "School")
      // Update to set displayCourses with both generalCourses and enrolledData.courses
      const enrolledDataArray =
      enrolledData?.courses?.map((item) => item.course) || []
      setDisplayCourses([...genralCourses, ...enrolledDataArray])

    } else {
      // Show only General courses
      const genralCourses = data.courses.filter(course => course.access !== "School")
      setDisplayCourses(genralCourses)
    }

    return () => { }
  }, [data, enrolledData])

  // User Type Determines the courses to show
  // If user is school student or school educator He'll see His schools enrolled course and only general courses
  const studentOfSchool = user?.newCourseInvite

  const handleSort = (a, b) => {
    if (sortOption === 'az') {
      return a.title.localeCompare(b.title)
    } else if (sortOption === 'za') {
      return b.title.localeCompare(a.title)
    }
    return 0
  }



  const filteredCourses = displayCourses
    ?.filter((course) => {
      const searchValue = searchQuery.toLowerCase()
      return (
        course?.title?.toLowerCase().includes(searchValue) ||
        course?.description?.toLowerCase().includes(searchValue) ||
        course?.email?.toLowerCase().includes(searchValue) ||
        course?.phone?.toLowerCase().includes(searchValue)
      )
    })
    .filter((course) => {
      if (filterOption === 'Individual') {
        return course.access === 'Individual'
      } else if (filterOption === 'School') {
        return course.access === 'School'
      } else if (filterOption === 'General') {
        return course.access === 'General'
      }
      return true // Return all courses if no filter is applied
    })
    .sort(handleSort)

  if (isLoading) return <Loading /> // Render loading spinner or message
  if (isError) return <p>Error loading courses. Please try again later.</p>

  return (
    <div className='overview-student w-100'>
      <div className='width d-flex align-items-center justify-content-between'>
        <div>
          <h2>Hi {user?.first_name?.trim()}! </h2>
          <p>Welcome back to Flow!</p>
        </div>
        {/* {user?.gender === "female" && <img src={femaleprofileImage} alt="user Profile image" />}
        {user?.gender === "male" && <img src={maleprofileImage} alt="user Profile image" />} */}

        {user?.gender === 'male' ? (
          <img src={maleprofileImage} alt='user Profile image' />
        ) : (
          <img src={femaleprofileImage} alt='user Profile image' />
        )}
      </div>
      <hr />

      <div className='browse-all-courses-text'>
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
                <option value='Individual'>Individual</option>
                <option value='School'>School</option>
                <option value='General'>General</option>
              </select>
            </label>
          </div>

          <div className='filter-sort'>
            <label>
              <Icon icon='gridicons:filter' style={{ color: '#4d4d4d' }} />
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

      <div className='courses-list row row-cols-1 row-cols-md-3 g-4'>
        {filteredCourses?.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            // coursesArray={displayCourses}
            // enrolled={enrolledDataArray}
            enrolledData={enrolledData}
            studentOfSchool={studentOfSchool}
          />
        ))}
      </div>
    </div>
  )
}
