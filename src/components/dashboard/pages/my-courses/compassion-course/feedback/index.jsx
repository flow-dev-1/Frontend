import React, { useState, useEffect, useRef } from "react";
import logo from "../../../../../../assets/logo.png";
import { Icon } from "@iconify/react";
import Accordion from "./components/Accordion";
import Week1 from "./weeks/week1/Week1";
import Week2 from "./weeks/week2/Week2";
import Week3 from "./weeks/week3/Week3";
import Week4 from "./weeks/week4/Week4";
import Week5 from "./weeks/week5/Week5";
import OverallFeedBack from "./weeks/overall/OverallFeedBack";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "./components/Modal";

function CompassionFeedback() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState("");
  const location = useLocation(); // Get location object
  const [enrollmentId, setEnrollmentId] = useState(null);

  // this might be bad practice but i dont have a choice
  // states to check a certain week data has been loaded
  const [isWeekOneLoaded, setWeekOneData] = useState(false);
  const [isWeekTwoLoaded, setWeekTwoData] = useState(false);
  const [isWeekThreeLoaded, setWeekThreeData] = useState(false);
  const [isWeekFourLoaded, setWeekFourData] = useState(false);
  const [isWeekFiveLoaded, setWeekFiveData] = useState(false);

  //check if evrything has been loaded
  const [allDataLoaded, _] = useState(
    () =>
      isWeekOneLoaded &&
      isWeekTwoLoaded &&
      isWeekThreeLoaded &&
      isWeekFourLoaded &&
      isWeekFiveLoaded
  );

  const currentWeek = activeIndex + 1;

  // Access data from location.state
  const enrolmentData = location.state?.enrollmentData; // Assuming enrollData is passed in state

  useEffect(() => {
    //toDo: Only Enrolled Users or Admin can access this course

    if (!enrolmentData) return;
    console.log(enrolmentData, "Enrollment Data");
    setEnrollmentId(enrolmentData._id);
  }, []);

  const weekContents = [
    {
      topic: "Introduction to Compassion",
      component: (
        <Week1
          enrollmentId={enrollmentId}
          setShowModal={setShowModal}
          setWeekOneData={setWeekOneData}
        />
      ),
    },
    {
      topic: "Self-Compassion",
      component: (
        <Week2
          enrollmentId={enrollmentId}
          setShowModal={setShowModal}
          setWeekTwoData={setWeekTwoData}
        />
      ),
    },
    {
      topic: "Compassion to Others",
      component: (
        <Week3
          enrollmentId={enrollmentId}
          setShowModal={setShowModal}
          setWeekThreeData={setWeekThreeData}
        />
      ),
    },
    {
      topic: "Circle of Concern",
      component: (
        <Week4
          enrollmentId={enrollmentId}
          setShowModal={setShowModal}
          setWeekFourData={setWeekFourData}
        />
      ),
    },
    {
      topic: "Life Scenarios - Let’s wear the shoes of others",
      component: (
        <Week5
          enrollmentId={enrollmentId}
          setShowModal={setShowModal}
          setWeekFiveData={setWeekFiveData}
        />
      ),
    },
    {
      topic: "Summary of your journey through Compassion",
      component: <OverallFeedBack
        enrollmentId={enrollmentId}
      //todo: pass a percentile prop which will be responsible for the detecting the correct messsage to display on the overall page
      />,
    },
  ];

  const weeksTopic = weekContents.map((week) => week.topic);
  const items = weekContents.map((week) => ({
    title: week.topic,
    content: week.component,
  }));

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/dashboard" className="navbar-logo">
            <img src={logo} alt="" />
          </Link>
          <div
            className="navbar-logo"
            onClick={""}
            style={{ cursor: "pointer" }}
          >
            Logout
          </div>
        </div>
      </nav>
      <div className="main-content">
        <aside>
          <Link
            className="back"
            style={{ cursor: "pointer" }}
            to={"/dashboard/my-courses"}
          >
            <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
            Back to My Courses
          </Link>

          <div className="compassion-title">
            <h2> Seeing, Caring and Doing: </h2>
            <h2 className="compassion">Compassion</h2>
          </div>

          <ul className="compassion-list">
            {weeksTopic.map((item, index) => (
              <li
                key={index}
                className={index + 1 <= currentWeek ? "active-week" : ""}
              >
                <div className="icon">
                  <Icon
                    icon="icon-park-outline:check-one"
                    className="course-list-icon"
                  />
                </div>
                <span>
                  Week
                  {index + 1}
                </span>
                <span>{item} </span>
              </li>
            ))}
          </ul>
        </aside>
        <section className="week-content position-relative mb-5 ">
          <Accordion
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            items={items}
            allDataLoaded={allDataLoaded}
          />
        </section>
      </div>
      <Modal isOpen={showModal} setIsOpen={setShowModal} />
    </>
  );
}

export default CompassionFeedback;

// week 4, all drag and drop
