import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import courses from '../../json-files/CoursesData'
import CourseCard from '../../reusable/CourseCard'
import { Icon } from '@iconify/react'
import femaleprofileImage from '../../../../assets/user-profile-image.png'
import maleprofileImage from '../../../../assets/male-profile-image.png'
import './course.css'

import { useSelector } from 'react-redux'

export default function MyCourses() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  return (
    <div className='overview w-100'>
      <div className='browse-all-courses-text container-fluid'>
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

      <div className='courses-list row row-cols-1 row-cols-md-3 g-4 '>
        {courses
          .filter((course) => !course.enrolled)
          .map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </div>
    </div>
  )
}
