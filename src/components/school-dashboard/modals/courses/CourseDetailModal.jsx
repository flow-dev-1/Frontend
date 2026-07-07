import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import "./course-detail-modal.css";
import EnrollmentModal from "../Enrollment/EnrollmentModal";
import AddEducator from "../../school-pages/school-courses/school-course-card/AddEducator";
import self_awareness_image from "../../../../assets/selfawareness-images/self-awareness modal.png";
import CourseReviewModalInfo from "../../../modals-pages/dashboard-modals/CourseReviewModalInfo";

const TEASER_COURSE_IDS = [
  "6a4b61506661e58365e9ceb4",
  "6a4b616d6661e58365e9ceb5",
];
const LEAVING_NO_LEARNER_BEHIND_TEASER_ID = "6a4b61506661e58365e9ceb4";

const CourseDetailModal = ({ course, enrolled, closeModal }) => {
  const navigate = useNavigate();
  const [openEnrollModal, setOpenEnrollModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const [openEnrollModalEducator, setOpenEnrollModalEducator] = useState(false);
  const openEnrollementModal = () => {
    if (course.grade === "Educator") {
      setOpenEnrollModalEducator(true);
    } else {
      setOpenEnrollModal(true);
    }
  };

  const openVewModel = () => {
    setOpenDetailsModal(true);
  };

  const closeEnrollementModal = () => {
    setOpenEnrollModal(false);
    setOpenEnrollModalEducator(false);
  };

  if (!course) return null;

  const courseTitle = course?.title || "";
  const isTeaserCourse = TEASER_COURSE_IDS.includes(course?._id);
  const isEnrolled = enrolled?.includes(course._id);
  const showPurchaseFooter = enrolled && !isEnrolled;
  const showTeaserPreviewFooter = isTeaserCourse && enrolled;

  const openPreview = () => {
    const previewRoute = course?._id === LEAVING_NO_LEARNER_BEHIND_TEASER_ID
      ? "/dashboard/tot_2"
      : "/dashboard/tot";

    sessionStorage.setItem("flow-course-preview-mode", "true");
    closeModal?.();
    navigate(previewRoute, {
      state: {
        isPreview: true,
        enrollmentData: {
          _id: null,
          course,
          progress: 0,
        },
      },
    });
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeOptions = Array.from(
    { length: 10 },
    (_, i) => `${String(i + 8).padStart(2, "0")}:00`
  );

  return (
    <div style={{ width: "100%" }}>
      <div style={{ padding: "20px 50px" }}>
        <CourseReviewModalInfo
          course={course}
          closeModal={closeModal}
        />

        <EnrollmentModal
          isOpen={openEnrollModal}
          onRequestClose={closeEnrollementModal}
          daysOfWeek={daysOfWeek}
          timeOptions={timeOptions}
          course={course}
        />
        <AddEducator
          isOpen={openEnrollModalEducator}
          onRequestClose={closeEnrollementModal}
        />
      </div>
      {(showPurchaseFooter || showTeaserPreviewFooter) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4rem",
            width: "100%",
            backgroundColor: "#329BD6",
            padding: "1rem",
          }}
          className="modal-footer"
        >
          {showPurchaseFooter && (
            <p style={{ color: "#fff" }}>
              To get full access to this course, kindly purchase!
            </p>
          )}
          {showTeaserPreviewFooter && (
            <button
              onClick={openPreview}
              style={{
                backgroundColor: "#fff",
                color: "#329BD6",
                padding: "8px 32px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
              className="preview-button"
            >
              <Icon icon="solar:eye-linear" style={{ color: "#329BD6" }} width={24} />{" "}
              Preview
            </button>
          )}
          {showPurchaseFooter && (
            <button
              onClick={openEnrollementModal}
              style={{
                backgroundColor: "#fff",
                color: "#329BD6",
                padding: "8px 32px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
              className="purchase-button"
            >
              <Icon icon="mdi:cart" style={{ color: "#329BD6" }} width={24} />{" "}
              {course.currency} {course.cost}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseDetailModal;
