import { Outlet, Link } from "react-router-dom";
import './dashboard.css'
import Sidebar from "./sidebar/SideBar";
import logo from '../../assets/logo.png'
// import './navbar.css'

export default function Dashboard() {
    return (
        <div className="dashboard">
            <nav className="navbar">
                <div className="container">
                    <Link to="/dashboard" className="navbar-logo">
                        <img src={logo} alt="" />
                    </Link>
                </div>
            </nav>
            <div className="dashboard">
                <Sidebar className="sidebar-content" />
                <div className="dashboard-content " >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}



