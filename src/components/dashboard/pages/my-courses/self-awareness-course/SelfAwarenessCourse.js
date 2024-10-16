import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import './newcourse.css'
import courseOne from '../../../../../assets/course1.png'
import WeekOneLearning from './week-one-screens/WeekOneLearning'
import WeekTwoLearning from './week-two-screens/WeekTwoLearning'
import WeekThreeLearning from './week-three-screens/WeekThreeLearning'
import WeekFourLearning from './week-four-screens/WeekFourLearning'
import WeekFiveLearning from './week-five-course/WeekFiveLearning'
import { decryptId } from '../../../../../utils/encryption'

function SelfAwarenessCourse() {
  const { id } = useParams()
  const location = useLocation()
  const course = location?.state?.course
  const navigate = useNavigate()
  console.log(decryptId(id))
  console.log(course)

  // Retrieve the current week index from local storage or default to 1
  const storedWeekIndex = localStorage.getItem(`currentWeek-${id}`) || '1'
  const initialWeekIndex = parseInt(storedWeekIndex, 10)

  const [activeLink, setActiveLink] = React.useState(`week${initialWeekIndex}`)
  const [currentWeekIndex, setCurrentWeekIndex] =
    React.useState(initialWeekIndex)

  const courses = {
    id: 1,
    image: courseOne,
    title: 'Knowing Yourself Better:',
    subtitle: 'Self Awareness',
    overviewDescription:
      'The curriculum combines engaging educational content, interactive activities, and reflective discussions to create an environment that nurtures resilience, creativity, and a lifelong love for learning. From understanding the power of "yet" to exploring the potential of the human brain, each weeks session delves into different aspects of the growth mindset.',
    description:
      'The "Growth Mindset Course" is a 10-week program designed to introduce and instill the principles of a growth mindset in children. The curriculum combines engaging educational content, interactive activities, and reflective discussions to create an environment that nurtures resilience, creativity, and a lifelong love for learning. From understanding the power of "yet" to exploring the potential of the human brain, each weeks session delves into different aspects of the growth mindset.',
    viewed: 1000,
    likes: 500,
    amount: 29.99,
    objectives: [
      // Objectives array
    ],
    catalogue: [
      { weekLesson: 'Introduction to Self-Awareness' },
      { weekLesson: 'Identifying Strengths and Weaknesses' },
      { weekLesson: 'Understanding Mindset' },
      { weekLesson: 'Identifying Values' },
      { weekLesson: 'Emotional Intelligence and Communication Skills' },
    ],
    enrolled: true,
  }

  const handleLinkClick = (index) => {
    setActiveLink(`week${index + 1}`)
    setCurrentWeekIndex(index + 1)
    // Store the current week index in local storage
    localStorage.setItem(`currentWeek-${id}`, index + 1)
  }

  const renderSidebarContent = () => {
    console.log('Rendering sidebar content:', activeLink)
    const weekIndex = parseInt(activeLink.replace('week', ''), 10) - 1
    switch (weekIndex) {
      case 0:
        return (
          <WeekOneLearning
            courseId={id}
            course={course}
            currentWeekIndex={currentWeekIndex}
            handleLinkClick={handleLinkClick}
          />
        )
      case 1:
        return (
          <WeekTwoLearning
            courseId={id}
            course={course}
            currentWeekIndex={currentWeekIndex}
            handleLinkClick={handleLinkClick}
          />
        )
      case 2:
        return (
          <WeekThreeLearning
            course={course}
            currentWeekIndex={currentWeekIndex}
            handleLinkClick={handleLinkClick}
          />
        )
      case 3:
        return (
          <WeekFourLearning
            course={course}
            currentWeekIndex={currentWeekIndex}
            handleLinkClick={handleLinkClick}
          />
        )
      case 4:
        return (
          <WeekFiveLearning
            course={course}
            currentWeekIndex={currentWeekIndex}
            handleLinkClick={handleLinkClick}
          />
        )
      default:
        return <p>Select a week to view its content.</p>
    }
  }

  return (
    <div className='self-awareness course-profile'>
      <div className='mt-5 course-links'>
        <div className='about-courses-menu mt-5'>
          <p
            className='back-to-course-list'
            onClick={() => navigate('/dashboard/my-courses')}
          >
            <Icon icon='fa6-solid:arrow-left-long' className='me-2' />
            Back to My Courses
          </p>

          <div className='course-title-text mt-3'>
            <h2>{courses.title}</h2>
            <h2 className='sub-title'>{courses.subtitle}</h2>
          </div>

          <div className='sub-courses mt-2'>
            {courses.catalogue.map((week, index) => (
              <button
                key={index}
                className={`course-week-button ${
                  `week${index + 1}` === activeLink ? 'active' : ''
                }`}
                onClick={() => handleLinkClick(index)}
                // disabled={index + 1 !== currentWeekIndex} // Disable all weeks except the current one comment out the code for development
              >
                <div>
                  <Icon
                    icon='icon-park-outline:check-one'
                    className='course-list-icon'
                  />
                </div>
                <div className='d-flex align-items-center'>
                  <p className='text-nowrap'>{`Week ${index + 1} `}</p>
                  <p className='text-wrap ms-3'>{week.weekLesson}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='course-sidebar-content'>{renderSidebarContent()}</div>
    </div>
  )
}

export default SelfAwarenessCourse
