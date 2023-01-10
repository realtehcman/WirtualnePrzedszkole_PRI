import axios from 'axios'

const FILE_REST_API_URL = 'http://localhost:8080/api/file'

class FileService {

    getMultiFiles(folderId) {
        return axios.get(FILE_REST_API_URL + "/downloadFolder/" + folderId)
    }

}

export default new FileService();