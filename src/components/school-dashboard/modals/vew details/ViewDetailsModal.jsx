import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import "./view.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import schoolService from "../../../../services/api/school";

const ViewDetailsModal = ({
  onClose,
  encryptURI,
  courseId
}) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.user);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserCredentials, setDeleteUser] = useState({
    user: null,
    enrollId: null
  });

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };
  console.log(courseId)

  const [enrollmentData, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const closeModals = () => {
    setShowCreateModal(false);
    setShowDeleteModal(false);
  };
const selectModal = (id) => {
  navigate(
    `/school-dashboard/courses/enrolled/${encryptURI(
      id
    )}`
  );
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
 console.log(data?.courses)


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          X
        </button>
        <div className="modal-header">
          <h2>Enrollment Details</h2>
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
                          onClick={()=>selectModal(group._id)}
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
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
