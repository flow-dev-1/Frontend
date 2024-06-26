import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Icon } from '@iconify/react'
import './settings-modal.css'
import adminService from '../../../../services/api/users'
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Work Email Address is required'),
  position: yup.string().required('Position is required'),
})

const SettingsAddNewTeam = ({ closeModal }) => {
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false)
  const [hasMutated, setHasMutated] = useState(false)

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
  }

  return (
    <div className='' onSubmit={handleSubmit(onSubmit)}>
      <div className='edit-course-container '>
        <div className='header'>
          <p className='team-heading'>Add New Team</p>
          <span onClick={closeModal}>
            <Icon icon='bitcoin-icons:cross-outline' width={30} />
          </span>
        </div>

        <p className='sub-heading'>Input teammate’s details below</p>

        <form className='form-borders' onSubmit={handleSubmit(onSubmit)}>
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
                {adminRoles?.adminRoles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.type}
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
        className='send-invite-modal'
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

export default SettingsAddNewTeam
