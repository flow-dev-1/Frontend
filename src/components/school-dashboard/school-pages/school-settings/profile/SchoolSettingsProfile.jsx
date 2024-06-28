import { useState } from 'react'
import './settings-profile.css'
import logo from '../../../../../assets/school-logo.png'
import { Icon } from '@iconify/react'
import SettingsEditProfileModal from '../../../modals/settings-profile/SettingsEditProfileModal'
import Modal from 'react-modal'
import { useQuery } from '@tanstack/react-query'
import schoolService from '../../../../../services/api/school'
import { useSelector } from 'react-redux'

const SchoolSettingsProfile = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedTable, setSelectedTable] = useState(null)


  const { user } = useSelector((state) => state.user);

  let schoolId;

  // ToDO: Do a check if its a school or a user
  if (user.isSchool) {
    schoolId = user._id
  }


  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-profile'],
    queryFn: () => schoolService.getMyProfile(schoolId),
    enabled: !!schoolId,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });



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


  return (
    <div className='school-profile'>
      <div className='heading-flex'>
        <div className='school-header'>
          <div className='school-logo'>
            <img src={data?.school?.photo} alt='School Logo' />
          </div>
          <div className='school-info'>
            <h1 className='h1'>{data?.school?.school_name}</h1>
            <p>{data?.school?.address}</p>
            <p>{data?.school?.lga} | {data?.school?.state}</p>
            <p>{data?.school?.country} 🇳🇬</p>
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
          <span>Contact Person:</span> {data?.school?.contact_name}
        </p>
        <p>
          <span>Email:</span> {data?.school?.email}
        </p>
        <p>
          <span>Phone Number:</span> {data?.school?.phone}
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
