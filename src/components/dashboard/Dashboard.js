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
import { useState } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);

  // Get the JWT token from local storage
  // const auth_token =
  //     localStorage.getItem('FLOW') ||
  //     (localStorage.getItem('persist:root') &&
  //         JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.token);

  // localStorage.removeItem('N');

  // You might want to render a loading indicator here

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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    // <div className="dashboard">
    <div className={location.pathname === "/dashboard/my-courses" ? "" : ""}>
      <nav className="navbar">
        <div className="container">
          <Link to="/dashboard" className="navbar-logo">
            <img src={logo} alt="" />
          </Link>
          <div
            className="navbar-logo d-none d-lg-block"
            onClick={logOut}
            style={{ cursor: "pointer" }}
          >
            Logout
          </div>
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
                    <li className="">
                      <Link to={"/dashboard"}>Overview</Link>
                    </li>
                    <li className="">
                      <Link to={"/dashboard/profile"}>Profile</Link>
                    </li>
                    <li className="">
                      <Link to={"/dashboard/my-courses"}>MyCourse</Link>
                    </li>
                    <li className="">
                      <Link to={"/dashboard/support"}>Support</Link>
                    </li>
                    <li className="text-nowrap">
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
