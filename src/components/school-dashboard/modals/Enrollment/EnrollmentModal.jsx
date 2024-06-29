import React, { useState } from 'react'
import Modal from 'react-modal'
import excelDoc from '../../../../assets/flow-doc.xlsx'
import { Icon } from '@iconify/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import userService from '../../../../services/api/school'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
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

const schema = yup.object().shape({
  stdClass: yup.string().required('Class is required'),
  dayOfWeek: yup.string().required('Day of the Week is required'),
  startTime: yup.string().required('Start Time is required'),
  endTime: yup.string().required('End Time is required'),
  students: yup
    .array()
    .min(1, 'At least one student email is required')
    .of(yup.string().email('Invalid email')),
})

const EnrollmentModal = ({ isOpen, onRequestClose, daysOfWeek, course }) => {
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

  const timeOptions = generateTimeOptions()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { user } = useSelector((state) => state.user)

  let params1
  if (user.isSchool) {
    params1 = user._id
  }

  const params2 = course?._id

  const mutation = useMutation({
    mutationFn: (data) => userService.enrolledStudents(params1, params2, data),
    onSuccess: (data) => {
      console.log('Mutation success:', data)
      toast.success('Enrollment successful')
      onRequestClose()
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
        setValue('students', emails)
      }
      reader.readAsArrayBuffer(file)
    }
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
    if (
      !window.confirm(
        'Are you sure you want to enroll the students for this course?'
      )
    )
      return
    mutation.mutate(data)
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
        <h2 className='enroll-heading-flex'>
          Enroll Student(s)
          <span onClick={onRequestClose}>
            <Icon icon='material-symbols-light:close' />
          </span>
        </h2>
        <hr style={{ marginBottom: '5px' }} />
        <div>
          <p style={{ color: '#FD483D', fontSize: '12px' }}>
            *Indicates Required
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='class-input'>
              <label htmlFor='stdClass'>Class *</label>
              <select id='stdClass' name='stdClass' {...register('stdClass')}>
                <option value=''>Select Class</option>
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
                <label htmlFor='dayOfWeek'>Day of the Week *</label>
                <select
                  id='dayOfWeek'
                  name='dayOfWeek'
                  {...register('dayOfWeek')}
                >
                  <option value=''>Select Day</option>
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
                <label htmlFor='startTime'>Start Time *</label>
                <select
                  id='startTime'
                  name='startTime'
                  {...register('startTime')}
                >
                  <option value=''>Select Start Time</option>
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
                <label htmlFor='endTime'>End Time *</label>
                <select id='endTime' name='endTime' {...register('endTime')}>
                  <option value=''>Select End Time</option>
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
            <div className='text-area'>
              <div>
                <label htmlFor='student-email'>Student Email *</label>
                <textarea
                  id='student-email'
                  name='student-email'
                  placeholder='Enter email addresses here'
                  rows={3}
                  cols={50}
                  {...register('students')}
                  value={watch('students')?.join(', ')}
                  onChange={(e) =>
                    setValue(
                      'students',
                      e.target.value
                        .split(',')
                        .map((email) => email.trim())
                        .filter((email) => validateEmail(email))
                    )
                  }
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
            <hr />
            <button
              className='modal-button'
              type='submit'
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
                'Send invites'
              )}
            </button>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default EnrollmentModal
