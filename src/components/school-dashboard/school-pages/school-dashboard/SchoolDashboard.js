import { Outlet, Link, useLocation } from 'react-router-dom'
import SchoolSidebar from './sidebar/SchoolSidebar'
import logo from '../../../../assets/logo.png'
import SchoolSingleCoursePage from '../school-single-course-page/SchoolSingleCoursePage'
import './dashboard.css'
export default function SchoolDashboard() {
  const location = useLocation()
  return (
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

      {location.pathname.startsWith('/dashboard/my-courses/') ? (
        <SchoolSingleCoursePage />
      ) : (
        <div className='dashboard'>
          <SchoolSidebar className='sidebar-content' />
          <div className='dashboard-content'>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  )
}
