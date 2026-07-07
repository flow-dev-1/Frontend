import { useState, useRef, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./dashboard.css";
import Sidebar from "./sidebar/SideBar";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { loginSuccess, logoutSuccess } from "../../redux/reducers/userReducer";
import SingleCoursePage from "./pages/my-courses/single-course-page/SingleCoursePage";
import { clearToken } from "../../redux/reducers/jwtReducer";
import SelfAwarenessCourse from "./pages/my-courses/self-awareness-course/SelfAwarenessCourse";
import { updateData } from "../../redux/reducers/userAnswersReducer";
import { Icon } from "@iconify/react";
import { useSelector } from 'react-redux';
import { clearCode } from "../../redux/reducers/adminReducer";
import { queryClient } from "../../queryClient";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!user) return

    if (user?.isSchool) return navigate('/sign-in', { replace: true })

    return () => { }
  }, [user])



  const logOut = () => {
    // localStorage.removeItem('Flow-Auth-Token');
    localStorage.clear();
    sessionStorage.clear();
    queryClient.clear();
    dispatch(logoutSuccess());
    dispatch(clearToken());
    dispatch(clearCode());
    dispatch(
      updateData({
        course: null,
        courseEnrollmentId: null,
        week: 1,
        activities: [],
        assessments: [],
      })
    );
    navigate("/sign-in", { replace: true });
  };
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const switchToSchoolDashboard = () => {
    navigate("/school-dashboard");
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Inactivity Logout Logic
  useEffect(() => {
    const timeoutLimit = 5 * 60 * 1000; // 5 minutes
    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logOut();
      }, timeoutLimit);
    };

    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [logOut]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const showDropdown = user?.isEducator && user?.isSchoolAdmin;

  return (
    // <div className="dashboard">
    <div className={location.pathname === "/dashboard/my-courses" ? "" : ""}>
      <nav className="navbar">
        <div className="container">

          <Link to="/dashboard" className="navbar-logo">
            <img src={logo} alt="" />
          </Link>
          {/* <div
            className="navbar-logo d-none d-lg-block"
            onClick={logOut}
            style={{ cursor: "pointer" }}
          >
            Logout
          </div> */}

          {showDropdown ? (
            <div className="navbar-right-desktop">
              <div className="navbar-dropdown-wrapper" ref={dropdownRef}>
                <div
                  className="navbar-logo"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{ cursor: "pointer" }}
                >
                  Account ▼
                </div>
                {isDropdownOpen && (
                  <div className="navbar-dropdown-menu">
                    <div
                      className="navbar-dropdown-item"
                      onClick={switchToSchoolDashboard}
                    >
                      Switch Dashboard
                    </div>
                    <div
                      className="navbar-dropdown-item"
                      onClick={logOut}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className="navbar-right-desktop"
            >
              <div
                className="navbar-logo"
                onClick={logOut}
                style={{ cursor: "pointer" }}
              >
                Logout
              </div>
            </div>
          )}

          {/* Mobile: show hamburger icon */}
          <button
            className="hamburger-icon"
            onClick={toggleMobileSidebar}
            aria-label="Toggle menu"
          >
            <Icon icon={isMobileSidebarOpen ? 'mdi:close' : 'mdi:menu'} />
          </button>

        </div>
      </nav>

      {/* {location.pathname === '/dashboard/my-courses/:id' && <SingleCoursePage />}
            {location.pathname !== '/dashboard/my-courses/:id' && <div className="dashboard">
                <Sidebar className="sidebar-content" />
                <div className="dashboard-content " >
                    <Outlet />
                </div>
            </div>} */}
      {location.pathname.startsWith("/dashboard/my-courses/") ? (
        <SingleCoursePage />
      ) : // <SelfAwarenessCourse />
        location.pathname.startsWith("/dashboard/self-awareness-course") ? (
          <SelfAwarenessCourse />
        ) : (
          <div className="dashboard ">
            <Sidebar
              className="sidebar-content"
              isMobileOpen={isMobileSidebarOpen}
              onMobileClose={() => setIsMobileSidebarOpen(false)}
              onLogout={logOut}
              showAccountDropdown={showDropdown}
              onSwitchDashboard={switchToSchoolDashboard}
            />

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
  );
}
