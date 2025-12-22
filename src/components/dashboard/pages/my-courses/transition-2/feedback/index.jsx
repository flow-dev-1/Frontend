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
import { adminData } from "../../../../../../redux/reducers/adminReducer";
import { useSelector } from "react-redux";
import VisionBoard from "./VisionBoard";

function Transition2Feedback() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState("");
  const location = useLocation(); // Get location object
  const [enrollmentId, setEnrollmentId] = useState(null);

  // This is used to trigger the report download.
  const [hasPercentile, setHasPercentile] = useState(false);
  const isAdmin = useSelector(adminData);

  // states to check a certain week data has been loaded
  // This is for the final report generation
  const [isWeekOneLoaded, setWeekOneData] = useState(false);
  const [isWeekTwoLoaded, setWeekTwoData] = useState(false);
  const [isWeekThreeLoaded, setWeekThreeData] = useState(false);
  const [isWeekFourLoaded, setWeekFourData] = useState(false);
  const [isWeekFiveLoaded, setWeekFiveData] = useState(false);

  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    setAllDataLoaded(
      isWeekOneLoaded &&
        isWeekTwoLoaded &&
        isWeekThreeLoaded &&
        isWeekFourLoaded &&
        isWeekFiveLoaded
    );
  }, [
    isWeekOneLoaded,
    isWeekTwoLoaded,
    isWeekThreeLoaded,
    isWeekFourLoaded,
    isWeekFiveLoaded,
  ]);

  const currentWeek = activeIndex + 1;

  // Access data from location.state
  const enrolmentData = location.state?.enrollmentData; // Assuming enrollData is passed in state

  useEffect(() => {
    //toDo: Only Enrolled Users or Admin can access this course

    // if (!enrolmentData && !isAdmin?.isAdmin) return navigate("/sign-in");

    if (isAdmin?.isAdmin) {
      const courseEnrollmentId = sessionStorage.getItem(
        "flow-courseEnrollmentId"
      );
      if (!courseEnrollmentId) return;
      setEnrollmentId(courseEnrollmentId);
    } else {
      setEnrollmentId(enrolmentData?._id);
    }
  }, []);

  const weekContents = [
    {
      topic: "Defining Your Next Chapter",
      component: (
        <Week1 enrollmentId={enrollmentId} setWeekOneData={setWeekOneData} />
      ),
    },
    {
      topic: "Mindset and Values",
      component: (
        <Week2 enrollmentId={enrollmentId} setWeekTwoData={setWeekTwoData} />
      ),
    },
    {
      topic: "Social and Financial Intelligence",
      component: (
        <Week3
          enrollmentId={enrollmentId}
          setWeekThreeData={setWeekThreeData}
        />
      ),
    },
    {
      topic: "Freedom and Responsibilitys",
      component: (
        <Week4 enrollmentId={enrollmentId} setWeekFourData={setWeekFourData} />
      ),
    },
    {
      topic: "Goal Setting and Resilience",
      component: (
        <Week5 enrollmentId={enrollmentId} setWeekFiveData={setWeekFiveData} />
      ),
    },
    {
      topic: "My Next Chapter",
      component: "",
    },
    {
      topic: "Summary of your journey through Transition 2",
      component: (
        <OverallFeedBack
          enrollmentId={enrollmentId}
          setHasPercentile={setHasPercentile}
          //todo: pass a percentile prop which will be responsible for the detecting the correct messsage to display on the overall page
        />
      ),
    },
  ];

  const weeksTopic = weekContents.slice(0, 5).map((week) => week.topic);
  const items = weekContents.map((week) => ({
    title: week.topic,
    content: week.component,
  }));

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <button
            disabled={isAdmin?.isAdmin}
            onClick={() => navigate("/dashboard")}
            className="navbar-logo"
            style={{ border: "none", background: "#FFF" }}
          >
            <img src={logo} alt="" />
          </button>
          <div
            className="navbar-logo"
            onClick={() => {}}
            style={{ cursor: "pointer" }}
          >
            Logout
          </div>
        </div>
      </nav>
      <div className="main-content">
        <aside className="d-none d-lg-block">
          <button
            disabled={isAdmin?.isAdmin}
            onClick={() => navigate("/dashboard/my-courses")}
            className="back"
            style={{ cursor: "pointer", border: "none", background: "#f8f5f5" }}
          >
            <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
            Back to My Courses
          </button>
          <div className="compassion-title">
            <h2 className="fs-5 fs-md-3 tot-nav-text">SEL for Educators:</h2>
            <h2 className="compassion fs-5 tot-nav-text">ToT Course 1</h2>
          </div>

          <ul className="compassion-list">
            {weeksTopic.map((item, index) => (
              <li
                key={index}
                className={
                  index + 1 <= currentWeek
                    ? "active-week"
                    : index >= 6
                    ? "d-none"
                    : ""
                }
              >
                <div className="icon">
                  <Icon
                    icon="icon-park-outline:check-one"
                    className="course-list-icon"
                  />
                </div>
                <span className={index >= 5 ? "d-none" : ""}>
                  Week
                  {index + 1}
                </span>
                <span>{item} </span>
              </li>
            ))}
          </ul>
        </aside>
        <section className="week-content position-relative mb-5 ">
          <Link
            disabled={isAdmin}
            to={"/dashboard/my-courses"}
            className="back text-black mb-5 p-3 d-lg-none"
            style={{ cursor: "pointer", border: "none" }}
          >
            <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
            Back to My Courses
          </Link>
          <Accordion
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            items={items}
            hasPercentile={hasPercentile}
            allDataLoaded={allDataLoaded}
            setHasPercentile={setHasPercentile}
            enrollmentId={enrollmentId}
          />

          {/* <VisionBoard /> */}
        </section>
      </div>
    </>
  );
}

export default Transition2Feedback;

// week 4, all drag and drop
