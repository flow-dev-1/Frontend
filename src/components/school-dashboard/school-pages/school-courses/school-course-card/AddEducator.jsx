import React from 'react'
import Modal from 'react-modal'
import { Icon } from '@iconify/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import schoolService from '../../../../../services/api/school'
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

const AddEducator = ({ isOpen, onRequestClose, daysOfWeek, course }) => {
  const queryClient = useQueryClient()
  const schema = yup.object().shape({
    stdClass: yup.string().required('Class is required'),
    dayOfWeek: yup.string().required('Day of the Week is required'),
    startTime: yup.string().required('Start Time is required'),
    endTime: yup.string().required('End Time is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      stdClass: 'Educators',
    },
  })

  const timeOptions = generateTimeOptions()
  const { user } = useSelector((state) => state.user)
  const schoolId = user?.isSchool ? user._id : user?.school
  const params2 = course?._id

  const mutation = useMutation({
    mutationFn: (value) =>
      schoolService.enrolledStudents(schoolId, params2, value),
    onSuccess: (data) => {
      toast.success(data.message || 'Enrollment successful')
      queryClient.invalidateQueries(['school-enrolled-courses'])
      onRequestClose()
    },
    onError: (error) => {
      toast.error(error?.message || 'Enrollment failed')
    },
  })

  const onSubmit = (data) => {
    if (!window.confirm('Are you sure you want to enroll educators for this course?')) return
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
          <div className='select-flex'>
            <div className='class-input' style={{ width: '100%' }}>
              <label
                htmlFor='stdClass'
                style={{ border: 'none', paddingLeft: '0' }}
              >
                Class *
              </label>
              <select
                style={{ border: '1px solid #5b616a', backgroundColor: '#f5f5f5' }}
                name='stdClass'
                {...register('stdClass')}
              >
                <option value='Educators'>Educators</option>
              </select>
              {errors.stdClass && (
                <p className='error-message'>{errors.stdClass.message}</p>
              )}
            </div>
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
                {daysOfWeek?.map((day, index) => (
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

          <hr />
          <button
            className='modal-button'
            type='submit'
            style={{ backgroundColor: '#329BD6' }}
            disabled={mutation.isPending}
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
              'Submit'
            )}
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default AddEducator
