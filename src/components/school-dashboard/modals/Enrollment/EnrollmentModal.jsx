import React, { useState } from 'react'
import Modal from 'react-modal'
import { Icon } from '@iconify/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import * as XLSX from 'xlsx'
import excelDoc from '../../../../assets/Flowtemp.xlsx'
import userService from '../../../../services/api/school'
import { RotatingLines } from 'react-loader-spinner'
const generateTimeOptions = () => {
  const times = []
  for (let hour = 6; hour <= 18; hour++) {
    times.push(`${String(hour).padStart(2, '0')}:00`)
    if (hour !== 18) {
      times.push(`${String(hour).padStart(2, '0')}:30`)
    }
  }
  return times
}

const EnrollmentModal = ({ isOpen, onRequestClose, daysOfWeek, course }) => {
  const queryClient = useQueryClient()
  const [fileError, setFileError] = useState('')
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [parsedStudents, setParsedStudents] = useState([])
  const schemaWithFile = yup.object().shape({
    stdClass: yup.string().required('Class is required'),
    dayOfWeek: yup.string().required('Day of the Week is required'),
    startTime: yup.string().required('Start Time is required'),
    endTime: yup.string().required('End Time is required'),
  })

  const schemaWithoutFile = schemaWithFile.shape({
    students: yup
      .array()
      .of(
        yup.object().shape({
          email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
          fullName: yup.string().required('Student Name is required'),
          guardianFullName: yup.string().required('Guardian Name is required'),
        })
      )
      .required('At least one student is required'),
  })

  // Dynamically determine which schema to use based on the file upload status
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isFileUploaded ? schemaWithFile : schemaWithoutFile),
    defaultValues: {
      students: [{ email: '', fullName: '', guardianFullName: '' }],
    },
  })

  const classOptions = [
    'Primary 1',
    'Primary 2',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Primary 6',
    'Year 7 (JSS 1)',
    'Year 8 (JSS 2)',
    'Year 9 (JSS 3)',
    'Year 10 (SSS 1)',
    'Year 11 (SSS 2)',
    'Year 12 (SSS 3)',
    'Educators',
  ]

  const timeOptions = generateTimeOptions()

  const { user } = useSelector((state) => state.user)
  const params1 = user?.isSchool ? user._id : null
  const params2 = course?._id

  const mutation = useMutation({
    mutationFn: (value) =>
      userService.enrolledStudents(params1, params2, value),
    onSuccess: () => {
      toast.success('Enrollment successful')
      queryClient.invalidateQueries(['school-enrolled-courses'])
      onRequestClose()
    },
    onError: (error) => {
      toast.error(error?.message || 'Enrollment failed')
    },
  })

  const onSubmit = (data) => {
    if (
      !window.confirm(
        'Are you sure you want to enroll the students for this course?'
      )
    )
      return

    // If a file was uploaded, override the students array with parsed data
    if (isFileUploaded) {
      data.students = parsedStudents
    }

    mutation.mutate(data)
    console.log(data) // Ensure the data is submitted
  }

  const { reset } = useForm()

  const handleExcelDownload = () => {
    const link = document.createElement('a')
    link.href = excelDoc
    link.download = 'template.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const binaryStr = e.target.result
      const workbook = XLSX.read(binaryStr, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: '', // Set default value for empty cells
      })

      if (jsonData.length <= 1) {
        setFileError('The uploaded file is empty or invalid')
        setIsFileUploaded(false)
        return
      }

      setFileError('')
      const headers = jsonData[0].map((header) => header.trim())
      const studentDataArray = []

      const expectedHeaders = {
        Email: 'email',
        fullName: 'fullName',
        guardianFullName: 'guardianFullName',
      }

      jsonData.slice(1).forEach((row) => {
        let studentData = {}
        headers.forEach((header, index) => {
          const key = expectedHeaders[header] || header
          const value = row[index]?.trim()
          if (value) {
            studentData[key] = value
          }
        })
        if (Object.keys(studentData).length > 0) {
          studentDataArray.push(studentData)
        }
      })

      setParsedStudents(studentDataArray)
      setIsFileUploaded(true)

      // Reset form fields
      reset({
        stdClass: '',
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        students: [{ email: '', fullName: '', guardianFullName: '' }],
      })
    }

    reader.readAsBinaryString(file)
  }

  return (
    <Modal
      contentLabel='Enrollment Modal'
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className='custom-modal-otp-three'
      overlayClassName='custom-overlay'
    >
      <div>
        <h2
          className='enroll-heading-flex'
          style={{ margin: '0', color: '#5B616A' }}
        >
          Enroll Students
          <span
            onClick={onRequestClose}
            style={{ color: '#5B616A', cursor: 'pointer' }}
          >
            <Icon icon='material-symbols-light:close' width={22} />
          </span>
        </h2>
        <hr style={{ margin: '5px' }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='class-input'>
            <label
              htmlFor='stdClass'
              style={{ border: 'none', paddingLeft: '0' }}
            >
              Class *
            </label>
            <select
              style={{ border: '1px solid #5b616a' }}
              name='stdClass'
              {...register('stdClass')}
            >
              <option value=''>Choose</option>
              {classOptions.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
            {errors.stdClass && (
              <p className='error-message'>{errors.stdClass.message}</p>
            )}
          </div>

          <div className='select-flex'>
            <div>
              <label
                style={{ border: 'none', paddingLeft: '0' }}
                htmlFor='dayOfWeek'
              >
                Day of the Week *
              </label>
              <select
                style={{ border: '1px solid #5b616a' }}
                name='dayOfWeek'
                {...register('dayOfWeek')}
              >
                <option value=''>Choose</option>
                {daysOfWeek.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {errors.dayOfWeek && (
                <p className='error-message'>{errors.dayOfWeek.message}</p>
              )}
            </div>
            <div>
              <label
                style={{ border: 'none', paddingLeft: '0' }}
                htmlFor='startTime'
              >
                Start Time *
              </label>
              <select
                name='startTime'
                style={{ border: '1px solid #5b616a' }}
                {...register('startTime')}
              >
                <option value=''>Choose</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.startTime && (
                <p className='error-message'>{errors.startTime.message}</p>
              )}
            </div>
            <div>
              <label
                style={{ border: 'none', paddingLeft: '0' }}
                htmlFor='endTime'
              >
                End Time *
              </label>
              <select
                style={{ border: '1px solid #5b616a' }}
                name='endTime'
                {...register('endTime')}
              >
                <option value=''>Choose</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.endTime && (
                <p className='error-message'>{errors.endTime.message}</p>
              )}
            </div>
          </div>

          {/* Render student input fields without the ability to add or remove */}
          {!isFileUploaded && (
            <div>
              <p style={{ fontSize: '14px', color: '#329BD6' }}>
                For single invite, kindly use the fields below.
              </p>
              <div>
                <div className='select-flex'>
                  <div>
                    <label>Parent/Guardian First & Last Name *</label>
                    <input
                      id='stdClass'
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '.5rem',
                      }}
                      name='students[0].guardianFullName'
                      {...register('students.0.guardianFullName')}
                    />
                    {errors.students?.[0]?.guardianFullName && (
                      <p className='error-message'>
                        {errors.students[0].guardianFullName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label>Parent/Guardian Email Address *</label>
                    <input
                      id='stdClass'
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '.5rem',
                      }}
                      name='students[0].email'
                      {...register('students.0.email')}
                    />
                    {errors.students?.[0]?.email && (
                      <p className='error-message'>
                        {errors.students[0].email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label>Student’s First & Last Name *</label>
                    <input
                      id='stdClass'
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '.5rem',
                      }}
                      name='students[0].fullName'
                      {...register('students.0.fullName')}
                    />
                    {errors.students?.[0]?.fullName && (
                      <p className='error-message'>
                        {errors.students[0].fullName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <p style={{ fontSize: '14px', color: '#329BD6' }}>
            For multiple students, kindly upload file using the sheet (Excel)
            attached below.
          </p>
          <div>
            <div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  border: '1px solid #ECEDF0',
                }}
                className='file-upload-wrapper'
              >
                <input
                  type='file'
                  id='file-upload'
                  onChange={handleFileUpload}
                  className='file-upload-input'
                />
                <label
                  style={{
                    border: 'none',
                    paddingLeft: '0',
                    color: '#ECEDF0',
                  }}
                  htmlFor='file-upload'
                  className='file-upload-label'
                >
                  Choose file
                  <Icon
                    icon='ant-design:upload-outlined'
                    width='24'
                    height='24'
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      color: '#329BD6',
                    }}
                  />
                </label>
                {fileError && (
                  <p
                    style={{
                      color: 'red',
                      marginTop: '10px',
                      textAlign: 'right',
                    }}
                  >
                    {fileError}
                  </p>
                )}
              </div>
              <span
                onClick={handleExcelDownload}
                style={{ fontSize: '12px', cursor: 'pointer' }}
              >
                Kindly use this Excel template
                <span>
                  <Icon icon='vscode-icons:file-type-excel' width={20} />
                  <Icon
                    icon='ant-design:download-outlined'
                    width='24'
                    height='24'
                    style={{
                      right: '1rem',
                      color: '#329BD6',
                    }}
                  />
                </span>
              </span>
            </div>
          </div>

          <hr />
          <button
            className='modal-button'
            type='submit'
            style={{ backgroundColor: '#329BD6' }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <RotatingLines
                type='Oval'
                style={{ color: '#FFF' }}
                height={20}
                width={20}
              />
            ) : (
              'Send invite'
            )}
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default EnrollmentModal
