import api from '../index.js'

class CourseOBJ {
    //Get courses
    getCourses = async (type) => {
        try {
            // Check if data is not empty

            const response = await api.get(`api/admins/courses?type=${type}`)
            return response.data
        } catch (err) {
            throw err?.response?.data || err.message
        }
    }
}

const course = new CourseOBJ()
export default course
