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

}

export default new FileService();