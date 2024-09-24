import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import "./view.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import schoolService from "../../../../services/api/school";

const ViewDetailsModal = ({
  onClose,
  enrolledData,
  encryptURI,
  courseIndex,
  enrollmentid
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

  const [enrollmentData, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const closeModals = () => {
    setShowCreateModal(false);
    setShowDeleteModal(false);
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
    queryFn: () => schoolService.getEnrolledCourseData(schoolId, enrollmentid)
  });

  // Function to group data by stdClass
  const selectModal = ()=>{
    navigate(
      `/school-dashboard/courses/enrolled/${encryptURI(
        enrolledData.courses[courseIndex]._id
      )}`)
  }
  const groupByClass = (enrollments) => {
    const grouped = {};

    enrollments.forEach((enrollment) => {
      const { stdClass } = enrollment;

      if (!grouped[stdClass]) {
        grouped[stdClass] = {
          stdClass: stdClass || "N/A",
          studentsCount: 0,
          dayOfWeek: enrollment.dayOfWeek || "N/A",
          startTime: enrollment.startTime || "N/A",
          endTime: enrollment.endTime || "N/A"
        };
      }
      grouped[stdClass].studentsCount += 1; // Increment student count
    });

    return Object.values(grouped); // Convert the object to an array for rendering
  };

  useEffect(() => {
    if (!data) return;
    const processedData = groupByClass(data?.course?.studentEnrollments || []);
    setGroupedData(processedData);
  }, [data]);

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
                {groupedData?.map((group, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{group.stdClass}</td>
                    <td>{group.studentsCount}</td>
                    <td>{group.dayOfWeek}</td>
                    <td>{group.startTime}</td>
                    <td>{group.endTime}</td>
                    <td>
                      <Icon
                        icon="iconamoon:arrow-right-2-thin"
                        className="action-icon arrow-icon"
                        width={22}
                        style={{ color: "#000000" }}
                        onClick={selectModal}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
