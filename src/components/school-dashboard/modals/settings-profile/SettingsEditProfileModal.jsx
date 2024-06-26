import { useState, useEffect } from 'react'
import './settings-modal.css'
import { Icon } from '@iconify/react'
const SettingsEditProfileModal = ({ closeModal }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [status, setStatus] = useState('')
  const [access, setAccess] = useState('')
  const [image, setImage] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countriesData = data.map((country) => ({
          name: country.name.common,
          flag: country.flags[0],
        }))
        setCountries(countriesData)
      })
      .catch((error) => console.error('Error fetching countries:', error))
  }, [])

  const handleUpdate = () => {
    console.log('Updated course details:', {
      title,
      description,
      cost,
      status,
      access,
      image,
    })
    closeModal()
  }

  return (
    <div className='edit-course-container'>
      <div className='header'>
        <h2>Edit Profile</h2>
        <span onClick={closeModal}>
          <Icon icon='bitcoin-icons:cross-outline' width={30} />
        </span>
      </div>
      <p className='required'>* Indicates required</p>
      <div className='flex-row'>
        <div>
          <label>Name of School *</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>School Address *</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className='flex-row'>
        <div>
          <label>Contact Name *</label>
          <input
            type='text'
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div>
          <label>Contact Phone Number *</label>
          <select value={access} onChange={(e) => setAccess(e.target.value)}>
            {countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name} <img src={country.flag} alt={country.name} />
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex-row'>
        <div>
          <label>Contact Email Address *</label>
          <input type="text" />
        </div>
        <div>
          <label>School Logo *</label>
          <input
            type='file'
            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          />
        </div>
      </div>

     

      <button className='update' onClick={handleUpdate}>
        Update
      </button>
    </div>
  )
}

export default SettingsEditProfileModal
