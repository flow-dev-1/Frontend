import api from '../index.js'

class AdminOBJ {

  //Get My profile
  getMyProfile = async (token) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      // Check if data is not empty
      const response = await api.get(`api/admins/me`, config)
      return response.data
    } catch (err) {
      throw err?.response?.data || err.message
    }
  }

  getUserCourseData = async (params1, week, token) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await api.get(
        `api/admins/course-enrollment/${params1}/${week}`, config
      )
      return response.data
    } catch (err) {
      return err?.response?.data || err.message;
    }
  }

  getUserCoursePercentile = async (params1, week, token) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await api.get(
        `api/admins/course-enrollment/${params1}/percentile`, config
      )
      return response.data
    } catch (err) {
      return err?.response?.data || err.message;
    }
  }

  submitAdminFeedback = async (data, params1, week, userId, token) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await api.patch(
        `api/admins/course-enrollment/${params1}/post-activity/${week}/${userId}`, { activities: data }, config
      )
      return response.data
    } catch (err) {
      return err?.response?.data || err.message;
    }
  }
}

const admin = new AdminOBJ()
export default admin
