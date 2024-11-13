import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import SchoolSidebar from "./sidebar/SchoolSidebar";
import logo from "../../../../assets/logo.png";
import SchoolSingleCoursePage from "../school-single-course-page/SchoolSingleCoursePage";
import "./dashboard.css";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../../redux/reducers/userReducer";
import { clearToken } from "../../../../redux/reducers/jwtReducer";

export default function SchoolDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
    localStorage.clear()
    dispatch(logoutSuccess());
    dispatch(clearToken());
    navigate("/sign-in", { replace: true });
  };

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
          <div
            className="navbar-logo"
            onClick={logOut}
            style={{ cursor: "pointer" }}
          >
            Logout
          </div>
        </div>
      </nav>

      {location.pathname.startsWith("/dashboard/my-courses/") ? (
        <SchoolSingleCoursePage />
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
