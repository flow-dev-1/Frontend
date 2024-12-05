import logo from "../../../../../assets/logo.png";
import { Icon } from "@iconify/react";

import "./index.css";
import Page1 from "./weeks/week1/page1/Page1";
import Page2 from "./weeks/week1/page2/Page2";
import Page3 from "./weeks/week1/page3/Page3";
import Page4 from "./weeks/week1/page4/Page4";
import Page5 from "./weeks/week1/page5/Page5";
import Page6 from "./weeks/week1/page6/Page6";
import Page7 from "./weeks/week1/page7/Page7";
import Page8 from "./weeks/week1/page8/Page8";
const CompassionCourse = () => {
  const weeksTopic = [
    "Introduction to Compassion",
    "Self-Compassion",
    "Compassion to Others",
    "Circle of concern",
    `Life Scenarios - Let's wear the shoes of Others`,
  ];
  return (
    <>
      <header className="compassion-header">
        <img src={logo} alt="flow" />
      </header>
      <aside>
        <p className="back">
          <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
          Back to My Courses
        </p>

        <div className="compassion-title">
          <h2> Seeing, Caring and Doing: </h2>
          <h2 className="compassion">Compassion</h2>
        </div>

        <ul className="compassion-list">
          {weeksTopic.map((item, index) => (
            <li key={index} className={index === 0 ? "active-week" : ""}>
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
      <section className="week-content">
        <Page6 />
      </section>
    </>
  );
};

export default CompassionCourse;
