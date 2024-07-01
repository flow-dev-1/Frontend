import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import './sidebar.css'

function Sidebar() {
  const location = useLocation()
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [clicked, setClicked] = useState(false)

  const toggleCourses = () => {
    setIsCoursesOpen(!isCoursesOpen)
  }

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const isActiveLink = (path) => {
    return location.pathname === path
  }

  const handleClick = () => {
    setClicked(!clicked)
  }

  const closeSidebar = () => {
    setClicked(false)
  }

  return (
    <div className={`sidebar-user ${clicked ? 'open' : ''}`}>
      <div className='sidebar-user-content'>
        <ul className='sidebar-user-menu mt-3 desktop'>
          <li>
            <Link
              to='/dashboard'
              className={`link ${isActiveLink('/dashboard') ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <Icon icon='mdi:view-dashboard' className='sidebar-icon' />
              Overview
            </Link>
          </li>

          <li>
            <Link
              to='/dashboard/profile'
              className={`link ${
                isActiveLink('/dashboard/profile') ? 'active' : ''
              }`}
              onClick={closeSidebar}
            >
              <Icon icon='iconamoon:profile-fill' className='sidebar-icon' />
              Profile
            </Link>
          </li>
          <li>
            <Link
              to='/dashboard/my-courses'
              className={`link ${
                isActiveLink('/dashboard/my-courses') ? 'active' : ''
              }`}
              onClick={closeSidebar}
            >
              <Icon icon='mdi:book-open-variant' className='sidebar-icon' />
              My Course
            </Link>
          </li>

          <li>
            <Link
              to='/dashboard/support'
              className={`link ${
                isActiveLink('/dashboard/support') ? 'active' : ''
              }`}
              onClick={closeSidebar}
            >
              <Icon icon='mdi:lifebuoy' className='sidebar-icon' />
              Support
            </Link>
          </li>

          <li>
            <Link
              to='/dashboard/payment-history'
              className={`link ${
                isActiveLink('/dashboard/payment-history') ? 'active' : ''
              }`}
              onClick={closeSidebar}
            >
              <Icon icon='mdi:credit-card-outline' className='sidebar-icon' />
              Payment History
            </Link>
          </li>
        </ul>

        <div className='hamburger-icon' onClick={handleClick}>
          <Icon
            icon={clicked ? 'jam:close' : 'ci:menu-alt-03'}
            className={clicked ? 'close' : 'bar'}
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
