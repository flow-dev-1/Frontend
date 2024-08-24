import api from '../index.js'

class SchoolOBJ {
  //Login
  schoolLogin = async (data) => {
    try {
      const response = await api.post(`api/schools/login`, data);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  register = async (formData) => {
    try {
      const response = await api.post(`api/schools`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err?.response?.data || err.message;
    }
  };
  //Register

  //Get Admins
  getAdmins = async (params) => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/schools/${params}/team`);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  //Get Admins
  getEmailAdmins = async (params) => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/schools/${params}/email-list`);
      console.log(response);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };
  //Get My profile
  getMyProfile = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/schools/me`);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  getMyStudents = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/schools/enrolled`);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  getGraphData = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/schools/graph`);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  getCoursesWithActivity = async () => {
    try {
      // Check if data is not empty
      const response = await api.get(`api/schools/courses-active`);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  //Send Invite
  adminInvite = async (data) => {
    try {
      const response = await api.post(`api/schools/invitation`, data);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  emailAdminInvite = async (data) => {
    try {
      const response = await api.post(`api/schools/email-notification`, data);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  deleteAdmin = async (params) => {
    try {
      const response = await api.delete(`api/schools/teams/${params}`);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  deleteEmailAdmin = async (params) => {
    try {
      const response = await api.delete(`api/schools/email-list/${params}`);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  //Verify account
  schoolVerifyAccount = async (data) => {
    try {
      const response = await api.patch(`api/schools/verify-account`, data);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  //Forget password otp
  schoolForgotPasswordOtp = async (data) => {
    try {
      const response = await api.patch(`api/schools/verify-token`, data);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };
  //Forget password
  schoolForgotPassword = async (data) => {
    try {
      const response = await api.post(`api/schools/forgot-password`, data);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };
  //Forget password
  schoolResetPassword = async (data) => {
    try {
      const response = await api.put(`api/schools/password`, data);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  //Change Password
  updateProfile = async (formData) => {
    try {
      const response = await api.patch(`api/schools/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err?.response?.data || err.message;
    }
  };
  //Update Profile
  changePassword = async (data) => {
    try {
      const response = await api.patch(`api/schools/password`, data);
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  //Get app members
  getCourses = async (params, type) => {
    try {
      // Check if data is not empty

      const response = await api.get(
        `api/schools/${params}/courses?type=${type}`
      );
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  getEnrolledCourseData = async (params1, params2) => {
    try {
      // Check if data is not empty
      const response = await api.get(
        `api/schools/${params1}/courses/enrolled/${params2}`
      );
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };
  enrolledStudents = async (params1, params2, data) => {
    console.log(data, "Data 0");
    try {
      // Check if data is not empty
      const response = await api.post(
        `api/schools/${params1}/courses/${params2}/enroll`,
        data
      );
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  enrollStudentsIntoCourse = async (params1, params2, data) => {
    try {
      // Check if data is not empty
      const response = await api.put(
        `api/schools/${params1}/courses/${params2}/users`,
        data
      );
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  unEnrollStudentsFromCourse = async (params1, params2, params3) => {
    try {
      // Check if data is not empty
      const response = await api.delete(
        `api/schools/${params1}/users/${params2}/enrollment/${params3}`
      );
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };

  deactivateAccount = async (data) => {
    try {
      const response = await api.put(`api/schools`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      throw err?.response?.data || err.message;
    }
  };
}

const schoolService = new SchoolOBJ()
export default schoolService
