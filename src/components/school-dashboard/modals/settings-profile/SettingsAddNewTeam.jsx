import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Icon } from '@iconify/react'
import './settings-modal.css'
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import schoolService from '../../../../services/api/school'

const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Work Email Address is required'),
  position: yup.string().required('Position is required'),
})

const SettingsAddNewTeam = ({ closeModal, openSuccessModal }) => {
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const mutationTriggered = useRef(false)
  const queryClient = useQueryClient()

  const closeSuccessModal = () => {
    setModalIsOpenSuccess(false)
    closeModal()
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: schoolService.adminInvite,
    onSuccess: (data) => {
      openSuccessModal()
      closeModal()
      queryClient.invalidateQueries(['school-teams'])
      mutationTriggered.current = false
    },
    onError: (error) => {
      setErrorMessage(error?.response?.data?.message || 'An error occurred')
      toast.error(errorMessage)
      mutationTriggered.current = false
    },
  })

  const onSubmit = (data) => {
    if (!mutationTriggered.current) {
      mutationTriggered.current = true
      mutation.mutate(data)
    }
  }

  return (
    <div className='' onSubmit={handleSubmit(onSubmit)}>
      <div className='edit-course-container '>
        <div className='header' style={{ border: 'none' }}>
          <p
            className='team-heading'
            style={{ color: '#18181B', fontSize: '20px' }}
          >
            Add New Team
          </p>
        </div>

        <p className='sub-heading' style={{ fontSize: '14px' }}>
          Input teammate’s details below
        </p>
        <hr />
        <form className='form-borders' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex-row '>
            <div>
              <label>First Name *</label>
              <input
                type='text'
                placeholder='Type here...'
                {...register('first_name')}
              />
              {errors.first_name && (
                <p style={{ color: '#FD483D', fontSize: '12px' }}>
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <label>Last Name *</label>
              <input
                type='text'
                {...register('last_name')}
                placeholder='Type here...'
              />
              {errors.last_name && (
                <p style={{ color: '#FD483D', fontSize: '12px' }}>
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>
          <div className='flex-row'>
            <div>
              <label>Work Email Address *</label>
              <input
                type='text'
                placeholder='Type here...'
                {...register('email')}
              />
              {errors.email && (
                <p style={{ color: '#FD483D', fontSize: '12px' }}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label>Permission *</label>
              <select
                style={{ border: '1px solid #d6d6d6' }}
                id='select'
                {...register('position')}
                onChange={(e) => setValue('position', e.target.value)}
              >
                <option value=''>Select...</option>
                {['Superadmin', 'Students', 'Teachers'].map((role, i) => (
                  <option key={i} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.position && (
                <p style={{ color: '#FD483D', fontSize: '12px' }}>
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>
          <hr />
          <button
            type='submit'
            className='update'
            disabled={mutation.isLoading}
          >
            {mutation.isPending ? (
              <RotatingLines
                type='Oval'
                style={{ color: '#FFF' }}
                height={20}
                width={20}
              />
            ) : (
              <>Send Invite</>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SettingsAddNewTeam
