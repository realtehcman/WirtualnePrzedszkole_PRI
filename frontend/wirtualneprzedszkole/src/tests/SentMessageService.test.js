import axios from 'axios'
import SentMessageService from '../pages/messages/SentMessageService'
import {mocked} from 'ts-jest/utils'

jest.mock("axios")
const SENT_MESSAGES_REST_API_URL = 'http://localhost:8080/api/message/'

describe('SentMessageService', () => {
    it('getSentMessages', async () => {
        const messages = [{id:1, message: "Hello World"}]
        mocked(axios.get).mockResolvedValue({data: messages});
        const response = await SentMessageService.getSentMessages();
        expect(response.data).toEqual(messages);
        expect(axios.get).toHaveBeenCalledWith(SENT_MESSAGES_REST_API_URL);
    });

    it('getSentMessage', async () => {
        const message = {id:1, message: "Hello World"}
        mocked(axios.get).mockResolvedValue({data: message});
        const response = await SentMessageService.getSentMessage(1);
        expect(response.data).toEqual(message);
        expect(axios.get).toHaveBeenCalledWith(SENT_MESSAGES_REST_API_URL + 1);
    });

    it('deleteSentMessages', async () => {
        mocked(axios.delete).mockResolvedValue({});
        await SentMessageService.deleteSentMessages(1);
        expect(axios.delete).toHaveBeenCalledWith(SENT_MESSAGES_REST_API_URL + 1);
    });
});
