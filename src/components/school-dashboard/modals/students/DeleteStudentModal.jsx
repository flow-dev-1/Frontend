import './course-modal.css'

import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'

const DeleteStudentModal = ({ course, closeModal }) => {
  return (
    <div>
      <h3 className='text-center'>Delete</h3>
      <p className='text-center'>Do you want to delete this user?</p>
      <div className='action-btn'>
        <button className='no' onClick={closeModal}>
          No
        </button>
        <button className='yes'>
          <>Yes</>
        </button>
      </div>
    </div>
  )
}

export default DeleteStudentModal
