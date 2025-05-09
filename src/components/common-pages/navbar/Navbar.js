// src/components/common/Navbar.js

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import logo from "../../../assets/logo.png";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="" />
        </Link>

        <Icon icon="mdi:menu" className="d-block d-lg-none" width={30} />
        
        <ul className="navbar-nav d-none d-lg-flex">
          <li className="nav-item">
            <Link to="" className="nav-link">
              Schools
            </Link>
          </li>
          <li className="nav-item">
            <Link to="" className="nav-link">
              Individuals
            </Link>
          </li>
          <li className="nav-item">
            <Link to="" className="nav-link">
              Resources
            </Link>
          </li>
          <li className="nav-item">
            <Link to="" className="nav-link">
              Contact Us
            </Link>
          </li>
          <li className="nav-item ">
            <button
              className="btn navbar-btn light-btn"
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Sign In
            </button>
          </li>
          <li className="nav-item ">
            <button
              className="btn navbar-btn dark-btn"
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
