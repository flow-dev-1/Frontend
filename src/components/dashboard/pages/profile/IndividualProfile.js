import React, { useState } from 'react'
import femaleprofileImage from '../../../../assets/user-profile-image.png'
import maleprofileImage from '../../../../assets/male-profile-image.png'
import flag from '../../../../assets/Flag_of_Nigeria.png'
import './profile.css'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StudentRegistrationProfile from '../../../modals-pages/dashboard-modals/profile/StudentRegistrationProfile'
import { useQuery } from '@tanstack/react-query'
import userService from '../../../../services/api/user'
import EducatorProfileModal from './EducatorProfileModal'

export default function IndividualProfile() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const { userType } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const fetchProfile = () => {
    if (userType?.accountType === 'Educator') {
      return userService.getMyProfileEducator()
    } else {
      return userService.getMyProfileIndividual()
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['individual-profile'],
    queryFn: fetchProfile,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  console.log(data)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  console.log(userType?.accountType)
  const user =
    userType?.accountType === 'Educator' ? data?.educator : data?.user || {}

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  return (
    <>
      <div className='individual-profile container-fluid'>
        <div className='user-basic-info' style={{ padding: '1rem' }}>
          <div className='about-user'>
            <div className='profile-img'>
              {user?.gender === 'male' ? (
                <img
                  style={{ display: 'block', width: '100%' }}
                  src={maleprofileImage}
                  alt='user Profile image'
                />
              ) : (
                <img
                  style={{ display: 'block', width: '100%' }}
                  src={femaleprofileImage}
                  alt='user Profile image'
                />
              )}
            </div>

            <div className='about-user-info mx-4'>
              <h2>{user?.fullName || 'Morayo Ojikutu'}</h2>
              <div className='user-details'>
                <div className='green-spring-div primary'>
                  {userType?.accountType === 'Educator'
                    ? 'Educator'
                    : user?.grade}
                </div>
              </div>

              <div className='user-details'>
                <div className='green-spring-div school'>
                  {user?.userType || 'Individual'}
                </div>
                <div className='green-spring-div student'>
                  {userType?.accountType === 'Educator'
                    ? 'Educator'
                    : 'Student'}
                </div>
              </div>

              <p>
                {user?.lga?.toUpperCase()} | {user?.state?.toUpperCase()}{' '}
              </p>
              <p></p>
              <p>
                {user?.country?.toUpperCase()}
                <img src={flag} alt='Nigeria Flag' className='flag-img' />
              </p>
            </div>
          </div>

          <button className='edit-profile-btn' onClick={openModal}>
            Edit Profile
          </button>
        </div>

        <div className='user-other-info'>
          {/* Conditionally render Student ID and Email based on account type */}
          {userType?.accountType !== 'Educator' && (
            <p>
              <span className='label'>Student ID:</span>
              <span>{user?.userId} </span>
            </p>
          )}

          {userType?.accountType === 'Educator' && (
            <p>
              <span className='label'>Email:</span>
              <span>{user?.email} </span>
            </p>
          )}

          <p>
            <span className='label'>D.O.B: </span>
            <span>{user?.DOB && formatDate(user.DOB)} </span>
          </p>
          <p>
            <span className='label'>Phone: </span>
            <span>{user?.phone} </span>
          </p>
          <p>
            <span className='label'>Gender: </span>
            <span>{user?.gender} </span>
          </p>
        </div>
        {userType?.accountType === 'Individual' ? (
          <div className='user-parent-info'>
            <h3 style={{ fontSize: '40px' }}>Parent/Guardian Information</h3>
            <hr className='my-1' />
            <p>
              <span className='label'>Full Name: </span>
              <span>{user?.guardianFullName} </span>
            </p>
            <p>
              <span className='label'>Email Address: </span>
              <span>{user?.email}</span>
            </p>
            <p>
              <span className='label'>Phone Number: </span>
              <span>{user?.phone}</span>
            </p>
          </div>
        ) : (
          ''
        )}

        <hr />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='custom-modal'
        overlayClassName='custom-overlay'
        contentLabel='Edit Profile Modal'
        shouldCloseOnOverlayClick={closeModal}
      >
        {userType?.accountType === 'Educator' ? (
          <EducatorProfileModal user={user} onClose={closeModal} />
        ) : (
          <StudentRegistrationProfile user={user} onClose={closeModal} />
        )}
      </Modal>
    </>
  )
}
