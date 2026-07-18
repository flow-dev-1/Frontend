import React, { useState, useEffect } from "react";
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

function CompassionFeedback({ isSchool: isSchoolProp, studentId }) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState("");
  const location = useLocation(); // Get location object
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [isSchool, setIsSchool] = useState(isSchoolProp || false);

  // This is used to trigger the report download.
  const [hasPercentile, setHasPercentile] = useState(false);
  const isAdmin = useSelector(adminData);

  const { user } = useSelector((state) => state?.user);

  useEffect(() => {
    if (user?.isSchool) {
      setIsSchool(true);
    }
  }, [user]);

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

    if (!isSchool && !enrolmentData && !isAdmin?.isAdmin) return navigate("/sign-in");

    if (isAdmin?.isAdmin) {
      const courseEnrollmentId = sessionStorage.getItem(
        "flow-courseEnrollmentId"
      );
      if (!courseEnrollmentId) return;
      setEnrollmentId(courseEnrollmentId);
    } else if (isSchool) {
      if (enrolmentData?._id) {
        setEnrollmentId(enrolmentData._id);
      }
    } else {
      setEnrollmentId(enrolmentData?._id);
    }
  }, [isAdmin, enrolmentData, isSchool, navigate]);

  const weekContents = [
    {
      topic: "Introduction to Compassion",
      component: (
        <Week1 enrollmentId={enrollmentId} setWeekOneData={setWeekOneData} isSchool={isSchool} studentId={studentId} />
      ),
    },
    {
      topic: "Self-Compassion",
      component: (
        <Week2 enrollmentId={enrollmentId} setWeekTwoData={setWeekTwoData} isSchool={isSchool} studentId={studentId} />
      ),
    },
    {
      topic: "Compassion to Others",
      component: (
        <Week3
          enrollmentId={enrollmentId}
          setWeekThreeData={setWeekThreeData}
          isSchool={isSchool} studentId={studentId}
        />
      ),
    },
    {
      topic: "Circle of Concern",
      component: (
        <Week4 enrollmentId={enrollmentId} setWeekFourData={setWeekFourData} isSchool={isSchool} studentId={studentId} />
      ),
    },
    {
      topic: "Life Scenarios - Let’s wear the shoes of others",
      component: (
        <Week5 enrollmentId={enrollmentId} setWeekFiveData={setWeekFiveData} isSchool={isSchool} studentId={studentId} />
      ),
    },
    {
      topic: "Summary of your journey through Compassion",
      component: (
        <OverallFeedBack
          enrollmentId={enrollmentId}
          setHasPercentile={setHasPercentile}
        //todo: pass a percentile prop which will be responsible for the detecting the correct messsage to display on the overall page
        />
      ),
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
          <button
            disabled={isAdmin?.isAdmin}
            onClick={() =>
              isSchool ? navigate("/school-dashboard") : navigate("/dashboard")
            }
            className="navbar-logo"
            style={{ border: "none", background: "#FFF" }} // Remove button outline
          >
            <img src={logo} alt="" />
          </button>
          <div
            className="navbar-logo"
            onClick={() => { }}
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
            onClick={() =>
              isSchool
                ? navigate(-1)
                : navigate("/dashboard/my-courses")
            }
            className="back"
            style={{ cursor: "pointer", border: "none", background: "#f8f5f5" }}
          >
            <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
            {isSchool ? "Go back" : "Back to My Courses"}
          </button>
          <div className="compassion-title">
            <h2> Seeing, Caring and Doing: </h2>
            <h2 className="compassion">Compassion</h2>
          </div>

          <ul className="compassion-list">
            {weeksTopic.map((item, index) => (
              <li
                key={index}
                className={
                  index + 1 <= currentWeek
                    ? "active-week"
                    : index === 5
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
                <span className={index === 5 ? "d-none" : ""}>
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
            to={isSchool ? -1 : "/dashboard/my-courses"}
            className="back text-black mb-5 p-3 d-lg-none"
            style={{ cursor: "pointer", border: "none" }}
          >
            <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
            {isSchool ? "Go back" : "Back to My Courses"}
          </Link>
          <Accordion
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            items={items}
            hasPercentile={hasPercentile}
            allDataLoaded={allDataLoaded}
            setHasPercentile={setHasPercentile}
            enrollmentId={enrollmentId}
            isSchool={isSchool}
            studentId={studentId}
          />
        </section>
      </div>
    </>
  );
}

export default CompassionFeedback;
