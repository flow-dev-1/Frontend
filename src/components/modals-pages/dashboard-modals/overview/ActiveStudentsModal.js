import React from 'react'
import Modal from 'react-modal'
import './active-non-active-modal.css'

const ActiveStudentsModal = ({ isOpen, close }) => {
  const students = [
    { name: 'Jane Doe', email: 'Janedoe@gmail.com' },
    { name: 'Jane Doe', email: 'Janedoe@gmail.com' },
    { name: 'Jane Doe', email: 'Janedoe@gmail.com' },
    { name: 'Jane Doe', email: 'Janedoe@gmail.com' },
    { name: 'Jane Doe', email: 'Janedoe@gmail.com' },
    { name: 'John Doe', email: 'Jahndoe@gmail.com' },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      contentLabel='Delete Modal'
      className='custom-modal-dashboard'
      overlayClassName='custom-overlay'
    >
      <div style={{ padding: '3rem 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '40px' }}>
          Active Students
        </h2>
        <p style={{ fontSize: '14px', textAlign: 'center', paddingBottom:"10px" }}>
          List of enrolled students
        </p>
        <div className='header-green'>
          <p>Growth Mindset</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}

export default ActiveStudentsModal
