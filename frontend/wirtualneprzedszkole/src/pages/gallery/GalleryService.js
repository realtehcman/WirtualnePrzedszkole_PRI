import axios from 'axios'

const FILE_REST_API_URL = 'http://localhost:8080/api'

class GalleryService {

    getMultiFiles(id) {
        return axios.get(FILE_REST_API_URL + "/file/downloadFolder/" + id)
    }

    getFolders() {
        return axios.get(FILE_REST_API_URL + "/folder/all/")
    }

    ViewFolder(id) {
        // return axios.get(FILE_REST_API_URL + "/downloadFolder/" + id)
        return axios.get(FILE_REST_API_URL + "/folder/" + id)
    }

    AddFile(folderId, fromData) {
        return axios.post(FILE_REST_API_URL + "/file/uploadFile/" + folderId, fromData)
    }

    // AddMultiFiles() {
    //     return axios.get(FILE_REST_API_URL + "file/uploadMultiFiles/")
    // }

    AddMultiFiles(folderId,formData) {
        return axios.post(FILE_REST_API_URL + "/file/uploadMultiFiles/" + folderId,  formData)
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
