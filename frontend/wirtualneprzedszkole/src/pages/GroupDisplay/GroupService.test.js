import axios from 'axios'
import GroupService from './GroupService'
import { config } from '../../AxiosUrlConfig';

jest.mock('axios');
const GROUP_REST_API_URL =  config.SERVER_URI + '/api/class'

describe('GroupService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getGroups', () => {
        it('should call axios.get with the correct URL', async () => {
            axios.get.mockResolvedValue();
            await GroupService.getGroups();
            expect(axios.get).toHaveBeenCalledWith(GROUP_REST_API_URL);
        });

        it('should return the correct data', async () => {
            const mockData = {
                data: [{id: 1, name: 'Group 1'}, {id: 2, name: 'Group 2'}]
            };
            axios.get.mockResolvedValue(mockData);
            const data = await GroupService.getGroups();
            expect(data).toEqual(mockData);
        });
    });

    describe('addGroup', () => {
        it('should call axios.post with the correct URL and data', async () => {
            const group = {name: 'Group 1'};
            axios.post.mockResolvedValue();
            await GroupService.addGroup(group);
            expect(axios.post).toHaveBeenCalledWith(GROUP_REST_API_URL, group, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    });

    describe('deleteGroup', () => {
        it('should call axios.delete with the correct URL', async () => {
            axios.delete.mockResolvedValue();
            await GroupService.deleteGroup(1);
            expect(axios.delete).toHaveBeenCalledWith(GROUP_REST_API_URL + '/' + 1);
        });
    });

    describe('getGroup', () => {
        it('should call axios.get with the correct URL', async () => {
            axios.get.mockResolvedValue();
            await GroupService.getGroup(1);
            expect(axios.get).toHaveBeenCalledWith(GROUP_REST_API_URL + '/' + 1);
        });

        it('should return the correct data', async () => {
            const mockData = {
                data: {id: 1, name: 'Group 1'}
            };
            axios.get.mockResolvedValue(mockData);
            const data = await GroupService.getGroup(1);
            expect(data).toEqual(mockData);
        });
    });
});
