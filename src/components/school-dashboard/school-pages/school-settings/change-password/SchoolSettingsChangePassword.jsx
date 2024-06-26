import { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
import './change-password.css'

const SchoolSettingsChangePassword = () => {
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false)
  const closeModal = () => {
    setModalIsOpenSuccess(false)
  }
  return (
    <div className='settings-change-password'>
      <h2>Change Password</h2>
      <p>
        Take charge of the security access to your dashboard. Change your{' '}
        <a href='/'>Flow</a> password by filling the form below.
      </p>
      <div className='mt-5'>
        <div className='form-group'>
          <label htmlFor='old-password'>Old Password</label>
          <div>
            <input
              type='password'
              id='old-password'
              placeholder='Type here...'
            />
            <Icon icon='mdi:eye' className='icon' />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='new-password'>New Password</label>
          <div>
            <input
              type='password'
              id='new-password'
              placeholder='Type here...'
            />
            <Icon icon='mdi:eye' className='icon' />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <div>
            <input
              type='password'
              id='confirm-password'
              placeholder='Type here...'
            />
            <Icon icon='mdi:eye' className='icon' />
          </div>
        </div>
        <button onClick={() => setModalIsOpenSuccess(true)}>
          Update Password
        </button>
      </div>
      <Modal
        isOpen={modalIsOpenSuccess}
        onRequestClose={closeModal}
        contentLabel='Delete Modal'
        className='custom-modal-success'
        overlayClassName='custom-overlay'
      >
        <div className='succes-modal-content'>
          <div className='success-icon icon-with-bg'>
            <div class='circle'>
              <div class='checkmark'></div>
            </div>
          </div>
          <h4 className='text-center'>Successfull</h4>
          <p className='text-center'>
            You have successfully updated your password.
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default SchoolSettingsChangePassword
