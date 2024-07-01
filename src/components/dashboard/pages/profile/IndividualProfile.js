import React, { useState } from 'react'
import femaleprofileImage from '../../../../assets/user-profile-image.png'
import maleprofileImage from '../../../../assets/male-profile-image.png'
import flag from '../../../../assets/Flag_of_Nigeria.png'
import { Icon } from '@iconify/react'
import './profile.css'
import Modal from 'react-modal'
import EditProfileModal from '../../../modals-pages/dashboard-modals/EditProfileModal'
import { useSelector } from 'react-redux'

export default function IndividualProfile() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const { user } = useSelector((state) => state.user)

  const openModal = (user) => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className='individual-profile container-fluid'>
        <div className='user-basic-info'>
          <div className='about-user'>
            <div className='profile-img'>
              {user?.gender === 'male' ? (
                <img src={maleprofileImage} alt='user Profile image' />
              ) : (
                <img src={femaleprofileImage} alt='user Profile image' />
              )}
            </div>

            <div className='about-user-info mx-4'>
              <h2>Musa Haruna</h2>

              <div className='green-spring-div primary'>School Name</div>
              <p>LGA | STATE</p>
              <p>Borno</p>
              <div className='d-flex'>
                <p>Country</p>
                <div className='flag mx-2'>
                  <img
                    src={flag}
                    alt='user country flag'
                    className='flag-img'
                  />
                </div>
              </div>

              <div className='user-interests'>
                <div className='green-spring-div school'>School Name</div>
                <div className='green-spring-div student'>Student</div>
              </div>
            </div>
          </div>

          <button
            className='btn edit-profile-btn'
            onClick={() => openModal(user)}
          >
            Edit Profile
          </button>
        </div>
        <div className='search-bar'>
          <form action='' className='search'>
            <div className='search-wrapper'>
              <span className='search-icon'>
                <Icon icon='lets-icons:search' style={{ color: '#4d4d4d' }} />
              </span>
              <input
                type='text'
                id='search-input'
                placeholder='Search by Name, Age, Email, Phone Number'
              />
            </div>

            <div className='filter-sort'>
              <label>
                <Icon icon='gridicons:filter' style={{ color: '#4d4d4d' }} />
                <select name='' id='' className='filter'>
                  <option value='' selected disabled>
                    Filter by
                  </option>
                  <option value=''>All</option>
                  <option value=''>Students</option>
                  <option value=''>Teachers</option>
                </select>
              </label>

              <label>
                <Icon
                  icon='ic:outline-sort-by-alpha'
                  style={{ color: '#4d4d4d' }}
                />
                <select name='' id='' className='sort'>
                  <option value='' selected>
                    Sort by
                  </option>
                  <option value=''>Sort by</option>
                </select>
              </label>
            </div>
          </form>
        </div>
        <div className='user-other-info '>
          <p id='p'>
            <span className='span'>Email: </span>
            <span id='p'> hmusaharuna@gmail.com </span>
          </p>
          <p>
            <span className='span'>Age: </span>
            <span id='p'> 18 </span>
          </p>
          <p>
            <span className='span'>Phone Number: </span>
            <span id='p'> +234 803 456 7890</span>
          </p>
          <p>
            <span className='span'>Gender: </span>
            <span id='p'>Male</span>
          </p>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='custom-modal'
        overlayClassName='custom-overlay'
        contentLabel='Example Modal'
        shouldCloseOnOverlayClick={true}
      >
        {' '}
        <EditProfileModal onClose={closeModal} />
      </Modal>
    </>
  )
}
