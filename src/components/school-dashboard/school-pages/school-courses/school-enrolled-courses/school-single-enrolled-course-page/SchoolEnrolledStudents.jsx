import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import './enrolled-courses.css'
import backgroundImage from '../../../../../../assets/course-bg.png' // Make sure to replace with the correct path to the uploaded image
import schoolService from '../../../../../../services/api/school'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from "react-redux";
import { decryptId } from '../../../../../../utils/encryption'

const SchoolEnrolledStudents = () => {
  const { user } = useSelector((state) => state.user);
  const [enrollmentData, setData] = useState({})

  let schoolId;

  // ToDO: Do a check if its a school or a user
  if (user.isSchool) {
    schoolId = user._id
  }
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-single-courses'],
    queryFn: () => schoolService.getEnrolledCourseData(schoolId, decryptId(id)),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });


  useEffect(() => {
    if (!data) return
    setData(data.course)
    return () => {
    }
  }, [data])

  const formatDate = (isoString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  const genderCount = (item) => {
    if (!item) return
    const male = item.filter(data => data.user.gender === "male")?.length || 0
    const female = item.filter(data => data.user.gender === "female")?.length || 0
    return {
      male,
      female
    }
  }

  function convertTo12HourFormat(time) {

    if (!time) return
    // Split the time string into hours and minutes
    const [hour, minute] = time.split(':').map(Number);

    // Determine if it's AM or PM
    const period = hour >= 12 ? 'PM' : 'AM';

    // Convert hour from 24-hour to 12-hour format
    const twelveHour = hour % 12 || 12; // Converts "0" hour to "12"

    // Return the formatted time
    return `${twelveHour}:${minute.toString().padStart(2, '0')} ${period}`;
  }


  return (
    <div className='enrolled-course-student'>
      <div className='header'>
        <button className='back-button' onClick={() => navigate(-1)}>← Back</button>
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
          <p>{enrollmentData.stdClass}</p>
        </div>
        <div className='info-item'>
          <p>Enrollment Date:</p>
          <p>{formatDate(enrollmentData?.createdAt || Date.now())}</p>
        </div>
        <div className='info-item'>
          <p>No. of Students:</p>
          <p>{enrollmentData?.studentEnrollments?.length}</p>
        </div>
        <div className='info-item'>
          <p>Female:</p>
          <p>{genderCount(enrollmentData?.studentEnrollments)?.female}</p>
        </div>
        <div className='info-item'>
          <p>Male:</p>
          <p>{genderCount(enrollmentData?.studentEnrollments)?.male}</p>
        </div>
        <div className='info-item'>
          <p>Day of the Week:</p>
          <p>{enrollmentData?.dayOfWeek}</p>
        </div>
        <div className='info-item'>
          <p>Start Time:</p>
          <p>{convertTo12HourFormat(enrollmentData?.startTime)}</p>
        </div>
        <div className='info-item'>
          <p>End Time:</p>
          <p>{convertTo12HourFormat(enrollmentData?.endTime)}</p>
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
            {enrollmentData?.studentEnrollments?.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{data?.user?.first_name} {data?.user?.last_name}</td>
                <td>{data?.user?.email}</td>
                <td>{data?.user?.phone}</td>
                <td>{data?.user?.gender === "male" ? "M" : "F"}</td>
                <td>{data?.user?.age}</td>
                <td>{data?.progress}%</td>
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
