import React, { useState, useRef } from 'react'
import './settings-team.css'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
import SettingsAddNewTeam from '../../../modals/settings-profile/SettingsAddNewTeam'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import schoolService from '../../../../../services/api/school'
import Loading from '../../../../loader/Loader'

const SchoolSettingsTeams = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false)
  const [showDropdown, setShowDropdown] = useState(null)
  const [showAssignClassModal, setShowAssignClassModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

  const queryClient = useQueryClient()
  const toastId = useRef(null)

  const closeSuccessModal = () => {
    setModalIsOpenSuccess(false)
  }
  const openSuccessModal = () => {
    setModalIsOpenSuccess(true)
  }

  const openAssignClassModal = (teamId) => {
    setSelectedTeamId(teamId);
    const teamMember = adminData?.find((admin) => admin._id === teamId);
    if (teamMember && teamMember.classAssigned) {
      // Deep copy and remove duplicates to ensure clean state
      const uniqueAssigned = teamMember.classAssigned.reduce((acc, current) => {
        const x = acc.find(item => item.stdClass === current.stdClass && item.classTag === current.classTag);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setSelectedClasses(uniqueAssigned);
    } else {
      setSelectedClasses([]);
    }
    setShowAssignClassModal(true);
  };

  const closeAssignClassModal = () => {
    setShowAssignClassModal(false);
    setSelectedTeamId(null);
    setSelectedClasses([]);
  };

  const { user } = useSelector((state) => state.user)

  let schoolId

  if (user?.isSchool) {
    schoolId = user?._id
  } else {
    schoolId = user?.school
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-teams'],
    queryFn: () => schoolService.getAdmins(schoolId),
    enabled: !!schoolId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const { data: enrolledClasses, isLoading: classLoading, isError: classError } = useQuery({
    queryKey: ['school-enrolled-classes'],
    queryFn: () => schoolService.getEnrolledClasses(schoolId),
    enabled: !!schoolId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const adminData = data?.teams
  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleActionClick = (index) => {
    if (user?.isSchool || user?.schoolAdminPermission === "Admin")
      setShowDropdown(showDropdown === index ? null : index)

  }

  const mutation = useMutation({
    mutationFn: schoolService.deleteAdmin,
    onMutate: () => {
      toastId.current = toast.loading('Deleting team member...')
    },
    onSuccess: (data) => {
      toast.update(toastId.current, {
        render: 'Team member deleted successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      setShowDropdown(null)
      queryClient.invalidateQueries(['school-teams'])
      setModalIsOpenSuccess(true)
    },
    onError: (error) => {
      console.log(error)
      toast.update(toastId.current, {
        render: error?.message || 'Error deleting team member',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    },
  })

  const handleDelete = (adminId) => {

    window.confirm('Are you sure you want to remove this team member?') &&
      mutation.mutate(adminId)
  }

  const assignClassMutation = useMutation({
    mutationFn: (data) =>
      schoolService.assignClassToTeamMember(schoolId, selectedTeamId, data),
    onMutate: () => {
      toastId.current = toast.loading('Updating assigned classes...')
    },
    onSuccess: (data) => {
      toast.update(toastId.current, {
        render: 'Classes assigned successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      closeAssignClassModal()
      queryClient.invalidateQueries(['school-enrolled-classes'])
      queryClient.invalidateQueries(['school-teams'])
    },
    onError: (error) => {
      console.log(error)
      toast.update(toastId.current, {
        render: error?.message || 'Error assigning classes',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    },
  })

  // unAssignClassMutation removed as the single assignClassMutation now handles both assign and unassign via full replacement

  const handleToggleClass = (stdClass, classTag) => {
    const exists = selectedClasses.some(
      (c) => c.stdClass === stdClass && c.classTag === classTag
    );

    if (exists) {
      setSelectedClasses(
        selectedClasses.filter(
          (c) => !(c.stdClass === stdClass && c.classTag === classTag)
        )
      );
    } else {
      setSelectedClasses([...selectedClasses, { stdClass, classTag }]);
    }
  };

  const handleSaveClasses = () => {
    if (!selectedTeamId) return;
    assignClassMutation.mutate({ classes: selectedClasses });
  };



  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <div>An error occured while loading...</div>
  }

  return (
    <div style={{ width: "90%" }}>
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div className="teams">
          <h3 style={{ fontSize: "24px" }}>Teams -</h3>
          <p>
            Here is a list of your team mates.
            <br />
            Feel free to add or remove at will.
          </p>
        </div>

        {
          (user?.isSchool || user?.schoolAdminPermission === "Admin") &&
          <button className="edit-btn" onClick={() => setModalIsOpen(true)}>
            Add New Team{" "}
            <span>
              <Icon icon="ic:round-plus" />
            </span>
          </button>
        }

      </div>
      <hr />

      <div className="team-members">
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permission</th>
              <th>Assigned Classes</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminData?.map((admin, index) => (
              <tr key={admin._id}>
                <td>{index + 1}</td>
                <td>{`${admin.fullName}`}</td>
                <td>{admin.email}</td>
                <td>
                  {(admin?.schoolAdminPermission || admin?.newInvite?.schoolAdminPermission) === 'Students'
                    ? 'Class Teacher'
                    : (admin?.schoolAdminPermission || admin?.newInvite?.schoolAdminPermission)}
                </td>
                <td>
                  {admin?.classAssigned && admin.classAssigned.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {admin.classAssigned.map((classItem, idx) => (
                        <span key={idx} style={{
                          backgroundColor: '#e6f7ff',
                          border: '1px solid #1890ff',
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '12px',
                          color: '#1890ff',
                          display: 'inline-block'
                        }}>
                          <strong>{classItem.stdClass}</strong> {classItem.classTag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span style={{ color: '#999' }}>No classes assigned</span>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <span
                    style={{
                      width: "100%",
                      display: "inline-block",
                      color:
                        admin?.schoolAdminStatus !== "Confirmed"
                          ? "red"
                          : "#0CAF60",
                      backgroundColor:
                        admin?.schoolAdminStatus !== "Confirmed"
                          ? "#ffe6e6"
                          : "#e6ffe6",
                      borderRadius: "20px",
                      textAlign: "center",
                    }}
                  >
                    {admin.schoolAdminStatus || admin?.newInvite?.schoolAdminStatus || "Pending"}
                  </span>
                </td>
                <td>
                  {new Date(
                    admin?.schoolAdminDate || admin?.newInvite?.schoolAdminDate
                  ).toLocaleDateString()}
                </td>
                <td>
                  <div className="action-container">
                    <Icon
                      icon="pepicons-pencil:dots-y"
                      width={30}
                      style={{ color: "#000", cursor: "pointer" }}
                      onClick={() => handleActionClick(index)}
                    />
                    {showDropdown === index && (
                      <div
                        style={{
                          padding: "0rem .1rem",
                          borderRadius: "5px",
                          width: "150px",
                        }}
                        className="dropdown"
                      >
                        <button
                          onClick={() => handleDelete(admin._id)}
                          disabled={mutation.isPending}
                        >
                          <span>
                            <Icon icon="fluent:delete-20-regular" />
                          </span>
                          Remove
                        </button>
                        <button
                          onClick={() => openAssignClassModal(admin._id)}
                          disabled={mutation.isPending}
                        >
                          <span>
                            <Icon
                              icon="mdi:pencil"
                              style={{ cursor: 'pointer', color: '#275DAD' }}
                              width={20}
                            />
                          </span>
                          Assign Class
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Course"
        className="send-invite-modal"
        overlayClassName="custom-overlay"
      >
        <SettingsAddNewTeam
          openSuccessModal={openSuccessModal}
          closeModal={closeModal}
        />
      </Modal>
      <Modal
        isOpen={modalIsOpenSuccess}
        onRequestClose={closeSuccessModal}
        contentLabel="Delete Modal"
        className="custom-modal-success-two"
        overlayClassName="custom-overlay"
      >
        <div className="succes-modal-content">
          <div className="success-icon icon-with-bg">
            <div className="circle">
              <div className="checkmark"></div>
            </div>
          </div>
          <h4 className="text-center">Successful</h4>
          <p className="text-center">
            You have successfully added a teammate.
          </p>
        </div>
      </Modal>
      <Modal
        isOpen={showAssignClassModal}
        onRequestClose={closeAssignClassModal}
        contentLabel="Assign Class Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Select a Class</h2>
              <button className="modal-close-btn" onClick={closeAssignClassModal}>
                X
              </button>
            </div>
            <div className="team-modal-body">
              <div className="table-container">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>Class Name</th>
                      <th>Class Tag</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledClasses?.data?.map((course, index) => {
                      const isSelected = selectedClasses.some(
                        (c) =>
                          c.stdClass === course.stdClass &&
                          c.classTag === course.classTag
                      );
                      return (
                        <tr key={index}>
                          <td>{course.stdClass}</td>
                          <td>{course.classTag}</td>
                          <td style={{ textAlign: "center" }}>
                            <input
                              type="checkbox"
                              style={{ width: "20px", height: "20px", cursor: "pointer" }}
                              checked={isSelected}
                              onChange={() =>
                                handleToggleClass(course.stdClass, course.classTag)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "1rem", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={handleSaveClasses}
                  disabled={assignClassMutation.isPending}
                  style={{
                    backgroundColor: "#275DAD",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    opacity: assignClassMutation.isPending ? 0.7 : 1
                  }}
                >
                  {assignClassMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SchoolSettingsTeams
