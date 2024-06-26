import { useState } from 'react'
import './email-notifications.css'
import Modal from 'react-modal'
import { Icon } from '@iconify/react'
import SettingsAddEmailNotificationModal from '../../../modals/settings-profile/SettingsAddEmailNotificationModal'
const SchooolSettingsEmailNotifications = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false)
  const [showDropdown, setShowDropdown] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedTable, setSelectedTable] = useState(null)

  const teamMembersData = [
    {
      id: 1,
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      permission: 'Superadmin',
      status: 'Active',
      dateAdded: '22-09-23',
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'johnsmith@gmail.com',
      permission: 'Admin',
      status: 'Inactive',
      dateAdded: '15-10-23',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alicejohnson@gmail.com',
      permission: 'User',
      status: 'Active',
      dateAdded: '30-11-23',
    },
  ]

  const notificationsEmailsData = [
    {
      id: 1,
      name: 'Emily Clark',
      email: 'emilyclark@gmail.com',
      permission: 'Notification',
      status: 'Active',
      dateAdded: '12-05-23',
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'michaelbrown@gmail.com',
      permission: 'Notification',
      status: 'Inactive',
      dateAdded: '17-08-23',
    },
    {
      id: 3,
      name: 'Sarah Davis',
      email: 'sarahdavis@gmail.com',
      permission: 'Notification',
      status: 'Active',
      dateAdded: '25-11-23',
    },
  ]

  const [teamMembers, setTeamMembers] = useState(teamMembersData)
  const [notificationsEmails, setNotificationsEmails] = useState(
    notificationsEmailsData
  )

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

  const handleDelete = () => {
    if (selectedTable === 'teamMembers') {
      setTeamMembers(
        teamMembers.filter((member) => member.id !== selectedMember.id)
      )
    } else if (selectedTable === 'notificationsEmails') {
      setNotificationsEmails(
        notificationsEmails.filter((member) => member.id !== selectedMember.id)
      )
    }
    closeModal()
    alert('Successfully deleted')
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
          <span>
            <Icon icon='ic:round-plus' />
          </span>
          Edit Profile
        </button>
      </div>
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
          {teamMembers.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.permission}</td>
              <td>{member.status}</td>
              <td>{member.dateAdded}</td>
              <td>
                <div className='action-container'>
                  <Icon
                    icon='pepicons-pencil:dots-y'
                    onClick={() => handleActionClick(index)}
                  />
                  {showDropdown === index && (
                    <div className='dropdown'>
                      <button onClick={() => setModalIsOpenSuccess(true)}>
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
