import axios from 'axios'


const CurrentUserService_REST_API_URL = 'http://localhost:8080/api/user/current_user'
const USER_API = 'http://localhost:8080/api/user'

class CurrentUserService {

    getCurrentUsers(){
        return axios.get(CurrentUserService_REST_API_URL)
    }

    editCurrentUser(currentUser) {
        return axios.put(CurrentUserService_REST_API_URL, currentUser)
    }
    getCurrentUser() {
        return axios.get(CurrentUserService_REST_API_URL)
    }
    addCurrentUser(currentUser){
        return axios.post(CurrentUserService_REST_API_URL, currentUser, {
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

export default new CurrentUserService();

