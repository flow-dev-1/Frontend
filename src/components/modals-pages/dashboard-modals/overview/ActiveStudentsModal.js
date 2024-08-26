import React from 'react'
import Modal from 'react-modal'
import './active-non-active-modal.css'

const ActiveStudentsModal = ({ isOpen, close, data }) => {
  // Check if data is provided and validGraphData exists in the data
  const students = data?.validGraphData || [];
  const courseTitle = students.length > 0 ? students[0].course.title : 'No Course Available';

  return (
    <div style={{ borderRadius: '20px' }}>
      <Modal
        isOpen={isOpen}
        onRequestClose={close}
        contentLabel='Delete Modal'
        className='custom-modal-dashboard'
        overlayClassName='custom-overlay'
      >
        <div style={{ padding: '3rem 2rem', overflowY: 'scroll' }}>
          <h2 style={{ textAlign: 'center', fontSize: '40px' }}>
            Active Students
          </h2>
          <p
            style={{
              fontSize: '14px',
              textAlign: 'center',
              paddingBottom: '10px',
            }}
          >
            List of enrolled students
          </p>
          {/* Display the course title dynamically */}
          <div className='header-green'>
            <p>{courseTitle}</p>
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
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.user.fullName}</td>
                  <td>{student.user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  )
}

export default ActiveStudentsModal;
