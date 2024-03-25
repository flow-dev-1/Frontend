import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import EmailVerificationSuccessful from "./EmailVerificationSuccessful";
import { useMutation } from '@tanstack/react-query';
import userService from '../../../services/api/users';
import { useDispatch } from "react-redux";
import { clearToken } from "../../../redux/reducers/jwtReducer";
import { toast } from "react-toastify";
export default function OtpModal({ email, resendOTP }) {
    const dispatch = useDispatch();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);
        if (e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const value = e.clipboardData.getData("Text");
        const otpArray = value.split("").slice(0, 6);
        setOtp([...otpArray, ...otp.slice(otpArray.length)]);
    };

    function openModal() {
        setIsOpen(true);
    }

    function handleSubmit() {
        console.log(otp.join(""), "OTP")
        mutation.mutate({ code: otp.join("") })

    }

    const [countdown, setCountdown] = useState(0);


    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [countdown]);

    const handleResendOTP = () => {
        setCountdown(600);
        resendOTP()
    };


    const mutation = useMutation({
        mutationFn: userService.verifyAccount, // Assuming userService.register is your API call function
        onSuccess: (data) => {
            console.log('OTP Verification:', data);
            toast.success(data.message);
            dispatch(clearToken());
            openModal();

        },
        onError: (error) => {
            console.error('Registration error:', error);
            toast.dismiss()
            toast.error(error?.message || error || 'Registration failed');
        },
    });

    return (
        <div className='otp-modal modal-content'>
            <div className="d-flex flex-column align-items-center ">
                <h2>Verify your email account!</h2>
                <p className="my-2">
                    Kindly enter the OTP sent to <span>{email}</span>
                </p>
                <div className="otp-input my-4">
                    {otp.map((digit, index) => (
                        <input
                            type="text"
                            key={index}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onPaste={handlePaste}
                            maxlength="1"
                        />
                    ))}
                </div>

                <button onClick={handleSubmit} className="btn submit-btn">Submit</button>
                <p className="mt-3">
                    Yet to receive OTP?
                    {countdown > 0 ? (
                        <span>
                            {' '}
                            Resend OTP ({Math.floor(countdown / 60)
                                .toString()
                                .padStart(2, '0')}:
                            {Math.floor(countdown % 60).toString().padStart(2, '0')})
                        </span>
                    ) : (
                        <span href="#" onClick={handleResendOTP} style={{ cursor: 'pointer' }}>
                            {' '}
                            Resend OTP
                        </span>
                    )}
                </p>

            </div>
            <Modal
                isOpen={modalIsOpen}
                // onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="custom-modal"
                overlayClassName="custom-overlay"
                shouldCloseOnOverlayClick={false}
            >
                <EmailVerificationSuccessful from="otp" />
            </Modal>
        </div>
    )
}
