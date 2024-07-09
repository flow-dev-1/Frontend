import React, { useState, useRef } from 'react'
import './email-notifications.css'
import Modal from 'react-modal'
import { Icon } from '@iconify/react'
import SettingsAddEmailNotificationModal from '../../../modals/settings-profile/SettingsAddEmailNotificationModal'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import schoolService from '../../../../../services/api/school'
import Loading from '../../../../loader/Loader'

const SchooolSettingsEmailNotifications = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false)
  const [showDropdown, setShowDropdown] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedTable, setSelectedTable] = useState(null)

  const queryClient = useQueryClient()
  const toastId = useRef(null)

  const { user } = useSelector((state) => state.user)

  let schoolId

  if (user.isSchool) {
    schoolId = user._id
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-email-team'],
    queryFn: () => schoolService.getEmailAdmins(schoolId),
    enabled: !!schoolId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const openModal = (member, table) => {
    setSelectedMember(member)
    setSelectedTable(table)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setModalIsOpenSuccess(false)
    setSelectedMember(null)
    setSelectedTable(null)
  }

  const handleActionClick = (index) => {
    setShowDropdown(showDropdown === index ? null : index)
  }

  const mutation = useMutation({
    mutationFn: schoolService.deleteEmailAdmin,
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
      queryClient.invalidateQueries(['school-email'])
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

  const teamMembers = data?.teams?.email_notification || []

  console.log(teamMembers)

    if (isLoading) {
      return <Loading />
    }
    if (isError) {
      return <div>An error occured while loading...</div>
    }

  return (
    <div>
      <div className='d-flex justify-content-between align-items-end mb-4 '>
        <div className='teams '>
          <h3>Email Notification -</h3>
          <p className='paragraph-width'>
            You can add one or more email address to receive system triggered
            notifications like new invoices, low balance, subscription expiry or
            scheduled maintenance. <br /> <br />
            To do so, ensure the person is already a team member added to this
            account.
          </p>
        </div>
        <button className='edit-btn' onClick={() => setModalIsOpen(true)}>
          Add Email
          <span>
            <Icon icon='ic:round-plus' />
          </span>
        </button>
      </div>
      <table>
        <thead  className='thead'>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Permission</th> */}
            <th>Status</th>
            <th>Date Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>
                {member.first_name} {member.last_name}
              </td>
              <td>{member.email}</td>
              {/* <td>{member.position}</td> */}
              <td
                style={{
                  color: 'green',
                  backgroundColor: '#e6ffe6',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  textAlign: 'center',
                  margin: '1rem 0',
                }}
              >
                Active
              </td>
              <td>{new Date(member?.dateAdded).toLocaleDateString()}</td>
              <td>
                <div className='action-container'>
                  <Icon
                    icon='pepicons-pencil:dots-y'
                    onClick={() => handleActionClick(index)}
                  />
                  {showDropdown === index && (
                    <div className='dropdown'>
                      <button
                        onClick={() => handleDelete(member._id)}
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Edit Course'
        className='send-invite-modal'
        overlayClassName='custom-overlay'
      >
        <SettingsAddEmailNotificationModal closeModal={closeModal} />
      </Modal>
    </div>
  )
}

export default SchooolSettingsEmailNotifications
