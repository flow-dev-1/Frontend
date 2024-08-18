import React from 'react'
import MyCourseCard from '../../reusable/MyCourseCard'
import { Icon } from '@iconify/react'
import './course.css'
import userService from '../../../../services/api/user'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../../loader/Loader'

export default function MyCourses() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['individual-courses-enrolled'],
    queryFn: () => userService.getIndividualCoursesEnrolled(), // Make sure to call the function
  })

  console.log(data?.courses)

  if (isLoading) return <Loading /> // Render loading spinner or message
  if (isError) return <p>Error loading courses. Please try again later.</p> // Handle error state

  return (
    <div className='w-100'>
      <div className='browse-all-courses-text container-fluid'>
        <p>Enrolled Courses</p>
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
              <Icon
                icon='ic:outline-sort-by-alpha'
                style={{ color: '#4d4d4d' }}
              />
              <select name='' id='' className='sort'>
                <option value=''>Sort by</option>
                {/* Populate sorting options here */}
              </select>
            </label>
          </div>

          <div className='filter-sort'>
            <label>
              <Icon icon='gridicons:filter' style={{ color: '#4d4d4d' }} />
              <select name='' id='' className='filter'>
                <option value='' disabled>
                  Filter by
                </option>
                <option value=''>All</option>
                <option value='students'>Students</option>
                <option value='teachers'>Teachers</option>
                {/* Populate filter options here */}
              </select>
            </label>
          </div>
        </form>
      </div>

      <div className='courses-list row row-cols-1 row-cols-md-3 g-4'>
        {data?.courses?.map((course) => (
          <MyCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
