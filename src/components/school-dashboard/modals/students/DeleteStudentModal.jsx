import './course-modal.css'

import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'

const DeleteStudentModal = ({ course, closeModal, handleDeleteUser, isPending }) => {
  return (
    <div>
      <h3 className='text-center'>Delete</h3>
      <p className='text-center'>Do you want to delete this user?</p>
      <div className='action-btn'>
        <button className='no' onClick={closeModal}>
          No
        </button>
        <button className='yes' disabled={isPending} onClick={handleDeleteUser}>
          {isPending ? <RotatingLines
            type='Oval'
            style={{ color: '#FFF' }}
            height={20}
            width={20} /> : "Yes"}
        </button>
      </div>
    </div>
  )
}

export default DeleteStudentModal
