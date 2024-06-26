import { useState } from 'react'
import './settings-profile.css'
import logo from '../../../../../assets/school-logo.png'
import { Icon } from '@iconify/react'
import SettingsEditProfileModal from '../../../modals/settings-profile/SettingsEditProfileModal'
import Modal from 'react-modal'

const SchoolSettingsProfile = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedTable, setSelectedTable] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

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
    <div className='school-profile'>
      <div className='heading-flex'>
        <div className='school-header'>
          <div className='school-logo'>
            <img src={logo} alt='School Logo' />
          </div>
          <div className='school-info'>
            <h1 className='h1'>Greensprings School</h1>
            <p>22, Awolowo Way, Ikoyi</p>
            <p>LGA | STATE</p>
            <p>NIGERIA 🇳🇬</p>
          </div>
        </div>
        <button className='edit-btn' onClick={() => setModalIsOpen(true)}>
          <span>
            <Icon icon='ic:round-plus' />
          </span>
          Edit Profile
        </button>
      </div>

      <div className='heading banner'>
        <p>
          <span>Contact Person:</span> Mrs. Justina Joe
        </p>
        <p>
          <span>Email:</span> AdeyemiB@greensprings.com
        </p>
        <p>
          <span>Phone Number:</span> +2348123456789
        </p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Edit Course'
        className='edit-course-modal-custom'
        overlayClassName='custom-overlay'
      >
        <SettingsEditProfileModal closeModal={closeModal} />
      </Modal>
    </div>
  )
}

export default SchoolSettingsProfile
