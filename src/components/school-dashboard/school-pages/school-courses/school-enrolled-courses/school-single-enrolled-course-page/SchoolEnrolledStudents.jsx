import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import './enrolled-courses.css'
import backgroundImage from '../../../../../../assets/bg-monky.png' // Make sure to replace with the correct path to the uploaded image
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { decryptId } from '../../../../../../utils/encryption'
import Modal from 'react-modal'
import DeleteStudentModal from '../../../../modals/students/DeleteStudentModal'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import excelDoc from '../../../../../../assets/flow-doc.xlsx'
import schoolService from '../../../../../../services/api/school'
import { RotatingLines } from 'react-loader-spinner'
import Loading from '../../../../../loader/Loader'
import AddStudentModal from './AddStudentsModal'

const schema = yup.object().shape({
  students: yup
    .string()
    .test('emails', 'Invalid email(s)', (value) => {
      const emails = value.split(',').map((email) => email.trim())
      // Check if there is at least one email and all emails are valid
      return (
        emails.length > 0 &&
        emails.every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      )
    })
    .required('At least one email is required'),
})

const SchoolEnrolledStudents = () => {
  const queryClient = useQueryClient()
  const { user } = useSelector((state) => state.user)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [deleteUserCredentials, setDeleteUser] = useState({
    user: null,
    enrollId: null,
  })

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const [enrollmentData, setData] = useState({})
  const handleCreateClick = () => {
    setShowCreateModal(true)
  }

  const closeModals = () => {
    setShowCreateModal(false)
    setShowDeleteModal(false)
  }

  let schoolId

  // ToDO: Do a check if its a school or a user
  if (user?.isSchool) {
    schoolId = user?._id
  }
  const navigate = useNavigate()
  const { id } = useParams()
  console.log(schoolId, decryptId(id))

  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-single-courses'],
    queryFn: () => schoolService.getEnrolledCourseData(schoolId, decryptId(id)),
    enabled: !!id,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  })

  console.log('Enrolled data ', data)

  useEffect(() => {
    if (!data) return
    setData(data?.course)
    return () => {}
  }, [data])

  const formatDate = (isoString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(isoString).toLocaleDateString(undefined, options)
  }

  const genderCount = (item) => {
    if (!item) return
    const male = item.filter((data) => data.user.gender === 'male')?.length || 0
    const female =
      item.filter((data) => data.user.gender === 'female')?.length || 0
    return {
      male,
      female,
    }
  }

  const itemsPerPage = 8 // Customize how many items per page
  const totalItems = enrollmentData?.studentEnrollments?.length || 0
  const [currentPage, setCurrentPage] = useState(1)

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems)

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < totalItems) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function convertTo12HourFormat(time) {
    if (!time) return
    // Split the time string into hours and minutes
    const [hour, minute] = time.split(':').map(Number)

    // Determine if it's AM or PM
    const period = hour >= 12 ? 'PM' : 'AM'

    // Convert hour from 24-hour to 12-hour format
    const twelveHour = hour % 12 || 12 // Converts "0" hour to "12"

    // Return the formatted time
    return `${twelveHour}:${minute.toString().padStart(2, '0')} ${period}`
  }
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const emails = XLSX.utils
          .sheet_to_json(worksheet, { header: 1 })
          .flat()
          .filter((email) => typeof email === 'string' && validateEmail(email))
        const currentEmails = getValues('students').trim()
        const currentEmailsArray = currentEmails
          ? currentEmails.split(',').map((email) => email.trim())
          : []
        const mergedEmails = [...new Set([...currentEmailsArray, ...emails])]
        setValue('students', mergedEmails.join(', '))
      }
      reader.readAsArrayBuffer(file)
    }
  }
  // console.log(data?.course?.course?.image)

  const mutation = useMutation({
    mutationFn: (data) =>
      schoolService.enrollStudentsIntoCourse(schoolId, decryptId(id), data),
    onSuccess: (data) => {
      console.log('Mutation success:', data)
      toast.success('Enrollment successful')
      queryClient.invalidateQueries(['school-single-courses'])
      reset()
      closeModals()
    },
    onError: (error) => {
      console.error('Mutation error:', error)
      toast.error(error?.message || 'Enrollment failed')
    },
  })

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }
  const handleExcelDownload = () => {
    const link = document.createElement('a')
    link.href = excelDoc
    link.download = 'template.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const deleteMutation = useMutation({
    mutationFn: () =>
      schoolService.unEnrollStudentsFromCourse(
        enrollmentData._id,
        deleteUserCredentials.user,
        deleteUserCredentials.enrollId
      ),
    onSuccess: (data) => {
      console.log('Mutation success:', data)
      toast.success('User UnEnrolled successfully!')
      queryClient.invalidateQueries(['school-single-courses'])
      reset()
      closeModals()
    },
    onError: (error) => {
      console.error('Mutation error:', error)
      toast.error(error?.message || 'Enrollment failed')
    },
  })

  const deleteUser = () => {
    deleteMutation.mutate()
  }

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <div>An error occured while loading...</div>
  }

  return (
    <div className='enrolled-course-student'>
      <div className='header'>
        <button className='back-button' onClick={() => navigate(-1)}>
          <Icon icon='mingcute:arrow-left-line' width={20} /> Back
        </button>
        <p>Self Awareness</p>
        <button className='add-student-button' onClick={handleCreateClick}>
          + Add New Student
        </button>
      </div>

      <div className='image-container'>
        <img
          src={backgroundImage}
          alt='Background'
          className='background-image'
        />
      </div>
      <div className='info-bar'>
        <div className='info-item'>
          <p>Class Enrolled:</p>
          <p>{enrollmentData.stdClass}</p>
        </div>
        <div className='info-item'>
          <p>Enrollment Date:</p>
          <p>{formatDate(enrollmentData?.createdAt || Date.now())}</p>
        </div>
        <div className='info-item'>
          <p>No. of Students:</p>
          <p>{enrollmentData?.studentEnrollments?.length}</p>
        </div>
        <div className='info-item'>
          <p>Female:</p>
          <p>{genderCount(enrollmentData?.studentEnrollments)?.female}</p>
        </div>
        <div className='info-item'>
          <p>Male:</p>
          <p>{genderCount(enrollmentData?.studentEnrollments)?.male}</p>
        </div>
        <div className='info-item'>
          <p>Day of the Week:</p>
          <p>{enrollmentData?.dayOfWeek}</p>
        </div>
        <div className='info-item'>
          <p>Start Time:</p>
          <p>{convertTo12HourFormat(enrollmentData?.startTime)}</p>
        </div>
        <div style={{ border: 'none' }} className='info-item'>
          <p style={{ border: 'none' }}>End Time:</p>
          <p style={{ border: 'none' }}>
            {convertTo12HourFormat(enrollmentData?.endTime)}
          </p>
        </div>
      </div>

      <div className='search-bar'>
        <form action='' className='search'>
          <div className='search-wrapper'>
            <span className='search-icon'>
              <Icon icon='lets-icons:search' style={{ color: '#4d4d4d' }} />
            </span>
            <input
              type='text'
              id='search-input'
              placeholder='Search by Name, Age, Email, Phone Number'
            />
          </div>

          <div className='d-flex'>
            <div className='filter-sort'>
              <label>
                <Icon icon='gridicons:filter' style={{ color: '#4d4d4d' }} />
                <select name='' id='' className='filter'>
                  <option value='' selected disabled>
                    Filter by
                  </option>
                  <option value=''>All</option>
                  <option value=''>Students</option>
                  <option value=''>Teachers</option>
                </select>
              </label>
            </div>
            <div className='filter-sort'>
              {' '}
              <label>
                <Icon
                  icon='ic:outline-sort-by-alpha'
                  style={{ color: '#4d4d4d' }}
                />
                <select name='' id='' className='sort'>
                  <option value='' selected>
                    Sort by
                  </option>
                  <option value=''>Sort by</option>
                </select>
              </label>
            </div>
          </div>
        </form>
      </div>
      <hr />
      <div className='table-container'>
        <table id='my-table' className='students-table'>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {enrollmentData?.studentEnrollments?.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`users/${data?.user?._id}`)}
                >
                  {data?.user?.first_name} {data?.user?.last_name}
                </td>
                <td>{data?.user?.email}</td>
                <td>{data?.user?.phone}</td>
                <td>{data?.user?.gender === 'male' ? 'M' : 'F'}</td>
                <td>
                  {new Date().getFullYear() -
                    new Date(data?.user?.DOB).getFullYear()}
                </td>
                <td>{data?.progress}%</td>
                <td style={{ width: '205px' }}>
                  <Icon
                    icon='mynaui:trash'
                    className='action-icon delete-icon'
                    style={{
                      color: '#000000',
                      display: 'inline-block',
                      marginRight: '7rem',
                    }}
                    width={22}
                    onClick={() => {
                      setDeleteUser({
                        user: data.user._id,
                        enrollId: data._id,
                      })
                      handleDeleteClick()
                    }}
                  />
                  <Icon
                    icon='iconamoon:arrow-right-2-thin'
                    className='action-icon arrow-icon'
                    width={22}
                    style={{ color: '#000000' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='nav-btn'>
          <p>
            {startItem} - {endItem} of {totalItems}
          </p>
          <div>
            <Icon icon='iconamoon:arrow-left-2-light' width={25} />
            <Icon icon='iconamoon:arrow-right-2-light' width={25} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={showCreateModal}
        onRequestClose={closeModals}
        contentLabel='Example Modal'
        className='custom-modal-otp-three'
        overlayClassName='custom-overlay'
      >
        <AddStudentModal onRequestClose={closeModals} />
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={closeModals}
        contentLabel='Delete Course'
        className='custom-modal-success'
        overlayClassName='custom-overlay'
      >
        <DeleteStudentModal
          closeModal={closeModals}
          handleDeleteUser={deleteUser}
          isPending={deleteMutation.isPending}
        />
      </Modal>
    </div>
  )
}

export default SchoolEnrolledStudents
