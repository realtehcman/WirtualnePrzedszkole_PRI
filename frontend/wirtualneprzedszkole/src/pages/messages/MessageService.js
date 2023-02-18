import axios from 'axios'
import { config } from '../../AxiosUrlConfig'

const MESSAGES_REST_API_URL = config.SERVER_URI + '/api/message/received_messages'

class MessageService {

    getReceivedMessages() {
        return axios.get(MESSAGES_REST_API_URL)
    }

    getMessage(id) {
        return axios.get(config.SERVER_URI + `/api/message/read_msg/${id}`)
    }

    ViewMessage(id) {
        return axios.get(config.SERVER_URI + `/api/message/sent_msg/${id}`)
    }

    getSentMessage(id) {
        return axios.get(config.SERVER_URI + `/api/message/sent_msg/${id}`)
    }

    getSentMesage() {
        return axios.get(config.SERVER_URI + "/api/message/sent_msg")
    }

    getMessag() {
        return axios.get(config.SERVER_URI + "/api/message/read_msg")
    }

    deleteReceivedMessages(id) {
        return axios.patch(config.SERVER_URI + `/api/message/deleteReceivedMsg/${id}`)
    }


}
// eslint-disable-next-line
export default new MessageService();
