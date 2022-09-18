import axios from 'axios'


const GROUP_REST_API_URL = 'http://localhost:8080/api/class'

class GroupService {
    
    getGroups(){
        return axios.get(GROUP_REST_API_URL)
    }

    addGroup(user){
        console.log(user)
        return axios.post(GROUP_REST_API_URL, user, {
            headers: {
              'Content-Type': 'application/json'
            }
            });
    }

    deleteGroup(id){
        return axios.delete(GROUP_REST_API_URL + '/' + id)
    }

    getGroup(id) {
        return axios.get(GROUP_REST_API_URL + '/' + id)
    }
}

export default new GroupService();