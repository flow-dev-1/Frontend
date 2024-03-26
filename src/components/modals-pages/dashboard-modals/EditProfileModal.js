import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';

import '../../onboarding/onboarding.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import userService from '../../../services/api/users';
import { states } from '../../states';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/reducers/jwtReducer";

Modal.setAppElement('#root'); // Set the root element for the modal

export default function EditProfileModal({ user, onClose }) {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [FormData, setFormData] = useState(null);


    const schema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        guardianEmail: yup.string().email('Invalid Email').required('Guardian Email is required'),
        gender: yup.string().required('Gender is required'),
        age: yup.string().required('Child\'s Age is required'),
        phoneNumber: yup.string().required('Phone Number is required'),
        country: yup.string().required('Country is required'),
        state: yup.string().required('State is required'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const mutation = useMutation({
        mutationFn: userService.register, // Assuming userService.register is your API call function
        onSuccess: (data) => {
            console.log('Registration successful:', data);
            toast.success(data.message);
            dispatch(setToken(data?.token));
            openModal();

        },
        onError: (error) => {
            console.error('Registration error:', error);
            toast.dismiss()
            toast.error(error?.message);
            toast.error(error || 'Registration failed');
        },
    });

    const onSubmit = (data) => {

        // if (data.first_name) {
        //     // This is 4 resend otp
        //     mutation.mutate(data);
        // } else {
        //     const formData = {
        //         first_name: data.firstName,
        //         last_name: data.lastName,
        //         email: data.guardianEmail,
        //         phone: data.phoneNumber,
        //         password: data.password,
        //         age: data.age,
        //         gender: data.gender,
        //         country: data.country,
        //         state: data.state,
        //     };
        //     setFormData(formData)
        //     mutation.mutate(formData);
        // }
        if (data.first_name) {
            onClose();
             }
        
    };


    useEffect(() => {
        if (user) {
            // Prefill the input fields with user data
            setValue('firstName', user.firstName);
            setValue('lastName', user.lastName);
            setValue('guardianEmail', user.guardianEmail);
            setValue('gender', user.gender);
            setValue('age', user.age);
            setValue('phoneNumber', user.phoneNumber);
            setValue('country', user.country);
            setValue('state', user.state);
            setValue('password', user.password); // Clear the password field
        }
    }, [user, setValue]);


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <div className="registration-page edit-profile mt-1">
                <div className="top-section">
                    <h2>Edit Profile</h2>
                    <hr />
                    <span >Hi {user.firstName} {user.lastName} you can now edit your details</span>

                </div>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <form >
                    <div className="form-section ">
                        <div className="form-group">
                            <label>First Name *</label>
                            <input type="text" placeholder="Type here..." {...register('firstName')} className={user && user.firstName ? 'prefilled' : ''}/>
                            {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Last Name *</label>
                            <input type="text" placeholder="Type here..." {...register('lastName')} className={user && user.lastName ? 'prefilled' : ''} />
                            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Guardian Email *</label>
                            <input type="email" placeholder="Type here..." {...register('guardianEmail')} className={user && user.guardianEmail ? 'prefilled' : ''} />
                            {errors.guardianEmail && <p className="error-message">{errors.guardianEmail.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Gender *</label>
                            <select {...register('gender')}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <p className="error-message">{errors.gender.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Child's Age *</label>
                            <input type="number" placeholder="Date of Birth" {...register('age')} className={user && user.age ? 'prefilled' : ''} />
                            {errors.age && <p className="error-message">{errors.age.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input type="tel" placeholder="ex. 08012345678" {...register('phoneNumber')} className={user && user.phoneNumber ? 'prefilled' : ''} />
                            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Country *</label>
                            <select {...register('country')} className={user && user.country ? 'prefilled' : ''} >
                                <option value="">Select Country</option>
                                <option value="Nigeria">Nigeria</option>
                            </select>
                            {errors.country && <p className="error-message">{errors.country.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>State *</label>
                            <select {...register('state')}  className={user && user.state ? 'prefilled' : ''}>
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}

                            </select>
                            {errors.state && <p className="error-message">{errors.state.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Create Password *</label>
                            <div className="d-flex align-items-center input-with-icon">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Type here..."
                                    // onChange={handlePasswordChange}
                                    autoComplete="new password"
                                    {...register('password')}
                                    className={user && user.password ? 'prefilled' : ''}
                                />
                                <div
                                    className="password-toggle float-right"
                                    onClick={togglePasswordVisibility}
                                >
                                    <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} className='eye-icon' />
                                </div>
                            </div>
                            
                            {errors.password && <p className="error-message">{errors.password.message}</p>}
                        </div>
                    </div>
                    <div className="bottom-section float-end mt-4">

                        {/* <button className='btn  submit-btn' type="submit" disabled={mutation.isPending}>
                            {
                                mutation.isPending ? <RotatingLines type='Oval' style={{ color: '#FFF' }} height={20} width={20} /> :
                                    " Update"
                            }
                        </button> */}
                        <button className='btn  submit-btn' type="submit" onClick={onSubmit}>

                               
                                    Update
                            
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
