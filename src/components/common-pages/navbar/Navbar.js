// src/components/common/Navbar.js

import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import logo from '../../../assets/logo.png'
import './navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className='navbar'>
      <div className='container'>
        <Link to='/' className='navbar-logo'>
          <img src={logo} alt='' />
        </Link>

        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link to='' className='nav-link'>
              Schools
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='' className='nav-link'>
              Individuals
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='' className='nav-link'>
              Resources
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='' className='nav-link'>
              Contact Us
            </Link>
          </li>
          <li className='nav-item '>
            <button
              className='btn navbar-btn light-btn'
              onClick={() => {
                navigate('/sign-in')
              }}
            >
              Sign In
            </button>
          </li>
          <li className='nav-item '>
            <button
              className='btn navbar-btn dark-btn'
              onClick={() => {
                navigate('/sign-up')
              }}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
