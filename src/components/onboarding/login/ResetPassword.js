
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import EmailVerificationSuccessful from '../onboarding-modals/EmailVerificationSuccessful';
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/reducers/jwtReducer";
import userService from '../../../services/api/users';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
export default function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: userService.confirmToken,
        onSuccess: (data) => {
            // Handle successful login
            navigate('/reset-password', { replace: true })
            setOpen(true)

            // const newUrl = window.location.origin + window.location.pathname
            // window.history.replaceState({}, document.title, newUrl)
        },
        onError: (error) => {
            // Handle login error
            console.log(error)
            navigate('/login', { replace: true })

            toast.error(error)
            toast.error(error?.message)
        }
    })

    useEffect(() => {
        // Extract parameters from the URL
        const urlParams = new URLSearchParams(window.location.search)
        const resetToken = urlParams.get('t')
        const queryCode = urlParams.get('c')

        if (resetToken && queryCode) {
            mutate({ code: queryCode })
            dispatch(setToken(resetToken))
        } else {
            navigate('/login', { replace: true })
        }
    }, [])

    const schema = yup.object().shape({
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must not exceed 20 characters')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match') // Validation rule for matching passwords
            .required('Confirm Password is required'),
    })


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const mutation = useMutation({
        mutationFn: userService.newPassword,
        onSuccess: (data) => {
            // Handle successful login
            openModal()
            console.log(data.data.message)
        },
        onError: (error) => {
            // Handle login error
            console.error('error:', error)

            toast.error(error)
            toast.error(error?.message)
        },
    })

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

    const onSubmit = (data) => {
        // Call the mutate function to trigger the login mutation
        // console.log(data)
        mutation.mutate(data)
    }
    return (
        <div>
            {
                open && (
                    <div className="sign-in registration-page">
                        <h2 className='text-center'>Reset Password</h2>
                        <p className='text-center'>Create a New Password</p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-section d-flex flex-column align-items-center ">

                                <div className="form-group my-3">
                                    <label>Enter New Password</label>
                                    <div className="d-flex align-items-center input-with-icon">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Type here..."
                                            {...register('password')}
                                        />
                                        <div
                                            className="password-toggle float-right"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} className='eye-icon' />
                                        </div>
                                    </div>
                                    {errors.password && <p className="error-message">Password is required</p>}
                                </div>

                                <div className="form-group my-3">
                                    <label>Confirm Password</label>
                                    <div className="d-flex align-items-center input-with-icon">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Type here..."
                                            {...register('confirmPassword')}
                                        />
                                        <div
                                            className="password-toggle float-right"
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                            <Icon icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"} className='eye-icon' />
                                        </div>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="error-message">{errors.confirmPassword.message}</p>
                                    )}
                                </div>


                                <button className='btn submit-btn' type='submit'>
                                    {mutation.isPending ? (
                                        <RotatingLines
                                            type='Oval'
                                            style={{ color: '#FFF' }}
                                            height={20}
                                            width={20}
                                        />
                                    ) : (
                                        <>
                                            Submit
                                        </>
                                    )}
                                </button>

                            </div>
                        </form>

                    </div>
                )
            }

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

