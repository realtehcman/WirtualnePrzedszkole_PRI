import axios from 'axios'

const FOLDER_REST_API_URL = 'http://localhost:8080/api/folder'

class FolderService {

    getFolder(folderId) {
        return axios.get(FOLDER_REST_API_URL + "/" + folderId)
    }

    getClassFolders(className) {
        return axios.get(FOLDER_REST_API_URL + "/className/" + className)
    }

    getClassSubFolders(className) {
        return axios.get(FOLDER_REST_API_URL + "/getSubFolders/" + className)
    }

    addNewFolder(newFolder) {
        return axios.post(FOLDER_REST_API_URL, newFolder)
    }

    deleteFolder(folderId) {
        return axios.delete(FOLDER_REST_API_URL + "/" + folderId)
    }

    getFolders() {
        return axios.get(FOLDER_REST_API_URL + "/all/")
    }

}
// eslint-disable-next-line
export default new FolderService();
