import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import adminService from '../services/api/admin';
import { adminData, setCode } from '../redux/reducers/adminReducer';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdmin = useSelector(adminData);
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  let auth_token;

  const removeTokenFromURL = () => {
    // Remove the token parameter from the URL
    params.delete('token');
    const newSearch = params.toString();
    const newURL = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    window.history.replaceState({}, '', newURL); // Update URL without reloading
  };

  if (token) {
    // Check if the admin is already stored to prevent multiple API calls
    if (isAdmin.isAdmin) {
      removeTokenFromURL();
      auth_token = true;
    } else {
      const fetchAdminData = async () => {
        try {
          const adminData = await adminService.getMyProfile(token);
          if (adminData.admin) {
            dispatch(setCode(token));
            removeTokenFromURL();
            auth_token = true;
          }
        } catch (error) {
          console.error('Error fetching admin data:', error);
        }
      };

      fetchAdminData();
    }
  } else {
    // Get the JWT token from local storage
    auth_token =
      localStorage.getItem('Flow-Auth-Token') ||
      (localStorage.getItem('persist:root') &&
        JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.token);
  }

  return auth_token ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
