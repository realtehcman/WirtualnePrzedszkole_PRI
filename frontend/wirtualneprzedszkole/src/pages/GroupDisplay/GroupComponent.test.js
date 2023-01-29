import React from 'react';
import {configure, shallow} from 'enzyme';
import GroupService from './GroupService';
import GroupComponent from './GroupComponent';
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

jest.mock('./GroupService');

describe('GroupComponent', () => {
    let wrapper;
    let instance;
    let mockGroups = [    { id: 1, name: 'Group 1', description: 'Description 1' },    { id: 2, name: 'Group 2', description: 'Description 2' },    { id: 3, name: 'Group 3', description: 'Description 3' },  ];

    beforeEach(() => {
        GroupService.getGroups.mockResolvedValue({ data: mockGroups });
        wrapper = shallow(<GroupComponent />);
        instance = wrapper.instance();
    });

    it('renders a table with the correct number of rows', () => {
        expect(wrapper.find('table').length).toEqual(1);
        expect(wrapper.find('tr').length).toEqual(mockGroups.length + 1); // +1 for the header row
    });

    it('displays the correct group information in the table', () => {
        const firstRowCells = wrapper.find('tr').at(1).find('td');
        expect(firstRowCells.at(0).text()).toEqual(mockGroups[0].id.toString());
        expect(firstRowCells.at(1).text()).toEqual(mockGroups[0].name);
        expect(firstRowCells.at(2).text()).toEqual(mockGroups[0].description);
    });

    it('displays a search input', () => {
        expect(wrapper.find('input[type="text"]').length).toEqual(1);
    });

    it('filters groups based on search term', () => {
        instance.handleSearch({ target: { value: '2' } });
        expect(wrapper.find('tr').length).toEqual(2); // +1 for the header row
    });

    it('calls the deleteGroup function with the correct id when delete button is clicked', () => {
        GroupService.deleteGroup.mockResolvedValue();
        const spy = jest.spyOn(instance, 'deleteGroup');
        wrapper.find('button.btn-danger').at(0).simulate('click');
        expect(spy).toHaveBeenCalledWith(mockGroups[0].id);
    });
});
