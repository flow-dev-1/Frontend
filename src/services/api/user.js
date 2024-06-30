import api from '../index.js'

class UserOBJ {

  //Register
  register = async (data) => {
    try {
      const response = await api.post(`api/users`, data)
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
