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

}

export default new FileService();