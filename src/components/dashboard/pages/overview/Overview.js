import React, { useState } from 'react'
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['individual-courses'],
    queryFn: () => userService.getIndividualCourses(), // Make sure to call the function
  })

  console.log(data?.courses)

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
            />
          </div>

          <div className='filter-sort'>
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
          </div>
        </form>
      </div>

      <div className='courses-list row row-cols-1 row-cols-md-3 g-4'>
        {data?.courses
          .filter((course) => !course.enrolled)
          .map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </div>
    </div>
  )
}
