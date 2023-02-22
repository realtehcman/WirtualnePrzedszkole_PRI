import React from 'react';
import {configure, shallow} from 'enzyme';
import UserComponent from '../pages/User/UserComponent';
import UserService from '../pages/User/UserService';
import Adapter from "enzyme-adapter-react-16";

jest.mock('./UserService');

configure({ adapter: new Adapter() });

describe('UserComponent', () => {
    let wrapper;
    let mockUsers;

    beforeEach(() => {
        mockUsers = [{id: 1, name: 'John', lastName: 'Doe', email: 'johndoe@example.com'}, {
            id: 2,
            name: 'Jane',
            lastName: 'Doe',
            email: 'janedoe@example.com'
        },];

        UserService.getUsers.mockResolvedValue({data: mockUsers});

        wrapper = shallow(<UserComponent/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call getUsers on componentDidMount', () => {
        expect(UserService.getUsers).toHaveBeenCalled();
    });

    it('should set the state with the users returned from the API', () => {
        expect(wrapper.state('users')).toEqual(mockUsers);
    });

    it('should render the users in a table', () => {
        expect(wrapper.find('.content-table').length).toEqual(1);
        expect(wrapper.find('.table-body').length).toEqual(1);
        expect(wrapper.find('.table-body tr').length).toEqual(2);
    });

    it('should render the Navi component for each user', () => {
        expect(wrapper.find('Navi').length).toEqual(2);
    });

    it('should call the deleteUser function when the delete button is clicked', () => {
        const instance = wrapper.instance();
        jest.spyOn(instance, 'deleteUser');

        wrapper.find('.btn-danger').first().simulate('click');

        expect(instance.deleteUser).toHaveBeenCalledWith(1);
    });

});
