import axios from 'axios'
import GalleryService from './GalleryService';

jest.mock('axios');

describe('GalleryService', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: [] });
        axios.delete.mockResolvedValue({});
        axios.post.mockResolvedValue({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getMultiFiles should return data', async () => {
        const id = 1;
        const result = await GalleryService.getMultiFiles(id);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/file/downloadFolder/1');
        expect(result.data).toEqual([]);
    });

    it('getFolders should return data', async () => {
        const result = await GalleryService.getFolders();
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/folder/all/');
        expect(result.data).toEqual([]);
    });

    it('ViewFolder should return data', async () => {
        const id = 1;
        const result = await GalleryService.ViewFolder(id);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/downloadFolder/1');
        expect(result.data).toEqual([]);
    });

    it('AddMultiFiles should return data', async () => {
        const result = await GalleryService.AddMultiFiles();
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/apifile/uploadMultiFiles/');
        expect(result.data).toEqual([]);
    });

    it('deleteFolder should return data', async () => {
        const id = 1;
        const result = await GalleryService.deleteFolder(id);
        expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/folder/1');
        expect(result).toEqual({});
    });

    it('UploadMultiFiles should return data', async () => {
        const group = {
            name: "test"
        }
        const result = await GalleryService.UploadMultiFiles(group);
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/file/uploadMultiFiles/', group, { headers: { 'Content-Type': 'application/json' } });
        expect(result).toEqual({});
    });

});
