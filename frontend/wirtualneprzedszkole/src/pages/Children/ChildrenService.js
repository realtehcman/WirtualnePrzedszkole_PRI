import axios from 'axios'
import { config } from '../../AxiosUrlConfig';


const CHILDREN_REST_API_URL = config.SERVER_URI + '/api/child'

class ChildrenService {
    
    getChildren(){
        return axios.get(CHILDREN_REST_API_URL)
    }

    addChild(child){
        return axios.post(CHILDREN_REST_API_URL, child, {
            headers: {
              'Content-Type': 'application/json'
            }
            });
    }

    editChild(child) {
        return axios.put(CHILDREN_REST_API_URL, child)
    }


    deleteChild(id){
        return axios.delete(CHILDREN_REST_API_URL + '/' + id)
    }

    getChild(id) {
        return axios.get(CHILDREN_REST_API_URL + '/' + id)
    }

    deleteChildFromClass(childId) {
        return axios.patch(CHILDREN_REST_API_URL + "/deleteChildFromClass/" + childId)
    }
}
// eslint-disable-next-line
export default new ChildrenService();
