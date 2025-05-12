import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import "./category.css";
import individualImage from "../../../assets/onboarding-individual.jpg";
import schoolImage from "../../../assets/onboarding-school.jpg";

export default function SignupCategory() {
  const navigate = useNavigate();

  return (
    <div className="signup-categories">
      <div className="back-btn text-blue d-none d-md-block">
        <Link to="/">
          <Icon icon="fa6-solid:arrow-left" className="back-icon" width={30} />
        </Link>
        <h2 className="text-blue">Back</h2>
      </div>

      <div className="back-btn text-blue d-md-none">
        <Link to="/">
          <Icon icon="mdi:less-than" className="back-icon" width={25} />
        </Link>
      </div>
      {/* <div > */}

      <div className="signup-options flex-column flex-lg-row gap-5 gap-lg-3">
        <div className="signup-option">
          <img src={schoolImage} alt="School" className="card-image" />
          <div className="card-content">
            <h2> For Schools</h2>
            <Link to={"/school/sign-up/registration"}>
              <button
                className="btn signup-button"
                onClick={() => {
                  navigate("/school/sign-up/registration");
                }}
              >
                Register Now
              </button>
            </Link>
          </div>
        </div>

        <div className="signup-option">
          <img src={individualImage} alt="School" className="card-image" />
          <div className="card-content">
            <h2> For Individuals</h2>
            <Link to={"/individual/sign-up"}>
              <button className="btn signup-button">Register Now</button>
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
