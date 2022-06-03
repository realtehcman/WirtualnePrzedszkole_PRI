import axios from 'axios'


const USERS_REST_API_URL = 'http://localhost:8080/api/users'

class UserService {
    
    getUsers(){
        return axios.get(USERS_REST_API_URL);
    }

    createUser(userID){
        return axios.post(USERS_REST_API_URL, userID);
    }

    getUserById(userId){
        return axios.get(USERS_REST_API_URL + '/' + userId);
    }
    pdateEmployee(user, userId){
        return axios.put(USERS_REST_API_URL + '/' + userId, user);
    }

    deleteEmployee(userID){
        return axios.delete(USERS_REST_API_URL + '/' + userID);
    }

}

export default new UserService();
