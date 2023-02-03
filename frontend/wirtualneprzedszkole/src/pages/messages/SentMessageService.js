import axios from 'axios'

const SENT_MESSAGES_REST_API_URL = 'http://localhost:8080/api/message/'

class SentMessageService {

    getSentMessages(){
        return axios.get(SENT_MESSAGES_REST_API_URL)
    }


    getSentMessage(id) {
        return axios.get(SENT_MESSAGES_REST_API_URL + id)
    }

    deleteSentMessages(id){
        return axios.delete(SENT_MESSAGES_REST_API_URL + id)
    }


}

export default new SentMessageService();