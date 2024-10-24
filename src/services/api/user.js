import api from '../index.js'

class UserOBJ {
  //Register
  register = async (userType, data) => {
    try {
      const response = await api.post(
        `api/educator/register?type=${userType}`,
        data
      )
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  courseEnrollment = async (params, data) => {
    console.log(params)
    try {
      const response = await api.post(
        `api/users/courses/${params}/enroll`,
        data
      )
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  individualRegister = async (data) => {
    try {
      const response = await api.post(
        `api/users/register?type=Individual`,
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
  getUserId = async () => {
    try {
      // Check if data is not empty
      const response = await api.get('api/id')
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Register
  registerInvitedUser = async (auth_token, data) => {
    console.log(auth_token)
    console.log(data)
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

  validatePayment = async (auth_token, params) => {
    try {
      const response = await api.post(
        `validate-transaction?reference=${params}`,
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  getParentDetails = async (auth_token) => {
    console.log(auth_token)
    try {
      const response = await api.get(`api/users/parent`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  getEducatorDetails = async (auth_token) => {
    console.log(auth_token)
    try {
      const response = await api.get(`api/educator/educator`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      return response.data
    } catch (err) {
      console.log(err?.response?.data || err.message)
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
      const response = await api.patch(`api/verify-account`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  verifyToken = async (data) => {
    try {
      const response = await api.patch(`api/verify-token`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  educatorVerifyToken = async (data) => {
    try {
      const response = await api.patch(`api/educator/verify-account`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //Login
  login = async (data) => {
    try {
      const response = await api.post(`api/login`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  forgotPassword = async (data) => {
    try {
      const response = await api.post(`api/forgot-password`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  resetPassword = async (data) => {
    try {
      const response = await api.put(`api/password`, data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  //update profile
  updateProfileEducator = async (data) => {
    try {
      // Check if data is not empty

      const response = await api.patch('api/educator/profile', data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  updateProfileIndividual = async (data) => {
    try {
      // Check if data is not empty

      const response = await api.patch('api/users/profile', data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  getMyProfileIndividual = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/users/me`)
      console.log(response.data)
      return response.data
    } catch (err) {
      console.log(err?.response?.data || err.message)
      throw err?.response?.data || err.message
    }
  }
  getIndividualCoursesEnrolled = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/users/courses?type=Enrolled`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  };

  getCompletedWeeks = async (id) => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/users/courses/${id}/completed`);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  getIndividualCourses = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/users/courses`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  getMyProfileEducator = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/educator/me`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  getMyPayments = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/users/payments`)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  postMyActivity = async (params1, formData) => {
    try {
      const response = await api.put(
        `api/users/course-enrollment/${params1}/activity`,

        formData
      )
      console.log(response.data)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }
  postMyAssessment = async (params1, formData) => {
    try {
      const response = await api.post(
        `api/users/course-enrollment/${params1}/assesment`,

        formData
      )
      // console.log(response.data);
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  getMyActivites = async (params1, week) => {
    try {
      const response = await api.get(
        `api/users/course-enrollment/${params1}/get-activity/${week}`
      )
      return response.data
    } catch (err) {
      return err?.response?.data || err.message;
    }
  }

  postAdminEducator = async (formData) => {
    try {
      const response = await api.post(
        `api/educator/invited/admin-educator`,
        formData
      )
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  getMyAssessment = async (params1, week) => {
    try {
      const response = await api.get(
        `api/users/course-enrollment/${params1}/get-assesment/${week}`
      )
      return response.data
    } catch (err) {
      console.log(err?.response?.data || err.message)
      throw err?.response?.data || err.message
    }
  }

  getMyAssessmentFeedback = async (params1, week, params2) => {

    try {
      const response = await api.get(
        `api/admins/course-enrollment/${params1}/get-assesment/${week}/${params2}`
      );
      
      return response.data;
    } catch (err) {
      console.log(err?.response?.data || err.message,"Error here");
      throw err?.response?.data || err.message;
    }
  };

  getMyActivitesFeedback = async (params1, week, params2) => {
    try {
      const response = await api.get(
        `api/admins/course-enrollment/${params1}/get-activity/${week}/${params2}`
      )
      return response.data
    } catch (err) {
      console.log(err?.response?.data || err.message)
      throw err?.response?.data || err.message
    }
  }
}

const user = new UserOBJ()
export default user
