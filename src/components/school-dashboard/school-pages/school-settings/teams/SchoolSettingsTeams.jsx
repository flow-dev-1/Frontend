import React, { useState } from 'react'
import './settings-team.css'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
import SettingsAddNewTeam from '../../../modals/settings-profile/SettingsAddNewTeam'
import { useQuery, useMutation } from '@tanstack/react-query'
import adminService from '../../../../../services/api/user'
import { RotatingLines } from 'react-loader-spinner' // Import the loading spinner
import { toast } from 'react-toastify'

const SchoolSettingsTeams = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false)
  const [showDropdown, setShowDropdown] = useState(null)

  const {
    data: admins,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['get-admin-roles'],
    queryFn: adminService.getAdmins,
  })

  const adminData = admins?.admins

  // const deleteMutation = useMutation({
  //   mutationFn: (postId) => adminService.deleteAdmin(postId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['get-admin-roles'])
  //     toast.success('Admin deleted successfully')
  //     setModalIsOpenSuccess(false)
  //   },
  //   onError: (error) => {
  //     console.error('Like error:', error)
  //     toast.error(error.message)
  //     setModalIsOpenSuccess(false)
  //   },
  // })

  const closeModal = () => {
    setModalIsOpen(false)
    setModalIsOpenSuccess(false)
  }

  const handleActionClick = (index) => {
    setShowDropdown(showDropdown === index ? null : index)
  }

  // const handleDelte = (postId) => {
  //   deleteMutation.mutate(postId)
  // }
  return (
    <div>
      <div className='d-flex justify-content-between align-items-end mb-4'>
        <div className='teams'>
          <h3>Teams</h3>
          <p>
            Here is a list of your teammates. Feel free to add or remove at
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
                  {admin.adminType === '66753525c372d9ce450a405f'
                    ? 'Super-Admin'
                    : 'Admin'}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      color: admin.isVerified ? 'green' : 'red',
                      backgroundColor: admin.isVerified ? '#e6ffe6' : '#ffe6e6',
                      padding: '5px 10px',
                      borderRadius: '20px',
                      textAlign: 'center',
                      margin: '1rem 0',
                    }}
                  >
                    {' '}
                    {admin.isVerified ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className='action-container'>
                    <Icon
                      icon='pepicons-pencil:dots-y'
                      onClick={() => handleActionClick(index)}
                    />
                    {showDropdown === index && (
                      <div className='dropdown'>
                        <button>
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
            You have successfully invited a teammate.
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
