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

const schema = yup.object().shape({
  students: yup
    .string()
    .test('emails', 'Invalid email(s)', (value) => {
      const emails = value.split(',').map(email => email.trim());
      // Check if there is at least one email and all emails are valid
      return emails.length > 0 && emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    })
    .required('At least one email is required'),
});

const SchoolEnrolledStudents = () => {
  const queryClient = useQueryClient()
  const { user } = useSelector((state) => state.user)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [deleteUserCredentials, setDeleteUser] = useState({ user: null, enrollId: null })

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
  if (user.isSchool) {
    schoolId = user._id
  }
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['school-single-courses'],
    queryFn: () => schoolService.getEnrolledCourseData(schoolId, decryptId(id)),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!data) return
    setData(data.course)
    return () => { }
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
          .filter((email) => typeof email === 'string' && validateEmail(email));
        const currentEmails = getValues('students').trim();
        const currentEmailsArray = currentEmails ? currentEmails.split(',').map(email => email.trim()) : [];
        const mergedEmails = [...new Set([...currentEmailsArray, ...emails])];
        setValue('students', mergedEmails.join(', '));
      };
      reader.readAsArrayBuffer(file)
    }
  }

  const mutation = useMutation({
    mutationFn: (data) => schoolService.enrollStudentsIntoCourse(schoolId, decryptId(id), data),
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

  const onSubmit = (data) => {

    if (!window.confirm('Are you sure you want to enroll the students for this course?')) return

    const emailsArray = data.students.split(',').map(email => email.trim()).filter(email => validateEmail(email))
    const finalData = { ...data, students: emailsArray, stdClass: enrollmentData.stdClass }

    mutation.mutate(finalData)
  }

  const deleteMutation = useMutation({
    mutationFn: () => schoolService.unEnrollStudentsFromCourse(enrollmentData._id, deleteUserCredentials.user, deleteUserCredentials.enrollId),
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

  return (
    <div className='enrolled-course-student'>
      <div className='header'>
        <button className='back-button' onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className='create-course-container'>
        {' '}
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
        <div className='info-item'>
          <p>End Time:</p>
          <p>{convertTo12HourFormat(enrollmentData?.endTime)}</p>
        </div>
      </div>
      <div className='table-container'>
        <table className='students-table'>
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
                <td>
                  {data?.user?.first_name} {data?.user?.last_name}
                </td>
                <td>{data?.user?.email}</td>
                <td>{data?.user?.phone}</td>
                <td>{data?.user?.gender === 'male' ? 'M' : 'F'}</td>
                <td>{data?.user?.age}</td>
                <td>{data?.progress}%</td>
                <td>
                  <Icon
                    icon='mynaui:trash'
                    className='action-icon delete-icon'
                    width={18}
                    onClick={() => {
                      setDeleteUser({ user: data.user._id, enrollId: data._id })
                      handleDeleteClick()
                    }}
                  />
                  <Icon
                    icon='iconamoon:arrow-right-2-thin'
                    className='action-icon arrow-icon'
                    width={18}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={showCreateModal}
        onRequestClose={closeModals}
        contentLabel='Example Modal'
        className='custom-modal-otp-three'
        overlayClassName='custom-overlay'
      >
        <div>
          <h2 className='text-center'>Add New Student(s)</h2>
          <hr style={{ marginBottom: '5px' }} />
          <div>
            <p style={{ color: '#FD483D', fontSize: '12px' }}>
              *Indicates Required
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex-container'>
              <div>
                <label htmlFor=''>Student Email *</label>
                <textarea
                  id='student-email'
                  name='student-email'
                  placeholder='Enter email addresses here'
                  rows={3}
                  cols={50}
                  {...register('students')}
                />
                {errors.students && (
                  <p className='error-message'>{errors.students.message}</p>
                )}
              </div>
              <div className='upload'>
                <label htmlFor='file-upload'>
                  Or Upload file here (CSV, Excel) *
                </label>
                <div className='file-upload-wrapper'>
                  <input
                    type='file'
                    id='file-upload'
                    className='file-upload-input'
                    onChange={handleFileUpload}
                  />
                  <label htmlFor='file-upload' className='file-upload-label'>
                    Choose file
                    <Icon
                      icon='ant-design:upload-outlined'
                      width='24'
                      height='24'
                    />
                  </label>
                </div>
                <span
                  style={{ fontSize: '12px', cursor: 'pointer' }}
                  onClick={handleExcelDownload}
                >
                  Kindly use this Excel template
                  <Icon icon='vscode-icons:file-type-excel' width={20} />
                </span>
              </div>
            </div>
            <button
              type='submit'
              disabled={mutation.isPending} className='modal-button'>
              {
                mutation.isPending ? <RotatingLines
                  type='Oval'
                  style={{ color: '#FFF' }}
                  height={20}
                  width={20} /> :
                  "Send Invite"
              }

            </button>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={closeModals}
        contentLabel='Delete Course'
        className='custom-modal-success'
        overlayClassName='custom-overlay'
      >
        <DeleteStudentModal closeModal={closeModals} handleDeleteUser={deleteUser} isPending={deleteMutation.isPending} />
      </Modal>
    </div>
  )
}

export default SchoolEnrolledStudents
