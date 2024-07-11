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
  const openModal = (user) => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className='individual-profile container-fluid'>
        <button
          className='back-button'
          style={{ marginBottom: '2rem' }}
          onClick={() => navigate(-1)}
        >
          <Icon icon='mingcute:arrow-left-line' width={20} /> Back
        </button>
        <div className='user-basic-info' style={{ padding: '1rem 4rem' }}>
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
              <h2>Musa Haruna</h2>

              <div
                style={{ margin: '1rem 0' }}
                className='green-spring-div primary'
              >
                School Name
              </div>
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
        </div>

        <div className='user-other-info '>
          <p id='p'>
            <span
              className='span'
              style={{ color: '#5CE1E6', fontSize: '14px' }}
            >
              Email:{' '}
            </span>
            <span id='p'> hmusaharuna@gmail.com </span>
          </p>
          <p>
            <span
              className='span'
              style={{ color: '#5CE1E6', fontSize: '14px' }}
            >
              D.O.B:{' '}
            </span>
            <span id='p'> 22/08/2000 </span>
          </p>
          <p>
            <span
              className='span'
              style={{ color: '#5CE1E6', fontSize: '14px' }}
            >
              Phone Number:{' '}
            </span>
            <span id='p'> +234 803 456 7890</span>
          </p>
          <p>
            <span
              className='span'
              style={{ color: '#5CE1E6', fontSize: '14px' }}
            >
              Gender:{' '}
            </span>
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
