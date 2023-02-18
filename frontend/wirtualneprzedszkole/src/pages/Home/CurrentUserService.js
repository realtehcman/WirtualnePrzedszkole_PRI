import axios from 'axios'
import { config } from '../../AxiosUrlConfig';


const CurrentUserService_REST_API_URL = config.SERVER_URI + '/api/user/current_user'
const USER_API = config.SERVER_URI + '/api/user'

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

    addAvatar(file) {
        return axios.patch(USER_API + "/add_avatar", file)
    }

    deleteAvatar() {
        return axios.patch(USER_API + "/delete_avatar")
    }
}
// eslint-disable-next-line
export default new CurrentUserService();

