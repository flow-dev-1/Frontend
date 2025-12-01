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

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if(!user) return

    if(user?.isSchool) return navigate('/sign-in', { replace: true })
  
    return () => {    }
  }, [user])
  


  const logOut = () => {
    // localStorage.removeItem('Flow-Auth-Token');
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logoutSuccess());
    dispatch(clearToken());
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
  const toggleSideBar = (e) => {
    e.stopPropagation();
    setSideBarVisible(!sideBarVisible);
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

  const showDropdown = user?.isEducator && user?.isSchoolAdmin;

  return (
    // <div className="dashboard">
    <div className={location.pathname === "/dashboard/my-courses" ? "" : ""}>
      <nav className="navbar">
        <div className="container">
          <div className="book-icon-landscape">
            <Icon
              icon="mdi:book-open"
              color="skyblue" //TODO : change colour to match design
              width={30}
              onClick={toggleSideBar}
              style={{ cursor: "pointer" }}
            />
            {sideBarVisible && (
              <div
                className="fixed-top bg-dark bg-opacity-50 vh-100"
                onClick={(e) => toggleSideBar(e)}
              >
                <div
                  className="bg-light d-inline-block h-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul
                    className="sidebar-user-menu h-100 px-1"
                    style={{
                      background: "#00bcc3",
                      margin: 0,
                      paddingTop: "50px",
                    }}
                  >
                    <li>
                      <Link
                        to="/dashboard"
                        className={`link ${isActiveLink("/dashboard") ? "active" : ""
                          }`}
                        onClick={toggleSideBar}
                      >
                        <Icon
                          icon="ion:grid-outline"
                          className="sidebar-icon"
                        />
                        Overview
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/profile"
                        className={`link ${isActiveLink("/dashboard/profile") ? "active" : ""
                          }`}
                        onClick={toggleSideBar}
                      >
                        <Icon icon="uiw:user-add" className="sidebar-icon" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/my-courses"
                        className={`link ${isActiveLink("/dashboard/my-courses") ? "active" : ""
                          }`}
                        onClick={toggleSideBar}
                      >
                        <Icon icon="bi:book" className="sidebar-icon" />
                        My Course
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/support"
                        className={`link ${isActiveLink("/dashboard/support") ? "active" : ""
                          }`}
                        onClick={toggleSideBar}
                      >
                        <Icon icon="ph:users-light" className="sidebar-icon" />
                        Support
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/payment-history"
                        className={`link ${isActiveLink("/dashboard/payment-history")
                          ? "active"
                          : ""
                          }`}
                        onClick={toggleSideBar}
                      >
                        <Icon
                          width={26}
                          icon="solar:dollar-outline"
                          className="sidebar-icon"
                        />
                        Payment History
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
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
          ) : (
            <div
              className="navbar-logo"
              onClick={logOut}
              style={{ cursor: "pointer" }}
            >
              Logout
            </div>
          )}
          <div className="d-block d-lg-none position-relative">
            <Icon
              icon="mdi:menu"
              width={30}
              onClick={toggleMenu}
              style={{ cursor: "pointer" }}
            />
            {menuVisible && (
              <div
                className="d-lg-none position-absolute"
                style={{
                  top: "30px",
                  left: "-100px",
                  borderRadius: "15px",
                  border: "1px solid rgba(244, 241, 241, 0.9)",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: "15px",
                    background: "rgba(255,255,255,0.9)",
                  }}
                  className="border-5 px-4 pt-4 pb-1"
                >
                  <ul className="d-flex gap-3 flex-column">
                    <li className="d-md-none">
                      <Link to={"/dashboard"}>Overview</Link>
                    </li>
                    <li className="d-md-none">
                      <Link to={"/dashboard/profile"}>Profile</Link>
                    </li>
                    <li className="d-md-none">
                      <Link to={"/dashboard/my-courses"}>MyCourse</Link>
                    </li>
                    <li className="d-md-none">
                      <Link to={"/dashboard/support"}>Support</Link>
                    </li>
                    <li className="d-md-none text-nowrap">
                      <Link to={"/dashboard/payment-history"}>
                        Payment History
                      </Link>
                    </li>
                    <li className=" text-danger" onClick={logOut}>
                      Log Out
                    </li>
                  </ul>
                </div>
              </div>
            )}
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
      {location.pathname.startsWith("/dashboard/my-courses/") ? (
        <SingleCoursePage />
      ) : // <SelfAwarenessCourse />
        location.pathname.startsWith("/dashboard/self-awareness-course") ? (
          <SelfAwarenessCourse />
        ) : (
          <div className="dashboard ">
            <Sidebar className="sidebar-content" />
            <div
              className="bg-light sidebar-user-tablet-icons vh-100"
              onClick={(e) => e.stopPropagation()}
            // style={{ width: "0px" }}
            >
              <ul
                className="sidebar-user-menu h-100 px-1 w-"
                style={{
                  background: "#00bcc3",
                  margin: 0,
                  width: "fit-content",
                  paddingTop: "70px",
                }}
              >
                <li style={{ width: "fit-content" }}>
                  <Link
                    to="/dashboard"
                    className={`link ${isActiveLink("/dashboard") ? "active" : ""
                      }`}
                    onClick={toggleSideBar}
                  >
                    <Icon icon="ion:grid-outline" className="sidebar-icon" />
                  </Link>
                </li>

                <li style={{ width: "fit-content" }}>
                  <Link
                    to="/dashboard/profile"
                    className={`link ${isActiveLink("/dashboard/profile") ? "active" : ""
                      }`}
                    onClick={toggleSideBar}
                  >
                    <Icon icon="uiw:user-add" className="sidebar-icon" />
                  </Link>
                </li>
                <li style={{ width: "fit-content" }}>
                  <Link
                    to="/dashboard/my-courses"
                    className={`link ${isActiveLink("/dashboard/my-courses") ? "active" : ""
                      }`}
                    onClick={toggleSideBar}
                  >
                    <Icon icon="bi:book" className="sidebar-icon" />
                  </Link>
                </li>

                <li style={{ width: "fit-content" }}>
                  <Link
                    to="/dashboard/support"
                    className={`link ${isActiveLink("/dashboard/support") ? "active" : ""
                      }`}
                    onClick={toggleSideBar}
                  >
                    <Icon icon="ph:users-light" className="sidebar-icon" />
                  </Link>
                </li>

                <li style={{ width: "fit-content" }}>
                  <Link
                    to="/dashboard/payment-history"
                    className={`link ${isActiveLink("/dashboard/payment-history") ? "active" : ""
                      }`}
                    onClick={toggleSideBar}
                  >
                    <Icon
                      width={26}
                      icon="solar:dollar-outline"
                      className="sidebar-icon"
                    />
                  </Link>
                </li>
              </ul>
            </div>
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
