import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import './newcourse.css'
import courseOne from '../../../../../assets/course1.png'
import WeekOneLearning from './WeekOneLearning'

function SelfAwarenessCourse() {
  const { id } = useParams()
  const location = useLocation()
  const course = location?.state?.course
  const navigate = useNavigate()

  const [activeLink, setActiveLink] = React.useState('week1')
  const [currentWeekIndex, setCurrentWeekIndex] = React.useState(0)

  const courses = {
    id: 1,
    image: courseOne,
    title: 'Alex & Maya',
    subtitle: 'Self Awareness',
    overviewDescription:
      'The curriculum combines engaging educational content, interactive activities, and reflective discussions to create an environment that nurtures resilience, creativity, and a lifelong love for learning. From understanding the power of "yet" to exploring the potential of the human brain, each weeks session delves into different aspects of the growth mindset.',
    description:
      'The "Growth Mindset Course" is a 10-week program designed to introduce and instill the principles of a growth mindset in children. The curriculum combines engaging educational content, interactive activities, and reflective discussions to create an environment that nurtures resilience, creativity, and a lifelong love for learning. From understanding the power of "yet" to exploring the potential of the human brain, each weeks session delves into different aspects of the growth mindset.',
    viewed: 1000,
    likes: 500,
    amount: 29.99,
    objectives: [
      {
        title: 'Understanding the Growth Mindset',
        description:
          'Students will develop a deep understanding of the growth mindset and how it contrasts with a fixed mindset. They will learn to identify characteristics and examples of each mindset in various contexts.',
      },
      {
        title: 'Applying the Growth Mindset',
        description:
          'Students will learn to apply the principles of a growth mindset in real-life situations and understand the importance of embracing challenges, persevering in the face of setbacks, and viewing effort as a path to mastery.',
      },
      {
        title: 'Exploring the Human Brain',
        description:
          'Students will gain a basic understanding of the human brain, its capacity for growth and change (neuroplasticity), and how this ties in with the growth mindset concept.',
      },
      {
        title: 'Developing Self-awareness',
        description:
          'Students will reflect on their personal strengths, interests, and aspirations, recognize their potential for growth, and understand what they can and cannot control.',
      },
      {
        title: 'Encouraging Collaboration',
        description:
          'Through group activities, students will develop their teamwork, communication, and problem-solving skills, reinforcing the social aspects of a growth mindset.',
      },
      {
        title: 'Promoting Continuous Learning',
        description:
          'Students will learn to appreciate the value of making mistakes, receiving feedback, and learning from their experiences, fostering an attitude of continuous learning beyond the classroom.',
      },
      {
        title: 'Reflective Evaluation',
        description:
          'By the end of the course, students will reflect on their learning journey, recognizing their development, and identifying areas for future growth.',
      },
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
    setCurrentWeekIndex(index)
  }

  // const renderSidebarContent = () => {
  //   switch (activeLink) {
  //     case 'weekone':
  //       return (
  //         <CourseProgessionOne
  //           course={course}
  //           currentWeekIndex={currentWeekIndex}
  //         />
  //       )

  //       case 'weektwo' : 
  //       return (
  //       <p>week two</p>
  //       )
  //     default:
  //       return null
  //   }
  // }

  const renderSidebarContent = () => {
    console.log('Rendering sidebar content:', activeLink);
    // Use dynamic matching with `week${index + 1}` for flexibility
    const weekIndex = parseInt(activeLink.replace('week', ''), 10) - 1;
    switch (weekIndex) {
      case 0:
        // return <p>Week one content</p>
        return (
        <WeekOneLearning
          course={course}
          currentWeekIndex={currentWeekIndex}
        />
      )

      case 1:
        return <p>Week two content</p>

      // Add more cases for other weeks if needed
      default:
        return <p>Select a week to view its content.</p>
    }
  }

  return (
    <div className='self-awareness course-profile '>
      <div className='mt-5 course-links'>
        <div className='about-courses-menu mt-5 '>
          <p
            className='back-to-course-list'
            onClick={() => navigate('/dashboard/my-courses')}
          >
            <Icon icon='fa6-solid:arrow-left-long' className='me-2' />
            Back to My Courses
          </p>

          {/* {courses.map((crc, index) => ( */}
          <div className='course-title-text mt-3' >
            <h2>
              {courses.title}
            </h2>
            <h2 className='sub-title'> {courses.subtitle}</h2>
          </div>

          <ul className='sub-courses mt-2'>
            {courses.catalogue.map((week, index) => (
              // <li
              //   key={index}
              //   className={
              //     index === 0 && activeLink === 'weekone' ? 'active' : ''
              //   }
              //   onClick={() => handleLinkClick('profile', index)}
              // >
              <li
                key={index}
                className={
                  `week${index + 1}` === activeLink ? 'active' : '' // Correct class assignment
                }
                onClick={() => handleLinkClick(index)} // Pass index correctly
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
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='course-sidebar-content'>{renderSidebarContent()}</div>
    </div>
  )
}

export default SelfAwarenessCourse
