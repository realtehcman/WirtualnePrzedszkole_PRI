import axios from 'axios'


const Current_UserService_REST_API_URL = 'http://localhost:8080/api/user/current_user'
const USER_API = 'http://localhost:8080/api/user'

class Current_UserService {

    getCurrent_User(){
        return axios.get(Current_UserService_REST_API_URL)
    }

    EditCurrent_User(user) {
        return axios.put(Current_UserService_REST_API_URL, user)
    }
    getCurrent_user(id) {
        return axios.get(Current_UserService_REST_API_URL + '/' + id)
    }
    addCurrent_User(current_user){
        console.log(current_user)
        return axios.post(Current_UserService_REST_API_URL, current_user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    restartPassword(reset) {
        return axios.patch(USER_API + "/restart", reset, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    changePassword(change) {
        return axios.patch(USER_API + "/change_password", change)
    }
}

export default new Current_UserService();

