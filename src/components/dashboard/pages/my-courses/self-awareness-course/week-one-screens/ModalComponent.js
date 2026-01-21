// src/components/ModalComponent.js
import React from 'react'
import Modal from 'react-modal'
import ReviewPopUp from '../../../../../modals-pages/dashboard-modals/ReviewModal'

const ModalComponent = ({ reviewPopUp, closeReviewPopUp }) => {
  return (
    <Modal
      isOpen={reviewPopUp}
      onRequestClose={() => { }} // Prevent closing on overlay click
      contentLabel='Review Modal'
      className='custom-modal'
      overlayClassName='custom-overlay'
      shouldCloseOnOverlayClick={false}
    >
      <ReviewPopUp closeReviewPopUp={closeReviewPopUp} />
    </Modal>
  )
}

export default ModalComponent
