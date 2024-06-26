import React, { useState } from 'react'
import Modal from 'react-modal'
import './school-all-courses.css'
import courseImg1 from '../../../../assets/course1.png'
import courseImg2 from '../../../../assets/course2.png'
import courseImg3 from '../../../../assets/course3.png'
import { Icon } from '@iconify/react'
import CourseDetailModal from '../../modals/courses/CourseDetailModal'
import SchoolCourseCard from './school-course-card/SchoolCourseCard'

Modal.setAppElement('#root') // This is to avoid screen readers issues with React Modal

const initialCourses = [
  {
    id: 1,
    category: 'Students',
    dispImg: courseImg1,
    title: 'Max the Explorer Monkey',
    subtitle: 'Growth Mindset',
    description:
      'The curriculum combines engaging educational content, interactive activities, and reflective discussions to...',
    status: {
      enrolled: true,
      progress: '10',
    },
    likesCountPercent: 98,
    usersCount: 1548,
  },
  {
    id: 2,
    category: 'Students',
    dispImg: courseImg2,
    title: 'Flowa the Money Manager',
    subtitle: 'Mind and Money',
    description:
      'The curriculum combines engaging educational content, interactive activities, and reflective discussions to...',
    status: {
      enrolled: false,
      progress: '0',
    },
    likesCountPercent: 98,
    usersCount: 1548,
  },
  {
    id: 3,
    category: 'Educators',
    dispImg: courseImg3,
    title: 'Understanding Your Students',
    subtitle: 'SEL for Educators',
    description:
      'The curriculum combines engaging educational content, interactive activities, and reflective discussions to...',
    status: {
      enrolled: false,
      progress: '0',
    },
    likesCountPercent: 98,
    usersCount: 1548,
  },
]

const SchoolAllCourses = () => {
  const [courses] = useState(initialCourses)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)

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
                <option value=''>Enrolled</option>
                <option value=''>Not-enrolled</option>
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

      <div className='course-list'>
        {courses.map((course) => (
          <SchoolCourseCard key={course.id} course={course} openModal={openModal} />
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Course Detail Modal'
        className='custom-modal-otp'
        overlayClassName='custom-overlay'
      >
        <CourseDetailModal course={selectedCourse} />
      </Modal>
    </div>
  )
}

export default SchoolAllCourses
