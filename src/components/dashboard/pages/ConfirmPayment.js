import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import PaymentVerification from '../../modals-pages/dashboard-modals/PaymentVerification'
import { useNavigate } from 'react-router-dom'
import userService from '../../../services/api/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const ConfirmPayment = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [referenceState, setReferenceState] = useState('')
  const { token } = useSelector((state) => state.auth)
  const queryClient = useQueryClient() // Initialize the queryClient
  const urlParams = new URLSearchParams(window.location.search)
  const reference = urlParams.get('reference')
  const mutation = useMutation({
    mutationFn: () => userService.validatePayment(token, reference),
    onSuccess: (data) => {
      setIsOpen(true)
      toast.success(data.message)
      queryClient.invalidateQueries('individual-courses-enrolled') // Invalidate the query
    },
    onError: (error) => {
      console.error('Registration error:', error)
      toast.dismiss()
      toast.error(error?.message)
      // navigate('/sign-in', { replace: true })
    },
  })

  useEffect(() => {
    if (reference) {
      setReferenceState(reference)
      mutation.mutate()
    } else {
      console.log('Reference not found in URL')
      // Handle the case where the reference is not present in the URL
    }
  }, [reference])

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        contentLabel='Payment Verification Modal'
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
