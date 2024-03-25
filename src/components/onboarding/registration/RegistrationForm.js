import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';


import '../onboarding.css';
import OtpModal from '../../modals-pages/onboarding-modals/OTP';






export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);




  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Validate password format
    setShowPasswordError(
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(newPassword)
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   guardianEmail: '',
  //   gender: '',
  //   age: '',
  //   phoneNumber: '',
  //   country: '',
  //   state: '',
  //   password: ''
  // });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal()
  };



  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }



  return (
    <div>
      <div className="registration-page">
        <div className="top-section">
          <h2>Register as an Individual</h2>
          <hr />
          <span>*Indicates Required</span>

        </div>

        <form className=''>
          <div className="form-section ">
            <div className="form-group">
              <label>First Name *</label>
              <input type="text" placeholder="Type here..." />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input type="text" placeholder="Type here..." />
            </div>
            <div className="form-group">
              <label>Guardian Email *</label>
              <input type="email" placeholder="Type here..." required autoComplete="off" />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <select>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Child's Age *</label>
                <input type="date" placeholder="Date of Birth" />
            
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" placeholder="Kindly include country code..." />
            </div>
            <div className="form-group">
              <label>Country *</label>
              <select>
                <option value="">Select Country</option>

              </select>
            </div>
            <div className="form-group">
              <label>State *</label>
              <select>
                <option value="">Select State</option>

              </select>
            </div>
            <div className="form-group">
              <label>Create Password *</label>
              <div className="d-flex align-items-center input-with-icon">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Type here..."
                  value={password}
                  onChange={handlePasswordChange}
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
                  Create a strong password with at least 8 characters, including
                  numbers, symbols, and both uppercase and lowercase letters.
                </p>
              )}
            </div>
          </div>


        </form>
        <hr className='my-0' />
        <div className="bottom-section">

          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
          <button className='btn submit-btn' type="submit" onClick={handleSubmit}>Submit</button>
        </div>

      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom-modal"
        overlayClassName="custom-overlay"
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
      // closeTimeoutMS={2000}
      >
        <OtpModal />
      </Modal>

    </div>

  );
};


