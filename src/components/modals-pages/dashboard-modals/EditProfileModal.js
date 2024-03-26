import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
// import { setToken } from "../../../redux/reducers/jwtReducer";
import { loginSuccess } from "../../../redux/reducers/userReducer";
import userService from '../../../services/api/users';
import { states } from '../../states';
import { RotatingLines } from 'react-loader-spinner';

Modal.setAppElement('#root');

export default function EditProfileModal({ onClose }) {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state) => state.user);

    const schema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        guardianEmail: yup.string().email('Invalid Email').required('Guardian Email is required'),
        gender: yup.string().required('Gender is required'),
        age: yup.string().required("Child's Age is required"),
        phoneNumber: yup.string().required('Phone Number is required'),
        country: yup.string().required('Country is required'),
        state: yup.string().required('State is required'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (user) {
            setValue('firstName', user.first_name);
            setValue('lastName', user.last_name);
            setValue('guardianEmail', user.email);
            setValue('gender', user.gender);
            setValue('age', user.age);
            setValue('phoneNumber', user.phone);
            setValue('country', user.country);
            setValue('state', user.state);

        }
    }, [user, setValue]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        try {
            const formData = {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.guardianEmail,
                gender: data.gender,
                age: data.age,
                phone: data.phoneNumber,
                country: data.country,
                state: data.state,
                // password: data.password,
            };

            // Make API call to update user data
            const response = await userService.updateProfile(formData);

            // Dispatch action to update user data in Redux store
            dispatch(loginSuccess(response.data.user));

            // Display success message
            alert(response.data.message);

            // Close modal
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    };

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
                            <input type="text" placeholder="Type here..." {...register('firstName')} className={user && user.first_name ? 'prefilled' : ''} />
                            {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Last Name *</label>
                            <input type="text" placeholder="Type here..." {...register('lastName')} className={user && user.last_name ? 'prefilled' : ''} />
                            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
                        </div>
                        <div className="form-group">
                            <label>Guardian Email *</label>
                            <input type="email" placeholder="Type here..." disabled {...register('guardianEmail')} className={user && user.email ? 'prefilled' : ''} />
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
                            <select {...register('state')} className={user && user.state ? 'prefilled' : ''}>
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
                                    disabled
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Type here..."
                                    value={"****************"}
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
