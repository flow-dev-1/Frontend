import api from '../index.js'

class SchoolOBJ {
  //Get Admin Roles
  getAdminRoles = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/admins/roles`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  //Get Admins
  getAdmins = async (params) => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/schools/${params}/team`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  //Get My profile
  getMyProfile = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/schools/me`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  //Login
  schoolLogin = async (data) => {

    try {
      const response = await api.post(`api/schools/login`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Register
  register = async (data) => {
    try {
      const response = await api.post(`api/schools`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  //Send Invite
  adminInvite = async (data) => {
    try {
      const response = await api.post(`api/schools/invitation`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  deleteAdmin = async (params) => {
    try {
      const response = await api.delete(`api/schools/teams/${params}`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Verify account
  schoolVerifyAccount = async (data) => {
    try {
      const response = await api.patch(`api/schools/verify-account`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Forget password otp
  schoolForgotPasswordOtp = async (data) => {
    try {
      const response = await api.patch(`api/schools/verify-token`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  //Forget password
  schoolForgotPassword = async (data) => {
    try {
      const response = await api.post(`api/schools/forgot-password`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  //Forget password
  schoolResetPassword = async (data) => {
    try {
      const response = await api.put(`api/schools/password`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  //Update Profile
  updateProfile = async (data) => {
    try {
      const response = await api.put(`api/admins/profile`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  //Change Password
  updateProfile = async (data) => {
    try {
      const response = await api.put(`api/admins/profile`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  //Update Profile
  changePassword = async (data) => {
    try {
      const response = await api.patch(`api/schools/password`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Get app members
  getCourses = async (params, type) => {
    try {
      // Check if data is not empty

      const response = await api.get(`api/schools/${params}/courses?type=${type}`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  getEnrolledCourseData = async (params1, params2) => {

    try {
      // Check if data is not empty
      const response = await api.get(`api/schools/${params1}/courses/enrolled/${params2}`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Admin Add Course
  adminAddCourse = async (formData) => {
    try {
      const response = await api.post(`api/admins/courses`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (err) {
      console.log(err)
      throw err?.response?.data || err.message
    }
  }

  //Admin Edit Course
  adminEditCourse = async (params, formData) => {
    try {
      // Check if data is not empty
      const response = await api.put(`api/admins/courses/${params}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (err) {
      console.log(err)
      throw err?.response?.data || err.message
    }
  }

  //Admin Delete course
  adminDeleteCourse = async (params) => {
    try {
      // Check if data is not empty

      const response = await api.delete(`api/admins/courses/${params}`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }


  //Get app members
  getMembers = async () => {
    try {
      // Check if data is not empty

      const response = await api.get('api/users/members')
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }





  // Update Single Forum

  editForum = async (params, data) => {
    try {
      // Check if data is not empty

      const response = await api.patch(`api/admin/forums/${params}`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Update Group Photo

  updateGroupPhoto = async (params, formData) => {
    try {
      const response = await api.patch(
        `/api/admin/groups/${params}/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return response.data
    } catch (err) {
      console.log(err)
      throw err?.response?.data || err.message
    }
  }

  //Update forum Photo
  updateForumPhoto = async (params, formData) => {
    try {
      const response = await api.patch(
        `/api/admin/forums/${params}/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return response.data
    } catch (err) {
      console.log(err)
      throw err?.response?.data || err.message
    }
  }
}

const schoolService = new SchoolOBJ()
export default schoolService
