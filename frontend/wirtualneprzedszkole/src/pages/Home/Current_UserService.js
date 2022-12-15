import axios from 'axios'


const Current_UserService_REST_API_URL = 'http://localhost:8080/api/user/current_user'

class Current_UserService {

    getCurrent_User(){
        return axios.get(Current_UserService_REST_API_URL)
    }

    EditCurrent_User(current_user) {
        return axios.put(Current_UserService_REST_API_URL, current_user)
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
}

export default new Current_UserService();

