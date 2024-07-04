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

const SettingsAddNewTeam = ({ closeModal }) => {
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false)
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
      setModalIsOpenSuccess(true)
      queryClient.invalidateQueries(['school-teams'])
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
  }

  return (
    <div className='' onSubmit={handleSubmit(onSubmit)}>
      <div className='edit-course-container '>
        <div className='header' style={{ border: 'none' }}>
          <p className='team-heading'>Add New Team</p>
          <span onClick={closeModal}>
            <Icon icon='bitcoin-icons:cross-outline' width={30} />
          </span>
        </div>

        <p className='sub-heading'>Input teammate’s details below</p>
        <hr />
        <form className='form-borders' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex-row '>
            <div>
              <label>First Name *</label>
              <input type='text' {...register('first_name')} />
              {errors.first_name && (
                <p style={{ color: '#FD483D', fontSize: '12px' }}>
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <label>Last Name *</label>
              <input type='text' {...register('last_name')} />
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
              <input type='text' {...register('email')} />
              {errors.email && (
                <p style={{ color: '#FD483D', fontSize: '12px' }}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label>Permission *</label>
              <select
              id='select'
                {...register('position')}
                onChange={(e) => setValue('position', e.target.value)}
              >
                <option value=''>Select...</option>
                {['Admin', 'Student'].map((role, i) => (
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
