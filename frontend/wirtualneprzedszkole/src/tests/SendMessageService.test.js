import SendMessageService from '../pages/messages/SendMessageService';
import axios from 'axios';

jest.mock('axios');

describe('SendMessageService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getMessage', () => {
        it('should make a GET request to the correct endpoint', async () => {
            axios.get.mockResolvedValue({});
            await SendMessageService.getMessage();
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/message/');
        });
    });

    describe('SendMessage', () => {
        it('should make a POST request to the correct endpoint with the message', async () => {
            const message = { text: 'Hello' };
            axios.post.mockResolvedValue({});
            await SendMessageService.SendMessage(message);
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/message/', message, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    });

    describe('SendMessageParents', () => {
        it('should make a POST request to the correct endpoint with the message', async () => {
            const message = { text: 'Hello' };
            axios.post.mockResolvedValue({});
            await SendMessageService.SendMessageParents(message);
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/message/to_parents', message, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    });

    describe('d', () => {
        it('should make a POST request to the correct endpoint', async () => {
            axios.post.mockResolvedValue({});
            await SendMessageService.d();
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/message/');
        });
    });

});
