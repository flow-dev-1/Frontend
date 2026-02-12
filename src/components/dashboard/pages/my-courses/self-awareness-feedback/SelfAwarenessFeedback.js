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
import { useLocation } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import HurrayComponent from "./Hurray";
import AIConfirmationModal from "./AIConfirmationModal";

const SelfAwarenessFeedback = ({ isSchool: isSchoolProp, studentId, enrollmentId: enrollmentIdProp }) => {
  const weeks = [1, 2, 3, 4, 5]; // List of weeks
  const courseId = "66853bf50118e2e0a02b6a5a";
  const location = useLocation(); // Get location object
  const [assessmentData, setAssessmentData] = useState({});
  const [assessmentLoading, setAssessmentLoading] = useState(true);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false); // NEW STATE FOR PDF LOADING
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedAIWeek, setSelectedAIWeek] = useState(null);
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

  // Fetch data for all weeks
  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ["dashboard/feedback/self-awareness", courseId, enrollmentId, studentId, isAdmin],
    queryFn: () =>
      Promise.all(
        weeks.map((week) => {
          if (isAdmin) return adminService.getUserCourseData(enrollmentId, week, code);
          if (isSchool) return schoolService.getStudentCourseData(enrollmentId, week, studentId);
          return userService.getMyActivites(courseId, week);
        })
      ),
    enabled: isAdmin ? (!!enrollmentId && !!code) : (isSchool ? (!!enrollmentId && !!studentId) : true),
  });

  useEffect(() => {
    const fetchAssessmentData = async () => {
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
              data = await userService.getMyAssessment(courseId, week);
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
  }, [courseId, enrollmentId, studentId, isAdmin, isSchool, code]);

  const toggleWeek = (weekNumber) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
  };

  const handleOpenAIModal = (weekNumber) => {
    setSelectedAIWeek(weekNumber);
    setIsAIModalOpen(true);
  };

  const handleConfirmAIGeneration = async () => {
    setIsAIModalOpen(false);
    console.log(`Generating AI feedback for week ${selectedAIWeek}`);

    // Find the data for the selected week
    const weekData = data?.[selectedAIWeek - 1];
    if (!weekData || !weekData.activity) {
      console.error("No data found for this week");
      return;
    }

    // Format the payload to match user's Postman example
    const payload = [
      {
        payload: {
          activity: weekData.activity.activities,
          id: weekData.activity._id
        }
      }
    ];

    console.log("Sending payload to AI webhook via POST:", JSON.stringify(payload, null, 2));

    try {
      const url = "https://n8n.srv895792.hstgr.cloud/webhook/7e9dafd3-852f-4050-99fb-a27f4a36e250";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Read response as text first to handle empty or non-JSON responses
      const text = await response.text();
      let result;
      try {
        result = text ? JSON.parse(text) : { status: "success", message: "Webhook called successfully (empty response)" };
      } catch (e) {
        result = { status: "success", message: text || "Webhook called successfully" };
      }

      console.log("AI Webhook results:", result);
    } catch (error) {
      console.error("Error calling AI webhook:", error);
    }
  };

  // Function to temporarily expand all weeks, generate the PDF, then restore the original state
  const generatePDF = () => {
    if (!isDataLoaded) {
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

  return (
    <>
      {/* Loader Overlay */}
      {(pdfLoading) && ( // SHOW LOADER WHEN PDF IS LOADING
        <div className="loader-overlay">
          <ClimbingBoxLoader color="#275DAD" />
        </div>
      )}

      <div ref={contentRef} className="feedback-container ">
        <h2 className="accordion-header p-4 fs-1 bg-blue text-center text-white">
          Feedback for Self-Awareness
        </h2>
        {/* Week 1 */}
        <div className="week-title-container">
          <div className="week-title">
            <div className="week-left">
              <h2 onClick={() => toggleWeek(1)} style={{ fontSize: "24px" }}>
                Week 1:{" "}
                <span style={{ fontSize: "14px" }}>
                  Introduction to Self-Awareness
                </span>
              </h2>
              {isAdmin && (expandedWeek === 1 || expandedWeek === "all") && data && data[0] && (
                <button
                  className="ai-generate-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAIModal(1);
                  }}
                >
                  <Icon icon="solar:magic-stick-3-bold-duotone" className="icon" />
                  Generate with AI
                </button>
              )}
            </div>
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
          {(expandedWeek === 1 || expandedWeek === "all") && <Week1
            enrollmentId={enrollmentId}
            isSchool={isSchool}
            studentId={studentId}
          />}
        </div>

        {/* Week 2 */}
        <div className="week-title-container">
          <div className="week-title">
            <div className="week-left">
              <h2 onClick={() => toggleWeek(2)} style={{ fontSize: "24px" }}>
                Week 2:{" "}
                <span style={{ fontSize: "14px" }}>
                  Identifying Strengths and Weaknesses
                </span>
              </h2>
              {isAdmin && (expandedWeek === 2 || expandedWeek === "all") && data && data[1] && (
                <button
                  className="ai-generate-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAIModal(2);
                  }}
                >
                  <Icon icon="solar:magic-stick-3-bold-duotone" className="icon" />
                  Generate with AI
                </button>
              )}
            </div>
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
          {(expandedWeek === 2 || expandedWeek === "all") && <Week2
            enrollmentId={enrollmentId}
            isSchool={isSchool}
            studentId={studentId}
          />}
        </div>

        {/* Week 3 */}
        <div className="week-title-container">
          <div className="week-title">
            <div className="week-left">
              <h2 onClick={() => toggleWeek(3)} style={{ fontSize: "24px" }}>
                Week 3:{" "}
                <span style={{ fontSize: "14px" }}>Understanding Mindset</span>
              </h2>
              {isAdmin && (expandedWeek === 3 || expandedWeek === "all") && data && data[2] && (
                <button
                  className="ai-generate-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAIModal(3);
                  }}
                >
                  <Icon icon="solar:magic-stick-3-bold-duotone" className="icon" />
                  Generate with AI
                </button>
              )}
            </div>
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
          {(expandedWeek === 3 || expandedWeek === "all") && <Week3
            enrollmentId={enrollmentId}
            isSchool={isSchool}
            studentId={studentId}
          />}
        </div>

        {/* Week 4 */}
        <div className="week-title-container">
          <div className="week-title">
            <div className="week-left">
              <h2 onClick={() => toggleWeek(4)} style={{ fontSize: "24px" }}>
                Week 4:{" "}
                <span style={{ fontSize: "14px" }}>Identifying Values</span>
              </h2>
              {isAdmin && (expandedWeek === 4 || expandedWeek === "all") && data && data[3] && (
                <button
                  className="ai-generate-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAIModal(4);
                  }}
                >
                  <Icon icon="solar:magic-stick-3-bold-duotone" className="icon" />
                  Generate with AI
                </button>
              )}
            </div>
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
          {(expandedWeek === 4 || expandedWeek === "all") && <Week4
            enrollmentId={enrollmentId}
            isSchool={isSchool}
            studentId={studentId}
          />}
        </div>

        {/* Week 5 */}
        <div className="week-title-container">
          <div className="week-title">
            <div className="week-left">
              <h2 onClick={() => toggleWeek(5)} style={{ fontSize: "24px" }}>
                Week 5:{" "}
                <span style={{ fontSize: "14px" }}>
                  Emotional Intelligence and Communication Skills
                </span>
              </h2>
              {isAdmin && (expandedWeek === 5 || expandedWeek === "all") && data && data[4] && (
                <button
                  className="ai-generate-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAIModal(5);
                  }}
                >
                  <Icon icon="solar:magic-stick-3-bold-duotone" className="icon" />
                  Generate with AI
                </button>
              )}
            </div>
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
          {(expandedWeek === 5 || expandedWeek === "all") && <Week5
            enrollmentId={enrollmentId}
            isSchool={isSchool}
            studentId={studentId}
          />}
        </div>

        {/* Final Report Section */}

        <div
          className="week-title-container"
          style={{ backgroundColor: "#5CE1E6" }}
        >
          <div className="week-title">
            <h2 onClick={() => toggleWeek(6)} style={{ fontSize: "24px" }}>
              Final Report:{" "}
              <span style={{ fontSize: "14px" }}>
                Summary of your journey through Self Awareness
              </span>

            </h2>

            {/* Disable download if data is still loading */}
            <p
              style={{
                zIndex: 100,
                cursor: "pointer",
                fontSize: 16,
                color: "#007ACC"
              }}
              download="SelfAwarenessSummary.pdf"
              className={`download-link text-blue${!isDataLoaded ? "disabled" : ""
                }`}
              onClick={isDataLoaded ? generatePDF : null}
            // onClick={(e) => !isDataLoaded && e.preventDefault()}
            >
              (Download PDF)
              <Icon

                icon="bi:download"
                style={{ cursor: isDataLoaded ? "pointer" : "not-allowed" }}
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
        {(expandedWeek === 6 || expandedWeek === "all") && <HurrayComponent
          enrollmentId={enrollmentId}
          isSchool={isSchool}
          studentId={studentId}
        />}

        <AIConfirmationModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          onConfirm={handleConfirmAIGeneration}
          weekNumber={selectedAIWeek}
        />
      </div>
    </>
  );
};

export default SelfAwarenessFeedback;
