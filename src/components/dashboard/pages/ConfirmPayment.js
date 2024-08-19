import Modal from 'react-modal'
import React, { useEffect, useState } from 'react'
import EmailVerificationSuccessful from '../../modals-pages/onboarding-modals/EmailVerificationSuccessful'
import { useNavigate } from 'react-router-dom'
import PaymentVerification from '../../modals-pages/dashboard-modals/PaymentVerification'
import userService from '../../../services/api/user'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const ConfirmPayment = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [referenceState, setReferenceState] = useState('31tdg25j83')
  const { token } = useSelector((state) => state.auth)
  console.log(token)
  console.log(referenceState)
  const urlParams = new URLSearchParams(window.location.search)
  const reference = urlParams.get('reference')

  const mutation = useMutation({
    mutationFn: () => userService.validatePayment(token, '31tdg25j83'),
    onSuccess: (data) => {
      setIsOpen(true)
      toast.success(data.message)
    },
    onError: (error) => {
      console.error('Registration error:', error)
      toast.dismiss()
      toast.error(error?.message)
      //   navigate('/sign-in', { replace: true })
    },
  })
  useEffect(() => {
    // Extract parameters from the URL
    const urlParams = new URLSearchParams(window.location.search)
    const reference = urlParams.get('reference')
    console.log(reference)

    if (reference) {
      setReferenceState(reference)
      mutation.mutate()
    } else {
      console.log('HEllO')
      //
    }
  }, [referenceState])

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onRequestClose={closeModal}
        contentLabel='Example Modal'
        className='custom-modal-success'
        overlayClassName='custom-overlay'
        shouldCloseOnOverlayClick={false}
      >
        <PaymentVerification />
      </Modal>
    </div>
  )
}

export default ConfirmPayment
