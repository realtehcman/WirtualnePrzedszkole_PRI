import axios from 'axios'
import UserService from './UserService'

jest.mock('axios')

describe('UserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should call axios.get with the correct URL', () => {
            UserService.getUsers();
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/users');
        });
    });

    describe('addUser', () => {
        it('should call axios.post with the correct URL and data', () => {
            const user = {name: 'John Doe', age: 30};
            UserService.addUser(user);
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8080/api/users',
                user,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
        });
    });

    describe('deleteUser', () => {
        it('should call axios.delete with the correct URL', () => {
            UserService.deleteUser(1);
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/users/1');
        });
    });

    describe('getUser', () => {
        it('should call axios.get with the correct URL', () => {
            UserService.getUser(1);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/users/1');
        });
    });

    describe('addChildToUser', () => {
        it('should call axios.put with the correct URL and data', () => {
            const child = {name: 'Jane Doe', age: 5};
            UserService.addChildToUser(1, child);
            expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/api/users/1', child);
        });
    });

    describe('editUser', () => {
        it('should call axios.put with the correct URL and data', () => {
            const user = {name: 'Jane Doe', age: 30};
            UserService.editUser(user);
            expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/api/users', user);
        });
    });

    describe('getTeachers', () => {
        it('should call axios.get with the correct URL', () => {
            UserService.getTeachers();
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/users/teachers');
        });
    });

    describe('assignTeacherToClass', () => {
        it('should call axios.put with the correct URL and data', () => {
            const teacher = {name: 'John Smith', age: 40};
            UserService.assignTeacherToClass(1, teacher);
            expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/api/users/add_to_class/1', teacher);
        });
    });

    describe('deleteTeacherFromClass', () => {
        it('should call axios.patch with the correct URL and data', () => {
            UserService.deleteTeacherFromClass(1, 1);
            expect(axios.patch).toHaveBeenCalledWith('http://localhost:8080/api/users/deleteTeacherFromClass/1/1');
        });
    });

});
