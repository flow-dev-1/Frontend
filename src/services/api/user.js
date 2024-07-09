import api from '../index.js'

class UserOBJ {
  //Register
  register = async (userType, data) => {
    try {
      const response = await api.post(
        `api/users/register?type=${userType}`,
        data
      )
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  getInvitedUser = async (auth_token) => {
    try {
      // Check if data is not empty

      const response = await api.get('api/users/me', {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Register
  registerInvitedUser = async (auth_token, data) => {
    console.log(auth_token)
    try {
      const response = await api.post(`api/users/invited-user`, data, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  registerInvitedAdmin = async (auth_token, data) => {
    console.log(auth_token)
    try {
      const response = await api.post(`api/users/invited-school-admin`, data, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  verifyAccount = async (data) => {
    try {
      const response = await api.patch(`api/users/verify-account`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  verifyToken = async (data) => {
    try {
      const response = await api.post(`api/users/verify-token`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Login
  login = async (data) => {
    try {
      const response = await api.post(`api/users/login`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  forgotPassword = async (data) => {
    try {
      const response = await api.post(`api/users/forgot-password`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  resetPassword = async (data) => {
    try {
      const response = await api.put(`api/users/password`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //update profile
  updateProfile = async (data) => {
    try {
      // Check if data is not empty

      const response = await api.put('api/users/profile', data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
}

const user = new UserOBJ()
export default user
