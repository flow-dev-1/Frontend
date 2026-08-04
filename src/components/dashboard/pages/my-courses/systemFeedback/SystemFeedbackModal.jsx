import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";

export default function SystemFeedbackModal({ feedback, onContinue }) {
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const feedbackMessages = useMemo(
    () => (Array.isArray(feedback) ? feedback : feedback ? [feedback] : []),
    [feedback]
  );
  const isLastMessage = currentFeedbackIndex === feedbackMessages.length - 1;

  useEffect(() => {
    setCurrentFeedbackIndex(0);
  }, [feedback]);

  const handleContinue = useCallback(() => {
    if (!isLastMessage) {
      setCurrentFeedbackIndex((index) => index + 1);
      return;
    }

    onContinue();
  }, [isLastMessage, onContinue]);

  useEffect(() => {
    if (!feedback) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleContinue();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [feedback, handleContinue]);

  if (!feedback || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="modal fade show course-system-feedback-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-system-feedback-title"
      style={{
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        inset: 0,
        justifyContent: "center",
        overflowY: "auto",
        padding: "1rem",
        position: "fixed",
        transform: "none",
        zIndex: 2000,
      }}
    >
      <div
        className="modal-dialog modal-lg"
        role="document"
        style={{ margin: "auto", maxWidth: "800px", width: "100%" }}
      >
        <div
          className="modal-content border-0 shadow-lg position-relative"
          style={{
            alignItems: "stretch",
            borderRadius: "4px",
            padding: 0,
            width: "100%",
          }}
        >
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Continue course"
            onClick={handleContinue}
          />

          <div className="modal-body p-4 p-md-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Icon
                icon="fluent:sparkle-24-filled"
                className="text-info flex-shrink-0"
                style={{ fontSize: "2rem" }}
              />
              <h4
                id="course-system-feedback-title"
                className="text-blue fw-bold text-uppercase mb-0"
              >
                Feedback
              </h4>
            </div>

            <p className="text-gray fs-4 lh-base mb-4">
              {feedbackMessages[currentFeedbackIndex]}
            </p>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn bg-button text-white border-0 hover-prev px-4"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
