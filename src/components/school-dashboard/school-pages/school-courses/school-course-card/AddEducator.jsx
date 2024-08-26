import React, { useState } from 'react'
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
import excelDoc from '../../../../../assets/Flowtemp.xlsx'
import schoolService from '../../../../../services/api/school'
import { RotatingLines } from 'react-loader-spinner'
import { decryptId } from '../../../../../utils/encryption'

const AddEducator = ({ isOpen, onRequestClose, daysOfWeek, course }) => {
  const queryClient = useQueryClient()
  const [fileError, setFileError] = useState('')
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [parsedEducators, setParsedEducators] = useState([])

  const classOptions = [
    'Primary 1',
    'Primary 2',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Primary 6',
    'JSS 1',
    'JSS 2',
    'JSS 3',
    'SSS 1',
    'SSS 2',
    'SSS 3',
    'Educators',
  ]

  const schemaWithoutFile = yup.object().shape({
    stdClass: yup.string().required('Class is required'),
    educators: yup
      .array()
      .of(
        yup.object().shape({
          email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
          fullName: yup.string().required('Educator Name is required'),
        })
      )
      .required('At least one educator is required'),
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
      educators: [{ email: '', fullName: '' }],
    },
  })

  const { user } = useSelector((state) => state.user)
  let schoolId

  if (user.isSchool) {
    schoolId = user._id
  }
  const params1 = user?.isSchool ? user._id : null
  const params2 = course?._id

  console.log(params1, params2)
  const mutation = useMutation({
    mutationFn: (value) =>
      schoolService.enrollEducatorsIntoCourse(params1, params2, value),
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
        'Are you sure you want to enroll the educators for this course?'
      )
    )
      return

    if (isFileUploaded) {
      data.educators = parsedEducators
    }

    console.log(data)
    mutation.mutate(data)
  }

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
        defval: '',
      })

      if (jsonData.length <= 1) {
        setFileError('The uploaded file is empty or invalid')
        setIsFileUploaded(false)
        return
      }

      setFileError('')
      const headers = jsonData[0].map((header) => header.trim())
      const educatorDataArray = []

      const expectedHeaders = {
        Email: 'email',
        fullName: 'fullName',
      }

      jsonData.slice(1).forEach((row) => {
        let educatorData = {}
        headers.forEach((header, index) => {
          const key = expectedHeaders[header] || header
          const value = row[index]?.trim()
          if (value) {
            educatorData[key] = value
          }
        })
        if (Object.keys(educatorData).length > 0) {
          educatorDataArray.push(educatorData)
        }
      })

      setParsedEducators(educatorDataArray)
      setIsFileUploaded(true)

      reset({
        educators: [{ email: '', fullName: '' }],
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
          Enroll Educators
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
                    <label>Educator's First & Last Name *</label>
                    <input
                      id='stdClass'
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '.5rem',
                      }}
                      name='educators[0].fullName'
                      {...register('educators.0.fullName')}
                    />
                    {errors.educators?.[0]?.fullName && (
                      <p className='error-message'>
                        {errors.educators[0].fullName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label>Educators Email Address *</label>
                    <input
                      id='stdClass'
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '.5rem',
                      }}
                      name='educators[0].email'
                      {...register('educators.0.email')}
                    />
                    {errors.educators?.[0]?.email && (
                      <p className='error-message'>
                        {errors.educators[0].email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <p style={{ fontSize: '14px', color: '#329BD6' }}>
            For multiple educators, kindly upload file using the sheet (Excel)
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
        </form>
      </div>
    </Modal>
  )
}

export default AddEducator
