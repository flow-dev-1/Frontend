<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Icon } from '@iconify/react'
import './settings-modal.css'
=======
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Icon } from '@iconify/react'
import './settings-modal.css'
import adminService from '../../../../services/api/user'
>>>>>>> d4eb5d6cc977fc89a61cec832a0f3cf4c910b3d2
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
<<<<<<< HEAD
import schoolService from '../../../../services/api/school'
=======
>>>>>>> d4eb5d6cc977fc89a61cec832a0f3cf4c910b3d2

const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Work Email Address is required'),
  position: yup.string().required('Position is required'),
})

const SettingsAddEmailNotificationModal = ({ closeModal }) => {
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false)
<<<<<<< HEAD
  const mutationTriggered = useRef(false)
  const queryClient = useQueryClient()
=======
  const [hasMutated, setHasMutated] = useState(false)
>>>>>>> d4eb5d6cc977fc89a61cec832a0f3cf4c910b3d2

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

<<<<<<< HEAD

  const mutation = useMutation({
    mutationFn: schoolService.emailAdminInvite,
    onSuccess: (data) => {
      setModalIsOpenSuccess(true)
      queryClient.invalidateQueries(['school-email-team'])
      mutationTriggered.current = false
    },
    onError: (error) => {
      toast.error(error?.message)
      mutationTriggered.current = false
    },
  })

  const onSubmit = (data) => {
    if (!mutationTriggered.current) {
      mutationTriggered.current = true
      mutation.mutate(data)
    }
=======
  const navigate = useNavigate()

  const {
    data: adminRoles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['get-admin-roles'],
    queryFn: adminService.getAdminRoles,
  })

  console.log(adminRoles)

  const mutation = useMutation({
    mutationFn: adminService.adminInvite,
    onSuccess: (data) => {
      if (!hasMutated) {
        setModalIsOpenSuccess(true)
        setHasMutated(true)
      }
    },
    onError: (error) => {
      if (!hasMutated) {
        toast.error(error?.message)
        setHasMutated(true)
      }
    },
  })

  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      setHasMutated(false)
    }
  }, [mutation.isSuccess, mutation.isError])

  const onSubmit = (data) => {
    mutation.mutate(data)
>>>>>>> d4eb5d6cc977fc89a61cec832a0f3cf4c910b3d2
  }

  return (
    <div className=''>
      <div className='edit-course-container '>
        <div className='header'>
          <p className='team-heading'>Add New Team</p>
          <span onClick={closeModal}>
            <Icon icon='bitcoin-icons:cross-outline' width={30} />
          </span>
        </div>

        <p className='sub-heading'>Input teammate’s details below</p>

<<<<<<< HEAD
        <form className='form-borders' onSubmit={handleSubmit(onSubmit)}>
=======
        <form className='form-borders'>
>>>>>>> d4eb5d6cc977fc89a61cec832a0f3cf4c910b3d2
          <div className='flex-row '>
            <div>
              <label>First Name *</label>
              <input type='text' {...register('first_name')} />
              {errors.first_name && <p>{errors.first_name.message}</p>}
            </div>
            <div>
              <label>Last Name *</label>
              <input type='text' {...register('last_name')} />
              {errors.last_name && <p>{errors.last_name.message}</p>}
            </div>
          </div>
          <div className='flex-row'>
            <div>
              <label>Work Email Address *</label>
              <input type='text' {...register('email')} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label>Position *</label>
              <select
                {...register('position')}
                onChange={(e) => setValue('position', e.target.value)}
              >
                <option value=''>Select...</option>
<<<<<<< HEAD
                {["Email"].map((role, i) => (
                  <option key={i} value={role}>
                    {role}
=======
                {adminRoles?.adminRoles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.type}
>>>>>>> d4eb5d6cc977fc89a61cec832a0f3cf4c910b3d2
                  </option>
                ))}
              </select>
              {errors.position && <p>{errors.position.message}</p>}
            </div>
          </div>
          <button
            type='submit'
            className='update'
            disabled={mutation?.isPending}
          >
            {mutation?.isPending ? (
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
      <Modal
        isOpen={modalIsOpenSuccess}
        onRequestClose={closeSuccessModal}
        contentLabel='Delete Modal'
        className='custom-modal-success'
        overlayClassName='custom-overlay'
      >
        <div className='succes-modal-content'>
          <div className='success-icon icon-with-bg'>
            <div class='circle'>
              <div class='checkmark'></div>
            </div>
          </div>
          <h4 className='text-center'>Successfull</h4>
          <p className='text-center'>
            You have successfully invited a teammate.
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default SettingsAddEmailNotificationModal
