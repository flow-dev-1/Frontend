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
import schoolService from "../../../../../services/api/school";
import adminService from "../../../../../services/api/admin";
import { useSelector } from "react-redux";
import { adminData } from "../../../../../redux/reducers/adminReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import HurrayComponent from "./Hurray";
import logo from "../../../../../assets/logo.png";

const SelfAwarenessFeedback = ({ isSchool: isSchoolProp, studentId, enrollmentId: enrollmentIdProp }) => {
  const weeks = [1, 2, 3, 4, 5]; // List of weeks
  const location = useLocation(); // Get location object
  const navigate = useNavigate();
  const [assessmentData, setAssessmentData] = useState({});
  const [assessmentLoading, setAssessmentLoading] = useState(true);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false); // NEW STATE FOR PDF LOADING
  const contentRef = useRef();

  const { isAdmin, code } = useSelector(adminData);
  const { user } = useSelector((state) => state?.user);
  const [isSchool, setIsSchool] = useState(isSchoolProp || user?.isSchool || false);
  const [enrollmentId, setEnrollmentId] = useState(enrollmentIdProp || null);

  useEffect(() => {
    if (user?.isSchool) {
      setIsSchool(true);
    }
  }, [user]);

  useEffect(() => {
    if (enrollmentIdProp) {
      setEnrollmentId(enrollmentIdProp);
    } else if (isAdmin) {
      const adminEnrollmentId = sessionStorage.getItem("flow-courseEnrollmentId");
      if (adminEnrollmentId) setEnrollmentId(adminEnrollmentId);
    } else if (location.state?.enrollmentData?._id) {
      setEnrollmentId(location.state.enrollmentData._id);
    }
  }, [enrollmentIdProp, isAdmin, location.state]);

  useEffect(() => {
    if (isAdmin || isSchool) return;
    if (enrollmentId) return;
    if (location.state?.enrollmentData?._id) return;
    navigate("/dashboard/my-courses", { replace: true });
  }, [enrollmentId, isAdmin, isSchool, location.state, navigate]);

  // Fetch data for all weeks
  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ["dashboard/feedback/self-awareness", enrollmentId, studentId, isAdmin, isSchool],
    queryFn: () =>
      Promise.all(
        weeks.map((week) => {
          if (isAdmin) return adminService.getUserCourseData(enrollmentId, week, code);
          if (isSchool) return schoolService.getStudentCourseData(enrollmentId, week, studentId);
          return userService.getUserCourseData(enrollmentId, week);
        })
      ),
    enabled: isAdmin ? (!!enrollmentId && !!code) : (isSchool ? (!!enrollmentId && !!studentId) : !!enrollmentId),
  });

  useEffect(() => {
    const fetchAssessmentData = async () => {
      if (!enrollmentId && !isSchool && !isAdmin) {
        setAssessmentLoading(false);
        return;
      }
      if (!enrollmentId && (isSchool || isAdmin)) return;
      if (isAdmin && !code) return; // Wait for admin code

      setAssessmentLoading(true);
      try {
        // Fetch assessment data for each week
        const assessmentResults = await Promise.all(
          weeks.map(async (week) => {
            let data;
            if (isAdmin) {
              const res = await adminService.getUserCourseData(enrollmentId, week, code);
              data = res.assessment;
            } else if (isSchool) {
              const res = await schoolService.getStudentCourseData(enrollmentId, week, studentId);
              data = res.assessment;
            } else {
              data = await userService.getMyAssessment(enrollmentId, week);
            }
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
  }, [enrollmentId, studentId, isAdmin, isSchool, code]);

  const hasSubmittedAssessment = (assessment) => {
    if (!assessment) return false;
    if (Array.isArray(assessment)) return assessment.length > 0;
    if (typeof assessment !== "object") return false;
    if (assessment.assessment) return hasSubmittedAssessment(assessment.assessment);
    if (assessment.existingAssessment) return hasSubmittedAssessment(assessment.existingAssessment);
    if (assessment.newAssessment) return hasSubmittedAssessment(assessment.newAssessment);
    if (Array.isArray(assessment.assessments)) return assessment.assessments.length > 0;
    if (Array.isArray(assessment.answers)) return assessment.answers.length > 0;
    if (assessment.rating !== undefined && assessment.rating !== null) return true;
    if (assessment._id) return true;
    return false;
  };

  const getWeekAssessment = (weekNumber) => {
    const directAssessment = assessmentData?.[weekNumber];
    if (hasSubmittedAssessment(directAssessment)) return directAssessment;
    return data?.[weekNumber - 1]?.assessment;
  };

  const isWeekFeedbackAvailable = (weekNumber) =>
    hasSubmittedAssessment(getWeekAssessment(weekNumber));

  const isFinalReportAvailable = () =>
    weeks.every((week) => isWeekFeedbackAvailable(week));

  const toggleWeek = (weekNumber) => {
    if (weekNumber === 6 || weekNumber === "all") {
      if (!isFinalReportAvailable()) return;
      setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
      return;
    }

    if (!isWeekFeedbackAvailable(weekNumber)) return;
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
  };

  // Function to temporarily expand all weeks, generate the PDF, then restore the original state
  const generatePDF = () => {
    if (!isDataLoaded || !isFinalReportAvailable()) {
      return;
    }
    const originalState = expandedWeek;
    setPdfLoading(true); // SET PDF LOADING TO TRUE
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
        setPdfLoading(false); // HIDE LOADER AFTER PDF IS GENERATED
      });
    }, 1000); // Delay to allow rendering
  };

  const isDataLoaded = !queryLoading && !assessmentLoading; // Check if both the query data and assessment data have loaded

  const renderWeekLockNote = (weekNumber) =>
    !isWeekFeedbackAvailable(weekNumber) && (
      <p className="feedback-week-locked-note">(Submit assessment to unlock)</p>
    );

  const getWeekToggleIcon = (weekNumber) =>
    isWeekFeedbackAvailable(weekNumber)
      ? expandedWeek === weekNumber || expandedWeek === "all"
        ? "simple-line-icons:arrow-up"
        : "simple-line-icons:arrow-down"
      : "mdi:lock";

  const isFinalLocked = !isFinalReportAvailable();
  const weekTopics = [
    "Introduction to Self-Awareness",
    "Strengths and Weaknesses",
    "Mindset",
    "Values",
    "Emotions and Emotional Intelligence",
  ];
  const activeFeedbackWeek =
    expandedWeek === "all" || expandedWeek === 6 ? 5 : Number(expandedWeek) || 1;

  return (
    <div className="self-awareness-feedback-shell">
      {/* Loader Overlay */}
      {(pdfLoading) && ( // SHOW LOADER WHEN PDF IS LOADING
        <div className="loader-overlay">
          <ClimbingBoxLoader color="#275DAD" />
        </div>
      )}

      <nav className="navbar">
        <div className="container">
          <button
            disabled={isAdmin}
            onClick={() => (isSchool ? navigate("/school-dashboard") : navigate("/dashboard"))}
            className="navbar-logo"
            style={{ border: "none", background: "#FFF" }}
          >
            <img src={logo} alt="" />
          </button>
          <div className="navbar-logo" style={{ cursor: "pointer" }}>
            Logout
          </div>
        </div>
      </nav>

      <div className="self-awareness-feedback-main">
        <aside className="self-awareness-feedback-aside d-none d-lg-block">
          <button
            disabled={isAdmin}
            onClick={() => (isSchool ? navigate(-1) : navigate("/dashboard/my-courses"))}
            className="back"
            style={{ cursor: "pointer", border: "none", background: "#f8f5f5" }}
          >
            <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
            {isSchool ? "Go back" : "Back to My Courses"}
          </button>

          <div className="self-awareness-feedback-title">
            <h2>Discovering Me:</h2>
            <h2 className="course-name">Self Awareness</h2>
          </div>

          <ul className="self-awareness-feedback-list">
            {weekTopics.map((topic, index) => {
              const weekNumber = index + 1;
              const isAvailable = isWeekFeedbackAvailable(weekNumber);

              return (
                <li
                  key={topic}
                  className={`${weekNumber <= activeFeedbackWeek ? "active-week" : ""} ${!isAvailable ? "locked-week" : ""}`}
                >
                  <div className="icon">
                    <Icon
                      icon={isAvailable ? "icon-park-outline:check-one" : "mdi:lock"}
                      className="course-list-icon"
                    />
                  </div>
                  <span>Week {weekNumber}</span>
                  <span>{topic}</span>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="self-awareness-feedback-content position-relative mb-5">
          <button
            disabled={isAdmin}
            onClick={() => (isSchool ? navigate(-1) : navigate("/dashboard/my-courses"))}
            className="back text-black mb-5 p-3 d-lg-none"
            style={{ cursor: "pointer", border: "none", background: "transparent" }}
          >
            <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
            {isSchool ? "Go back" : "Back to My Courses"}
          </button>

      <div ref={contentRef} className="feedback-container accordion">
        <h2 className="accordion-header p-4 fs-1 bg-blue text-center text-white">
          Feedback for Self-Awareness
        </h2>
        {/* Week 1 */}
        <div className={`week-title-container accordion-item ${!isWeekFeedbackAvailable(1) ? "feedback-week-locked" : ""}`}>
          <div className="week-title">
            <div className="week-left">
              <h2
                onClick={() => toggleWeek(1)}
                style={{
                  fontSize: "24px",
                  cursor: isWeekFeedbackAvailable(1) ? "pointer" : "not-allowed",
                }}
              >
                Week 1:{" "}
                <span style={{ fontSize: "14px" }}>
                  Introduction to Self-Awareness
                </span>
              </h2>
              {renderWeekLockNote(1)}
            </div>
            <Icon
              icon={getWeekToggleIcon(1)}
              className={!isWeekFeedbackAvailable(1) ? "feedback-week-lock-icon" : ""}
              onClick={() => toggleWeek(1)}
              style={{ cursor: isWeekFeedbackAvailable(1) ? "pointer" : "not-allowed" }}
            />
          </div>
          {isWeekFeedbackAvailable(1) && (expandedWeek === 1 || expandedWeek === "all") && (
            <div className="accordion-content">
              <Week1
                enrollmentId={enrollmentId}
                isSchool={isSchool}
                studentId={studentId}
              />
            </div>
          )}
        </div>

        {/* Week 2 */}
        <div className={`week-title-container accordion-item ${!isWeekFeedbackAvailable(2) ? "feedback-week-locked" : ""}`}>
          <div className="week-title">
            <div className="week-left">
              <h2
                onClick={() => toggleWeek(2)}
                style={{
                  fontSize: "24px",
                  cursor: isWeekFeedbackAvailable(2) ? "pointer" : "not-allowed",
                }}
              >
                Week 2:{" "}
                <span style={{ fontSize: "14px" }}>
                  Strengths and Weaknesses
                </span>
              </h2>
              {renderWeekLockNote(2)}
            </div>
            <Icon
              icon={getWeekToggleIcon(2)}
              className={!isWeekFeedbackAvailable(2) ? "feedback-week-lock-icon" : ""}
              onClick={() => toggleWeek(2)}
              style={{ cursor: isWeekFeedbackAvailable(2) ? "pointer" : "not-allowed" }}
            />
          </div>
          {isWeekFeedbackAvailable(2) && (expandedWeek === 2 || expandedWeek === "all") && (
            <div className="accordion-content">
              <Week2
                enrollmentId={enrollmentId}
                isSchool={isSchool}
                studentId={studentId}
              />
            </div>
          )}
        </div>

        {/* Week 3 */}
        <div className={`week-title-container accordion-item ${!isWeekFeedbackAvailable(3) ? "feedback-week-locked" : ""}`}>
          <div className="week-title">
            <div className="week-left">
              <h2
                onClick={() => toggleWeek(3)}
                style={{
                  fontSize: "24px",
                  cursor: isWeekFeedbackAvailable(3) ? "pointer" : "not-allowed",
                }}
              >
                Week 3:{" "}
                <span style={{ fontSize: "14px" }}>Mindset</span>
              </h2>
              {renderWeekLockNote(3)}
            </div>
            <Icon
              icon={getWeekToggleIcon(3)}
              className={!isWeekFeedbackAvailable(3) ? "feedback-week-lock-icon" : ""}
              onClick={() => toggleWeek(3)}
              style={{ cursor: isWeekFeedbackAvailable(3) ? "pointer" : "not-allowed" }}
            />
          </div>
          {isWeekFeedbackAvailable(3) && (expandedWeek === 3 || expandedWeek === "all") && (
            <div className="accordion-content">
              <Week3
                enrollmentId={enrollmentId}
                isSchool={isSchool}
                studentId={studentId}
              />
            </div>
          )}
        </div>

        {/* Week 4 */}
        <div className={`week-title-container accordion-item ${!isWeekFeedbackAvailable(4) ? "feedback-week-locked" : ""}`}>
          <div className="week-title">
            <div className="week-left">
              <h2
                onClick={() => toggleWeek(4)}
                style={{
                  fontSize: "24px",
                  cursor: isWeekFeedbackAvailable(4) ? "pointer" : "not-allowed",
                }}
              >
                Week 4:{" "}
                <span style={{ fontSize: "14px" }}>Values</span>
              </h2>
              {renderWeekLockNote(4)}
            </div>
            <Icon
              icon={getWeekToggleIcon(4)}
              className={!isWeekFeedbackAvailable(4) ? "feedback-week-lock-icon" : ""}
              onClick={() => toggleWeek(4)}
              style={{ cursor: isWeekFeedbackAvailable(4) ? "pointer" : "not-allowed" }}
            />
          </div>
          {isWeekFeedbackAvailable(4) && (expandedWeek === 4 || expandedWeek === "all") && (
            <div className="accordion-content">
              <Week4
                enrollmentId={enrollmentId}
                isSchool={isSchool}
                studentId={studentId}
              />
            </div>
          )}
        </div>

        {/* Week 5 */}
        <div className={`week-title-container accordion-item ${!isWeekFeedbackAvailable(5) ? "feedback-week-locked" : ""}`}>
          <div className="week-title">
            <div className="week-left">
              <h2
                onClick={() => toggleWeek(5)}
                style={{
                  fontSize: "24px",
                  cursor: isWeekFeedbackAvailable(5) ? "pointer" : "not-allowed",
                }}
              >
                Week 5:{" "}
                <span style={{ fontSize: "14px" }}>
                  Emotions and Emotional Intelligence
                </span>
              </h2>
              {renderWeekLockNote(5)}
            </div>
            <Icon
              icon={getWeekToggleIcon(5)}
              className={!isWeekFeedbackAvailable(5) ? "feedback-week-lock-icon" : ""}
              onClick={() => toggleWeek(5)}
              style={{ cursor: isWeekFeedbackAvailable(5) ? "pointer" : "not-allowed" }}
            />
          </div>
          {isWeekFeedbackAvailable(5) && (expandedWeek === 5 || expandedWeek === "all") && (
            <div className="accordion-content">
              <Week5
                enrollmentId={enrollmentId}
                isSchool={isSchool}
                studentId={studentId}
              />
            </div>
          )}
        </div>

        {/* Final Report Section */}

        <div
          className={`week-title-container accordion-item bg-blue-feedback ${isFinalLocked ? "feedback-week-locked" : ""}`}
          style={{ backgroundColor: "#5CE1E6" }}
        >
          <div className="week-title">
            <div className="week-left">
              <h2
                onClick={() => toggleWeek(6)}
                style={{
                  fontSize: "24px",
                  cursor: isFinalLocked ? "not-allowed" : "pointer",
                }}
              >
                Final Report:{" "}
                <span style={{ fontSize: "14px" }}>
                  Summary of your journey through Self Awareness
                </span>
              </h2>
              {isFinalLocked && (
                <p className="feedback-week-locked-note">
                  (Complete all 5 weeks to unlock)
                </p>
              )}
            </div>

            {/* Disable download if data is still loading */}
            <p
              style={{
                zIndex: 100,
                cursor: isFinalLocked || !isDataLoaded ? "not-allowed" : "pointer",
                fontSize: 16,
                color: isFinalLocked ? "#7b7f88" : "#007ACC"
              }}
              download="SelfAwarenessSummary.pdf"
              className={`download-link text-blue${!isDataLoaded || isFinalLocked ? "disabled" : ""
                }`}
              onClick={isDataLoaded && !isFinalLocked ? generatePDF : null}
            // onClick={(e) => !isDataLoaded && e.preventDefault()}
            >
              {isFinalLocked ? "(Complete all 5 weeks to download)" : "(Download PDF)"}
              <Icon

                icon={isFinalLocked ? "mdi:lock" : "bi:download"}
                className={isFinalLocked ? "feedback-week-lock-icon" : ""}
                style={{ cursor: isDataLoaded && !isFinalLocked ? "pointer" : "not-allowed" }}
              />
            </p>
            {/* <Icon
              icon={
                expandedWeek === 6 || expandedWeek === "all"
                  ? "simple-line-icons:arrow-up"
                  : "simple-line-icons:arrow-down"
              }
              onClick={() => toggleWeek("all")}
              style={{ cursor: "pointer" }}
            /> */}
          </div>
        </div>
        {!isFinalLocked && (expandedWeek === 6 || expandedWeek === "all") && (
          <div className="accordion-content">
            <HurrayComponent
              enrollmentId={enrollmentId}
              isSchool={isSchool}
              studentId={studentId}
            />
          </div>
        )}

      </div>
        </section>
      </div>
    </div>
  );
};

export default SelfAwarenessFeedback;
