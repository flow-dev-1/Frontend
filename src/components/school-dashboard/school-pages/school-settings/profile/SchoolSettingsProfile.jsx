import { useState } from 'react'
import './settings-profile.css'
import logo from '../../../../../assets/school-logo.png'
import { Icon } from '@iconify/react'
import SettingsEditProfileModal from '../../../modals/settings-profile/SettingsEditProfileModal'
import Modal from 'react-modal'
import NG from '../../../../../assets/Flag_of_Nigeria.png'
import schoolLogo from '../../../../../assets/school-logo.png'
import { useQuery } from '@tanstack/react-query'
import schoolService from '../../../../../services/api/school'
import { useSelector } from 'react-redux'
import Loading from '../../../../loader/Loader'

const SchoolSettingsProfile = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedTable, setSelectedTable] = useState(null)

  const { user } = useSelector((state) => state.user)

  let schoolId

  // ToDO: Do a check if its a school or a user
  if (user?.isSchool) {
    schoolId = user?._id
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-profile'],
    queryFn: () => schoolService.getMyProfile(schoolId),
    enabled: !!schoolId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  console.log(data)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setSelectedMember(null)
    setSelectedTable(null)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='school-profile'>
      <div className='heading-flex'>
        <div className='school-header'>
          <div style={{ width: '180px' }} className='school-logo'>
            <img
              style={{ display: 'block', width: '100%' }}
              src={data?.school?.photo ? data?.school?.photo : schoolLogo}
              alt='School Logo'
            />
          </div>
          <div className='school-info'>
            <h1 className='h1'>{data?.school?.school_name}</h1>
            <p className='primary'>{data?.school?.grade}</p>
            <p>{data?.school?.address}</p>
            <p>
              {data?.school?.lga.toUpperCase()} |{' '}
              {data?.school?.state.toUpperCase()}
            </p>
            <p>
              {data?.school?.country.toUpperCase()}{' '}
              <img src={NG} width={20} alt='' />
            </p>
          </div>
        </div>
        <button className='edit-btn' onClick={openModal}>
          <span>
            <Icon icon='ic:round-plus' />
          </span>
          Edit Profile
        </button>
      </div>

      <div
        id='banner'
        className='heading banner'
        style={{
          backgroundColor: '#329bd6',
          padding: '1rem',
          borderRadius: '5px',
        }}
      >
        <p>
          <span style={{ margin: '0', fontSize: '14px' }}>Contact Person:</span>{' '}
          {data?.school?.contact_name}
        </p>
        <p>
          <span style={{ margin: '0', fontSize: '14px' }}>Email:</span>{' '}
          {data?.school?.email}
        </p>
        <p>
          <span style={{ margin: '0', fontSize: '14px' }}>Phone Number:</span>{' '}
          {data?.school?.phone}
        </p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Edit Course'
        className='custom-modal-otp-three'
        overlayClassName='custom-overlay'
      >
        <SettingsEditProfileModal
          closeModal={closeModal}
          school={data?.school}
        />
      </Modal>
    </div>
  )
}

export default SchoolSettingsProfile
