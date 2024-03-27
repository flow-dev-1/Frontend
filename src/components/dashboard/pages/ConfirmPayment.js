import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import EmailVerificationSuccessful from '../../modals-pages/onboarding-modals/EmailVerificationSuccessful';
import { useNavigate } from 'react-router-dom';
import PaymentVerification from '../../modals-pages/dashboard-modals/PaymentVerification';

const ConfirmPayment = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        // Extract parameters from the URL
        const urlParams = new URLSearchParams(window.location.search)
        const reference = urlParams.get('reference')

        if (reference) {
            setIsOpen(true)
            // mutate({ code: queryCode })
        } else {
            navigate('/login', { replace: true })
        }
    }, [])

    return (
        <div>

            <Modal
                isOpen={modalIsOpen}
                // onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="custom-modal"
                overlayClassName="custom-overlay"
                shouldCloseOnOverlayClick={false}
            >
                <PaymentVerification />
            </Modal>
        </div>
    )
}

export default ConfirmPayment