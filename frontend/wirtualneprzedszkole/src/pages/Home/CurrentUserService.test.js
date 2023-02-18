import CurrentUserService from './CurrentUserService';
import axios from 'axios';
import { config } from '../../AxiosUrlConfig';

jest.mock('axios');

describe('CurrentUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCurrentUser', () => {
        it('should make a GET request to the correct URL', async () => {
            axios.get.mockResolvedValue({ data: 'mock data' });
            await CurrentUserService.getCurrentUsers();
            expect(axios.get).toHaveBeenCalledWith(config.SERVER_URI + '/api/user/current_user');
        });
    });

    describe('EditCurrentUser', () => {
        it('should make a PUT request to the correct URL with the current_user as the data', async () => {
            const current_user = { id: 1, name: 'Jane' };
            await CurrentUserService.editCurrentUser(current_user);
            expect(axios.put).toHaveBeenCalledWith(config.SERVER_URI + '/api/user/current_user', current_user);
        });
    });

    describe('getCurrent_user', () => {
        it('should make a GET request to the correct URL with the id as a parameter', async () => {
            await CurrentUserService.getCurrentUser();
            expect(axios.get).toHaveBeenCalledWith(config.SERVER_URI + '/api/user/current_user');
        });
    });

    describe('addCurrentUser', () => {
        it('should make a POST request to the correct URL with the current_user as the data', async () => {
            const currentUser = { id: 1, name: 'Jane' };
            await CurrentUserService.addCurrentUser(currentUser);
            expect(axios.post).toHaveBeenCalledWith(config.SERVER_URI + '/api/user/current_user', currentUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    });

    describe('restartPassword', () => {
        it('should make a PATCH request to the correct URL with the reset data', async () => {
            const reset = { email: 'jane@example.com' };
            await CurrentUserService.restartPassword(reset);
            expect(axios.patch).toHaveBeenCalledWith(config.SERVER_URI + '/api/user/restart', reset, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    });

    describe('changePassword', () => {
        it('should make a PATCH request to the correct URL with the change data', async () => {
            const change = { password: 'new_password' };
            await CurrentUserService.changePassword(change);
            expect(axios.patch).toHaveBeenCalledWith(config.SERVER_URI + '/api/user/change_password', change);
        });
    });
});
