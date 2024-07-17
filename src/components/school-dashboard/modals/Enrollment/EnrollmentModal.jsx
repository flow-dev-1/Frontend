import React, { useEffect } from 'react'
import Modal from 'react-modal'
import excelDoc from '../../../../assets/flow-doc.xlsx'
import { Icon } from '@iconify/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  students: yup.string().test('emails', 'Invalid email(s)', (value) => {
    const emails = value.split(',').map((email) => email.trim())
    return emails.every(
      (email) => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    )
  }),
})

const EnrollmentModal = ({ isOpen, onRequestClose, daysOfWeek, course }) => {
  const queryClient = useQueryClient()

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
    getValues,
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
    mutationFn: (value) =>
      userService.enrolledStudents(params1, params2, value),
    onSuccess: (data) => {
      console.log('Mutation success:', data)
      toast.success('Enrollment successful')
      queryClient.invalidateQueries(['school-enrolled-courses'])
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

    const emailsArray = data.students

      .split(',')
      .map((email) => email.trim())
      .filter((email) => validateEmail(email))
    const finalData = { ...data, students: emailsArray }

    mutation.mutate(finalData)
  }

  useEffect(() => {
    const selectElements = document.querySelectorAll('select')
    selectElements.forEach((select) => {
      const firstOption = select.options[0]
      if (firstOption) {
        firstOption.style.color = '#D6D6D6'
      }
    })
  }, [])
  //

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
        <div>
          <p
            style={{ color: '#FD483D', fontSize: '12px', marginBottom: '2rem' }}
          >
            *Indicates Required
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='class-input'>
              <label
                htmlFor='stdClass'
                style={{ border: 'none', paddingLeft: '0' }}
              >
                Class *
              </label>
              <div id='stdClass'>
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
              </div>

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
                <div id='dayOfWeek'>
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
                </div>

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
                <div id='startTime'>
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
                </div>

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
                <div id='endTime'>
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
                </div>

                {errors.endTime && (
                  <p className='error-message'>{errors.endTime.message}</p>
                )}
              </div>
            </div>
            <div className='text-area'>
              <div className='div'>
                <label
                  style={{ border: 'none', paddingLeft: '0' }}
                  htmlFor='students'
                >
                  Student Email *
                </label>
                <textarea
                  id='students-textarea'
                  name='students'
                  placeholder='Enter email addresses here and separate with a comma'
                  rows='5'
                  cols={50}
                  {...register('students')}
                />
                {errors.students && (
                  <p className='error-message'>{errors.students.message}</p>
                )}
              </div>
              <div className='upload'>
                <label
                  style={{ border: 'none', paddingLeft: '0' }}
                  htmlFor='file-upload'
                >
                  Or Upload file here (CSV, Excel) *
                </label>
                <div
                  style={{
                    position: 'relative',
                  }}
                  className='file-upload-wrapper'
                >
                  <input
                    type='file'
                    id='file-upload'
                    className='file-upload-input'
                    onChange={handleFileUpload}
                  />
                  <label
                    style={{
                      border: 'none',
                      paddingLeft: '0',
                    }}
                    htmlFor='file-upload'
                    className='file-upload-label'
                  >
                    Choose file
                    <Icon
                      icon='ant-design:upload-outlined'
                      width='24'
                      height='24'
                      style={{ position: 'absolute', right: '1rem' }}
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
                'Enroll'
              )}
            </button>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default EnrollmentModal
