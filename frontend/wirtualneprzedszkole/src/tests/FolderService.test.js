import axios from 'axios';
import FolderService from '../pages/Folders/FolderService';

jest.mock('axios');

describe('FolderService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get folder details', async () => {
        const folderId = '1';
        const mockResponse = { data: { id: folderId, name: 'Folder 1' } };
        axios.get.mockResolvedValue(mockResponse);

        const result = await FolderService.getFolder(folderId);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/folder/' + folderId);
        expect(result).toEqual(mockResponse);
    });

    it('should get class folders', async () => {
        const className = 'Math';
        const mockResponse = { data: [{ id: '1', name: 'Math Folder 1' }, { id: '2', name: 'Math Folder 2' }] };
        axios.get.mockResolvedValue(mockResponse);

        const result = await FolderService.getClassFolders(className);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/folder/className/' + className);
        expect(result).toEqual(mockResponse);
    });

    it('should get class subfolders', async () => {
        const className = 'Science';
        const mockResponse = { data: [{ id: '1', name: 'Science Subfolder 1' }, { id: '2', name: 'Science Subfolder 2' }] };
        axios.get.mockResolvedValue(mockResponse);

        const result = await FolderService.getClassSubFolders(className);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/folder/getSubFolders/' + className);
        expect(result).toEqual(mockResponse);
    });

    it('should add a new folder', async () => {
        const newFolder = { name: 'New Folder' };
        const mockResponse = { data: { id: '3', name: 'New Folder' } };
        axios.post.mockResolvedValue(mockResponse);

        const result = await FolderService.addNewFolder(newFolder);
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/folder', newFolder);
        expect(result).toEqual(mockResponse);
    });

    it('should delete a folder', async () => {
        const folderId = '4';
        const mockResponse = { data: {} };
        axios.delete.mockResolvedValue(mockResponse);

        const result = await FolderService.deleteFolder(folderId);
        expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/folder/' + folderId);
        expect(result).toEqual(mockResponse);
    });
});
