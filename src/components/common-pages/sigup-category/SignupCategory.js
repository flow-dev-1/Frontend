import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import './category.css'
import individualImage from '../../../assets/onboarding-individual.png'
import schoolImage from '../../../assets/onboarding-school.png'






export default function SignupCategory() {


  const navigate = useNavigate();


  return (
    <div className="signup-category ">
      {/* <div > */}

      <div>
        <Link to="/" className="back-button">
          <Icon icon="fa6-solid:arrow-left" className='back-icon' />
          <h2>Back to Home</h2>
        </Link>
      </div>


      <div className="signup-options">
        <div className="signup-option">
          <img src={schoolImage} alt="School" className="card-image" />
          <div className="card-content">
            <h2> For Schools</h2>
            <button className="btn signup-button" onClick={() => { navigate("/dashboard"); }}>Coming Soon</button>
          </div>
        </div>

        <div className="signup-option">
          <img src={individualImage} alt="School" className="card-image" />
          <div className="card-content">
            <h2> For Individuals</h2>
            <button className="btn signup-button" onClick={() => { navigate("/signup/registration"); }}>Register Now</button>
          </div>
        </div>

      </div>
      {/* </div> */}
    </div>
  );
}


