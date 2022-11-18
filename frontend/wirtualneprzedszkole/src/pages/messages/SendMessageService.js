import axios from 'axios'


const SENDMESSAGE_REST_API_URL = 'http://localhost:8080/api/message/'

class SendMessageService {

    d(){
        return axios.post(SENDMESSAGE_REST_API_URL)
    }

    getMessage(id){
        return axios.get(SENDMESSAGE_REST_API_URL)
    }

    SendMessage(message){
        console.log(message)
        return axios.post(SENDMESSAGE_REST_API_URL, message, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    SendMessageParents(message){
        console.log(message)
        return axios.post(SENDMESSAGE_REST_API_URL + 'to_parents', message, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


}

export default new SendMessageService();