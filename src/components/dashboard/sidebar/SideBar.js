// // src/components/Sidebar.js

// import React from 'react';
// import { Icon } from '@iconify/react';

// import './sidebar.css'
// import { useLocation } from 'react-router-dom';

// export default function Sidebar() {

//     const location = useLocation();

//     return (
//         <div className="sidebar">
//             <ul>
//                 <li className={location.pathname === '/dashboard' ? 'active' : ''}>
//                     <Icon icon="solar:history-bold"  />
//                     <a href="#overview">Overview</a>
//                 </li>
//                 <li className={location.pathname === '/profile' ? 'active' : ''}>
//                     <Icon icon="solar:history-bold"  />
//                     <a href="#profile">Profile</a>
//                 </li>
//                 <li className={location.pathname === '/courses' ? 'active' : ''}>
//                     <Icon icon="solar:history-bold"  />
//                     <a href="#courses">My Courses</a>
//                 </li>
//             </ul>
//         </div>

//     );
// }




// import React, { Component } from 'react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './sidebar.css'
import { useNavigate } from "react-router-dom";



function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState("dashboard");
    const navigate = useNavigate();


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    const closeDropdown = () => {
        setActiveIndex(null);
    };



    //Hamburger Toggling
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    };
    const closeSidebar = () => {
        setClicked(false)
    }


    return (
        <div className={`sidebar-user mt-5 ${clicked ? "open" : ""}`}>
            {/* <div className='mt-5 sidebar-user-content'> */}
            <ul className="sidebar-user-menu mt-5 desktop">
                <li onClick={() => closeDropdown()}>
                    <NavLink className="link active-link dashboard" to="/dashboard" >
                        <Icon icon="ic:round-space-dashboard" className='sidebar-icon' />
                        Overview
                    </NavLink>
                </li>

                <li onClick={() => closeDropdown()}>
                    <NavLink className="link" to="" >
                        <Icon icon="iconamoon:profile-fill" className='sidebar-icon' />
                        Profile
                    </NavLink>
                </li>
                <li onClick={() => closeDropdown()}>
                    <NavLink className="link" to="" >
                        <Icon icon="fa:book" className='sidebar-icon' />
                        My Courses
                    </NavLink>
                </li>
            </ul>

            <div className=" hamburger-icon" onClick={handleClick}>
                <Icon
                    icon={clicked ? "jam:close" : "ci:menu-alt-03"}
                    className={clicked ? "close" : "bar"}
                />
            </div>


            {clicked ? (

                <ul className="sidebar-user-menu p-0 mobile" >
                    <li onClick={closeSidebar}>
                        <NavLink className="link active-link dashboard " to="/dashboard/home" >
                            Overview
                        </NavLink>
                    </li>

                    <li onClick={closeSidebar}>
                        <NavLink className="link " to="/dashboard/profile">
                            Profile
                        </NavLink>
                    </li>
                    <li onClick={closeSidebar}>
                        <NavLink className="link " to="/dashboard">

                            Saving Withdrawal
                        </NavLink>
                    </li>

                </ul>
            ) : null}



            {/* </div> */}
        </div>
    )
}

export default Sidebar;