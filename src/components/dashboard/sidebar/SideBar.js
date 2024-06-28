import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './sidebar.css';

function Sidebar() {
    const [clicked, setClicked] = useState("");
    const [activeLink, setActiveLink] = useState("overview");

    const handleClick = () => {
        setClicked(!clicked);
    };

    const closeSidebar = () => {
        setClicked(false);
    };
    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };

    return (
        <div className={`sidebar-user  ${clicked ? 'open' : ''}`}>
            <div className="mt-5 sidebar-user-content">
            <ul className="sidebar-user-menu mt-5 desktop">
                    <li className={activeLink === "overview" ? "active" : ""}>
                        <NavLink
                            className="link"
                            activeClassName="active"
                            to="/dashboard"
                            onClick={() => {
                                closeSidebar();
                                handleLinkClick("overview");
                            }}
                        >
                            <Icon icon="ic:round-space-dashboard" className="sidebar-icon" />
                            Overview
                        </NavLink>
                    </li>

                    <li className={activeLink === "profile" ? "active" : ""}>
                        <NavLink
                            className="link"
                            activeClassName="active"
                            to="/dashboard/profile"
                            onClick={() => {
                                closeSidebar();
                                handleLinkClick("profile");
                            }}
                        >
                            <Icon icon="iconamoon:profile-fill" className="sidebar-icon" />
                            Profile
                        </NavLink>
                    </li>
                    <li className={activeLink === "my-courses" ? "active" : ""}>
                        <NavLink
                            className="link"
                            activeClassName="active"
                            to="/dashboard/my-courses"
                            onClick={() => {
                                closeSidebar();
                                handleLinkClick("my-courses");
                            }}
                        >
                            <Icon icon="fa:book" className="sidebar-icon" />
                            My Courses
                        </NavLink>
                    </li>
                </ul>

                <div className="hamburger-icon" onClick={handleClick}>
                    <Icon
                        icon={clicked ? 'jam:close' : 'ci:menu-alt-03'}
                        className={clicked ? 'close' : 'bar'}
                    />
                </div>

                {clicked && (
                    <ul className="sidebar-user-menu p-0 mobile">
                        <li onClick={closeSidebar}>
                            <NavLink
                                className="link dashboard"
                                to="/dashboard"
                                onClick={() => closeSidebar()}>
                                Overview
                            </NavLink>
                        </li>

                        <li onClick={closeSidebar}>
                            <NavLink
                                className="link"
                                to="/dashboard/profile"
                                onClick={() => closeSidebar()}>
                                Profile
                            </NavLink>
                        </li>
                        <li onClick={closeSidebar}>
                            <NavLink
                                className="link"
                                to="/dashboard/my-courses"
                                onClick={() => closeSidebar()}>
                                My Courses
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
