import api from '../index.js'

class UserOBJ {
    //auths reg
    register = async (data) => {
        try {

            const response = await api.post('api/users/register', data)
            return response.data

        } catch (err) {
            throw err?.response?.data
        }
    }

    // confirm token
    verifyAccount = async (data) => {
        try {

            const response = await api.patch('/api/users/verify-account', data)
            return response

        } catch (err) {
            throw err?.response?.data
        }
    }

    //auths login
    login = async (data) => {
        try {
            //check if data is empty
            if (data) {
                const response = await api.post('api/users/login', data)
                return response.data
                //store res data
            } else {
                throw new Error('please fill in the fields')
            }
        } catch (err) {
            console.log(err)
            throw err?.response?.data
        }
    }

    //auths forgot password
    forgotPassword = async (data) => {
        try {

            const response = await api.post('api/users/forgot-password', data)
            return response
            //store res data

        } catch (err) {

            if (err?.message == "Network Error") {
                throw err?.message
            }
            throw err?.response?.data
        }
    }

    // confirm token
    confirmToken = async (data) => {
        try {
            //check if data is empty
            if (data) {
                const response = await api.post('/api/users/verify-token', data)
                console.log(response)
                return response
                //store res data
            } else {
                throw new Error('please fill in the fields')
            }
        } catch (err) {
            throw err?.response?.data
        }
    }



    //auths password reset otp
    newPassword = async (data) => {
        try {
            //check if data is empty
            if (data) {
                const response = await api.put('/api/users/password', data, {
                    headers: {
                        Authorization: `Bearer ${data.auth_token}`,
                    },
                })
                console.log(response)
                //store res data
            } else {
                throw new Error('please fill in the fields')
            }
        } catch (err) {
            throw err?.response?.data
        }
    }

    // confirm token
    currentUser = async () => {
        try {
            const response = await api.get('/api/users/me')
            console.log(response)
            return response.data

        } catch (err) {
            throw err?.response?.data
        }
    }

    //update profile
    updateProfile = async (data) => {
        try {

            const response = await api.put('api/users/profile', data)
            return response.data

        } catch (err) {
            throw err?.response?.data || err.message
        }
    }


    courseEnrollment = async (data) => {
        try {

            const response = await api.post('api/users/courses/1/enroll', data)
            return response.data

        } catch (err) {
            throw err?.response?.data || err.message
        }
    }
}
const user = new UserOBJ()
export default user
