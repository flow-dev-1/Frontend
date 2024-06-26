import { Icon } from '@iconify/react'

const SchoolCourseCard = ({ openModal, course }) => {
  // enrolled color
  const lightGreen = '#D4FFBE'
  const darkGreen = '#4B7E31'

  // not-enrolled
  // studentimp
  const lightTertiary = '#FAFAFA'
  const darkTertiary = '#329BD6'

  // educator
  const lightEducator = '#5CE1E6'
  const darkEducator = '#275DAD'

  let reviewBtnColor
  let detailsBtnColor

  let reviewBtnClass
  let detailsBtnClass

  if (course.status.enrolled) {
    reviewBtnColor = darkGreen
    detailsBtnColor = lightGreen
    reviewBtnClass = 'enrolled'
    detailsBtnClass = 'enrolled'
  } else {
    reviewBtnColor =
      course.category.toLowerCase() == 'students' ? darkTertiary : darkEducator
    detailsBtnColor =
      course.category.toLowerCase() == 'students'
        ? lightTertiary
        : lightEducator

    reviewBtnClass =
      course.category.toLowerCase() == 'students' ? 'not-enrolled' : 'educator'
    detailsBtnClass =
      course.category.toLowerCase() == 'students' ? 'not-enrolled' : 'educator'
  }

  return (
    <div>
      <div className='course-card'>
        <div className='course-card-img'>
          <img src={course.dispImg} alt='' />
          <div className='course-card-category'>{course.category}</div>
        </div>
        <div className='course-card-title'>
          <h3>{course.title}:</h3>
          <h3>{course.subtitle}</h3>
        </div>
        <p className='course-card-desc'>{course.description}</p>
        <div className='users-review'>
          <div className='users-count'>
            <span>
              <Icon
                icon='fluent:people-24-regular'
                style={{ color: reviewBtnColor }}
              />{' '}
            </span>
            {course.usersCount}
          </div>
          <div className='likes-count'>
            <span>
              <Icon
                icon='mingcute:thumb-up-line'
                style={{ color: reviewBtnColor }}
              />{' '}
            </span>
            {course.likesCountPercent}%
          </div>
        </div>
        <div className='course-card-buttons'>
          <div className='course-card-buttons-main'>
            <button className={`reviewBtn ${reviewBtnClass}`}>
              <span>
                <Icon
                  icon='solar:eye-linear'
                  style={{ color: reviewBtnColor }}
                />
              </span>{' '}
              Review
            </button>
            <button
              className={`detailsBtn ${detailsBtnClass}`}
              onClick={openModal}
            >
              <span>
                <Icon
                  icon='tabler:list-details'
                  style={{ color: detailsBtnColor }}
                />
              </span>{' '}
              View Details
            </button>
          </div>
          {course.status.enrolled ? (
            <div className='course-card-progress'>
              {course.status.progress}% done
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
export default SchoolCourseCard
