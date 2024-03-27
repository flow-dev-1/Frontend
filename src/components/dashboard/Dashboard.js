import { Outlet, Link, useLocation } from "react-router-dom";
import './dashboard.css'
import Sidebar from "./sidebar/SideBar";

// import './navbar.css'

import userService from '../../services/api/users';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { loginSuccess } from "../../redux/reducers/userReducer";
import SingleCoursePage from "./pages/my-courses/single-course-page/SingleCoursePage";
export default function Dashboard() {
    const dispatch = useDispatch();

    const location = useLocation();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: userService.currentUser,
        staleTime: Infinity
    });

    useEffect(() => {
        if (data) {
            dispatch(loginSuccess(data?.user));
        }
        // Cleanup logic (if needed)
        return () => {
            // Perform cleanup when the component unmounts
        };
    }, [data]);

    // Get the JWT token from local storage
    // const auth_token =
    //     localStorage.getItem('FLOW') ||
    //     (localStorage.getItem('persist:root') &&
    //         JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.token);

    // localStorage.removeItem('N');

    if (isLoading) {
        // You might want to render a loading indicator here
        return (
            <div className="loading-overlay" style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <img src={logo} alt="FLOW" style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    animation: "pulse 2s infinite" // Adding animation directly in style
                }} />
                <style>
                    {`
              @keyframes pulse {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.2);
                }
                100% {
                  transform: scale(1);
                }
              }
              `}
                </style>
            </div>
        )
    }

    if (!isLoading && isError) {
        // Handle error state here
        // return <p>Error loading connections: {isError.message}</p>;
        return <Navigate to='/login' />;
    }


    return (
        // <div className="dashboard">
        <div className={location.pathname === '/dashboard/my-courses' ? "course-page" : "dashboard"}>
            <nav className="navbar">
                <div className="container">
                    <Link to="/dashboard" className="navbar-logo">
                        <img src={logo} alt="" />
                    </Link>
                    <Link to="/login" className="navbar-logo">
                        Logout
                    </Link>
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
                <div className="dashboard">
                    <Sidebar className="sidebar-content" />
                    <div className="dashboard-content">
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



