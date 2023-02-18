import axios from 'axios'
import { config } from '../../AxiosUrlConfig';

const FOLDER_REST_API_URL = config.SERVER_URI + '/api/folder'

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

}
// eslint-disable-next-line
export default new FolderService();
