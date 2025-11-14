import React, { useEffect, useRef, useState } from "react";
import "./accordion.css";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ClimbingBoxLoader } from "react-spinners";

function Accordion({
  activeIndex,
  setActiveIndex,
  items,
  allDataLoaded,
  hasPercentile,
  setHasPercentile,
}) {
  const contentRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [startDownload, setStartDownload] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleToggle = (index) => {
    window.scroll(0, 0);
    setActiveIndex(activeIndex === index ? "" : index);
  };

  useEffect(() => {
    if (!startDownload) return;

    if (currentIndex === 6) {
      console.log("====================================");
      console.log("prinitng Worksheet pdf");
      console.log("====================================");

      return;
    }
    if (currentIndex === 7) {
      console.log("====================================");
      console.log("prinitng course pdf");
      console.log("====================================");

      return;
    }
    // download pdf, based on index, we will just check if the index is the one we want to downlaod, and serve the pdf we want, then return
    generatePDF();
  }, [hasPercentile, allDataLoaded, startDownload, currentIndex]);

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

          pdf.save("CompassionFeedback.pdf");
          setActiveIndex("");
          setPdfLoading(false);
          setHasPercentile(false);
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
          Feedback for Resilience & Grit
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
