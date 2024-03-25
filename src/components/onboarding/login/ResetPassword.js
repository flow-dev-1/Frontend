
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import EmailVerificationSuccessful from '../../modals-pages/onboarding-modals/EmailVerificationSuccessful';


export default function ResetPassword() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    function openModal() {
        setModalIsOpen(true);
    }
   


    const handleSignIn = (e) => {
        e.preventDefault();


        if (password === confirmPass) {
            openModal();
            console.log('Sign up successful');
        } else {
            console.log('Password Incorrect!');

            if (confirmPass && confirmPass !== password) {
                setShowPasswordError(true);
            } else {
                setShowPasswordError(false);
            }
        }


    };


    return (
        <div>
            <div className="sign-in registration-page">
                <h2 className='text-center'>Reset Password</h2>
                <p className='text-center'>Create a New Password</p>

                <form className=''>
                    <div className="form-section d-flex flex-column align-items-center ">

                        <div className="form-group my-3">
                            <label>Enter New Password</label>
                            <div className="d-flex align-items-center input-with-icon">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Type here..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new password"
                                    required
                                />
                                <div
                                    className="password-toggle float-right"
                                    onClick={togglePasswordVisibility}
                                >
                                    <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} className='eye-icon' />
                                </div>
                            </div>
                        </div>

                        <div className="form-group my-3">
                            <label>Confirm Password</label>
                            <div className="d-flex align-items-center input-with-icon">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Type here..."
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    autoComplete="new password"
                                    required
                                />
                                <div
                                    className="password-toggle float-right"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    <Icon icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"} className='eye-icon' />
                                </div>
                            </div>
                            {showPasswordError && (
                                <p className="password-match">
                                    password did not match
                                </p>
                            )}
                        </div>


                        <button className='btn submit-btn' onClick={handleSignIn}>Submit</button>

                    </div>
                </form>

            </div>
            <Modal
                isOpen={modalIsOpen}
                // onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="custom-modal"
                overlayClassName="custom-overlay"
                shouldCloseOnOverlayClick={false}
            >
                <EmailVerificationSuccessful from="resetPassword" />
            </Modal>

        </div>
    );
}

