import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()

  // Get the JWT token from local storage
  const auth_token =
    localStorage.getItem('Flow-Auth-Token') ||
    (localStorage.getItem('persist:root') &&
      JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.token)

  return auth_token ? children : <Navigate to='/sign-in' />
}

export default ProtectedRoute
