
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function SignIn() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const examplePassword = '1234';


  const handleSignIn = (e) => {
    // const newPassword = e.target.value;
    // setShowPasswordError(false);

    // if (newPassword === examplePassword) {
    //   console.log('Sign up successful');
    //   navigate('/dashboard');
    // } else {
    //   setShowPasswordError(true);
    //   console.log('Password Incorrect!');
    // }

    navigate('/dashboard');


  };


  return (
    <div>
      <div className="sign-in registration-page">
        <h2 className='text-center'>Sign In</h2>
        <p className='text-center'>Enter your details to explore our offerings.</p>

        <form className=''>
          <div className="form-section d-flex flex-column align-items-center ">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group my-3">
              <div className="d-flex align-items-center justify-content-between">
                <label>Create Password *</label>
                <Link to="/forgot-password" className='forgot-password'>Forgot Password?</Link>
              </div>

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
              {showPasswordError && (
                <p className="password-error">
                  Incorrect email or password
                </p>
              )}
            </div>

            <div className='d-flex align-items-center mb-2 me-auto rember-me'>
              <input type="checkbox" name="" id="" className='mx-2' />
              Remember Me
            </div>

            <button className='btn submit-btn' onClick={handleSignIn}>Sign In</button>

          </div>
        </form>

        <p className='text-center'>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

    </div>
  );
}

