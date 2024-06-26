
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import EmailVerificationSuccessful from '../../modals-pages/onboarding-modals/EmailVerificationSuccessful';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import userService from '../../../services/api/user';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
export default function ForgotPassword() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [email, setEmail] = useState('');

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const schema = yup.object().shape({
        email: yup.string().required('Enter a valid email'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const mutation = useMutation({
        mutationFn: userService.forgotPassword,
        onSuccess: (data) => {
            console.log(data, "Data FP")
            // Handle successful login
            openModal()

        },
        onError: (error) => {
            // Handle login error
            console.error('error:', error)

            toast.error(error)
            toast.error(error?.message)
        },
    })

    const onSubmit = (data) => {
        // Call the mutate function to trigger the login mutation
        setEmail(data.email)
        mutation.mutate(data)
        //
    }


    return (
        <div>
            <div className="sign-in registration-page">
                <h2 className='text-center'>Forgot Password?</h2>
                <p className='text-center'>Enter your email address you registered with.</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-section d-flex flex-column align-items-center ">
                        <div className="form-group my-4">
                            <label>Email address</label>
                            <input type="email" {...register('email', { required: true })} />
                            {errors.email && <p className="error-message">Email is required</p>}
                        </div>
                        <button className='btn submit-btn' type="submit" >

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

                <p className='text-center'>
                    Remember your details? <Link to="/login">Sign in</Link>
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
                <EmailVerificationSuccessful from="forgotPassword"
                    email={email}
                />
            </Modal>

        </div>
    );
}

