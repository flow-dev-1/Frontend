import React from 'react'
import MyCourseCard from '../../reusable/MyCourseCard'
import { Icon } from '@iconify/react'
import './course.css'
import courseOne from '../../../../assets/course1.png'
import courseTwo from '../../../../assets/course2.png'
import courseThree from '../../../../assets/course3.png'

const courses = [
  {
    id: 1,
    title: 'Max the Explorer Monkey: Growth Mindset',
    description:
      'The curriculum combines engaging educational content, interactive activities, and reflective discussions to...',
    viewed: 1548,
    likes: 98,
    progress: 0,
    image: courseOne, // Replace with actual image path or URL
  },
  {
    id: 2,
    title: 'Max the Explorer Monkey: Growth Mindset',
    description:
      'The curriculum combines engaging educational content, interactive activities, and reflective discussions to...',
    viewed: 1548,
    likes: 98,
    progress: 10,
    image: courseTwo, // Replace with actual image path or URL
  },
  {
    id: 3,
    title: 'Max the Explorer Monkey: Growth Mindset',
    description:
      'The curriculum combines engaging educational content, interactive activities, and reflective discussions to...',
    viewed: 1548,
    likes: 98,
    progress: 100,
    image: courseThree, // Replace with actual image path or URL
  },
]

export default function MyCourses() {
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
        {courses.map((course) => (
          <MyCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
