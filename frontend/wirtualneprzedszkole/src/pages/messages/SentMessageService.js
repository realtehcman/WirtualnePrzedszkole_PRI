import axios from 'axios'
import { config } from '../../AxiosUrlConfig'

const SENT_MESSAGES_REST_API_URL = config.SERVER_URI + '/api/message/'

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

// eslint-disable-next-line
export default new SentMessageService();
