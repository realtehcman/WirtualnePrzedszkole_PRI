import axios from 'axios'
import ChildrenService from './ChildrenService';

const CHILDREN_REST_API_URL = 'http://localhost:8080/api/child'

jest.mock('axios');

describe('ChildrenService', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('getChildren', async () => {
        axios.get.mockResolvedValue({data: 'getChildren response'});
        const response = await ChildrenService.getChildren();
        expect(response.data).toEqual('getChildren response');
        expect(axios.get).toHaveBeenCalledWith(CHILDREN_REST_API_URL);
    });

    it('addChild', async () => {
        axios.post.mockResolvedValue({data: 'addChild response'});
        const child = {name: 'testChild'};
        const response = await ChildrenService.addChild(child);
        expect(response.data).toEqual('addChild response');
        expect(axios.post).toHaveBeenCalledWith(CHILDREN_REST_API_URL, child, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });

    it('deleteChild', async () => {
        axios.delete.mockResolvedValue({data: 'deleteChild response'});
        const id = 1;
        const response = await ChildrenService.deleteChild(id);
        expect(response.data).toEqual('deleteChild response');
        expect(axios.delete).toHaveBeenCalledWith(CHILDREN_REST_API_URL + '/' + id);
    });

    it('getChild', async () => {
        axios.get.mockResolvedValue({data: 'getChild response'});
        const id = 1;
        const response = await ChildrenService.getChild(id);
        expect(response.data).toEqual('getChild response');
        expect(axios.get).toHaveBeenCalledWith(CHILDREN_REST_API_URL + '/' + id);
    });

    it('deleteChildFromClass', async () => {
        axios.patch.mockResolvedValue({data: 'deleteChildFromClass response'});
        const childId = 1;
        const response = await ChildrenService.deleteChildFromClass(childId);
        expect(response.data).toEqual('deleteChildFromClass response');
        expect(axios.patch).toHaveBeenCalledWith(CHILDREN_REST_API_URL + '/deleteChildFromClass/' + childId);
    });
});
