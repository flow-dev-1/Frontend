import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import SchoolSidebar from "./sidebar/SchoolSidebar";
import logo from "../../../../assets/logo.png";
import SchoolSingleCoursePage from "../school-single-course-page/SchoolSingleCoursePage";
import "./dashboard.css";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../../redux/reducers/userReducer";
import { clearToken } from "../../../../redux/reducers/jwtReducer";
import { useSelector } from 'react-redux';

export default function SchoolDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  let schoolId;

  if (user?.isSchool) {
    schoolId = user?._id;
  }

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

  const logOut = () => {
    localStorage.removeItem("Flow-Auth-Token");
    localStorage.setItem("currentActivity", JSON.stringify(1));
    localStorage.removeItem("activityData");
    localStorage.removeItem("history");
    localStorage.removeItem("cards");
    localStorage.removeItem("buckets");
    localStorage.removeItem("selectedPersonality");
    localStorage.removeItem("personalityExplanation");
    localStorage.removeItem("questionChecked");
    localStorage.removeItem("answersForOne");
    localStorage.clear();
    dispatch(logoutSuccess());
    dispatch(clearToken());
    navigate("/sign-in", { replace: true });
  };

  const switchToEducatorDashboard = () => {
    navigate("/dashboard");
    setIsDropdownOpen(false);
  };

  const showDropdown = user?.isEducator && user?.isSchoolAdmin;

  return (
    <div
      className={
        location.pathname === "/dashboard/my-courses"
          ? "course-page"
          : "dashboard"
      }
    >
      <nav className="navbar">
        <div className="container">
          <Link to="/school-dashboard" className="navbar-logo">
            <img src={logo} alt="" />
          </Link>

          {showDropdown ? (
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
                    onClick={switchToEducatorDashboard}
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
          ) : (
            <div
              className="navbar-logo"
              onClick={logOut}
              style={{ cursor: "pointer" }}
            >
              Logout
            </div>
          )}
        </div>
      </nav>

      {location.pathname.startsWith("/dashboard/my-courses/") ? (
        <SchoolSingleCoursePage />
      ) : location.pathname.includes("/courses/feedback") ? (
        <div className="dashboard-content" style={{ width: '95%', margin: '0 auto' }}>
          <Outlet />
        </div>
      ) : (
        <div className="dashboard">
          <SchoolSidebar className="sidebar-content" />
          <div className="dashboard-content">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}