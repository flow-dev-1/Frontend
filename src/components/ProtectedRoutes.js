import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import adminService from "../services/api/admin";
import { adminData, setCode } from "../redux/reducers/adminReducer";
import React, { useEffect, useState } from "react";
import Loading from "./loader/Loader";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdmin = useSelector(adminData);

  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const courseEnrollmentId = params.get("courseEnrollmentId");

  useEffect(() => {
    if (token) {
      dispatch(setCode(token));
      localStorage.setItem("Flow-Auth-Token", token); // Store for broader compatibility
      if (courseEnrollmentId) {
        sessionStorage.setItem("flow-courseEnrollmentId", courseEnrollmentId);
      }

      // Clean up the URL to prevent re-processing and keep it clean
      const newParams = new URLSearchParams(location.search);
      newParams.delete("token");
      newParams.delete("courseEnrollmentId");
      const newSearch = newParams.toString();

      // Use replace: true to avoid backward navigation issues
      navigate({
        pathname: location.pathname,
        search: newSearch ? `?${newSearch}` : "",
      }, { replace: true });
    }
  }, [token, courseEnrollmentId, dispatch, navigate, location.pathname, location.search]);

  // Get the JWT token from local storage
  const auth_token =
    localStorage.getItem("Flow-Auth-Token") ||
    (localStorage.getItem("persist:root") &&
      JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth)
        ?.token);

  const isAuth = auth_token || isAdmin?.isAdmin || (token && !isAdmin?.isAdmin);

  return isAuth ? (
    children
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
