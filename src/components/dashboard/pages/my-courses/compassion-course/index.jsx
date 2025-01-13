import logo from "../../../../../assets/logo.png";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  selectCurrentWeek,
  selectShowReview,
  selectShowHurray,
  selectCurrentPage,
  setCurrentWeek,
  setCurrentPage,
  setCurrentStep,
} from "../../../../../redux/reducers/navigationSlice.js";
import "./index.css";

// Import components
import PopUp from "./components/ReviewPopUp";
import Hurray from "./components/Hurray";

import Page1 from "./weeks/week1/page1/Page1";
import Page2 from "./weeks/week1/page2/Page2";
import Page3 from "./weeks/week1/page3/Page3";
import Page4 from "./weeks/week1/page4/Page4";
import Page5 from "./weeks/week1/page5/Page5";
import Page6 from "./weeks/week1/page6/Page6";
import Page7 from "./weeks/week1/page7/Page7";
import Page8 from "./weeks/week1/page8/Page8";
import WeekTwoPage1 from "./weeks/week2/page1/Page1";
import WeekTwoPage2 from "./weeks/week2/page2/Page2";
import WeekTwoPage3 from "./weeks/week2/page3/Page3";
import WeekTwoPage4 from "./weeks/week2/page4/page4";
import WeekTwoPage5 from "./weeks/week2/page5/Page5";
import WeekTwoPage6 from "./weeks/week2/page6/Page6";
import WeekTwoPage7 from "./weeks/week2/page7/Page7";
import WeekTwoPage8 from "./weeks/week2/page8/Page8";
import WeekThreePage1 from "./weeks/week3/page1/Page1";
import WeekThreePage2 from "./weeks/week3/page2/Page2";
import WeekThreePage3 from "./weeks/week3/page3/Page3";
import WeekThreePage4 from "./weeks/week3/page4/Page4";
import WeekThreePage5 from "./weeks/week3/page5/Page5";
import WeekThreePage6 from "./weeks/week3/page6/Page6";
import WeekThreePage7 from "./weeks/week3/page7/Page7";
import WeekThreePage8 from "./weeks/week3/page8/Page8";
import WeekThreePage9 from "./weeks/week3/page9/Page9";
import WeekThreePage10 from "./weeks/week3/page10/Page10";
import WeekThreePage11 from "./weeks/week3/page11/Page11";
import WeekThreePage12 from "./weeks/week3/page12/Page12";
import WeekFourPage1 from "./weeks/week4/page1/Page1";
import WeekFourPage2 from "./weeks/week4/page2/Page2";
import WeekFourPage3 from "./weeks/week4/page3/Page3";
import WeekFourPage4 from "./weeks/week4/page4/Page4";
import WeekFourPage5 from "./weeks/week4/page5/Page5";
import WeekFourPage6 from "./weeks/week4/page6/Page6.jsx";
import WeekFourPage7 from "./weeks/week4/page7/Page7.jsx";
import WeekFourPage8 from "./weeks/week4/page8/Page8.jsx";
import WeekFivePage1 from "./weeks/week5/page1/Page1.jsx";
import WeekFivePage2 from "./weeks/week5/page2/Page2.jsx";
import WeekFivePage3 from "./weeks/week5/page3/Page3.jsx";
import WeekFivePage4 from "./weeks/week5/page4/Page4.jsx";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import userService from "../../../../../services/api/user.js";
import {
  updateData,
  userAnswer,
} from "../../../../../redux/reducers/userAnswersReducer.js";

const WeekContent = () => {
  const dispatch = useDispatch();
  const userAnswers = useSelector(userAnswer);
  const location = useLocation(); // Get location object
  const [enrollmentId, setEnrollmentId] = useState(null);

  // Access data from location.state
  const enrolmentData = location.state?.enrollmentData; // Assuming enrollData is passed in state

  useEffect(() => {
    //toDo: Only Enrolled Users or Admin can access this course
    if (!enrolmentData) return;
    setEnrollmentId(enrolmentData._id);
  }, []);

  useEffect(() => {
    const currentWeek = sessionStorage.getItem("flow-currentWeek")
      ? Number(sessionStorage.getItem("flow-currentWeek"))
      : 1;
    const currentPage = sessionStorage.getItem("flow-currentPage")
      ? Number(sessionStorage.getItem("flow-currentPage"))
      : 1;
    const currentStep = sessionStorage.getItem("flow-currentStep")
      ? Number(sessionStorage.getItem("flow-currentStep"))
      : 1;

    // Dispatch the current week, page, and step
    dispatch(setCurrentWeek(currentWeek));
    dispatch(setCurrentPage(currentPage));
    dispatch(setCurrentStep(currentStep));

    return () => {};
  }, [dispatch]); // Added dispatch to dependency array

  const currentWeek = useSelector(selectCurrentWeek);
  const currentPage = useSelector(selectCurrentPage);
  const showReview = useSelector(selectShowReview);
  const showHurray = useSelector(selectShowHurray);

  // toDo: Fetch User assessment and Activity Data
  const { data, isLoading, status, isError } = useQuery({
    queryKey: ["dashboard/compassion-course", enrollmentId, currentWeek],
    queryFn: () => userService.getUserCourseData(enrollmentId, currentWeek),
    enabled: !!enrollmentId && !!currentWeek,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });


  useEffect(() => {
    if (!data) return;

    if (data.assessment && data.activity) {
      dispatch(
        updateData({
          courseEnrollmentId: enrollmentId,
          week: currentWeek,
          activities: data.activity?.activities,
          assessments: data.assessment?.assessments,
        })
      );
    } else {
      dispatch(
        updateData({
          courseEnrollmentId:userAnswers.courseEnrollmentId,
          week: currentWeek,
          activities: userAnswers.activities,
          assessments: userAnswers.assessments,
        })
      );
    }

    return () => {};
  }, [data]);

  // If showing hurray, render that instead
  if (showHurray) {
    return <Hurray currentWeek={currentWeek} />;
  }

  // Determine which component to render based on week and page
  const getComponent = () => {
    switch (currentWeek) {
      case 1:
        switch (currentPage) {
          case 1:
            return <Page1 />;
          case 2:
            return <Page2 />;
          case 3:
            return <Page3 />;
          case 4:
            return <Page4 />;
          case 5:
            return <Page5 />;
          case 6:
            return <Page6 />;
          case 7:
            return <Page7 />;
          case 8:
            return <Page8 />;
          default:
            return null;
        }
      case 2:
        switch (currentPage) {
          case 1:
            return <WeekTwoPage1 />;
          case 2:
            return <WeekTwoPage2 />;
          case 3:
            return <WeekTwoPage3 />;
          case 4:
            return <WeekTwoPage4 />;
          case 5:
            return <WeekTwoPage5 />;
          case 6:
            return <WeekTwoPage6 />;
          case 7:
            return <WeekTwoPage7 />;
          case 8:
            return <WeekTwoPage8 />;
          default:
            return null;
        }
      case 3:
        switch (currentPage) {
          case 1:
            return <WeekThreePage1 />;
          case 2:
            return <WeekThreePage2 />;
          case 3:
            return <WeekThreePage3 />;
          case 4:
            return <WeekThreePage4 />;
          case 5:
            return <WeekThreePage5 />;
          case 6:
            return <WeekThreePage6 />;
          case 7:
            return <WeekThreePage7 />;
          case 8:
            return <WeekThreePage8 />;
          case 9:
            return <WeekThreePage9 />;
          case 10:
            return <WeekThreePage10 />;
          case 11:
            return <WeekThreePage11 />;
          case 12:
            return <WeekThreePage12 />;
          default:
            return null;
        }
      case 4:
        switch (currentPage) {
          case 1:
            return <WeekFourPage1 />;
          case 2:
            return <WeekFourPage2 />;
          case 3:
            return <WeekFourPage3 />;
          case 4:
            return <WeekFourPage4 />;
          case 5:
            return <WeekFourPage5 />;
          case 6:
            return <WeekFourPage6 />;
          case 7:
            return <WeekFourPage7 />;
          case 8:
            return <WeekFourPage8 />;
          default:
            return null;
        }
      case 5:
        switch (currentPage) {
          case 1:
            return <WeekFivePage1 />;
          case 2:
            return <WeekFivePage2 />;
          case 3:
            return <WeekFivePage3 />;
          case 4:
            return <WeekFivePage4 />;
          default:
            return null;
        }
      default:
        return null;
    }
  };

  return (
    <>
      {getComponent()}
      {showReview && <PopUp />}
    </>
  );
};

const CourseContent = () => {
  const navigate = useNavigate();
  const currentWeek = useSelector(selectCurrentWeek);

  const weeksTopic = [
    "Introduction to Compassion",
    "Self-Compassion",
    "Compassion to Others",
    "Circle of concern",
    `Life Scenarios - Let's wear the shoes of Others`,
  ];

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/dashboard" className="navbar-logo">
            <img src={logo} alt="" />
          </Link>
          <div
            className="navbar-logo"
            onClick={()=>{}}
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
        <section className="week-content position-relative">
          <WeekContent />
        </section>
      </div>
    </>
  );
};

const CompassionCourse = () => {
  return <CourseContent />;
};

export default CompassionCourse;

// data
// activity |  assestment
