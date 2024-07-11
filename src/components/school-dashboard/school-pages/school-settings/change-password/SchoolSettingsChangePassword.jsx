import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Icon } from '@iconify/react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import schoolService from '../../../../../services/api/school'
import './change-password.css'
import { RotatingLines } from 'react-loader-spinner' // Import the loading spinner

const schema = yup.object().shape({
  oldPassword: yup.string().required('Old Password is required'),
  newPassword: yup
    .string()
    .required('New Password is required')
    .min(6, 'New Password must be at least 6 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

const SchoolSettingsChangePassword = () => {
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false)
  const toastId = useRef(null)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const closeModal = () => {
    setModalIsOpenSuccess(false)
  }

  const mutation = useMutation({
    mutationFn: schoolService.changePassword,
    onMutate: () => {
      toastId.current = toast.loading('Updating password...')
    },
    onSuccess: () => {
      toast.update(toastId.current, {
        render: 'Password updated successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      setModalIsOpenSuccess(true)
      queryClient.invalidateQueries(['school-settings'])
    },
    onError: (error) => {
      toast.update(toastId.current, {
        render: error?.message || 'Error updating password',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    },
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  return (
    <div className='settings-change-password'>
      <h2 style={{ fontSize: '24px' }}>Change Password -</h2>
      <p>
        Take charge of the security access to your dashboard. Change your{' '}
        <a className='a' href='/'>
          Flow
        </a>{' '}
        password by filling the form below.
      </p>
      <hr style={{ marginTop: '2rem' }} />
      <div className='mt-5 border-container'>
        <form style={{ marginTop: '0' }} onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label
              style={{ border: '0', paddingLeft: '0' }}
              className='old-password'
            >
              Old Password
            </label>
            <div>
              <input
                type='password'
                id='old-password'
                placeholder='Type here...'
                {...register('oldPassword')}
              />
              <Icon width={20} icon='fa6-solid:eye' className='icon' />
            </div>
            {errors.oldPassword && (
              <p style={{ color: '#E83151' }}>{errors.oldPassword.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label
              style={{ border: '0', paddingLeft: '0' }}
              className='new-password'
            >
              New Password
            </label>
            <div>
              <input
                type='password'
                id='new-password'
                placeholder='Type here...'
                {...register('newPassword')}
              />
              <Icon icon='fa6-solid:eye' width={20} className='icon' />
            </div>
            {errors.newPassword && (
              <p style={{ color: '#E83151' }}>{errors.newPassword.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label
              className='confirm-password'
              style={{ border: '0', paddingLeft: '0' }}
            >
              Confirm Password
            </label>
            <div>
              <input
                type='password'
                id='confirm-password'
                placeholder='Type here...'
                {...register('confirmPassword')}
              />
              <Icon icon='fa6-solid:eye' width={20} className='icon' />
            </div>
            {errors.confirmPassword && (
              <p style={{ color: '#E83151' }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            style={{
              color: '#275DAD',
              backgroundColor: 'rgba(92, 225, 230, 1)',
              fontWeight: '500',
            }}
            type='submit'
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <RotatingLines width='20' height='20' strokeColor='#FFF' />
            ) : (
              'Update Password'
            )}
          </button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpenSuccess}
        onRequestClose={closeModal}
        contentLabel='Success Modal'
        className='custom-modal-success'
        overlayClassName='custom-overlay'
      >
        <div className='succes-modal-content'>
          <div className='success-icon icon-with-bg'>
            <div className='circle'>
              <div className='checkmark'></div>
            </div>
          </div>
          <h4 className='text-center'>Successful</h4>
          <p className='text-center'>
            You have successfully updated your password.
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default SchoolSettingsChangePassword
