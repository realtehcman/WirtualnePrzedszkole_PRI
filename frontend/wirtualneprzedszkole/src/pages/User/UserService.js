import axios from 'axios'


const USERS_REST_API_URL = 'http://localhost:8080/api/users'

class UserService {
    
    getUsers(){
        return axios.get(USERS_REST_API_URL)
    }

    addUser(user){
        return axios.post(USERS_REST_API_URL, user, {
            headers: {
              'Content-Type': 'application/json'
            }
            });
    }

    deleteUser(id){
        return axios.delete(USERS_REST_API_URL + '/' + id)
    }

    getUser(id) {
        return axios.get(USERS_REST_API_URL + '/' + id)
    }

    addChildToUser(id, child) {
        return axios.put(USERS_REST_API_URL + "/" + id, child)
    }

    editUser(user) {
        return axios.put(USERS_REST_API_URL, user)
    }

    getTeachers() {
        return axios.get(USERS_REST_API_URL + "/teachers")
    }

    assignTeacherToClass(classId, teacher) {
        return axios.put(USERS_REST_API_URL + "/add_to_class/" + classId, teacher)
    }

    deleteTeacherFromClass(teacherId, classId) {
        return axios.patch(USERS_REST_API_URL + "/deleteTeacherFromClass/" + teacherId + "/" + classId)
    }

    addChildrenToUser(userId, children) {
        return axios.put(USERS_REST_API_URL + "/addChildrenToUser/" + userId, children)
    }
}
// eslint-disable-next-line
export default new UserService();
