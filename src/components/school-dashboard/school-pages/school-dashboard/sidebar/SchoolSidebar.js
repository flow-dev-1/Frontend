import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import './sidebar.css'

function SchoolSidebar() {
  const location = useLocation()
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const toggleCourses = () => {
    setIsCoursesOpen(!isCoursesOpen)
  }

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const isActiveLink = (path) => {
    return location.pathname === path
  }

  return (
    <div className='sidebar-user'>
      <div className='sidebar-user-content'>
        <ul className='sidebar-user-menu mt-3 desktop'>
          <li>
            <Link
              to='/school-dashboard'
              className={`link ${
                isActiveLink('/school-dashboard') ? 'active' : ''
              }`}
            >
              <Icon icon='mdi:view-dashboard' className='sidebar-icon' />
              Overview
            </Link>
          </li>

          <li>
            <div className='link' onClick={toggleCourses}>
              <Icon icon='mdi:book-open-variant' className='sidebar-icon' />
              Courses
              <Icon
                icon={isCoursesOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                className='chevron-icon'
              />
            </div>
            {isCoursesOpen && (
              <ul className='nested-menu'>
                <li>
                  <Link
                    to='/school-dashboard/courses/all'
                    className={`link ${
                      isActiveLink('/school-dashboard/courses/all')
                        ? 'active-inner'
                        : 'inner'
                    }`}
                  >
                    All
                  </Link>
                </li>
                <li>
                  <Link
                    to='/school-dashboard/courses/enrolled'
                    className={`link ${
                      isActiveLink('/school-dashboard/courses/enrolled')
                        ? 'active-inner'
                        : 'inner'
                    }`}
                  >
                    Enrolled
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to='/school-dashboard/support'
              className={`link ${
                isActiveLink('/school-dashboard/support') ? 'active' : ''
              }`}
            >
              <Icon icon='mdi:lifebuoy' className='sidebar-icon' />
              Support
            </Link>
          </li>

          <li>
            <Link
              to='/school-dashboard/payment-history'
              className={`link ${
                isActiveLink('/school-dashboard/payment-history')
                  ? 'active'
                  : ''
              }`}
            >
              <Icon icon='mdi:credit-card-outline' className='sidebar-icon' />
              Payment History
            </Link>
          </li>

          <li>
            <div className='link' onClick={toggleSettings}>
              <Icon icon='mdi:cog' className='sidebar-icon' />
              Settings
              <Icon
                icon={isSettingsOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                className='chevron-icon'
              />
            </div>
            {isSettingsOpen && (
              <ul className='nested-menu'>
                <li>
                  <Link
                    to='/school-dashboard/settings/profile'
                    className={`link ${
                      isActiveLink('/school-dashboard/settings/profile')
                        ? 'active-inner'
                        : 'inner'
                    }`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to='/school-dashboard/settings/teams'
                    className={`link ${
                      isActiveLink('/school-dashboard/settings/teams')
                        ? 'active-inner'
                        : 'inner'
                    }`}
                  >
                    Teams
                  </Link>
                </li>
                <li>
                  <Link
                    to='/school-dashboard/settings/change-password'
                    className={`link ${
                      isActiveLink('/school-dashboard/settings/change-password')
                        ? 'active-inner'
                        : 'inner'
                    }`}
                  >
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link
                    to='/school-dashboard/settings/email-notifications'
                    className={`link ${
                      isActiveLink(
                        '/school-dashboard/settings/email-notifications'
                      )
                        ? 'active-inner'
                        : 'inner'
                    }`}
                  >
                    Email Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    to='/school-dashboard/settings/deactivate-account'
                    className={`link ${
                      isActiveLink(
                        '/school-dashboard/settings/deactivate-account'
                      )
                        ? 'active-inner'
                        : 'inner'
                    }`}
                  >
                    Deactivate Account
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SchoolSidebar
