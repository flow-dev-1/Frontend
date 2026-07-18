import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./sidebar.css";

function Sidebar({ className, isMobileOpen, onMobileClose, onLogout, showAccountDropdown, onSwitchDashboard }) {
  const location = useLocation();
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const toggleCourses = () => {
    setIsCoursesOpen(!isCoursesOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setIsAccountOpen(false);
  };

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
    setIsSettingsOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const closeSidebar = () => {
    setClicked(false);
  };

  return (
    <>
      {isMobileOpen && <div className="sidebar-overlay" onClick={onMobileClose} />}
      <div
        className={`flow-sidebar-drawer ${className || ""} ${clicked ? "open" : ""} ${isMobileOpen ? "mobile-open" : ""}`}
      >
        <div className="sidebar-user-content">
          <ul className="sidebar-user-menu mt-3 desktop">
            <li>
              <Link
                to="/dashboard"
                className={`link ${isActiveLink("/dashboard") ? "active" : ""}`}
                onClick={() => { closeSidebar(); if (onMobileClose) onMobileClose(); }}
              >
                <Icon icon="ion:grid-outline" width={24} height={24} className="sidebar-icon" />
                <span>Overview</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/profile"
                className={`link ${isActiveLink("/dashboard/profile") ? "active" : ""
                  }`}
                onClick={() => { closeSidebar(); if (onMobileClose) onMobileClose(); }}
              >
                <Icon icon="uiw:user-add" width={24} height={24} className="sidebar-icon" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-courses"
                className={`link ${isActiveLink("/dashboard/my-courses") ? "active" : ""
                  }`}
                onClick={() => { closeSidebar(); if (onMobileClose) onMobileClose(); }}
              >
                <Icon icon="bi:book" width={24} height={24} className="sidebar-icon" />
                <span>My Course</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/support"
                className={`link ${isActiveLink("/dashboard/support") ? "active" : ""
                  }`}
                onClick={() => { closeSidebar(); if (onMobileClose) onMobileClose(); }}
              >
                <Icon icon="ph:users-light" width={24} height={24} className="sidebar-icon" />
                <span>Support</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/payment-history"
                className={`link ${isActiveLink("/dashboard/payment-history") ? "active" : ""
                  }`}
                onClick={() => { closeSidebar(); if (onMobileClose) onMobileClose(); }}
              >
                <Icon
                  width={26}
                  icon="solar:dollar-outline"
                  className="sidebar-icon"
                />
                <span>Payment History</span>
              </Link>
            </li>

            {/* Account — visible only on mobile */}
            <li className="mobile-only-account">
              <div
                className={`link ${isAccountOpen ? "active" : ""}`}
                onClick={toggleAccount}
                style={{ cursor: "pointer" }}
              >
                <Icon icon="ph:user-circle-light" width={24} height={24} className="sidebar-icon" />
                <span>Account</span>
                <Icon
                  width={20}
                  height={20}
                  icon={isAccountOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                  className="chevron-icon"
                />
              </div>
              {isAccountOpen && (
                <ul className="nested-menu">
                  {showAccountDropdown && (
                    <li>
                      <div
                        className="link inner"
                        onClick={() => {
                          if (onMobileClose) onMobileClose();
                          if (onSwitchDashboard) onSwitchDashboard();
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        Switch Dashboard
                      </div>
                    </li>
                  )}
                  <li>
                    <div
                      className="link inner"
                      onClick={() => {
                        if (onMobileClose) onMobileClose();
                        if (onLogout) onLogout();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </div>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <div className="hamburger-icon" onClick={handleClick}>
            <Icon
              icon={clicked ? "jam:close" : "ci:menu-alt-03"}
              className={clicked ? "close" : "bar"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
