import React, { useState, useRef, useEffect } from "react";
import Week1 from "./Week1";
import Week2 from "./Week2";
import Week3 from "./Week3";
import Week4 from "./Week4";
import Week5 from "./Week5";
import "./selfawareness-feedback.css";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useQuery } from "@tanstack/react-query";
import userService from "../../../../../services/api/user";
import { useNavigate } from "react-router-dom";

const SelfAwarenessFeedback = () => {
  const week = 1;
  const courseId = "66853bf50118e2e0a02b6a5a";
  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ["dashboard/feedback/self-awareness", courseId, week],
    queryFn: () => userService.getMyActivites(courseId, week)
  });
    const navigate = useNavigate();

  const [assessmentData, setAssessmentData] = useState(null);
  const [assessmentLoading, setAssessmentLoading] = useState(true);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [weeksLoaded, setWeeksLoaded] = useState({
    week1: false,
    week2: false,
    week3: false,
    week4: false,
    week5: false
  });
  const contentRef = useRef();

  useEffect(() => {
    const fetchAssessmentData = async () => {
      setAssessmentLoading(true);
      try {
        const data = await userService.getMyAssessment(courseId, week);
        setAssessmentData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setAssessmentLoading(false);
      }
    };

    fetchAssessmentData();
  }, [courseId, week]);

  const toggleWeek = (weekNumber) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
  };

  const handleWeekLoad = (weekNumber) => {
    setWeeksLoaded((prev) => ({ ...prev, [`week${weekNumber}`]: true }));
  };

  const allWeeksLoaded = Object.values(weeksLoaded).every(Boolean);

  const generatePDF = () => {
    if (!allWeeksLoaded) {
      return;
    }

    const originalState = expandedWeek;
    setExpandedWeek("all");
    setTimeout(() => {
      const input = contentRef.current;

      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.8); // Compress image quality
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("SelfAwarenessFeedback.pdf");
        setExpandedWeek(originalState);
      });
    }, 1000);
  };

  const isDataLoaded = !queryLoading && !assessmentLoading && allWeeksLoaded;

  return (
    <div ref={contentRef} className="feedback-container">
      <p
        className="back-to-course-list"
        onClick={() => navigate("/dashboard/my-courses")}
      >
        <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
        Back to My Courses
      </p>
      {/* Week 1 */}
      <div className="week-title-container">
        <div className="week-title">
          <h2 onClick={() => toggleWeek(1)} style={{ fontSize: "24px" }}>
            Week 1:{" "}
            <span style={{ fontSize: "14px" }}>
              Introduction to Self-Awareness
            </span>
          </h2>
          <Icon
            icon={
              expandedWeek === 1 || expandedWeek === "all"
                ? "simple-line-icons:arrow-up"
                : "simple-line-icons:arrow-down"
            }
            onClick={() => toggleWeek(1)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {(expandedWeek === 1 || expandedWeek === "all") && (
          <Week1 onLoad={() => handleWeekLoad(1)} />
        )}
      </div>

      {/* Week 2 */}
      <div className="week-title-container">
        <div className="week-title">
          <h2 onClick={() => toggleWeek(2)} style={{ fontSize: "24px" }}>
            Week 2:{" "}
            <span style={{ fontSize: "14px" }}>
              Identifying Strengths and Weaknesses
            </span>
          </h2>
          <Icon
            icon={
              expandedWeek === 2 || expandedWeek === "all"
                ? "simple-line-icons:arrow-up"
                : "simple-line-icons:arrow-down"
            }
            onClick={() => toggleWeek(2)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {(expandedWeek === 2 || expandedWeek === "all") && (
          <Week2 onLoad={() => handleWeekLoad(2)} />
        )}
      </div>

      {/* Week 3 */}
      <div className="week-title-container">
        <div className="week-title">
          <h2 onClick={() => toggleWeek(3)} style={{ fontSize: "24px" }}>
            Week 3:{" "}
            <span style={{ fontSize: "14px" }}>Understanding Mindset</span>
          </h2>
          <Icon
            icon={
              expandedWeek === 3 || expandedWeek === "all"
                ? "simple-line-icons:arrow-up"
                : "simple-line-icons:arrow-down"
            }
            onClick={() => toggleWeek(3)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {(expandedWeek === 3 || expandedWeek === "all") && (
          <Week3 onLoad={() => handleWeekLoad(3)} />
        )}
      </div>

      {/* Week 4 */}
      <div className="week-title-container">
        <div className="week-title">
          <h2 onClick={() => toggleWeek(4)} style={{ fontSize: "24px" }}>
            Week 4: <span style={{ fontSize: "14px" }}>Identifying Values</span>
          </h2>
          <Icon
            icon={
              expandedWeek === 4 || expandedWeek === "all"
                ? "simple-line-icons:arrow-up"
                : "simple-line-icons:arrow-down"
            }
            onClick={() => toggleWeek(4)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {(expandedWeek === 4 || expandedWeek === "all") && (
          <Week4 onLoad={() => handleWeekLoad(4)} />
        )}
      </div>

      {/* Week 5 */}
      <div className="week-title-container">
        <div className="week-title">
          <h2 onClick={() => toggleWeek(5)} style={{ fontSize: "24px" }}>
            Week 5:{" "}
            <span style={{ fontSize: "14px" }}>
              Emotional Intelligence and Communication Skills
            </span>
          </h2>
          <Icon
            icon={
              expandedWeek === 5 || expandedWeek === "all"
                ? "simple-line-icons:arrow-up"
                : "simple-line-icons:arrow-down"
            }
            onClick={() => toggleWeek(5)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {(expandedWeek === 5 || expandedWeek === "all") && (
          <Week5 onLoad={() => handleWeekLoad(5)} />
        )}
      </div>

      {/* Final Report Section */}
      <div
        style={{ backgroundColor: "#5CE1E6" }}
        className="final-report-container"
      >
        <div className="final-report-title">
          <h2>
            Final Report:{" "}
            <span style={{ fontSize: "14px" }}>
              {" "}
              Summary of your journey through Self Awareness
            </span>
          </h2>

          <div>
            {/* Disable download if data is still loading */}
            <a
              download="SelfAwarenessSummary.pdf"
              className={`download-link ${!isDataLoaded ? "disabled" : ""}`}
              onClick={(e) => !isDataLoaded && e.preventDefault()}
            >
              (Download PDF)
            </a>
            <Icon
              onClick={isDataLoaded ? generatePDF : null}
              icon="bi:download"
              style={{ cursor: isDataLoaded ? "pointer" : "not-allowed" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAwarenessFeedback;
