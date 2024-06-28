import './course-modal.css'
const DraftCourseModal = () => {
  return (
    <div>
      <h3>Move to Draft</h3>
      <p>Do you want to unpublish this course?</p>
      <div className='action-btn'>
        <button className='no'>No</button>
        <button className='yes'>Yes</button>
      </div>
    </div>
  )
}

export default DraftCourseModal
