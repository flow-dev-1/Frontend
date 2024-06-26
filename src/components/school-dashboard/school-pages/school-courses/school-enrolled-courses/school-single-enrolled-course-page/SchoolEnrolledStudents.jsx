import React from 'react'
import { Icon } from '@iconify/react'

import './enrolled-courses.css'
import backgroundImage from '../../../../../../assets/course-bg.png' // Make sure to replace with the correct path to the uploaded image

const SchoolEnrolledStudents = () => {
  return (
    <div className='enrolled-course-student'>
      <div className='header'>
        <button className='back-button'>← Back</button>
        <button className='add-student-button'>+ Add New Student</button>
      </div>
      <div className='image-container'>
        <img
          src={backgroundImage}
          alt='Background'
          className='background-image'
        />
      </div>
      <div className='info-bar'>
        <div className='info-item'>
          <p>Class Enrolled:</p>
          <p>Primary 3</p>
        </div>
        <div className='info-item'>
          <p>Enrollment Date:</p>
          <p>12-12-24</p>
        </div>
        <div className='info-item'>
          <p>No. of Students:</p>
          <p>20</p>
        </div>
        <div className='info-item'>
          <p>Female:</p>
          <p>10</p>
        </div>
        <div className='info-item'>
          <p>Male:</p>
          <p>10</p>
        </div>
        <div className='info-item'>
          <p>Day of the Week:</p>
          <p>Tuesday</p>
        </div>
        <div className='info-item'>
          <p>Start Time:</p>
          <p>10:00AM</p>
        </div>
        <div className='info-item'>
          <p>End Time:</p>
          <p>11:00AM</p>
        </div>
      </div>
      <div className='table-container'>
        <table className='students-table'>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>John Doe</td>
                <td>Johndoe@gmail.com</td>
                <td>+2348112345678</td>
                <td>{index % 2 === 0 ? 'M' : 'F'}</td>
                <td>10</td>
                <td>10%</td>
                <td>
                  <Icon
                    icon='mynaui:trash'
                    className='action-icon delete-icon'
                    width={18}
                  />
                  <Icon
                    icon='iconamoon:arrow-right-2-thin'
                    className='action-icon arrow-icon'
                    width={18}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SchoolEnrolledStudents
