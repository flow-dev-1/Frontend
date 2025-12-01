import React, { useState, useEffect } from 'react'
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
import { isPending } from '@reduxjs/toolkit'

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
  const schema = yup.object().shape({
    stdClass: yup.string().required('Class is required'),
    classTag: yup.string(), // Optional string field
    dayOfWeek: yup.string().required('Day of the Week is required'),
    startTime: yup.string().required('Start Time is required'),
    endTime: yup.string().required('End Time is required'),
  })

  const [showMessage, setShowMessage] = useState(false)


  // Dynamically determine which schema to use based on the file upload status
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {

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
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['school-enrolled-courses'])
      onRequestClose()
    },
    onError: (error) => {
      console.log(error)
      toast.error(error?.message || 'Enrollment failed')
    },
  })

  const onSubmit = (data) => {
    if (!window.confirm('Are you sure you want to enroll this class for this course?')) return

    mutation.mutate(data)
    // Ensure the data is submitted
  }

  const { reset } = useForm()

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

      // Reset form fields
      reset({
        stdClass: '',
        classTag: '',
        dayOfWeek: '',
        startTime: '',
        endTime: '',
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
      }) // 5 seconds

      return () => clearTimeout(timer) // Cleanup if unmounted or dependencies change
    }
  }, [mutation.isPending, isFileUploaded])

  return (
    <Modal
      contentLabel="Enrollment Modal"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="custom-modal-otp-three"
      overlayClassName="custom-overlay"
      style={{
        content: {
          zIndex: 9999
        },
        overlay: {
          zIndex: 9998
        }
      }}
    >
      <div>
        <h2
          className="enroll-heading-flex"
          style={{ margin: "0", color: "#5B616A" }}
        >
          Enroll Class
          <span
            onClick={onRequestClose}
            style={{ color: "#5B616A", cursor: "pointer" }}
          >
            <Icon icon="material-symbols-light:close" width={22} />
          </span>
        </h2>
        <hr style={{ margin: "5px" }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="select-flex">
            <div className="class-input">
              <label
                htmlFor="stdClass"
                style={{ border: "none", paddingLeft: "0" }}
              >
                Class *
              </label>
              <select
                style={{ border: "1px solid #5b616a" }}
                name="stdClass"
                {...register("stdClass")}
              >
                <option value="">Choose</option>
                {classOptions.map((className, index) => (
                  <option key={index} value={className}>
                    {className}
                  </option>
                ))}
              </select>
              {errors.stdClass && (
                <p className="error-message">{errors.stdClass.message}</p>
              )}
            </div>

            <div className="class-input">
              <label
                htmlFor="classTag"
                style={{ border: "none", paddingLeft: "0" }}
              >
                Class Tag
              </label>
              <input
                type="text"
                style={{ border: "none" }}
                name="classTag"
                placeholder="e.g: A, Golden Eagles"
                {...register("classTag")}
              />
              {errors.classTag && (
                <p className="error-message">{errors.classTag.message}</p>
              )}
            </div>
          </div>

          <div className="select-flex">
            <div>
              <label
                style={{ border: "none", paddingLeft: "0" }}
                htmlFor="dayOfWeek"
              >
                Day of the Week *
              </label>
              <select
                style={{ border: "1px solid #5b616a" }}
                name="dayOfWeek"
                {...register("dayOfWeek")}
              >
                <option value="">Choose</option>
                {daysOfWeek.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {errors.dayOfWeek && (
                <p className="error-message">{errors.dayOfWeek.message}</p>
              )}
            </div>
            <div>
              <label
                style={{ border: "none", paddingLeft: "0" }}
                htmlFor="startTime"
              >
                Start Time *
              </label>
              <select
                name="startTime"
                style={{ border: "1px solid #5b616a" }}
                {...register("startTime")}
              >
                <option value="">Choose</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.startTime && (
                <p className="error-message">{errors.startTime.message}</p>
              )}
            </div>
            <div>
              <label
                style={{ border: "none", paddingLeft: "0" }}
                htmlFor="endTime"
              >
                End Time *
              </label>
              <select
                style={{ border: "1px solid #5b616a" }}
                name="endTime"
                {...register("endTime")}
              >
                <option value="">Choose</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.endTime && (
                <p className="error-message">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <hr />
          <button
            className="modal-button"
            type="submit"
            style={{ backgroundColor: "#329BD6" }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            ) : (
              "Submit"
            )}
          </button>

        </form>
      </div>
    </Modal>
  );
}

export default EnrollmentModal