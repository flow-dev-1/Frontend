
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import EmailVerificationSuccessful from '../onboarding-modals/EmailVerificationSuccessful';


export default function ForgotPassword() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [email, setEmail] = useState('');

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }
  

    const handleSubmit = (e) => {
        e.preventDefault();
        openModal();
    };


    return (
        <div>
            <div className="sign-in registration-page">
                <h2 className='text-center'>Forgot Password?</h2>
                <p className='text-center'>Enter your email address you registered with.</p>

                <form className=''>
                    <div className="form-section d-flex flex-column align-items-center ">
                        <div className="form-group my-4">
                            <label>Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className='btn submit-btn' type="submit" onClick={handleSubmit}>Submit</button>

                    </div>
                </form>

                <p className='text-center'>
                    Remember your details? <Link to="/signin">Sign in</Link>
                </p>
                
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="custom-modal"
                overlayClassName="custom-overlay"
                shouldCloseOnOverlayClick={true}
            >
                <EmailVerificationSuccessful from="forgotPassword" />
            </Modal>

        </div>
    );
}

