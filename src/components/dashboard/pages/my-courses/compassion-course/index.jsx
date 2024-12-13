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
import PopUp from "./components/ReviewPopUp.jsx";
import FireWorks from "./components/FireWork.jsx";
import Hurray from "./components/Hurray.jsx";
const CompassionCourse = () => {
  const weeksTopic = [
    "Introduction to Compassion",
    "Self-Compassion",
    "Compassion to Others",
    "Circle of concern",
    `Life Scenarios - Let's wear the shoes of Others`,
  ];

  const weekNumber = 5; // we wil get it from params
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
            <li
              key={index}
              className={weekNumber >= index + 1 ? "active-week" : ""}
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
      <section className="week-content position-relative w-1029px">
        {/* <Hurray /> */}
        <Page1 />
      </section>
    </>
  );
};

export default CompassionCourse;

// data
// activity |  assestment
