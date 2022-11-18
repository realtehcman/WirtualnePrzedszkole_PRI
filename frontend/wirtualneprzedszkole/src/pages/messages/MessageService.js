import axios from 'axios'

const MESSAGES_REST_API_URL = 'http://localhost:8080/api/message/received_messages'

class MessageService {

    getReceivedMessages(){
        return axios.get(MESSAGES_REST_API_URL)
    }


    getMessage(id) {
        return axios.get("http://localhost:8080/api/message/read_msg" + '/' + id)
    }
    getMessag() {
        return axios.get("http://localhost:8080/api/message/read_msg")
    }

    deleteReceivedMessages(id){
        return axios.delete("http://localhost:8080/api/message" + '/' + id)
    }


}

export default new MessageService();