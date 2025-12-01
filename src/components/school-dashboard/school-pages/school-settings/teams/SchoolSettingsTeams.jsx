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
    setShowAssignClassModal(true);
  };

  const closeAssignClassModal = () => {
    setShowAssignClassModal(false);
    setSelectedTeamId(null);
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
      toastId.current = toast.loading('Assigning class...')
    },
    onSuccess: (data) => {
      toast.update(toastId.current, {
        render: 'Class assigned successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      closeAssignClassModal()
      setSelectedTeamId(null);
      queryClient.invalidateQueries(['school-enrolled-classes'])
      queryClient.invalidateQueries(['school-teams'])
    },
    onError: (error) => {
      console.log(error)
      toast.update(toastId.current, {
        render: error?.message || 'Error assigning class',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    },
  })

  const unAssignClassMutation = useMutation({
    mutationFn: (data) =>
      schoolService.assignClassToTeamMember(schoolId, selectedTeamId, data),
    onMutate: () => {
      toastId.current = toast.loading('Unassigning class...')
    },
    onSuccess: (data) => {
      toast.update(toastId.current, {
        render: 'Class unassigned successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      closeAssignClassModal()
      setSelectedTeamId(null);
      queryClient.invalidateQueries(['school-teams'])
    },
    onError: (error) => {
      toast.update(toastId.current, {
        render: error?.message || 'Error unassigning class',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    },
  })

  const handleAssignClass = (type, stdClass, classTag) => {
    if (!selectedTeamId) {
      toast.error('Please select a team member')
      return
    }


    const teamMember = adminData?.find(admin => admin._id === selectedTeamId)
    const isClassAssigned = teamMember?.classAssigned?.some(
      c => c.stdClass === stdClass && c.classTag === classTag
    )

    if (isClassAssigned) {
      if (!window.confirm(`Are you sure you want to Unassign ${stdClass} (${classTag}) from this team member?`)) return
      unAssignClassMutation.mutate({ stdClass, classTag, unAssign: true })
    } else {
      if (!window.confirm(`Are you sure you want to Assign ${stdClass} (${classTag}) to this team member?`)) return
      assignClassMutation.mutate({ stdClass, classTag })
    }
  }



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
          user?.isSchool || user?.schoolAdminPermission === "Admin" &&
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
                  {admin?.schoolAdminPermission || admin?.newInvite?.schoolAdminPermission}
                </td>
                <td>
                  {admin?.classAssigned && admin.classAssigned.length > 0 ? (
                    <div>
                      {admin.classAssigned.map((classItem, idx) => (
                        <div key={idx} style={{ marginBottom: '8px' }}>
                          <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
                            <strong>{classItem.stdClass}</strong> {classItem.classTag}
                          </p>

                        </div>
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
            You have successfully invited a teammate.
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
                    {enrolledClasses?.data?.map((course, index) => (
                      <tr key={index}>
                        <td>{course.stdClass}</td>
                        <td>{course.classTag}</td>
                        <td>

                          <button
                            onClick={() => {
                              handleAssignClass(course._id, course.stdClass, course.classTag);
                            }}
                            style={{
                              backgroundColor: adminData?.find(a => a._id === selectedTeamId)?.classAssigned?.some(
                                c => c.stdClass === course.stdClass && c.classTag === course.classTag
                              ) ? '#dc3545' : '#275DAD',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                            }}
                          >
                            {adminData?.find(a => a._id === selectedTeamId)?.classAssigned?.some(
                              c => c.stdClass === course.stdClass && c.classTag === course.classTag
                            ) ? 'Unassign' : 'Assign'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SchoolSettingsTeams
