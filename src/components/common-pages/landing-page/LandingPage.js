import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';


import boy from '../../../assets/hero-boy.png'
import girl from '../../../assets/hero-girl.png'

import './landingpage.css'



export default function LandingPage () {
  return (
    <div className="landing-page">

      <div className="hero-image">
        <img src={boy} alt="hero boy" />
      </div>

      <div className="landing-page-text">
        <h1>FLOW</h1>
        <p>Helping Children Become The</p>
        <p>Best Version of Themselves</p>
        <Link to="/signup"><Icon icon="carbon:play-outline" className='play-icon'/></Link>

      </div>



      <div className="hero-image">
        <img src={girl} alt="hero girl" />
      </div>

    </div>
  );
}

