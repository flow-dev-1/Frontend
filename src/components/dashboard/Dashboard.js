import { Outlet, Link, useLocation } from 'react-router-dom'
import './dashboard.css'
import Sidebar from './sidebar/SideBar'
import userService from '../../services/api/users'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { loginSuccess, logoutSuccess } from '../../redux/reducers/userReducer'
import SingleCoursePage from './pages/my-courses/single-course-page/SingleCoursePage'
import { clearToken } from '../../redux/reducers/jwtReducer'
export default function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // Get the JWT token from local storage
  // const auth_token =
  //     localStorage.getItem('FLOW') ||
  //     (localStorage.getItem('persist:root') &&
  //         JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.token);

  // localStorage.removeItem('N');

  // You might want to render a loading indicator here

  return (
    // <div className="dashboard">
    <div
      className={
        location.pathname === '/dashboard/my-courses'
          ? 'course-page'
          : 'dashboard'
      }
    >
      <nav className='navbar'>
        <div className='container'>
          <Link to='/dashboard' className='navbar-logo'>
            <img src={logo} alt='' />
          </Link>
          <div className='navbar-logo' style={{ cursor: 'pointer' }}>
            Logout
          </div>
        </div>
      </nav>

      {/* {location.pathname === '/dashboard/my-courses/:id' && <SingleCoursePage />}
            {location.pathname !== '/dashboard/my-courses/:id' && <div className="dashboard">
                <Sidebar className="sidebar-content" />
                <div className="dashboard-content " >
                    <Outlet />
                </div>
            </div>} */}
      {location.pathname.startsWith('/dashboard/my-courses/') ? (
        <SingleCoursePage />
      ) : (
        <div className='dashboard'>
          <Sidebar className='sidebar-content' />
          <div className='dashboard-content'>
            <Outlet />
          </div>
        </div>
      )}

      {/* <div className="dashboard">
                <Sidebar className="sidebar-content" />
                <div className="dashboard-content " >
                    <Outlet />
                </div>
            </div> */}
    </div>
  )
}
