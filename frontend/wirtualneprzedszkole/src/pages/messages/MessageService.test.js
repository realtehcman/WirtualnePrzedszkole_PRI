import MessageService from './MessageService';
import axios from 'axios';

jest.mock('axios');

describe('MessageService', () => {
    it('getReceivedMessages', async () => {
        const messages = [{ id: 1, message: 'Hello' }, { id: 2, message: 'World' }];
        axios.get.mockResolvedValue({ data: messages });

        const receivedMessages = await MessageService.getReceivedMessages();

        expect(receivedMessages).toEqual({ data: messages });
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/message/received_messages');
    });

    beforeEach(() => {
        axios.get.mockClear()
        axios.delete.mockClear()
    })

    describe('getMessage', () => {
        it('should make a GET request to the correct URL', async () => {
            await MessageService.getMessage(1)
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/message/read_msg/1')
        })
    })

    describe('ViewMessage', () => {
        it('should make a GET request to the correct URL', async () => {
            await MessageService.ViewMessage(1)
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/message/sent_msg/1')
        })
    })

    describe('getSentMessage', () => {
        it('should make a GET request to the correct URL', async () => {
            await MessageService.getSentMessage(1)
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/message/sent_msg/1')
        })
    })

    describe('getSentMesage', () => {
        it('should make a GET request to the correct URL', async () => {
            await MessageService.getSentMesage()
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/message/sent_msg')
        })
    })

    describe('getMessag', () => {
        it('should make a GET request to the correct URL', async () => {
            await MessageService.getMessag()
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/message/read_msg')
        })
    })

    describe('deleteReceivedMessages', () => {
        it('should make a DELETE request to the correct URL', async () => {
            await MessageService.deleteReceivedMessages(1)
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/message/1')
        })
    })
});
