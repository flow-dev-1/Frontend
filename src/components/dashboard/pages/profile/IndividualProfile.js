import React, { useState } from 'react'
import femaleprofileImage from '../../../../assets/user-profile-image.png'
import maleprofileImage from '../../../../assets/male-profile-image.png'
import flag from '../../../../assets/Flag_of_Nigeria.png'
import { Icon } from '@iconify/react'
import './profile.css'
import Modal from 'react-modal'
import EditProfileModal from '../../../modals-pages/dashboard-modals/EditProfileModal'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function IndividualProfile() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
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
              <h2>{user?.name || 'Morayo Ojikutu'}</h2>
              <div className='user-details'>
                <div className='green-spring-div primary'>Primary</div>
              </div>

              <div className='user-details'>
                <div className='green-spring-div school'>School Name</div>
                <div className='green-spring-div student'>Student</div>
              </div>

              <p>LGA | STATE</p>
              <p>
                NIGERIA{' '}
                <img src={flag} alt='Nigeria Flag' className='flag-img' />
              </p>
            </div>
          </div>

          <button className='edit-profile-btn' onClick={openModal}>
            Edit Profile
          </button>
        </div>

        <div className='user-other-info'>
          <p>
            <span className='label'>Student ID: </span>
            <span>{user?.id || 'CIS34524'}</span>
          </p>
          <p>
            <span className='label'>D.O.B: </span>
            <span>{user?.dob || '22/08/2000'}</span>
          </p>
          <p>
            <span className='label'>Gender: </span>
            <span>{user?.gender || 'Female'}</span>
          </p>
        </div>

        <div className='user-parent-info'>
          <h3 style={{ fontSize: '40px' }}>Parent/Guardian Information</h3>
          <hr className='my-1' />
          <p>
            <span className='label'>Full Name: </span>
            <span>Mrs Jane Doe</span>
          </p>
          <p>
            <span className='label'>Email Address: </span>
            <span>Janedoe@gmail.com</span>
          </p>
          <p>
            <span className='label'>Phone Number: </span>
            <span>+2348149878476</span>
          </p>
        </div>
        <hr />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='custom-modal'
        overlayClassName='custom-overlay'
        contentLabel='Edit Profile Modal'
        shouldCloseOnOverlayClick={true}
      >
        <EditProfileModal onClose={closeModal} />
      </Modal>
    </>
  )
}
