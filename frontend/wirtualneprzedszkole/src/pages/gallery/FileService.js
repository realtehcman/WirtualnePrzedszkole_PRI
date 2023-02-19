import axios from 'axios'

const FILE_REST_API_URL = 'http://localhost:8080/api/file'

class FileService {

    getKnowledge() {
        return axios.get(FILE_REST_API_URL + "/downloadKnowledge")
    }

    getFile(folderId, fileName) {
        return axios.get(FILE_REST_API_URL + "/downloadFile/" + folderId + "/" + fileName,{
            
        responseType:"blob",
        //responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
          }
        })
    }

    addFiles(folderId, formData) {
        return axios.post(FILE_REST_API_URL + "/uploadMultiFiles/" + folderId, formData/* , {headers: {
            'Content-Type': 'multipart/form-data',
          }}, */)
    }

    deleteFile(folderId, fileName) {
        return axios.delete(FILE_REST_API_URL + "/deleteFile/" + folderId + "/" + fileName)
    }

    deleteAllFiles(folderId) {
        return axios.delete(FILE_REST_API_URL + "/deleteAllFiles/" + folderId)
    }

    patchFile(fileId, description) {
        return axios.patch(FILE_REST_API_URL + "/patchFile/" + fileId, description)
    }

}
// eslint-disable-next-line
export default new FileService();
