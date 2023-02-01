import axios from 'axios'
import FileService from './FileService'

const FILE_REST_API_URL = 'http://localhost:8080/api/file'

jest.mock('axios')

describe('FileService', () => {
    it('getKnowledge should return mocked data', async () => {
        const mockData = {data: 'mocked data'}
        axios.get.mockResolvedValue(mockData)

        const result = await FileService.getKnowledge()
        expect(axios.get).toHaveBeenCalledWith(FILE_REST_API_URL + '/downloadKnowledge')
        expect(result).toEqual(mockData)
    })

    it('getFile should return mocked data', async () => {
        const folderId = 1
        const fileName = 'test.pdf'
        const mockData = {data: 'mocked data'}
        axios.get.mockResolvedValue(mockData)

        const result = await FileService.getFile(folderId, fileName)
        expect(axios.get).toHaveBeenCalledWith(FILE_REST_API_URL + '/downloadFile/' + folderId + '/' + fileName, {
            responseType: "blob",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        })
        expect(result).toEqual(mockData)
    })

    it('addFiles should return mocked data', async () => {
        const folderId = 1
        const formData = {test: 'test'}
        const mockData = {data: 'mocked data'}
        axios.post.mockResolvedValue(mockData)

        const result = await FileService.addFiles(folderId, formData)
        expect(axios.post).toHaveBeenCalledWith(FILE_REST_API_URL + '/uploadMultiFiles/' + folderId, formData)
        expect(result).toEqual(mockData)
    })

    it('deleteFile should return mocked data', async () => {
        const folderId = 1
        const fileName = 'test.pdf'
        const mockData = {data: 'mocked data'}
        axios.delete.mockResolvedValue(mockData)

        const result = await FileService.deleteFile(folderId, fileName)
        expect(axios.delete).toHaveBeenCalledWith(FILE_REST_API_URL + '/deleteFile/' + folderId + '/' + fileName)
        expect(result).toEqual(mockData)
    })

    it('deleteAllFiles should return mocked data', async () => {
        const folderId = 1
        const mockData = {data: 'mocked data'}
        axios.delete.mockResolvedValue(mockData)

        const result = await FileService.deleteAllFiles(folderId)
        expect(axios.delete).toHaveBeenCalledWith(FILE_REST_API_URL + '/deleteAllFiles/' + folderId)
        expect(result).toEqual(mockData);
    });
});
