import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userService from '../../../services/api/users';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/reducers/jwtReducer";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const schema = yup.object().shape({
    email: yup.string().required('Your Full Name is Required!'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters')
      .required('Password is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    // Call the mutate function to trigger the login mutation
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: userService.login, // Assuming userService.register is your API call function
    onSuccess: (data) => {
      console.log('Login successful:', data);
      toast.success(data.message);
      dispatch(setToken(data?.token));
      navigate("", { replace: true })

    },
    onError: (error) => {
      console.error('Registration error:', error);
      toast.dismiss()
      toast.error(error?.message);
      toast.error(error || 'Registration failed');
    },
  });

  return (
    <div>
      <div className="sign-in registration-page">
        <h2 className='text-center'>Sign In</h2>
        <p className='text-center'>Enter your details to explore our offerings.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-section d-flex flex-column align-items-center ">
            <div className="form-group">
              <label>Email *</label>
              <input type="email" {...register('email', { required: true })} />
              {errors.email && <p className="error-message">Email is required</p>}
            </div>
            <div className="form-group">
              <label>Password *</label>
              <div className="d-flex align-items-center input-with-icon">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Type here..."
                  {...register('password', { required: true })}
                />
                <div
                  className="password-toggle float-right"
                  onClick={togglePasswordVisibility}
                >
                  <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} className='eye-icon' />
                </div>
              </div>
              {errors.password && <p className="error-message">Password is required</p>}
              {showPasswordError && <p className="error-message">Incorrect email or password</p>}
            </div>
            <button className='btn submit-btn' type="submit" disabled={mutation.isPending}>
              {
                mutation.isPending ? <RotatingLines type='Oval' style={{ color: '#FFF' }} height={20} width={20} /> :
                  "Sign In"
              }
            </button>
          </div>
        </form>
        <p className='text-center'>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
