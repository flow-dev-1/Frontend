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

const SelfAwarenessFeedback = () => {
  const weeks = [1, 2, 3, 4, 5]; // List of weeks
  const courseId = "66853bf50118e2e0a02b6a5a";

  const [assessmentData, setAssessmentData] = useState({});
  const [assessmentLoading, setAssessmentLoading] = useState(true);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const contentRef = useRef();

  // Fetch data for all weeks
  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ["dashboard/feedback/self-awareness", courseId],
    queryFn: () => Promise.all(weeks.map((week) => userService.getMyActivites(courseId, week))),
  });

  useEffect(() => {
    const fetchAssessmentData = async () => {
      setAssessmentLoading(true);
      try {
        // Fetch assessment data for each week
        const assessmentResults = await Promise.all(
          weeks.map(async (week) => {
            const data = await userService.getMyAssessment(courseId, week);
            return { week, data };
          })
        );

        // Organize the assessment data by week
        const assessmentByWeek = {};
        assessmentResults.forEach(({ week, data }) => {
          assessmentByWeek[week] = data;
        });

        setAssessmentData(assessmentByWeek);
      } catch (error) {
        console.error(error);
      } finally {
        setAssessmentLoading(false);
      }
    };

    fetchAssessmentData();
  }, [courseId]);

  const toggleWeek = (weekNumber) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
  };

  // Function to temporarily expand all weeks, generate the PDF, then restore the original state
  const generatePDF = () => {
    const originalState = expandedWeek;
    setExpandedWeek("all");
    setTimeout(() => {
      const input = contentRef.current;

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("SelfAwarenessFeedback.pdf");
        setExpandedWeek(originalState);
      });
    }, 1000); // Delay to allow rendering
  };

  const isDataLoaded = !queryLoading && !assessmentLoading; // Check if both the query data and assessment data have loaded

  return (
    <div ref={contentRef} className="feedback-container">
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
        {(expandedWeek === 1 || expandedWeek === "all") && <Week1 />}
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
        {(expandedWeek === 2 || expandedWeek === "all") && <Week2 />}
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
        {(expandedWeek === 3 || expandedWeek === "all") && <Week3 />}
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
        {(expandedWeek === 4 || expandedWeek === "all") && <Week4 />}
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
        {(expandedWeek === 5 || expandedWeek === "all") && <Week5 />}
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
