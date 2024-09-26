import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import "./view.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import schoolService from "../../../../services/api/school";
import EnrollmentModal from "../Enrollment/EnrollmentModal";

const ViewDetailsModal = ({ onClose, encryptURI, courseId, course }) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.user);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserCredentials, setDeleteUser] = useState({
    user: null,
    enrollId: null
  });
  const [openEnrollModal, setOpenEnrollModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEnrollModalEducator, setOpenEnrollModalEducator] = useState(false);

  const openEnrollementModal = () => {
    if (course.grade === "Educator") {
      setOpenEnrollModalEducator(true);
    } else {
      setOpenEnrollModal(true);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };
  console.log(courseId);

  const [enrollmentData, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };


  const lightGreen = "#D4FFBE";
  const darkGreen = "#4B7E31";
  const lightTertiary = "#FAFAFA";
  const darkTertiary = "#329BD6";
  const lightEducator = "#5CE1E6";
  const darkEducator = "#275DAD";
      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ];
      const timeOptions = Array.from(
        { length: 10 },
        (_, i) => `${String(i + 8).padStart(2, "0")}:00`
      );

  const closeModals = () => {
    setShowCreateModal(false);
    setShowDeleteModal(false);
  };
    function convertTo12HourFormat(time) {
      if (!time) return;
      // Split the time string into hours and minutes
      const [hour, minute] = time.split(":").map(Number);

      // Determine if it's AM or PM
      const period = hour >= 12 ? "PM" : "AM";

      // Convert hour from 24-hour to 12-hour format
      const twelveHour = hour % 12 || 12; // Converts "0" hour to "12"

      // Return the formatted time
      return `${twelveHour}:${minute.toString().padStart(2, "0")} ${period}`;
    }
  const selectModal = (id) => {
    navigate(`/school-dashboard/courses/enrolled/${encryptURI(id)}`);
  };
  const closeEnrollementModal = () => {
    setOpenEnrollModal(false);
    setOpenEnrollModalEducator(false);
  };

  let schoolId;
  // ToDO: Do a check if its a school or a user
  if (user?.isSchool) {
    schoolId = user?._id;
  }
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["school-dashboard"],
    queryFn: () => schoolService.getEnrolledDetails(schoolId, courseId)
  });
  console.log(data?.courses);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="hediee">
          <div className="modal-header">
            <h2>Enrolled Classes</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          <div className="table-container">
            <table id="my-table" className="students-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Enrolled Classes</th>
                  <th>No. of Students</th>
                  <th>Enrollment Date</th>
                  <th>Day of the Week</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {data && data.courses?.length > 0 ? (
                  data.courses.map((group, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{group.stdClass}</td>
                      <td>{group.studentEnrollments?.length || 0}</td>{" "}
                      {/* Ensure studentEnrollments is defined */}
                      <td>
                        {new Date(group.createdAt).getUTCDate()} -{" "}
                        {new Date(group.createdAt).getUTCMonth() + 1} -{" "}
                        {new Date(group.createdAt)
                          .getUTCFullYear()
                          .toString()
                          .slice(-2)}
                      </td>
                      <td>{group.dayOfWeek}</td>
                      <td>{convertTo12HourFormat(group.startTime)}</td>
                      <td>{convertTo12HourFormat(group.endTime)}</td>
                      <td>
                        <Icon
                          icon="iconamoon:arrow-right-2-thin"
                          className="action-icon arrow-icon"
                          width={22}
                          style={{ color: "#000000" }}
                          onClick={() => selectModal(group._id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Cart Button */}
        </div>
        <button
          id="cartBtn"
          onClick={openEnrollementModal}
          style={{
            backgroundColor: darkTertiary,
            color: "white",
            border: "1px solid #329bd6",
            padding: "5px",
            borderRadius: "5px",
            marginLeft: "auto",
            marginRight: "50px"
          }}
        >
          <span>+</span> Add A New Class
        </button>
      </div>
      <EnrollmentModal
        isOpen={openEnrollModal}
        onRequestClose={closeEnrollementModal}
        daysOfWeek={daysOfWeek}
        timeOptions={timeOptions}
        course={course}
      />
    </div>
  );
};

export default ViewDetailsModal;
