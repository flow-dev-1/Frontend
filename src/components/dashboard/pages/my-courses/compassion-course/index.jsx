import logo from "../../../../../assets/logo.png";
import { Icon } from "@iconify/react";

import "./index.css";
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
        <h1>WEEK CONTENT</h1>
      </section>
    </>
  );
};

export default CompassionCourse;
