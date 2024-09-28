import React, { useState } from 'react'
import femaleprofileImage from '../../../../assets/user-profile-image.png'
import maleprofileImage from '../../../../assets/male-profile-image.png'
import flag from '../../../../assets/Flag_of_Nigeria.png'
import './profile.css'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import StudentRegistrationProfile from '../../../modals-pages/dashboard-modals/profile/StudentRegistrationProfile'
import { useQuery } from '@tanstack/react-query'
import schoolService from '../../../../services/api/school'
import EducatorProfileModal from './EducatorProfileModal'
import StudentUpdateProfileModal from './StudentUpdateProfileModal'
import Loading from '../../../loader/Loader'
import { Icon } from '@iconify/react'

export default function IndividualSchoolProfile({ onClose }) {
    const [modalIsOpen, setIsOpen] = useState(false)
    const { userType } = useSelector((state) => state.user)
    const { userId } = useParams();
    const navigate = useNavigate()
    const [filterOption, setFilterOption] = useState('') // State for Filter Option


    const fetchProfile = (params) => {
        if (userType?.user?.grade === 'Educator') {
            return schoolService.getMyProfileEducatorSchool(params);
        } else {
            console.log("Fetching individual school profile");
            return schoolService.getStudentProfileIndividual(params);
        }
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['school-dashboard', userId], // Include userId for caching
        queryFn: () => fetchProfile(userId),    // Pass a function reference
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });

    console.log(data, "data ooooooo");


    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <div>An error occured while loading...</div>
    }

    const user =
        userType?.user?.grade === 'Educator' ? data?.educator : data?.user || {}
    // Format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        alert('Student ID copied to clipboard!')
    }

    return (
        <>
            <div className='individual-profile container-fluid'>
                <div className="heads">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        <Icon icon="mingcute:arrow-left-line" width={20} /> Back
                    </button>
                    <div className='profilee'>
                        <label>
                            <Icon icon='gridicons:filter' style={{ color: '#4d4d4d' }} />
                            <select
                                name='filter'
                                id='filter'
                                className='filter'
                                value={filterOption} // Bind filter option to state
                                onChange={(e) => setFilterOption(e.target.value)} // Update state on filter change
                            >
                                <option value='' disabled>
                                    Profile
                                </option>
                                <option value=''>All</option>
                                <option value='Individual'>Students</option>
                                <option value='General'>General</option>
                                <option value='Educator'>Teachers</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className='user-basic-info' style={{ padding: '1rem' }}>
                    <div className='about-user'>
                        <div className='profile-img'>
                            {user?.gender === 'male' ? (
                                <img
                                    style={{ display: 'block', width: '100%' }}
                                    src={maleprofileImage}
                                    alt='user Profile image'
                                />
                            ) : (
                                <img
                                    style={{ display: 'block', width: '100%' }}
                                    src={femaleprofileImage}
                                    alt='user Profile image'
                                />
                            )}
                        </div>

                        <div className='about-user-info mx-4'>
                            <h2>{user?.fullName || 'Add Info'}</h2>
                            <div className='user-details'>
                                <div className='green-spring-div primary'>
                                    {userType?.accountType === 'Educator'
                                        ? 'Educator'
                                        : user?.grade}
                                </div>
                            </div>

                            <div className='user-details'>
                                <div className='green-spring-div school'>
                                    {user?.userType || 'Individual'}
                                </div>
                                <div
                                    style={{ color: '#5B616A' }}
                                    className='green-spring-div student'
                                >
                                    {userType?.accountType === 'Educator'
                                        ? 'Educator'
                                        : 'Student'}
                                </div>
                            </div>

                            <p>
                                {user?.lga?.toUpperCase() || 'Add Info'} |{' '}
                                {user?.state?.toUpperCase() || 'Add Info'}{' '}
                            </p>
                            <p></p>
                            <p>
                                {user?.country?.toUpperCase()}
                                <img
                                    src={flag}
                                    alt='Nigeria Flag'
                                    style={{ borderRadius: '2px', width: '30px' }}
                                    className='flag-img'
                                />
                            </p>
                        </div>
                    </div>

                </div>
                <div className='user-other-info'>
                    {/* Conditionally render Student ID and Email based on account type */}
                    {userType?.accountType !== 'Educator' && (
                        <p>
                            <span className='label'>Student ID: </span>
                            <span>
                                {user?.userId}{' '}
                                <Icon
                                    icon={'cil:copy'}
                                    className='eye-icon'
                                    width={20}
                                    onClick={() => copyToClipboard(user?.userId)}
                                    style={{ cursor: 'pointer' }}
                                />{' '}
                            </span>
                        </p>
                    )}

                    {userType?.accountType === 'Educator' && (
                        <p>
                            <span className='label'>Email:</span>
                            <span>{user?.email || 'Add Info'} </span>
                        </p>
                    )}

                    <p>
                        <span className='label'>D.O.B: </span>
                        <span>{(user?.DOB && formatDate(user.DOB)) || 'Add Info'} </span>
                    </p>
                    {/* <p>
            <span className='label'>Phone: </span>
            <span>{user?.phone || 'Add Info'} </span>
          </p> */}
                    <p>
                        <span className='label'>Gender: </span>
                        <span>{toTitleCase(user?.gender) || 'Add Info'} </span>
                    </p>
                </div>
                {userType?.accountType === 'Individual' ? (
                    <div className='user-parent-info'>
                        <h3 style={{ fontSize: '40px' }}>Parent/Guardian Information</h3>
                        <hr className='my-1' />
                        <p>
                            <span className='label'>Full Name: </span>
                            <span>{user?.guardianFullName || 'Add Info'} </span>
                        </p>
                        <p>
                            <span className='label'>Email Address: </span>
                            <span>{user?.email || 'Add Info'}</span>
                        </p>
                        <p>
                            <span className='label'>Phone Number: </span>
                            <span>{user?.phone || 'Add Info'}</span>
                        </p>
                    </div>
                ) : (
                    ''
                )}

                <hr />
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className='custom-modal'
                overlayClassName='custom-overlay'
                contentLabel='Edit Profile Modal'
                shouldCloseOnOverlayClick={closeModal}
            >
                {userType?.accountType !== 'Educator' ? (
                    <StudentUpdateProfileModal user={user} onClose={closeModal} />
                ) : (
                    <EducatorProfileModal user={user} onClose={closeModal} />
                )}
            </Modal>
        </>
    )
}
