import React, { useEffect, useState } from 'react'
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
import userService from '../../../../../services/api/user'
import { useQuery } from '@tanstack/react-query'

function SelfAwarenessCourse() {
  let { id } = useParams()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const course = location?.state?.course
  const navigate = useNavigate()
  id = decryptId(id)

  const { data: completedWeeks, isLoading, isError } = useQuery({
    queryKey: ['completed-weeks', course._id],
    queryFn: () => userService.getCompletedWeeks(course._id), 
  })

  // New state to track completed weeks
  const [completedWeeksState, setCompletedWeeksState] = useState([])

  // Update completedWeeksState whenever the query data changes
  useEffect(() => {
    if (completedWeeks && completedWeeks.weeks) {
      setCompletedWeeksState(completedWeeks.weeks)
    }
  }, [completedWeeks])

  console.log(completedWeeksState, "completedWeeksState")

  useEffect(() => {
    if (!course) return navigate("/dashboard")
    setOpen(true)
  }, [location, course, navigate])

  const storedWeekIndex = localStorage.getItem(`currentWeek-${id}`) || '1'
  const initialWeekIndex = parseInt(storedWeekIndex, 10)

  const [activeLink, setActiveLink] = useState(`week${initialWeekIndex}`)
  const [currentWeekIndex, setCurrentWeekIndex] = useState(initialWeekIndex)

  const courses = {
    id: 1,
    image: courseOne,
    title: 'Knowing Yourself Better:',
    subtitle: 'Self Awareness',
    overviewDescription:
      'The curriculum combines engaging educational content, interactive activities, and reflective discussions to create an environment that nurtures resilience, creativity, and a lifelong love for learning. From understanding the power of "yet" to exploring the potential of the human brain, each weeks session delves into different aspects of the growth mindset.',
    description:
      'The "Growth Mindset Course" is a 10-week program designed to introduce and instill the principles of a growth mindset in children.',
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
    localStorage.setItem(`currentWeek-${id}`, index + 1)
  }

  const renderSidebarContent = () => {
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
            courseId={id}
            course={course}
            currentWeekIndex={currentWeekIndex}
            handleLinkClick={handleLinkClick}
          />
        )
      case 3:
        return (
          <WeekFourLearning
            courseId={id}
            course={course}
            currentWeekIndex={currentWeekIndex}
            handleLinkClick={handleLinkClick}
          />
        )
      case 4:
        return (
          <WeekFiveLearning
            courseId={id}
            course={course}
            currentWeekIndex={currentWeekIndex}
            handleLinkClick={handleLinkClick}
          />
        )
      default:
        return <p>Select a week to view its content.</p>
    }
  }

  const disableCourse = (index) => {
    const data = completedWeeksState // Use updated state
    if (data.includes((index).toString())) {
      return false;
    }
    const lastItemPlusOne = Number(data[data.length - 1]) + 1;
    if (index === lastItemPlusOne) {
      return false;
    }
    return true;
  };

  return (
    <div className='self-awareness course-profile'>
      {open && (
        <>
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
                    className={`course-week-button ${`week${index + 1}` === activeLink ? 'active' : ''}`}
                    onClick={() => handleLinkClick(index)}
                    disabled={disableCourse(index + 1)}
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
        </>
      )}
    </div>
  )
}

export default SelfAwarenessCourse
