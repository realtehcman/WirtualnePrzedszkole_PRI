import axios from 'axios'
import { config } from '../../AxiosUrlConfig'

const SENDMESSAGE_REST_API_URL = config.SERVER_URI + '/api/message/'

class SendMessageService {

    d(){
        return axios.post(SENDMESSAGE_REST_API_URL)
    }

    getMessage(id){
        return axios.get(SENDMESSAGE_REST_API_URL)
    }

    SendMessage(message){
        return axios.post(SENDMESSAGE_REST_API_URL, message, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    SendMessageParents(message){
        return axios.post(SENDMESSAGE_REST_API_URL + 'to_parents', message, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


}
// eslint-disable-next-line
export default new SendMessageService();
