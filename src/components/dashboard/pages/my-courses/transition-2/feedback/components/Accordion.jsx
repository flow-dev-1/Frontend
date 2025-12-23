import React, { useEffect, useRef, useState } from "react";
import "./accordion.css";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ClimbingBoxLoader } from "react-spinners";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import pdfTemplate from "../../../../../../../assets/tot-images/pdf/template.pdf";
import { useQuery } from "@tanstack/react-query";
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

  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    if (!startDownload) return;

    // download pdf, based on index, we will just check if the index is the one we want to downlaod, and serve the pdf we want, then return

    // Worksheet
    if (currentIndex === 6) {
      console.log("downloading Worksheet pdf");

      return;
    }

    // Final course PDF (index 7)
    if (currentIndex === 7) {
      const originalState = activeIndex;
      setPdfLoading(true);
      setActiveIndex(null);

      if (!hasPercentile) {
        setActiveIndex(originalState);
        setPdfLoading(false);
        return;
      }
      console.log("downloading course pdf");

      const link = document.createElement("a");
      link.href = "/Teacher Resources.pdf";
      link.download = "Teacher Resources.pdf";
      link.click();

      setStartDownload(false);
      setActiveIndex("");
      setHasPercentile(false);
      setPdfLoading(false);

      return;
    }
  }, [hasPercentile, allDataLoaded, startDownload, currentIndex]);
  // toDo: Fetch User assessment and Activity Data
  const { data, isPending, status, isError } = useQuery({
    queryKey: ["dashboard/tot-feedback-6", enrollmentId, 6],
    queryFn: () =>
      isAdmin
        ? adminService.getUserCourseData(enrollmentId, 6, code)
        : userService.getUserCourseData(enrollmentId, 6),
    enabled: !!enrollmentId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    keepPreviousData: false,
  });
  const handleToggle = (index) => {
    window.scroll(0, 0);
    setActiveIndex(activeIndex === index ? "" : index);
  };

  useEffect(() => {
    if (
      data &&
      data.activity &&
      Array.isArray(data.activity.activities) &&
      data.activity.activities[4] &&
      data.activity.activities[4].answer !== undefined &&
      data.activity.activities[4].answer !== null
    ) {
      setAnswers(data.activity.activities[4].answer);
    }

    return () => {};
  }, [data]);

  if (isPending) {
    // setWorksheetComponent("<div>Loading...</div>");
  }
  if (data?.status === "failed" || isError) {
    // alert(`${data?.message} || "Internal server error!"`);
  }

  return (
    <>
      {pdfLoading && ( // SHOW LOADER WHEN PDF IS LOADING
        <div className="loader-overlay">
          <ClimbingBoxLoader color="#275DAD" />
        </div>
      )}
      <div className="accordion" ref={contentRef}>
        <h2 className="accordion-header p-lg-2 p-md-4 bg-blue text-center text-white">
          Feedback for ToT Course 1
        </h2>

        {items.map((item, index) => (
          <div key={index} className="accordion-item">
            <div
              className={`py-4 px-5 d-flex gap-3 align-items-center justify-space-between
py-4 px-5 d-flex gap-3 align-items-center justify-space-between ${
                index > 7 ? "bg-blue-feedback" : ""
              }`}
            >
              <div className="d-flex align-items-center gap-3 flex-grow-1">
                {index < 6 ? (
                  <p
                    className="text-gray text-nowrap fw-bold"
                    onClick={() => handleToggle(index)}
                    style={{ cursor: "pointer" }}
                  >
                    Week {index + 1}:
                  </p>
                ) : index >= 6 && index < 7 ? (
                  <p
                    className="text-gray text-nowrap fw-bold"
                    onClick={() => handleToggle(index)}
                    style={{ cursor: "pointer" }}
                  >
                    Summary
                  </p>
                ) : (
                  <p
                    className="text-gray fw-bold"
                    onClick={() => handleToggle(index)}
                    style={{ cursor: "pointer" }}
                  >
                    Final Report:
                  </p>
                )}
                <div
                  className="text-gray "
                  onClick={() => handleToggle(index)}
                  style={{ cursor: "pointer" }}
                >
                  {item.title}
                </div>
                {index >= 6 && (
                  <p
                    className="text-blue"
                    style={{ zIndex: 100, cursor: "pointer" }}
                    onClick={() => {
                      handleToggle(index);
                      setCurrentIndex(index);
                      setStartDownload(true);
                    }}
                  >
                    {pdfLoading ? "Generating PDF..." : "(Download PDF)"}{" "}
                    <Icon icon="bi:download" />
                  </p>
                )}
              </div>
              <Icon
                onClick={() => handleToggle(index)}
                icon={
                  activeIndex === index
                    ? "simple-line-icons:arrow-up"
                    : "simple-line-icons:arrow-down"
                }
                style={{ cursor: "pointer" }}
              />
            </div>
            {(activeIndex === index || activeIndex === null) && (
              <div className="accordion-content">
                <div>{item.content}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Accordion;
