import React, { useEffect, useRef, useState } from "react";
import "./accordion.css";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ClimbingBoxLoader } from "react-spinners";
import { useQueries } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import userService from "../../../../../../../services/api/user.js";
import adminService from "../../../../../../../services/api/admin.js";
import schoolService from "../../../../../../../services/api/school.js";
import { adminData } from "../../../../../../../redux/reducers/adminReducer.js";

function Accordion({
  activeIndex,
  setActiveIndex,
  items,
  allDataLoaded,
  hasPercentile,
  setHasPercentile,
  enrollmentId,
  isSchool,
  studentId,
}) {
  const contentRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [startDownload, setStartDownload] = useState(false);
  const { isAdmin, code } = useSelector(adminData);

  const weekProgressQueries = useQueries({
    queries: Array.from({ length: 10 }, (_, index) => {
      const weekNumber = index + 1;

      return {
        queryKey: ["dashboard/transition-feedback-lock", enrollmentId, weekNumber],
        queryFn: () => {
          if (isAdmin) {
            return adminService.getUserCourseData(enrollmentId, weekNumber, code);
          }
          if (isSchool) {
            return schoolService.getStudentCourseData(
              enrollmentId,
              weekNumber,
              studentId
            );
          }
          return userService.getUserCourseData(enrollmentId, weekNumber);
        },
        enabled: !!enrollmentId,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        keepPreviousData: false,
      };
    }),
  });

  const isCourseComplete = weekProgressQueries.every((query) =>
    Boolean(query.data?.assessment)
  );

  const isWeekFeedbackAvailable = (index) => {
    if (index >= 10) return isCourseComplete;
    return Boolean(weekProgressQueries[index]?.data?.assessment);
  };

  const handleToggle = (index) => {
    if (!isWeekFeedbackAvailable(index)) return;
    window.scroll(0, 0);
    setActiveIndex(activeIndex === index ? "" : index);
  };

  useEffect(() => {
    if (!startDownload) return;
    if (!isCourseComplete) {
      setStartDownload(false);
      return;
    }
    generatePDF();
  }, [hasPercentile, allDataLoaded, isCourseComplete, startDownload]);

  const generatePDF = async () => {
    const originalState = activeIndex;
    setPdfLoading(true);
    setActiveIndex(null);

    if (!hasPercentile) {
      setActiveIndex(originalState);
      setPdfLoading(false);
      return;
    }

    if (allDataLoaded) {
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

          pdf.save("TransitionFeedback.pdf");
          setActiveIndex("");
          setPdfLoading(false);
          setHasPercentile(false);
          setStartDownload(false);
        });
      }, 1000);
    }
  };

  return (
    <>
      {pdfLoading && ( // SHOW LOADER WHEN PDF IS LOADING
        <div className="loader-overlay">
          <ClimbingBoxLoader color="#275DAD" />
        </div>
      )}
      <div className="accordion" ref={contentRef}>
        <h2 className="accordion-header p-lg-2 p-md-4 bg-blue text-center text-white">
          Feedback for Transition
        </h2>

        {items.map((item, index) => {
          const isLocked = !isWeekFeedbackAvailable(index);
          const isDownloadLocked = index >= 10 && !isCourseComplete;

          return (
          <div
            key={index}
            className={`accordion-item ${isLocked ? "feedback-week-locked" : ""}`}
          >
            <div
              className={
                index > 9
                  ? "bg-blue-feedback  py-4 px-5 d-flex gap-3 align-items-center justify-space-between"
                  : "py-4 px-5 d-flex gap-3 align-items-center justify-space-between"
              }
            >
              <div className="d-flex align-items-center gap-3 flex-grow-1">
                {index < 10 ? (
                  <h2
                    className="text-gray text-nowrap fw-bold"
                    onClick={() => handleToggle(index)}
                    style={{ cursor: isLocked ? "not-allowed" : "pointer" }}
                  >
                    Week {index + 1}:
                  </h2>
                ) : (
                  <h2
                    className="text-gray fw-bold"
                    onClick={() => handleToggle(index)}
                    style={{ cursor: isLocked ? "not-allowed" : "pointer" }}
                  >
                    Final Report:
                  </h2>
                )}
                <div
                  className="text-gray "
                  onClick={() => handleToggle(index)}
                  style={{ cursor: isLocked ? "not-allowed" : "pointer" }}
                >
                  {item.title}
                </div>
                {isLocked && index < 10 && (
                  <p className="feedback-week-locked-note">
                    (Submit assessment to unlock)
                  </p>
                )}
                {isLocked && index >= 10 && (
                  <p className="feedback-week-locked-note">
                    (Complete all 10 weeks to unlock)
                  </p>
                )}
                {index === 10 && (
                  <p
                    className={isDownloadLocked ? "text-gray" : "text-blue"}
                    style={{
                      zIndex: 100,
                      cursor: isDownloadLocked ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (isDownloadLocked) return;
                      handleToggle(index);
                      setStartDownload(true);
                    }}
                  >
                    {isDownloadLocked
                      ? "(Complete all 10 weeks to download)"
                      : pdfLoading
                        ? "Generating PDF..."
                        : "(Download PDF)"}{" "}
                    {!isDownloadLocked && <Icon icon="bi:download" />}
                  </p>
                )}
              </div>
              <Icon
                onClick={() => handleToggle(index)}
                className={isLocked ? "feedback-week-lock-icon" : ""}
                icon={
                  isLocked
                    ? "mdi:lock"
                    : activeIndex === index
                    ? "simple-line-icons:arrow-up"
                    : "simple-line-icons:arrow-down"
                }
                style={{ cursor: isLocked ? "not-allowed" : "pointer" }}
              />
            </div>
            {!isLocked && (activeIndex === index || activeIndex === null) && (
              <div className="accordion-content">
                <div>{item.content}</div>
              </div>
            )}
          </div>
        )})}
      </div>
    </>
  );
}

export default Accordion;
