import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import courses from '../../json-files/CoursesData'
import CourseCard from '../../reusable/CourseCard';

import profileImage from '../../../../assets/user-profile-image.png';
import './overview.css'

import { useSelector } from "react-redux";

export default function IndividualOverview() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <div className="overview">


      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h2>Hi {user?.first_name?.trim()}! </h2>
          <p>Welcome back to Flow!</p>
        </div>

        <img src={profileImage} alt="user Pprofile image" />
      </div>

      <div className="browse-all-courses-text container-fluid">
        <p>Browse through all the courses currently available on FLOW.</p>
      </div>
      <div className="courses-list row row-cols-1 row-cols-md-3 g-4 mt-3">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}