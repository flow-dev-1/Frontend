import React, { useState } from 'react';

import courses from '../../json-files/CoursesData'
import CourseCard from '../../reusable/CourseCard';
import '../overview/overview.css'

export default function MyCourses() {

  const enrolledCourses = courses.filter(course => course.enrolled);


  return (
    <div className="overview">
      <div className="courses-list">
        <div className="overview">


          <div className="browse-all-courses-text container-fluid">
            <p>Enrolled Courses</p>
          </div>
          <div className="courses-list row g-4 mt-3">
            {/* {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))} */}
            {enrolledCourses.map(course => (
              <CourseCard key={course.id} course={course} enrolled={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}