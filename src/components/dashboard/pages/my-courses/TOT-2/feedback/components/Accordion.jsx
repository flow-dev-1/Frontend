import React, { useCallback, useEffect, useRef, useState } from "react";
import "./accordion.css";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ClimbingBoxLoader } from "react-spinners";
import { useQueries } from "@tanstack/react-query";
import userService from "../../../../../../../services/api/user.js";
import adminService from "../../../../../../../services/api/admin.js";
import { adminData } from "../../../../../../../redux/reducers/adminReducer.js";
import { useSelector } from "react-redux";

function Accordion({
  activeIndex,
  setActiveIndex,
  items,
  allDataLoaded,
  hasPercentile,
  setHasPercentile,
  enrollmentId,
}) {
  const contentRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [startDownload, setStartDownload] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isAdmin, code } = useSelector(adminData);

  const weekProgressQueries = useQueries({
    queries: Array.from({ length: 5 }, (_, index) => {
      const weekNumber = index + 1;

      return {
        queryKey: ["dashboard/tot2-feedback-lock", enrollmentId, weekNumber],
        queryFn: () =>
          isAdmin
            ? adminService.getUserCourseData(enrollmentId, weekNumber, code)
            : userService.getUserCourseData(enrollmentId, weekNumber),
        enabled: !!enrollmentId,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        keepPreviousData: false,
      };
    }),
  });

  const isCourseComplete = weekProgressQueries.every((query) =>
    Boolean(query.data?.assessment),
  );

  const isFeedbackAvailable = (index) => {
    if (index >= 5) return isCourseComplete;
    return Boolean(weekProgressQueries[index]?.data?.assessment);
  };

  const generatePDF = useCallback(async () => {
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

          pdf.save("ToT_2_Feedback.pdf");
          setActiveIndex("");
          setPdfLoading(false);
          setHasPercentile(false);
        });
      }, 1000);
    }
  }, [
    activeIndex,
    allDataLoaded,
    hasPercentile,
    setActiveIndex,
    setHasPercentile,
  ]);

  useEffect(() => {
    if (!startDownload) return;
    if (!isCourseComplete) {
      setStartDownload(false);
      return;
    }

    if (currentIndex === 5) {
      setPdfLoading(true);
      setActiveIndex(null);

      console.log("downloading course pdf");

      // replace this with the actual pdf template
      const link = document.createElement("a");
      link.href = "/Teacher Resources.pdf";
      link.download = "Teacher Resources.pdf";
      link.click();

      setStartDownload(false);
      setActiveIndex("");
      setPdfLoading(false);

      return;
    }
    generatePDF();
  }, [
    startDownload,
    currentIndex,
    isCourseComplete,
    generatePDF,
    setActiveIndex,
  ]);

  const handleToggle = (index) => {
    if (!isFeedbackAvailable(index)) return;
    window.scroll(0, 0);
    setActiveIndex(activeIndex === index ? "" : index);
  };

  return (
    <>
      {pdfLoading && ( // SHOW LOADER WHEN PDF IS LOADING
        <div className="loader-overlay">
          <ClimbingBoxLoader color="#275DAD" />
        </div>
      )}
      <div className="accordion" ref={contentRef}>
        <h2 className="accordion-header p-lg-2 p-md-4 bg-blue text-center text-white tot-question-text">
          Feedback for Special Needs and Inclusive Education in Classrooms.
        </h2>

        {items.map((item, index) => {
          const isAvailable = isFeedbackAvailable(index);

          return (
            <div
              key={index}
              className={`accordion-item ${
                isAvailable ? "" : "feedback-locked"
              }`}
            >
              <div
                className={`py-4 px-5 d-flex gap-3 align-items-center justify-space-between ${
                  index > 5 ? "bg-blue-feedback" : ""
                }`}
              >
              <div className="d-flex align-items-center gap-3 flex-grow-1">
                {index < 5 ? (
                  <p
                    className="text-gray text-nowrap fw-bold mb-0"
                    onClick={() => handleToggle(index)}
                    style={{ cursor: isAvailable ? "pointer" : "not-allowed" }}
                  >
                    Week {index + 1}:
                  </p>
                ) : index >= 6 && index < 7 ? (
                  <p
                    className="text-gray text-nowrap fw-bold mb-0"
                    onClick={() => handleToggle(index)}
                    style={{ cursor: isAvailable ? "pointer" : "not-allowed" }}
                  >
                    Summary
                  </p>
                ) : (
                  <p
                    className="text-gray fw-bold mb-0"
                    onClick={() => handleToggle(index)}
                    style={{ cursor: isAvailable ? "pointer" : "not-allowed" }}
                  >
                    Resource:
                  </p>
                )}
                <div
                  className="text-gray "
                  onClick={() => handleToggle(index)}
                  style={{ cursor: isAvailable ? "pointer" : "not-allowed" }}
                >
                  {item.title}
                </div>
                {index >= 5 && (
                  <p
                    className={isAvailable ? "text-blue" : "text-muted"}
                    style={{
                      zIndex: 100,
                      cursor: isAvailable ? "pointer" : "not-allowed",
                    }}
                    onClick={() => {
                      if (!isAvailable) return;
                      // handleToggle(index);
                      setCurrentIndex(index);
                      setStartDownload(true);
                    }}
                  >
                    {isAvailable
                      ? pdfLoading
                        ? "Generating PDF..."
                        : "(Download PDF)"
                      : "(Locked)"}{" "}
                    <Icon icon={isAvailable ? "bi:download" : "mdi:lock"} />
                  </p>
                )}
              </div>
              <Icon
                onClick={() => handleToggle(index)}
                icon={
                  !isAvailable
                    ? "mdi:lock"
                    : activeIndex === index
                    ? "simple-line-icons:arrow-up"
                    : "simple-line-icons:arrow-down"
                }
                style={{ cursor: isAvailable ? "pointer" : "not-allowed" }}
              />
            </div>
            {isAvailable && (activeIndex === index || activeIndex === null) && (
              <div className="accordion-content">
                <div>{item.content}</div>
              </div>
            )}
          </div>
          );
        })}
      </div>
    </>
  );
}

export default Accordion;
