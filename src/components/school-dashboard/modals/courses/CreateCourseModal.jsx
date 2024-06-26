import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import adminService from '../../../../services/api/users'
import { RotatingLines } from 'react-loader-spinner'
import { Icon } from '@iconify/react'
import './course-modal.css'

const flagApis = (countryCode) =>
  `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`

const CreateCourseModal = ({ closeModal }) => {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [status, setStatus] = useState('Published')
  const [access, setAccess] = useState('')
  const [image, setImage] = useState(null)
  const [countries, setCountries] = useState([])
  const [currency, setCurrency] = useState('')
  const [url, setUrl] = useState('')
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countriesData = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
          currency: country.currencies
            ? Object.values(country.currencies)[0]?.name
            : 'Unknown',
        }))
        setCountries(countriesData)
        const uniqueCurrencies = [
          ...new Set(countriesData.map((country) => country.currency)),
        ]
        setCurrencies(uniqueCurrencies)
      })
      .catch((error) => console.error('Error fetching countries:', error))
  }, [])

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (
      !title ||
      !description ||
      !cost ||
      !status ||
      !access ||
      !currency ||
      !url ||
      !image
    ) {
      toast.error('All fields are required.')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('cost', cost)
    formData.append('status', status)
    formData.append('access', access)
    formData.append('currency', currency)
    formData.append('url', url)
    formData.append('image', image)

    try {
      await courseMutation.mutateAsync(formData)
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  const courseMutation = useMutation({
    mutationFn: adminService.adminAddCourse,
    queryKey: ['get-upload-courses'],
    onSuccess: (data) => {
      toast.success('Course created successfully')
      queryClient.invalidateQueries(['get-courses'])
    },
    onError: (error) => {
      console.error('Error:', error)
      toast.error(error?.message || 'An error occurred during course creation')
    },
  })

  return (
    <div className='edit-course-container'>
      <div className='header'>
        <h2>Create Course</h2>
        <span onClick={closeModal}>
          <Icon icon='bitcoin-icons:cross-outline' width={30} />
        </span>
      </div>
      <p className='required'>* Indicates required</p>
      <form onSubmit={handleUpdate}>
        <div className='flex-row'>
          <div>
            <label>Course Title *</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description *</label>
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className='flex-row'>
          <div>
            <label>Cost *</label>
            <input
              type='number'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div>
            <label>Status *</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value='Published'>Published</option>
              <option value='Draft'>Draft</option>
            </select>
          </div>
        </div>
        <div className='flex-row'>
          <div>
            <label>Course Access *</label>
            <select value={access} onChange={(e) => setAccess(e.target.value)}>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Currency *</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((curr, index) => (
                <option key={index} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex-row'>
          <div>
            <label>Profile Image *</label>
            <input type='file' onChange={handleImageChange} />
          </div>
          <div>
            <label>Course URL *</label>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <button className='update' type='submit'>
          {courseMutation.isPending ? (
            <RotatingLines
              type='Oval'
              style={{ color: '#fff' }}
              height={20}
              width={20}
            />
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  )
}

export default CreateCourseModal
