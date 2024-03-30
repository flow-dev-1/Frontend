import React, { useState } from 'react';

import courses from '../../json-files/CoursesData'
import CourseCard from '../../reusable/CourseCard';
import '../overview/overview.css'

export default function MyCourses() {

  const enrolledCourses = courses.filter(course => course.enrolled);


  return (
    <div className="course-page">
      <div className="courses-list">

          <div className="browse-all-courses-text container-fluid">
            <p>Enrolled Courses</p>
          </div>
          <div className="courses-list-card-section enrolled row g-4 mx-2  ">
            {/* {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))} */}
            {enrolledCourses.map(course => (
              <CourseCard key={course.id} course={course} enrolled={true} />
            ))}
          </div>
      </div>
    </div>
  )
}