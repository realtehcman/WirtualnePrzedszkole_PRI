import axios from 'axios'
import { config } from '../../AxiosUrlConfig';

const FILE_REST_API_URL = config.SERVER_URI + '/api'

class GalleryService {

    getMultiFiles(id) {
        return axios.get(FILE_REST_API_URL + "/file/downloadFolder/" + id)
    }

    getFolders() {
        return axios.get(FILE_REST_API_URL + "/folder/all/")
    }

    ViewFolder(id) {
        return axios.get(FILE_REST_API_URL + "/downloadFolder/" + id)
    }

    AddMultiFiles() {
        return axios.get(FILE_REST_API_URL + "/file/uploadMultiFiles/")
    }

    deleteFolder(id){
    return axios.delete(FILE_REST_API_URL + "/folder/" + id)
}

    UploadMultiFiles(group){
        return axios.post(FILE_REST_API_URL + "/file/uploadMultiFiles/", group, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }



}
// eslint-disable-next-line
export default new GalleryService();
