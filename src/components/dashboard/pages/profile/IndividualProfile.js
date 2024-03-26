import React, { useState } from 'react';
import users from '../../json-files/UsersData'

import profile from '../../../../assets/user-profile-image.png';
import flag from '../../../../assets/Flag_of_Nigeria.png';

import './profile.css'
import Modal from 'react-modal';

import EditProfileModal from '../../../modals-pages/dashboard-modals/EditProfileModal';


export default function IndividualProfile() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);



  const openModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsOpen(false);
  };


  return (
    <>
      {users.map((user, index) => (
        <div key={index} className="individual-profile container-fluid">
          <div className="user-basic-info">
            <div className="about-user">
              <div className="profile-img">
                <img src={profile} alt="user profile image" />
              </div>


              <div className="about-user-info mx-4">
                <h2>{user.firstName} {user.lastName}</h2>
                <p>{user.state} </p>
                <div className="d-flex">
                  <p>{user.country}</p>
                  <div className="flag mx-2">
                    <img src={flag} alt="user country flag" className='flag-img' />
                  </div>

                </div>

                <div className="green-spring-div mx-2">
                  Individual
                </div>
              </div>

            </div>

            <button className="btn edit-profile-btn" onClick={() => openModal(user)}>
              Edit Profile
            </button>
          </div>

          <div className="user-other-info ">
            <p><span>Email: </span> {user.email} </p>
            <p><span>D.O.B: </span>{user.dob}</p>
            <p><span>Phone Number: </span>{user.phoneNumber}</p>
            <p><span>Gender: </span>{user.gender}</p>
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom-modal"
        overlayClassName="custom-overlay"
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
      > <EditProfileModal user={selectedUser} onClose={closeModal} />
      </Modal>
    </>

  )
}