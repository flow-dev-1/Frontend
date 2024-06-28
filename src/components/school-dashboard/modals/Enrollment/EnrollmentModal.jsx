import React from 'react'
import Modal from 'react-modal'
import { Icon } from '@iconify/react'

const EnrollmentModal = ({
  isOpen,
  onRequestClose,
  daysOfWeek,
  timeOptions,
}) => {
  return (
    <Modal
      contentLabel='Enrollment Modal'
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className='custom-modal-otp-three'
      overlayClassName='custom-overlay'
    >
      <div>
        <h2 className='enroll-heading-flex'>
          Enroll Student(s){' '}
          <span onClick={onRequestClose}>
            <Icon icon='material-symbols-light:close' />
          </span>
        </h2>
        <hr style={{ marginBottom: '5px' }} />
        <div>
          <p style={{ color: '#FD483D', fontSize: '12px' }}>
            *Indicates Required
          </p>
        </div>
        <div>
          <div className='class-input'>
            <label htmlFor='class'>Class *</label>
            <input type='text' id='class' />
          </div>
          <div className='select-flex'>
            <div>
              <label htmlFor='day'>Day of the Week *</label>
              <select id='day' name='day'>
                {daysOfWeek.map((day, index) => (
                  <option key={index} value={day.toLowerCase()}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='start-time'>Start Time *</label>
              <select id='start-time' name='start-time'>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='end-time'>End Time *</label>
              <select id='end-time' name='end-time'>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='text-area'>
            <div>
              <label htmlFor='student-email'>Student Email *</label>
              <textarea
                id='student-email'
                name='student-email'
                placeholder='Enter email addresses here'
                rows={3}
                cols={50}
              />
            </div>
            <div className='upload'>
              <label htmlFor='file-upload'>Or Upload File Here *</label>
              <div className='file-upload-wrapper'>
                <input
                  type='file'
                  id='file-upload'
                  className='file-upload-input'
                />
                <label htmlFor='file-upload' className='file-upload-label'>
                  Choose file
                  <Icon
                    icon='ant-design:upload-outlined'
                    width='24'
                    height='24'
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <button className='modal-button'>Send Invite</button>
      </div>
    </Modal>
  )
}

export default EnrollmentModal
