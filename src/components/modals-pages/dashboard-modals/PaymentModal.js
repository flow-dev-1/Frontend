import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import userService from '../../../services/api/users';
import { setToken } from "../../../redux/reducers/jwtReducer";



import '../modals.css';
import paymentOption from '../../../assets/paystack-badge-cards-ngn.png'
import { useDispatch } from 'react-redux';



export default function PaymentModal({ course, onClose }) {
    const dispatch = useDispatch();
    const [FormData, setFormData] = useState(null);

    const schema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        guardianEmail: yup.string().email('Invalid Email').required('Guardian Email is required'),
      
        phoneNumber: yup.string().required('Phone Number is required'),
       
      });


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

      const mutation = useMutation({
        mutationFn: userService.register, // Assuming userService.register is your API call function
        onSuccess: (data) => {
          console.log('Registration successful:', data);
          toast.success(data.message);
          dispatch(setToken(data?.token));
      
    
        },
        onError: (error) => {
          console.error('Registration error:', error);
          toast.dismiss()
          toast.error(error?.message);
          toast.error(error || 'Registration failed');
        },
      });



      const onSubmit = (data) => {
        if (data.first_name) {
          // This is 4 resend otp
          mutation.mutate(data);
        } else {
          const formData = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.guardianEmail,
            phone: data.phoneNumber,
            password: data.password,
            age: data.age,
            gender: data.gender,
            country: data.country,
            state: data.state,
          };
          setFormData(formData)
          mutation.mutate(formData);
        }
      };

      

    return (
        <div className="payment-modal modal-content">
            <div className="">
                <div className="payment-modal-header ">
                    <button className="btn close-btn float-end" onClick={onClose}><Icon icon="mingcute:close-fill" /></button>
                    <h2 className='mb-0'>Enroll</h2>
                
                </div>
                <hr className='w-100 h-auto mt-0 ' />

                <p className='enrol-modal-p'>
                To enroll into this program, kindly make the necessary payment.
                </p>
                <div className="payment-modal-body ">
                

                    <p className='p-amount'>N{course.amount}</p>
            
                        <form action="" onSubmit={handleSubmit(onSubmit)} className='mt-2'>
                            <div className="d-flex">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" placeholder="Type here..." {...register('firstName')} />
                                    {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Type here..." {...register('lastName')} />
                                    {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email </label>
                                <input type="email" placeholder="Type here..." {...register('guardianEmail')} />
                                {errors.guardianEmail && <p className="error-message">{errors.guardianEmail.message}</p>}
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="ex. 08012345678" {...register('phoneNumber')} />
                                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                            </div>
                        </form>


                    <button className="btn payment-btn">Make Payment</button>
                </div>
            </div>


            <div className="d-flex align-items-center justify-content-center payment-modal-footer mt-4 ">
                <img src={paymentOption} alt="" />
            </div>
        </div>
    )
}