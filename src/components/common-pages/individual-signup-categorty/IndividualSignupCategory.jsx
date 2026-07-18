import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import "./category.css";
import student from "../../../assets/student.png";
import educator from "../../../assets/educator.png";

export default function IndividualSignupCategory() {
  const navigate = useNavigate();

  return (
    <div className="signup-category ">
      {/* <div > */}

      <div className="back-btn">
        <Link to="/">
          <Icon icon="fa6-solid:arrow-left" className="back-icon" width={30} />
        </Link>
        <h2>Back to Home</h2>
      </div>

      <div className="signup-options flex-column flex-lg-row gap-5 gap-lg-3">
        <div className="signup-option">
          <img src={educator} alt="School" className="card-image" />
          <div className="card-content">
            <h2> For Educators</h2>
            <button
              className="btn signup-button"
              onClick={() => {
                navigate("/school/sign-up/educator-registration");
              }}
            >
              Register Now
            </button>
          </div>
        </div>

        <div className="signup-option">
          <img src={student} alt="School" className="card-image" />
          <div className="card-content">
            <h2> For Students</h2>
            <button
              className="btn signup-button"
              onClick={() => {
                navigate("/individual/sign-up/student-registration");
              }}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
