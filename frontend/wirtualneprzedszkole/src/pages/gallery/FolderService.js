import axios from 'axios'

const FOLDER_REST_API_URL = 'http://localhost:8080/api/folder'

class FolderService {

    getFolder(folderId) {
        return axios.get(FOLDER_REST_API_URL + "/" + folderId)
    }

}

export default new FolderService();