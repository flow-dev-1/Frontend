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
        <button className="modal-close-btn" onClick={onClose}>
          X
        </button>
        <div className="modal-header">
          <h2>Enrolled Classes</h2>
        </div>
        <div className="modal-body">
          <div className="table-container">
            <table id="my-table" className="students-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Enrolled Classes</th>
                  <th>No. of Students</th>
                  <th>Day of the Week</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Actions</th>
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
                      <td>{group.dayOfWeek}</td>
                      <td>{group.startTime}</td>
                      <td>{group.endTime}</td>
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
          <button
            id="cartBtn"
            onClick={openEnrollementModal}
            style={{
              backgroundColor: darkTertiary,
              color: "white",
              border: "1px solid #329bd6",
              padding:"5px",
              borderRadius:"5px"
              // marginLeft: "10px"
            }}
          >
            <span>+</span> Add a New Class
          </button>
        </div>
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
