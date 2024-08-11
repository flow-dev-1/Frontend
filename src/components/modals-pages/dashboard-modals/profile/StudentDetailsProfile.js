import { Icon } from '@iconify/react'
export default function StudentDetails({
  errors,
  register,
  watch,
  onSubmit,
  setStep,
  onClose,
}) {
  return (
    <div
      className='registration-page overflow-hidden '
      style={{ height: '400px' }}
    >
      <div className='top-section mt-2'>
        <h2 className='d-flex justify-content-between align-center'>
          Student Details
          <>
            <Icon onClick={onClose} icon='radix-icons:cross-1' width={24} />
          </>
        </h2>
        <hr />
        <span>*Indicates Required</span>
      </div>
      <form onSubmit={onSubmit}>
        <div className='form-section'>
          <div className='form-group'>
            <label>Student's Full Name *</label>
            <input
              type='text'
              placeholder='Type here...'
              {...register('childName')}
            />
            {errors.childName && (
              <p className='error-message'>{errors.childName.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Student ID *</label>
            <div className='d-flex align-items-center input-with-icon'>
              <input
                type='text'
                placeholder='CIS442'
                disabled
                {...register('studentId')}
              />
              <Icon icon={'cil:copy'} className='eye-icon' width={20} />
            </div>
          </div>
          <div className='form-group'>
            <label>School Grade *</label>
            <select {...register('schoolGrade')}>
              <option value='Primary'>Primary</option>
              <option value='Secondary'>Secondary</option>
            </select>
            {errors.schoolGrade && (
              <p className='error-message'>{errors.schoolGrade.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Gender *</label>
            <select {...register('gender')}>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            {errors.gender && (
              <p className='error-message'>{errors.gender.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>D.O.B *</label>
            <input
              type='date'
              placeholder='Type here...'
              {...register('dob')}
            />
            {errors.dob && (
              <p className='error-message'>{errors.dob.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Password *</label>

            <div className='d-flex align-items-center input-with-icon'>
              <input
                type='password'
                placeholder='Type here...'
                {...register('password')}
              />
              <Icon icon={'ph:eye-light'} className='eye-icon' width={20} />
            </div>

            {errors.password && (
              <p className='error-message'>{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className='action-btns'>
          <button
            style={{
              backgroundColor: '#fff',
              color: '#329BD6',
              border: '1px solid #329BD6',
              borderRadius: '5px',
            }}
            onClick={() => setStep(1)}
          >
            Back
          </button>
          <button
            style={{
              backgroundColor: '#329BD6',
              color: '#fff',
              borderRadius: '5px',
            }}
            type='submit'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}
