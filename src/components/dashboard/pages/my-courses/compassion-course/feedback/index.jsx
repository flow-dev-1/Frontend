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
import { useNavigate, Link } from "react-router-dom";


function CompassionFeedback() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const currentWeek = activeIndex + 1;
  

  const weekContents = [
    { topic: "Introduction to Compassion", component: <Week1  /> },
    { topic: "Self-Compassion", component: <Week2 /> },
    { topic: "Compassion to Others", component: <Week3 /> },
    { topic: "Circle of Concern", component: <Week4 /> },
    { topic: "Life Scenarios - Let’s wear the shoes of others", component: <Week5 /> },
    { topic: "Summary of your journey through Compassion", component: <OverallFeedBack /> },
  ];

  const weeksTopic = weekContents.map(week => week.topic);
  const items = weekContents.map(week => ({
    title: week.topic,
    content: week.component,
  }));


  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/">
            <img
              src={logo}
              alt=""
              style={{
                width: "60%",
                cursor: "pointer",
              }}
            />
          </Link>
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
          />
        </section>
      </div>
    </>
  );
}

export default CompassionFeedback;

// week 4, all drag and drop
