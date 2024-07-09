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
  const queryClient = useQueryClient()
  const toastId = useRef(null)

  const { user } = useSelector((state) => state.user)

  let schoolId

  if (user.isSchool) {
    schoolId = user._id
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-teams'],
    queryFn: () => schoolService.getAdmins(schoolId),
    enabled: !!schoolId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const adminData = data?.teams?.team

  const closeModal = () => {
    setModalIsOpen(false)
    setModalIsOpenSuccess(false)
  }

  const handleActionClick = (index) => {
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
    if (!window.confirm('Are you sure you want to delete this team member?'))
      return
    mutation.mutate(adminId)
  }

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <div>An error occured while loading...</div>
  }

  return (
    <div>
      <div className='d-flex justify-content-between align-items-end mb-4'>
        <div className='teams'>
          <h3>Teams</h3>
          <p>
            Here is a list of your team mates. Feel free to add or remove at
            will.
          </p>
        </div>
        <button className='edit-btn' onClick={() => setModalIsOpen(true)}>
          Add New Team +
        </button>
      </div>

      <div className='team-members'>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permission</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminData?.map((admin, index) => (
              <tr key={admin._id}>
                <td>{index + 1}</td>
                <td>{`${admin.first_name} ${admin.last_name}`}</td>
                <td>{admin.email}</td>
                <td>
                  {admin.school === data?.teams?._id
                    ? admin?.schoolAdminPermission
                    : admin?.newInvite?.schoolAdminPermission}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      color:
                        admin.schoolAdminStatus !== 'Confirmed'
                          ? 'red'
                          : 'green',
                      backgroundColor:
                        admin.schoolAdminStatus !== 'Confirmed'
                          ? '#ffe6e6'
                          : '#e6ffe6',
                      padding: '5px 10px',
                      borderRadius: '20px',
                      textAlign: 'center',
                      margin: '1rem 0',
                    }}
                  >
                    {' '}
                    {admin.school === data?.teams?._id
                      ? admin.schoolAdminStatus
                      : 'Pending'}
                  </span>
                </td>
                <td>
                  {new Date(
                    admin.school === data?.teams?._id
                      ? admin?.schoolAdminDate
                      : admin?.newInvite?.schoolAdminDate
                  ).toLocaleDateString()}
                </td>
                <td>
                  <div className='action-container'>
                    <Icon
                      icon='pepicons-pencil:dots-y'
                      onClick={() => handleActionClick(index)}
                    />
                    {showDropdown === index && (
                      <div className='dropdown'>
                        <button
                          onClick={() => handleDelete(admin._id)}
                          disabled={mutation.isPending}
                        >
                          <span>
                            <Icon icon='fluent:delete-20-regular' />
                          </span>
                          Delete
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
        isOpen={modalIsOpenSuccess}
        onRequestClose={closeModal}
        contentLabel='Delete Modal'
        className='custom-modal-success'
        overlayClassName='custom-overlay'
      >
        <div className='succes-modal-content'>
          <div className='success-icon icon-with-bg'>
            <div className='circle'>
              <div className='checkmark'></div>
            </div>
          </div>
          <h4 className='text-center'>Successful</h4>
          <p className='text-center'>
            You have successfully Deleted a team member.
          </p>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Edit Course'
        className='send-invite-modal'
        overlayClassName='custom-overlay'
      >
        <SettingsAddNewTeam closeModal={closeModal} />
      </Modal>
    </div>
  )
}

export default SchoolSettingsTeams
