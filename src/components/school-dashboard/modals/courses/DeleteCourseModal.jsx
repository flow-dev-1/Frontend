import './course-modal.css'
const DeleteCourseModal = () => {
  return (
    <div>
      <h3>Delete</h3>
      <p>Do you want to delete this course?</p>
      <div className='action-btn'>
        <button className='no'>No</button>
        <button className='yes'>Yes</button>
      </div>
    </div>
  )
}

export default DeleteCourseModal
