import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Icon } from '@iconify/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as XLSX from 'xlsx'
import excelDoc from '../../../../../../assets/Flowtemp.xlsx'
import schoolService from '../../../../../../services/api/school'
import { RotatingLines } from 'react-loader-spinner'
import { decryptId } from '../../../../../../utils/encryption'

const AddStudentModal = ({ isOpen, onRequestClose, daysOfWeek, course }) => {
  const queryClient = useQueryClient()
  const [fileError, setFileError] = useState('')
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [parsedStudents, setParsedStudents] = useState([])
  const [showMessage, setShowMessage] = useState(false)

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

  const schemaWithoutFile = yup.object().shape({
    stdClass: yup.string().required('Class is required'),
    students: yup
      .array()
      .of(
        yup.object().shape({
          email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
          fullName: yup
            .string()
            .matches(
              /^[a-zA-Z]+(?: [a-zA-Z]+)+$/,
              'Full Name must contain at least two words'
            )
            .required('Student Name is required'),
          guardianFullName: yup
            .string()
            .matches(
              /^[a-zA-Z]+(?: [a-zA-Z]+)+$/,
              'Guardian Name must contain at least two words'
            )
            .required('Guardian Name is required'),
        })
      )
      .required('At least one student is required'),
  })

  const schemaWithFile = yup.object().shape({
    stdClass: yup.string().required('Class is required'),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isFileUploaded ? schemaWithFile : schemaWithoutFile),
    defaultValues: {
      students: [{ email: '', fullName: '', guardianFullName: '' }],
    },
  })

  const { user } = useSelector((state) => state.user)
  let schoolId

  // ToDO: Do a check if its a school or a user
  if (user?.isSchool) {
    schoolId = user?._id
  }
  const { id } = useParams()
  console.log(decryptId(id), schoolId)

  const mutation = useMutation({
    mutationFn: (data) =>
      schoolService.enrollStudentsIntoCourse(schoolId, decryptId(id), data),
    onSuccess: (data) => {
      console.log('Mutation success:', data)
      toast.success('Enrollment successful')
      queryClient.invalidateQueries(['school-single-courses'])
      reset()
      onRequestClose()
    },
    onError: (error) => {
      console.error('Mutation error:', error)
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

    if (isFileUploaded) {
      data.students = parsedStudents
    }
    console.log(data)
    mutation.mutate(data)
  }

  const handleExcelDownload = () => {
    const link = document.createElement('a')
    link.href = excelDoc
    link.download = 'Flowtemp.xlsx'
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
        defval: '',
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
        Email_Address: 'email',
        "Child's_fullName": 'fullName',
        "Guardian's_FullName": 'guardianFullName',
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

      reset({
        students: [{ email: '', fullName: '', guardianFullName: '' }],
      })
    }

    reader.readAsBinaryString(file)
  }

  useEffect(() => {
    if (mutation.isPending && isFileUploaded) {
      setShowMessage(true)
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 5) // 5 seconds

      return () => clearTimeout(timer) // Cleanup if unmounted or dependencies change
    }
  }, [mutation.isPending, isFileUploaded])

  return (
    <div>
      <h2
        className='enroll-heading-flex'
        style={{ margin: '0', color: '#5B616A' }}
      >
        Add Students
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
                  color: '#41444c',
                }}
                htmlFor='file-upload'
                className='file-upload-label'
              >
                {' '}
                {isFileUploaded ? 'File ready for upload' : 'Choose file'}
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
            </div>
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
            <span
              style={{ fontSize: '12px', cursor: 'pointer' }}
              onClick={handleExcelDownload} // Move the onClick here
            >
              Kindly use this Excel template
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
          </div>
        </div>

        <hr />
        <button
          className='modal-button'
          type='submit'
          style={{ backgroundColor: '#329BD6' }}
        >
          {mutation.isPending ? (
            <RotatingLines
              strokeColor='white'
              strokeWidth='5'
              animationDuration='0.75'
              width='30'
              visible={true}
            />
          ) : (
            'Send Invite'
          )}
        </button>
        {isFileUploaded && mutation.isPending && (
          <p style={{ fontSize: '10px', color: 'red', textAlign: 'right' }}>
            Depending on the number of students, this process may take <br /> a
            while. Please wait and do not close this page. Thank you.
          </p>
        )}
      </form>
    </div>
  )
}

export default AddStudentModal
