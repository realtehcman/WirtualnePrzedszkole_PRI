import "../pages/GroupDisplay/AssignTeacher.scss"
import UserService from "../pages/User/UserService"
import React from 'react'
import {render} from '@testing-library/react'
import AssignTeacher from "../pages/GroupDisplay/AssignTeacher";
import {MemoryRouter} from "react-router-dom";

describe('AssignTeacher', () => {
    let teachers = [
        {id: 1, name: 'John', lastName: 'Doe', email: 'johndoe@gmail.com'},
        {id: 2, name: 'Jane', lastName: 'Doe', email: 'janedoe@gmail.com'}
    ]
    let getTeachersMock;
    let assignTeacherToClassMock;
    beforeEach(() => {
        getTeachersMock = jest.spyOn(UserService, 'getTeachers')
            .mockImplementation(() => Promise.resolve({ data: teachers }));
        assignTeacherToClassMock = jest.spyOn(UserService, 'assignTeacherToClass')
            .mockImplementation(() => Promise.resolve({ data: 'Teacher assigned to class successfully' }));
    });
    afterEach(() => {
        getTeachersMock.mockRestore();
        assignTeacherToClassMock.mockRestore();
    });
    it('Should call getTeachers on component mount', () => {
        render(<MemoryRouter><AssignTeacher value={{id: 1}} /></MemoryRouter>);
        expect(getTeachersMock).toHaveBeenCalled();
    });
});
